import base64
import json
import os
from typing import Any, Dict, List, Optional

import httpx

from backend.services.currency_service import currency_service


class VisionService:
    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY", "")
        self.model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
        self.endpoint = (
            f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent"
        )

    async def call_gemini(self, image_bytes: bytes, mime_type: str, target_lang: str) -> Dict[str, Any]:
        if not self.gemini_key:
            return {"error": "GEMINI_API_KEY missing"}

        image_b64 = base64.b64encode(image_bytes).decode("utf-8")
        prompt = (
            "Extrae items de un menu en imagen.\n"
            f"Idioma objetivo: {target_lang}.\n"
            "Devuelve SOLO JSON valido con esta estructura:\n"
            "{"
            '"source_lang": "string",'
            '"items": ['
            '{"name": "string", "translated": "string", "price_mxn": 0.0, "category": "string"}'
            "]"
            "}\n"
            "Reglas:\n"
            "- price_mxn debe ser numero decimal en MXN.\n"
            "- Si no hay precio, omite el item.\n"
            "- translated debe estar en el idioma objetivo.\n"
            "- category puede ser vacio si no hay.\n"
            "- No agregues texto fuera del JSON."
        )

        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": prompt},
                        {
                            "inline_data": {
                                "mime_type": mime_type or "image/jpeg",
                                "data": image_b64,
                            }
                        },
                    ]
                }
            ],
            "generationConfig": {
                "response_mime_type": "application/json"
            },
        }

        headers = {
            "x-goog-api-key": self.gemini_key,
            "Content-Type": "application/json",
        }

        async with httpx.AsyncClient(timeout=60) as client:
            response = await client.post(self.endpoint, headers=headers, json=payload)
            if response.status_code != 200:
                return {
                    "error": "Gemini API request failed",
                    "status_code": response.status_code,
                    "body": response.text[:500],
                }
            return response.json()

    def _extract_json(self, text: str) -> Optional[Dict[str, Any]]:
        try:
            return json.loads(text)
        except Exception:
            pass
        # Try to extract JSON object from text
        start = text.find("{")
        end = text.rfind("}")
        if start >= 0 and end > start:
            try:
                return json.loads(text[start : end + 1])
            except Exception:
                return None
        return None

    async def process_menu_image_cloud(self, file, target_lang: str, target_currency: str) -> Dict[str, Any]:
        file_content = await file.read()
        mime_type = getattr(file, "content_type", None) or "image/jpeg"

        gemini_response = await self.call_gemini(file_content, mime_type, target_lang)
        if "error" in gemini_response:
            return {
                "items": [],
                "error": gemini_response.get("error"),
                "error_details": {
                    "status_code": gemini_response.get("status_code"),
                    "body": gemini_response.get("body"),
                },
                "target_lang": target_lang,
                "target_currency": target_currency,
                "status": "error",
                "source": "gemini",
            }

        # Parse response
        text = ""
        try:
            candidates = gemini_response.get("candidates", [])
            if candidates:
                parts = candidates[0].get("content", {}).get("parts", [])
                if parts:
                    text = parts[0].get("text", "")
        except Exception:
            text = ""

        parsed = self._extract_json(text) if text else None
        items_raw: List[Dict[str, Any]] = []
        source_lang = ""
        if parsed and isinstance(parsed.get("items"), list):
            items_raw = parsed["items"]
            source_lang = str(parsed.get("source_lang", "")).strip()

        processed_items = []
        for item in items_raw:
            try:
                name_es = str(item.get("name", "")).strip()
                name_translated = str(item.get("translated", "")).strip() or name_es
                price_mxn = float(item.get("price_mxn"))
                category = str(item.get("category", "")).strip()
            except Exception:
                continue
            if not name_es or price_mxn <= 0:
                continue
            converted_price = await currency_service.convert(price_mxn, target_currency)
            processed_items.append(
                {
                    "original": name_es,
                    "translated": name_translated,
                    "price_mxn": price_mxn,
                    "price_target": converted_price,
                    "currency": target_currency,
                    "category": category,
                }
            )

        # de-duplicate
        deduped = []
        seen = set()
        for item in processed_items:
            key = (item["original"].lower(), item["price_mxn"])
            if key in seen:
                continue
            seen.add(key)
            deduped.append(item)

        return {
            "items": deduped,
            "target_lang": target_lang,
            "target_currency": target_currency,
            "source_lang": source_lang,
            "status": "success" if processed_items else "no_data",
            "source": "gemini",
        }


vision_service = VisionService()
