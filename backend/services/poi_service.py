import httpx
from typing import List, Dict


class POIService:
    def __init__(self) -> None:
        self.endpoint = "https://en.wikipedia.org/w/api.php"

    async def nearby(self, lat: float, lng: float, radius_km: float = 3.0, limit: int = 15) -> List[Dict]:
        params = {
            "action": "query",
            "list": "geosearch",
            "gscoord": f"{lat}|{lng}",
            "gsradius": int(radius_km * 1000),
            "gslimit": int(limit),
            "format": "json",
        }
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(self.endpoint, params=params)
            resp.raise_for_status()
            data = resp.json()
        items = data.get("query", {}).get("geosearch", []) or []
        results = []
        for item in items:
            page_id = item.get("pageid")
            results.append(
                {
                    "id": page_id,
                    "title": item.get("title"),
                    "lat": item.get("lat"),
                    "lng": item.get("lon"),
                    "url": f"https://en.wikipedia.org/?curid={page_id}" if page_id else None,
                }
            )
        return results


poi_service = POIService()
