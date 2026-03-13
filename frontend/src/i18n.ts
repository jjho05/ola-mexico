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
      "profile": "프로필",
      "home": "홈",
      "menu_scanner_title": "AI 메뉴 스캐너",
      "menu_scanner_subtitle": "실시간으로 번역하고 가격을 변환합니다.",
      "menu_translated": "번역된 메뉴",
      "take_photo": "메뉴 사진 찍기",
      "upload_image": "이미지 업로드",
      "upload_hint": "PC에서는 업로드를 사용하세요. 모바일에서는 카메라 버튼이 카메라를 엽니다.",
      "no_items": "항목을 찾지 못했습니다. 다른 사진을 시도하세요.",
      "preferences": "환경설정",
      "language_primary": "기본 언어",
      "language_help": "앱 언어 선택",
      "currency_display": "표시 통화",
      "currency_help": "자동 환전",
      "advanced_settings": "고급 설정",
      "advanced_help": "선택 기능",
      "portal_partner": "파트너 포털"
    }
  },
  de: {
    translation: {
      "welcome": "Willkommen bei Ola México",
      "discover": "Entdecken",
      "swipe": "Wischen",
      "scanner": "Scanner",
      "profile": "Profil",
      "home": "Start",
      "menu_scanner_title": "KI-Menüscanner",
      "menu_scanner_subtitle": "Preise in Echtzeit übersetzen und umrechnen.",
      "menu_translated": "Übersetztes Menü",
      "take_photo": "Menüfoto aufnehmen",
      "upload_image": "Bild hochladen",
      "upload_hint": "Am PC bitte Hochladen nutzen. Auf dem Handy öffnet der Kameraknopf die Kamera.",
      "no_items": "Keine Einträge erkannt. Bitte anderes Foto versuchen.",
      "preferences": "Einstellungen",
      "language_primary": "Hauptsprache",
      "language_help": "App-Sprache wählen",
      "currency_display": "Anzeigewährung",
      "currency_help": "Automatische Umrechnung",
      "advanced_settings": "Erweiterte Einstellungen",
      "advanced_help": "Optionale Funktionen",
      "portal_partner": "Partner-Portal"
    }
  },
  fr: {
    translation: {
      "welcome": "Bienvenue à Ola México",
      "discover": "Découvrir",
      "swipe": "Balayer",
      "scanner": "Scanner",
      "profile": "Profil",
      "home": "Accueil",
      "menu_scanner_title": "Scanner de menu IA",
      "menu_scanner_subtitle": "Traduire et convertir les prix en temps réel.",
      "menu_translated": "Menu traduit",
      "take_photo": "Prendre une photo du menu",
      "upload_image": "Téléverser une image",
      "upload_hint": "Sur PC, utilisez Téléverser. Sur mobile, le bouton caméra ouvre la caméra.",
      "no_items": "Aucun plat détecté. Essayez une autre photo.",
      "preferences": "Préférences",
      "language_primary": "Langue principale",
      "language_help": "Choisissez la langue de l’app",
      "currency_display": "Devise d’affichage",
      "currency_help": "Conversion automatique",
      "advanced_settings": "Paramètres avancés",
      "advanced_help": "Fonctions optionnelles",
      "portal_partner": "Portail partenaire"
    }
  },
  ar: {
    translation: {
      "welcome": "مرحبًا بكم في أولا مكسيكو",
      "discover": "اكتشف",
      "swipe": "سحب",
      "scanner": "ماسح ضوئي",
      "profile": "الملف الشخصي",
      "home": "الرئيسية",
      "menu_scanner_title": "ماسح قائمة بالذكاء الاصطناعي",
      "menu_scanner_subtitle": "ترجمة الأسعار وتحويلها في الوقت الحقيقي.",
      "menu_translated": "القائمة المترجمة",
      "take_photo": "التقاط صورة للقائمة",
      "upload_image": "رفع صورة",
      "upload_hint": "على الكمبيوتر استخدم الرفع. على الهاتف زر الكاميرا يفتح الكاميرا.",
      "no_items": "لم يتم اكتشاف عناصر. جرّب صورة أخرى.",
      "preferences": "التفضيلات",
      "language_primary": "اللغة الأساسية",
      "language_help": "اختر لغة التطبيق",
      "currency_display": "عملة العرض",
      "currency_help": "تحويل تلقائي",
      "advanced_settings": "الإعدادات المتقدمة",
      "advanced_help": "ميزات اختيارية",
      "portal_partner": "بوابة الشركاء"
    }
  },
  pt: {
    translation: {
      "welcome": "Bem-vindo ao Ola México",
      "discover": "Descobrir",
      "swipe": "Deslizar",
      "scanner": "Scanner",
      "profile": "Perfil",
      "home": "Início",
      "menu_scanner_title": "Scanner de menu com IA",
      "menu_scanner_subtitle": "Traduza e converta preços em tempo real.",
      "menu_translated": "Menu traduzido",
      "take_photo": "Tirar foto do menu",
      "upload_image": "Enviar imagem",
      "upload_hint": "No PC use Enviar. No celular, o botão da câmera abre a câmera.",
      "no_items": "Nenhum item detectado. Tente outra foto.",
      "preferences": "Preferências",
      "language_primary": "Idioma principal",
      "language_help": "Escolha o idioma do app",
      "currency_display": "Moeda exibida",
      "currency_help": "Conversão automática",
      "advanced_settings": "Configurações avançadas",
      "advanced_help": "Recursos opcionais",
      "portal_partner": "Portal do parceiro"
    }
  },
  no: {
    translation: {
      "welcome": "Velkommen til Ola México",
      "discover": "Oppdag",
      "swipe": "Sveip",
      "scanner": "Skanner",
      "profile": "Profil",
      "home": "Hjem",
      "menu_scanner_title": "AI-menyskanner",
      "menu_scanner_subtitle": "Oversett og konverter priser i sanntid.",
      "menu_translated": "Oversatt meny",
      "take_photo": "Ta bilde av menyen",
      "upload_image": "Last opp bilde",
      "upload_hint": "På PC bruk Last opp. På mobil åpner kameraknappen kameraet.",
      "no_items": "Ingen elementer funnet. Prøv et annet bilde.",
      "preferences": "Innstillinger",
      "language_primary": "Primærspråk",
      "language_help": "Velg app-språk",
      "currency_display": "Visningsvaluta",
      "currency_help": "Automatisk konvertering",
      "advanced_settings": "Avanserte innstillinger",
      "advanced_help": "Valgfrie funksjoner",
      "portal_partner": "Partnerportal"
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
