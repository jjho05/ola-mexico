---
title: Ola México
emoji: 🌮
colorFrom: green
colorTo: red
sdk: docker
app_port: 7860
pinned: false
---

# Ola México — World Cup 2026 Edition

Super app para **nivelar la cancha digital** entre turistas del Mundial 2026 y micro‑negocios locales.  
El objetivo es crear **descubrimiento auténtico**, **menús universales**, **pagos internacionales con QR**, y **datos útiles** para decisiones locales.

---

## Ideas base (resumen)

**Idea 1 · LocalScore / Ruta Auténtica (Filtrado Colaborativo Turístico)**  
Los turistas hacen swipes (tipo Tinder). A partir de sus intereses, la app crea una **ruta auténtica** con negocios 100% locales y evita trampas turísticas.

**Idea 2 · Menú Universal AI**  
Un comerciante toma foto de menú → OCR → traducción multi‑idioma → estructura de precios → QR del menú digital.

**Idea 4 · Mundialista Smart‑Wallet (Pagos QR)**  
Pagos digitales con QR. El turista paga con Apple/Google Pay/tarjeta; el local recibe en MXN.

**Idea 5 · OlaData Hub (Panel B2B)**  
Insights de turismo y demanda para asociaciones/municipios: zonas, categorías top, picos de interés, etc.

---

## Qué está implementado hoy

### Turista
- **Mapa de la ciudad** con puntos de interés (Wikipedia GeoSearch) + locales cercanos.
- **Ruta auténtica** basada en swipes (categorías guardadas).
- **Descubrimiento local** con búsqueda por nombre y “cerca de mí”.

### Comerciante
- Registro de comerciante + múltiples locales.
- Búsqueda de ubicación con autocompletado y mapa.
- **Stripe Connect Express** para cobros con QR.

### Menú Universal AI
- OCR y extracción con **Gemini** (`GEMINI_API_KEY`).
- Traducción y conversión de moneda en tiempo real.

---

## Arquitectura (alto nivel)

**Frontend (Next.js + React 19)**
- UI móvil primero con rutas `/`, `/scanner`, `/swipe`, `/profile`, `/merchant`.
- i18n multi‑idioma.
- Mapa interactivo con Leaflet + OpenStreetMap.

**Backend (FastAPI)**
- APIs para negocios, turistas, OCR, POIs, pagos, moneda.
- Integración Supabase (DB).

---

## Servicios y APIs usadas

- **Supabase** (DB + RLS)
- **Gemini** (OCR/vision)
- **Wikipedia GeoSearch** (POIs turísticos)
- **OpenStreetMap + Leaflet** (mapa interactivo)
- **Stripe Connect Express** (pagos con QR)

---

## Variables de entorno

**Backend:**
- `SUPABASE_URL`
- `SUPABASE_KEY` (service role recomendado para RLS)
- `GEMINI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_FEE_PERCENT` (default 0.036)
- `STRIPE_FEE_FIXED_MXN` (default 3.0)
- `STRIPE_FEE_EXTRA_PERCENT` (default 0.0)

---

## Tablas principales (Supabase)

- `merchants` (comerciantes, incluye `stripe_account_id`)
- `businesses` (locales)
- `tourists` (turistas)
- `accounts` (login email/contraseña)
- `swipes` (interacciones)

---

## Stripe Connect Express (flujo)

1. Comerciante → **Conectar Stripe**
2. Stripe abre onboarding Express (datos mínimos + CLABE)
3. Comerciante queda listo para recibir pagos
4. Se generan **QRs de cobro** con comisión transparente

---

## Cómo correr local

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

**Backend**
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

---

## Notas importantes

- **Apple/Google Pay no son gratis**: requieren un PSP como Stripe.
- La comisión se suma al turista y se muestra en el QR.
- Para RLS en Supabase, usar `SUPABASE_KEY` service role en entorno del backend.

---

Desplegado automáticamente en Hugging Face Spaces (Docker).
