import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to Ola México",
      "discover": "Discover",
      "swipe": "Swipe",
      "scanner": "Scanner",
      "profile": "Profile",
      "home": "Home",
      "menu_scanner_title": "AI Menu Scanner",
      "menu_scanner_subtitle": "Translate and convert prices in real-time.",
      "menu_translated": "Translated Menu",
      "take_photo": "Take menu photo",
      "upload_image": "Upload image",
      "upload_hint": "On PC use Upload. On mobile, the camera button opens the camera.",
      "no_items": "No items detected. Try another photo.",
      "preferences": "Preferences",
      "language_primary": "Primary language",
      "language_help": "Choose your app language",
      "currency_display": "Display currency",
      "currency_help": "Automatic conversion",
      "advanced_settings": "Advanced settings",
      "advanced_help": "Optional features",
      "portal_partner": "Partner portal"
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido a Ola México",
      "discover": "Descubrir",
      "swipe": "Deslizar",
      "scanner": "Escáner",
      "profile": "Perfil",
      "home": "Inicio",
      "menu_scanner_title": "Escáner de Menú AI",
      "menu_scanner_subtitle": "Traduce y convierte precios en tiempo real.",
      "menu_translated": "Menú Traducido",
      "take_photo": "Tomar foto del menú",
      "upload_image": "Subir imagen",
      "upload_hint": "En PC usa Subir. En móvil, el botón de cámara abre la cámara.",
      "no_items": "No se detectaron platillos. Intenta con otra foto.",
      "preferences": "Preferencias",
      "language_primary": "Idioma principal",
      "language_help": "Elige el idioma de la app",
      "currency_display": "Moneda a mostrar",
      "currency_help": "Conversión automática",
      "advanced_settings": "Ajustes avanzados",
      "advanced_help": "Funciones opcionales",
      "portal_partner": "Portal socio"
    }
  },
  ko: {
    translation: {
      "welcome": "올라 멕시코에 오신 것을 환영합니다",
      "discover": "발견하다",
      "swipe": "스와이프",
      "scanner": "스캐너",
      "profile": "프로필"
    }
  },
  de: {
    translation: {
      "welcome": "Willkommen bei Ola México",
      "discover": "Entdecken",
      "swipe": "Wischen",
      "scanner": "Scanner",
      "profile": "Profil"
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue à Ola México",
      "discover": "Découvrir",
      "swipe": "Balayer",
      "scanner": "Scanner",
      "profile": "Profil"
    }
  },
  ar: {
    translation: {
      "welcome": "مرحبًا بكم في أولا مكسيكو",
      "discover": "اكتشف",
      "swipe": "سحب",
      "scanner": "ماسح ضوئي",
      "profile": "الملف الشخصي"
    }
  },
  pt: {
    translation: {
      "welcome": "Bem-vindo ao Ola México",
      "discover": "Descobrir",
      "swipe": "Deslizar",
      "scanner": "Scanner",
      "profile": "Perfil"
    }
  },
  no: {
    translation: {
      "welcome": "Velkommen til Ola México",
      "discover": "Oppdag",
      "swipe": "Sveip",
      "scanner": "Skanner",
      "profile": "Profil"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'ola-mexico-lang',
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
