/* =========================================================
   HALAL RISHTA
   COMPLETE script.js
   32 LANGUAGES + TRANSLATION SYSTEM
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE = {
    USER: "halal_rishta_user",
    ACCOUNT: "halal_rishta_account",
    PROFILE: "halal_rishta_profile",
    SETTINGS: "halal_rishta_settings",
    PRIVACY: "halal_rishta_privacy",
    PURCHASE: "halal_rishta_purchase",
    SWIPES: "halal_rishta_swipes",
    SUPERLIKES: "halal_rishta_superlikes",
    LIKES: "halal_rishta_likes",
    PASSES: "halal_rishta_passes",
    MATCHES: "halal_rishta_matches",
    MESSAGES: "halal_rishta_messages",
    GUARDIAN: "halal_rishta_guardian",
    PHOTOS: "halal_rishta_photos",
    CUSTOM_ICON: "halal_rishta_custom_icon",
    LANGUAGE: "halal_rishta_language"
};

/* =========================================================
   EXACTLY 32 LANGUAGES
   ========================================================= */

const HALAL_RISHTA_LANGUAGES = [
    "en",
    "ar",
    "es",
    "it",
    "fr",
    "nl",
    "el",
    "tr",
    "fa",
    "hi",
    "pl",
    "ro",
    "zh",
    "ru",
    "pt",
    "ms",
    "id",
    "fil",
    "th",
    "sq",
    "so",
    "sw",
    "ha",
    "bn",
    "fi",
    "cs",
    "sl",
    "sk",
    "bg",
    "hu",
    "uz",
    "de"
];

/* =========================================================
   LANGUAGE NAMES
   ========================================================= */

const LANGUAGE_NAMES = {
    en: "English",
    ar: "العربية",
    es: "Español",
    it: "Italiano",
    fr: "Français",
    nl: "Nederlands",
    el: "Ελληνικά",
    tr: "Türkçe",
    fa: "فارسی",
    hi: "हिन्दी",
    pl: "Polski",
    ro: "Română",
    zh: "中文",
    ru: "Русский",
    pt: "Português",
    ms: "Bahasa Melayu",
    id: "Bahasa Indonesia",
    fil: "Filipino",
    th: "ไทย",
    sq: "Shqip",
    so: "Soomaali",
    sw: "Kiswahili",
    ha: "Hausa",
    bn: "বাংলা",
    fi: "Suomi",
    cs: "Čeština",
    sl: "Slovenščina",
    sk: "Slovenčina",
    bg: "Български",
    hu: "Magyar",
    uz: "O‘zbekcha",
    de: "Deutsch"
};

/* =========================================================
   DEFAULT DATA
   ========================================================= */

const DEFAULT_SETTINGS = {
    notifications: true,
    darkMode: false,
    language: "en"
};

const DEFAULT_PRIVACY = {
    profileVisibility: "members",
    showOnline: true,
    allowMessages: true,
    photoAfterMatch: false
};

const DEFAULT_PURCHASE = {
    active: false,
    package: "Free",
    price: 0,
    currency: "USD",
    paymentMethod: "",
    activatedAt: null,
    expiresAt: null
};

/* =========================================================
   DEMO PROFILES
   ========================================================= */

const DEMO_PROFILES = [
    {
        id: "demo_1",
        fullName: "Ayesha",
        age: 27,
        gender: "female",
        country: "Saudi Arabia",
        city: "Riyadh",
        education: "Bachelor",
        profession: "Teacher",
        maritalStatus: "never_married",
        religiousLevel: "practicing",
        religion: "islam",
        sect: "sunni",
        seriousIntent: true,
        about: "Looking for a respectful and serious marriage."
    },
    {
        id: "demo_2",
        fullName: "Maryam",
        age: 25,
        gender: "female",
        country: "Pakistan",
        city: "Lahore",
        education: "Master's",
        profession: "Designer",
        maritalStatus: "never_married",
        religiousLevel: "practicing",
        religion: "islam",
        sect: "sunni",
        seriousIntent: true,
        about: "Family oriented and serious about marriage."
    },
    {
        id: "demo_3",
        fullName: "Fatima",
        age: 29,
        gender: "female",
        country: "UAE",
        city: "Dubai",
        education: "Bachelor",
        profession: "Accountant",
        maritalStatus: "never_married",
        religiousLevel: "moderate",
        religion: "islam",
        sect: "shia",
        seriousIntent: true,
        about: "Interested in a respectful and genuine relationship."
    },
    {
        id: "demo_4",
        fullName: "Omar",
        age: 30,
        gender: "male",
        country: "Saudi Arabia",
        city: "Jeddah",
        education: "Bachelor",
        profession: "Engineer",
        maritalStatus: "never_married",
        religiousLevel: "practicing",
        religion: "islam",
        sect: "sunni",
        seriousIntent: true,
        about: "Serious about finding a compatible life partner."
    },
    {
        id: "demo_5",
        fullName: "Ahmed",
        age: 32,
        gender: "male",
        country: "Pakistan",
        city: "Islamabad",
        education: "Master's",
        profession: "Software Engineer",
        maritalStatus: "never_married",
        religiousLevel: "practicing",
        religion: "islam",
        sect: "sunni",
        seriousIntent: true,
        about: "Looking for a serious halal marriage."
    }
];

let currentSwipeProfileId = null;
let currentChatProfileId = null;

/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Save error:", error);
        alert(t("Unable to save this information on this device."));
    }
}

function load(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch (error) {
        console.error("Storage error:", error);
        return fallback;
    }
}

function remove(key) {
    localStorage.removeItem(key);
}

function generateId(prefix = "id") {
    return (
        prefix +
        "_" +
        Date.now().toString(36) +
        "_" +
        Math.random().toString(36).substring(2, 8)
    );
}

function todayKey() {
    return new Date().toISOString().slice(0, 10);
}

function getCurrentUser() {
    return load(STORAGE.USER, null);
}

function isLoggedIn() {
    return !!getCurrentUser();
}

/* =========================================================
   TRANSLATION ENGINE
   ========================================================= */

const TRANSLATIONS = {

en: {
    "Halal Rishta":"Halal Rishta",
    "Create Account":"Create Account",
    "Login":"Login",
    "Back":"Back",
    "Full Name":"Full Name",
    "Email":"Email",
    "Password":"Password",
    "Already have an account? Login":"Already have an account? Login",
    "Create a new account":"Create a new account",
    "My Account":"My Account",
    "Free":"Free",
    "Your Plan":"Your Plan",
    "30 daily swipes":"30 daily swipes",
    "Upgrade to Rishta Plus":"Upgrade to Rishta Plus",
    "Today's Activity":"Today's Activity",
    "Swipes:":"Swipes:",
    "Super Likes:":"Super Likes:",
    "Profile":"Profile",
    "Swipe Rishtas":"Swipe Rishtas",
    "Photos":"Photos",
    "Find Rishta":"Find Rishta",
    "Who Liked Me":"Who Liked Me",
    "My Matches":"My Matches",
    "Settings":"Settings",
    "Privacy":"Privacy",
    "App Settings":"App Settings",
    "Manage Purchases":"Manage Purchases",
    "Rishta Plus":"Rishta Plus",
    "Custom Icon":"Custom Icon",
    "Wali / Guardian":"Wali / Guardian",
    "Logout":"Logout",
    "Discover Rishtas":"Discover Rishtas",
    "Pass":"Pass",
    "Like":"Like",
    "Super Like":"Super Like",
    "Save Profile":"Save Profile",
    "Save Settings":"Save Settings",
    "Save Privacy Settings":"Save Privacy Settings",
    "Save Guardian":"Save Guardian",
    "Save Custom Icon":"Save Custom Icon",
    "Manage Purchases":"Manage Purchases",
    "View Rishta Plus":"View Rishta Plus",
    "$2 / month":"$2 / month",
    "Send Message":"Send Message",
    "Halal Icebreaker":"Halal Icebreaker",
    "Search":"Search",
    "Male":"Male",
    "Female":"Female",
    "Gender":"Gender",
    "Country":"Country",
    "City":"City",
    "Education":"Education",
    "Profession":"Profession",
    "Marital Status":"Marital Status",
    "Religious Level":"Religious Level",
    "Phone":"Phone",
    "About me":"About me",
    "Notifications":"Notifications",
    "Dark Mode":"Dark Mode",
    "Profile Visibility":"Profile Visibility",
    "Members Only":"Members Only",
    "Private":"Private",
    "Public":"Public",
    "Show online status":"Show online status",
    "Allow messages":"Allow messages",
    "Show photos only after matching":"Show photos only after matching",
    "Guardian Name":"Guardian Name",
    "Guardian Email":"Guardian Email",
    "Write a respectful message...":"Write a respectful message...",
    "No active subscription.":"No active subscription.",
    "Current plan:":"Current plan:",
    "Unlimited Swipes":"Unlimited Swipes",
    "Religion + Sect Filters":"Religion + Sect Filters",
    "Marriage Intent Badge":"Marriage Intent Badge",
    "5 Super Likes / day":"5 Super Likes / day",
    "Wali / Guardian Option":"Wali / Guardian Option",
    "Photo Privacy":"Photo Privacy",
    "See Who Liked You":"See Who Liked You",
    "Voice Notes":"Voice Notes",
    "Halal Icebreakers":"Halal Icebreakers",
    "1 Friday Boost / month":"1 Friday Boost / month",
    "Verification Badge":"Verification Badge",
    "Rewind":"Rewind",
    "No Ads":"No Ads",
    "Save Language":"Save Language"
},

ar: {
    "Create Account":"إنشاء حساب",
    "Login":"تسجيل الدخول",
    "Back":"رجوع",
    "Full Name":"الاسم الكامل",
    "Email":"البريد الإلكتروني",
    "Password":"كلمة المرور",
    "Already have an account? Login":"لديك حساب بالفعل؟ تسجيل الدخول",
    "Create a new account":"إنشاء حساب جديد",
    "My Account":"حسابي",
    "Free":"مجاني",
    "Your Plan":"خطتك",
    "30 daily swipes":"30 إعجاباً يومياً",
    "Upgrade to Rishta Plus":"الترقية إلى Rishta Plus",
    "Today's Activity":"نشاط اليوم",
    "Profile":"الملف الشخصي",
    "Swipe Rishtas":"تصفح الزيجات",
    "Photos":"الصور",
    "Find Rishta":"ابحث عن شريك",
    "Who Liked Me":"من أعجب بي",
    "My Matches":"تطابقاتي",
    "Settings":"الإعدادات",
    "Privacy":"الخصوصية",
    "App Settings":"إعدادات التطبيق",
    "Manage Purchases":"إدارة المشتريات",
    "Rishta Plus":"Rishta Plus",
    "Custom Icon":"الأيقونة المخصصة",
    "Wali / Guardian":"الولي / الوصي",
    "Logout":"تسجيل الخروج",
    "Discover Rishtas":"اكتشف الزيجات",
    "Pass":"تخطي",
    "Like":"إعجاب",
    "Super Like":"إعجاب مميز",
    "Save Profile":"حفظ الملف",
    "Save Settings":"حفظ الإعدادات",
    "Save Privacy Settings":"حفظ إعدادات الخصوصية",
    "Save Guardian":"حفظ بيانات الولي",
    "Send Message":"إرسال رسالة",
    "Search":"بحث",
    "Male":"ذكر",
    "Female":"أنثى",
    "Gender":"الجنس",
    "Country":"الدولة",
    "City":"المدينة",
    "Education":"التعليم",
    "Profession":"المهنة",
    "Marital Status":"الحالة الاجتماعية",
    "Religious Level":"المستوى الديني",
    "Phone":"الهاتف",
    "About me":"نبذة عني",
    "Notifications":"الإشعارات",
    "Dark Mode":"الوضع الداكن",
    "Profile Visibility":"ظهور الملف الشخصي",
    "Members Only":"للأعضاء فقط",
    "Private":"خاص",
    "Public":"عام",
    "Show online status":"إظهار حالة الاتصال",
    "Allow messages":"السماح بالرسائل",
    "No active subscription.":"لا يوجد اشتراك نشط.",
    "$2 / month":"2 دولار / شهر"
},

es: {
    "Create Account":"Crear cuenta",
    "Login":"Iniciar sesión",
    "Back":"Atrás",
    "Full Name":"Nombre completo",
    "Email":"Correo electrónico",
    "Password":"Contraseña",
    "My Account":"Mi cuenta",
    "Free":"Gratis",
    "Your Plan":"Tu plan",
    "Profile":"Perfil",
    "Photos":"Fotos",
    "Settings":"Configuración",
    "Privacy":"Privacidad",
    "Logout":"Cerrar sesión",
    "Pass":"Pasar",
    "Like":"Me gusta",
    "Super Like":"Super Like",
    "Save Profile":"Guardar perfil",
    "Save Settings":"Guardar configuración",
    "Search":"Buscar",
    "Male":"Hombre",
    "Female":"Mujer",
    "Gender":"Género",
    "Country":"País",
    "City":"Ciudad",
    "Education":"Educación",
    "Profession":"Profesión",
    "Marital Status":"Estado civil",
    "Religious Level":"Nivel religioso",
    "Phone":"Teléfono",
    "About me":"Sobre mí",
    "Notifications":"Notificaciones",
    "Dark Mode":"Modo oscuro",
    "$2 / month":"2 $ / mes"
},

it: {
    "Create Account":"Crea account",
    "Login":"Accedi",
    "Back":"Indietro",
    "Full Name":"Nome completo",
    "Email":"Email",
    "Password":"Password",
    "My Account":"Il mio account",
    "Free":"Gratis",
    "Your Plan":"Il tuo piano",
    "Profile":"Profilo",
    "Photos":"Foto",
    "Settings":"Impostazioni",
    "Privacy":"Privacy",
    "Logout":"Esci",
    "Pass":"Ignora",
    "Like":"Mi piace",
    "Super Like":"Super Like",
    "Save Profile":"Salva profilo",
    "Save Settings":"Salva impostazioni",
    "Search":"Cerca",
    "Male":"Uomo",
    "Female":"Donna",
    "Country":"Paese",
    "City":"Città",
    "Education":"Istruzione",
    "Profession":"Professione",
    "Phone":"Telefono",
    "About me":"Su di me",
    "Notifications":"Notifiche",
    "Dark Mode":"Modalità scura",
    "$2 / month":"2 $ / mese"
       "Password":"Nenosiri",
    "My Account":"Akaunti Yangu",
    "Free":"Bure",
    "Profile":"Wasifu",
    "Photos":"Picha",
    "Settings":"Mipangilio",
    "Privacy":"Faragha",
    "Logout":"Ondoka",
    "Pass":"Ruka",
    "Like":"Penda",
    "Super Like":"Penda Zaidi",
    "Search":"Tafuta",
    "Male":"Mwanaume",
    "Female":"Mwanamke",
    "Country":"Nchi",
    "City":"Jiji",
    "Education":"Elimu",
    "Profession":"Kazi",
    "Notifications":"Arifa",
    "Dark Mode":"Hali ya Giza",
    "$2 / month":"$2 / mwezi"
},

ha: {
    "Create Account":"Ƙirƙiri Asusu",
    "Login":"Shiga",
    "Back":"Koma",
    "Full Name":"Cikakken Suna",
    "Email":"Imel",
    "Password":"Kalmar sirri",
    "My Account":"Asusuna",
    "Free":"Kyauta",
    "Profile":"Bayani",
    "Photos":"Hotuna",
    "Settings":"Saituna",
    "Privacy":"Sirri",
    "Logout":"Fita",
    "Pass":"Tsallake",
    "Like":"So",
    "Super Like":"Babban So",
    "Search":"Nema",
    "Male":"Namiji",
    "Female":"Mace",
    "Country":"Ƙasa",
    "City":"Birni",
    "Education":"Ilimi",
    "Profession":"Sana'a",
    "Notifications":"Sanarwa",
    "Dark Mode":"Yanayin Duhu",
    "$2 / month":"$2 / wata"
},

bn: {
    "Create Account":"অ্যাকাউন্ট তৈরি করুন",
    "Login":"লগইন",
    "Back":"ফিরে যান",
    "Full Name":"পূর্ণ নাম",
    "Email":"ইমেইল",
    "Password":"পাসওয়ার্ড",
    "My Account":"আমার অ্যাকাউন্ট",
    "Free":"ফ্রি",
    "Profile":"প্রোফাইল",
    "Photos":"ছবি",
    "Settings":"সেটিংস",
    "Privacy":"গোপনীয়তা",
    "Logout":"লগআউট",
    "Pass":"এড়িয়ে যান",
    "Like":"পছন্দ",
    "Super Like":"সুপার লাইক",
    "Search":"অনুসন্ধান",
    "Male":"পুরুষ",
    "Female":"মহিলা",
    "Country":"দেশ",
    "City":"শহর",
    "Education":"শিক্ষা",
    "Profession":"পেশা",
    "Notifications":"বিজ্ঞপ্তি",
    "Dark Mode":"ডার্ক মোড",
    "$2 / month":"$2 / মাস"
},

fi: {
    "Create Account":"Luo tili",
    "Login":"Kirjaudu",
    "Back":"Takaisin",
    "Full Name":"Koko nimi",
    "Email":"Sähköposti",
    "Password":"Salasana",
    "My Account":"Oma tili",
    "Free":"Ilmainen",
    "Profile":"Profiili",
    "Photos":"Kuvat",
    "Settings":"Asetukset",
    "Privacy":"Yksityisyys",
    "Logout":"Kirjaudu ulos",
    "Pass":"Ohita",
    "Like":"Tykkää",
    "Super Like":"Super Tykkäys",
    "Search":"Haku",
    "Male":"Mies",
    "Female":"Nainen",
    "Country":"Maa",
    "City":"Kaupunki",
    "Education":"Koulutus",
    "Profession":"Ammatti",
    "Notifications":"Ilmoitukset",
    "Dark Mode":"Tumma tila",
    "$2 / month":"2 $ / kuukausi"
},

cs: {
    "Create Account":"Vytvořit účet",
    "Login":"Přihlásit se",
    "Back":"Zpět",
    "Full Name":"Celé jméno",
    "Email":"E-mail",
    "Password":"Heslo",
    "My Account":"Můj účet",
    "Free":"Zdarma",
    "Profile":"Profil",
    "Photos":"Fotografie",
    "Settings":"Nastavení",
    "Privacy":"Soukromí",
    "Logout":"Odhlásit se",
    "Pass":"Přeskočit",
    "Like":"To se mi líbí",
    "Super Like":"Super Like",
    "Search":"Hledat",
    "Male":"Muž",
    "Female":"Žena",
    "Country":"Země",
    "City":"Město",
    "Education":"Vzdělání",
    "Profession":"Povolání",
    "Notifications":"Oznámení",
    "Dark Mode":"Tmavý režim",
    "$2 / month":"2 $ / měsíc"
},

sl: {
    "Create Account":"Ustvari račun",
    "Login":"Prijava",
    "Back":"Nazaj",
    "Full Name":"Polno ime",
    "Email":"E-pošta",
    "Password":"Geslo",
    "My Account":"Moj račun",
    "Free":"Brezplačno",
    "Profile":"Profil",
    "Photos":"Fotografije",
    "Settings":"Nastavitve",
    "Privacy":"Zasebnost",
    "Logout":"Odjava",
    "Pass":"Preskoči",
    "Like":"Všeč mi je",
    "Super Like":"Super všeček",
    "Search":"Išči",
    "Male":"Moški",
    "Female":"Ženska",
    "Country":"Država",
    "City":"Mesto",
    "Education":"Izobrazba",
    "Profession":"Poklic",
    "Notifications":"Obvestila",
    "Dark Mode":"Temni način",
    "$2 / month":"2 $ / mesec"
},

sk: {
    "Create Account":"Vytvoriť účet",
    "Login":"Prihlásiť sa",
    "Back":"Späť",
    "Full Name":"Celé meno",
    "Email":"E-mail",
    "Password":"Heslo",
    "My Account":"Môj účet",
    "Free":"Zdarma",
    "Profile":"Profil",
    "Photos":"Fotografie",
    "Settings":"Nastavenia",
    "Privacy":"Súkromie",
    "Logout":"Odhlásiť sa",
    "Pass":"Preskočiť",
    "Like":"Páči sa mi",
    "Super Like":"Super Like",
    "Search":"Hľadať",
    "Male":"Muž",
    "Female":"Žena",
    "Country":"Krajina",
    "City":"Mesto",
    "Education":"Vzdelanie",
    "Profession":"Povolanie",
    "Notifications":"Oznámenia",
    "Dark Mode":"Tmavý režim",
    "$2 / month":"2 $ / mesiac"
},

bg: {
    "Create Account":"Създаване на акаунт",
    "Login":"Вход",
    "Back":"Назад",
    "Full Name":"Пълно име",
    "Email":"Имейл",
    "Password":"Парола",
    "My Account":"Моят акаунт",
    "Free":"Безплатно",
    "Profile":"Профил",
    "Photos":"Снимки",
    "Settings":"Настройки",
    "Privacy":"Поверителност",
    "Logout":"Изход",
    "Pass":"Пропусни",
    "Like":"Харесвам",
    "Super Like":"Супер харесване",
    "Search":"Търсене",
    "Male":"Мъж",
    "Female":"Жена",
    "Country":"Държава",
    "City":"Град",
    "Education":"Образование",
    "Profession":"Професия",
    "Notifications":"Известия",
    "Dark Mode":"Тъмен режим",
    "$2 / month":"2 $ / месец"
},

hu: {
    "Create Account":"Fiók létrehozása",
    "Login":"Bejelentkezés",
    "Back":"Vissza",
    "Full Name":"Teljes név",
    "Email":"E-mail",
    "Password":"Jelszó",
    "My Account":"Fiókom",
    "Free":"Ingyenes",
    "Profile":"Profil",
    "Photos":"Fotók",
    "Settings":"Beállítások",
    "Privacy":"Adatvédelem",
    "Logout":"Kijelentkezés",
    "Pass":"Kihagyás",
    "Like":"Tetszik",
    "Super Like":"Szuper kedvelés",
    "Search":"Keresés",
    "Male":"Férfi",
    "Female":"Nő",
    "Country":"Ország",
    "City":"Város",
    "Education":"Oktatás",
    "Profession":"Foglalkozás",
    "Notifications":"Értesítések",
    "Dark Mode":"Sötét mód",
    "$2 / month":"2 $ / hónap"
},

uz: {
    "Create Account":"Hisob yaratish",
    "Login":"Kirish",
    "Back":"Orqaga",
    "Full Name":"To‘liq ism",
    "Email":"Elektron pochta",
    "Password":"Parol",
    "My Account":"Mening hisobim",
    "Free":"Bepul",
    "Profile":"Profil",
    "Photos":"Rasmlar",
    "Settings":"Sozlamalar",
    "Privacy":"Maxfiylik",
    "Logout":"Chiqish",
    "Pass":"O‘tkazib yuborish",
    "Like":"Yoqdi",
    "Super Like":"Super yoqdi",
    "Search":"Qidirish",
    "Male":"Erkak",
    "Female":"Ayol",
    "Country":"Mamlakat",
    "City":"Shahar",
    "Education":"Ta’lim",
    "Profession":"Kasb",
    "Notifications":"Bildirishnomalar",
    "Dark Mode":"Qorong‘i rejim",
    "$2 / month":"$2 / oy"
},

de: {
    "Create Account":"Konto erstellen",
    "Login":"Anmelden",
    "Back":"Zurück",
    "Full Name":"Vollständiger Name",
    "Email":"E-Mail",
    "Password":"Passwort",
    "My Account":"Mein Konto",
    "Free":"Kostenlos",
    "Profile":"Profil",
    "Photos":"Fotos",
    "Settings":"Einstellungen",
    "Privacy":"Datenschutz",
    "Logout":"Abmelden",
    "Pass":"Überspringen",
    "Like":"Gefällt mir",
    "Super Like":"Super Like",
    "Search":"Suchen",
    "Male":"Männlich",
    "Female":"Weiblich",
    "Country":"Land",
    "City":"Stadt",
    "Education":"Bildung",
    "Profession":"Beruf",
    "Notifications":"Benachrichtigungen",
    "Dark Mode":"Dunkelmodus",
    "$2 / month":"2 $ / Monat"
}

};

/* =========================================================
   TRANSLATION FUNCTIONS
   ========================================================= */

function getLanguage() {
    const saved = localStorage.getItem(STORAGE.LANGUAGE);

    if (
        saved &&
        HALAL_RISHTA_LANGUAGES.includes(saved)
    ) {
        return saved;
    }

    return "en";
}

function t(text) {
    const language = getLanguage();

    if (
        TRANSLATIONS[language] &&
        TRANSLATIONS[language][text]
    ) {
        return TRANSLATIONS[language][text];
    }

    if (
        TRANSLATIONS.en &&
        TRANSLATIONS.en[text]
    ) {
        return TRANSLATIONS.en[text];
    }

    return text;
}

function applyTranslations() {
    const language = getLanguage();

    document.documentElement.lang = language;

    if (
        language === "ar" ||
        language === "fa"
    ) {
        document.documentElement.dir = "rtl";
    } else {
        document.documentElement.dir = "ltr";
    }

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");

        if (key) {
            element.textContent = t(key);
        }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {
        const key = element.getAttribute("data-i18n-placeholder");

        if (key) {
            element.placeholder = t(key);
        }
    });

    document.querySelectorAll("[data-i18n-title]").forEach(element => {
        const key = element.getAttribute("data-i18n-title");

        if (key) {
            element.title = t(key);
        }
    });
}

function changeLanguage(language) {

    if (
        !HALAL_RISHTA_LANGUAGES.includes(language)
    ) {
        language = "en";
    }

    localStorage.setItem(
        STORAGE.LANGUAGE,
        language
    );

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    settings.language = language;

    save(
        STORAGE.SETTINGS,
        settings
    );

    applyTranslations();

    const select =
        document.getElementById("languageSelect");

    if (select) {
        select.value = language;
    }
}

/* =========================================================
   INITIALIZE LANGUAGE SELECT
   ========================================================= */

function initializeLanguageSelect() {

    const select =
        document.getElementById("languageSelect");

    if (!select) {
        return;
    }

    select.innerHTML = "";

    HALAL_RISHTA_LANGUAGES.forEach(language => {

        const option =
            document.createElement("option");

        option.value = language;

        option.textContent =
            LANGUAGE_NAMES[language] ||
            language;

        select.appendChild(option);
    });

    select.value = getLanguage();

    select.addEventListener(
        "change",
        function() {
            changeLanguage(this.value);
        }
    );
}

/* =========================================================
   ACCOUNT HELPERS
   ========================================================= */

function getProfile() {

    return load(
        STORAGE.PROFILE,
        {}
    );
}

function saveProfileData(profile) {

    save(
        STORAGE.PROFILE,
        profile
    );
}

function getPhotos() {

    return load(
        STORAGE.PHOTOS,
        []
    );
}

function savePhotos(photos) {

    save(
        STORAGE.PHOTOS,
        photos
    );
}

/* =========================================================
   PAGE HELPERS
   ========================================================= */

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const target =
        document.getElementById(pageId);

    if (!target) {
        console.warn(
            "Page not found:",
            pageId
        );
        return;
    }

    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

/* =========================================================
   LOGIN / REGISTER UI
   ========================================================= */

function openLogin() {
    showPage("login");
}

function openRegister() {
    showPage("register");
}

function logoutUser() {

    localStorage.removeItem(
        STORAGE.USER
    );

    showPage("home");
}

function loginUser() {

    const email =
        document.getElementById("loginEmail");

    const password =
        document.getElementById("loginPassword");

    if (!email || !password) {
        alert(
            t("Login form is not available.")
        );
        return;
    }

    const emailValue =
        email.value.trim().toLowerCase();

    const passwordValue =
        password.value;

    if (!emailValue) {
        alert(
            t("Please enter your email.")
        );
        email.focus();
        return;
    }

    if (!passwordValue) {
        alert(
            t("Please enter your password.")
        );
        password.focus();
        return;
    }

    const account =
        load(
            STORAGE.ACCOUNT,
            null
        );

    if (!account) {

        alert(
            t(
                "No account found. Please create an account first."
            )
        );

        showPage("register");
        return;
    }

    if (
        account.email !== emailValue ||
        account.password !== passwordValue
    ) {

        alert(
            t(
                "Incorrect email or password."
            )
        );

        return;
    }

    save(
        STORAGE.USER,
        {
            email: account.email,
            fullName: account.fullName
        }
    );

    showPage("app");

    refreshDashboard();
}

/* =========================================================
   REGISTER
   ========================================================= */

function createAccount() {

    const fullName =
        document.getElementById("registerName");

    const email =
        document.getElementById("registerEmail");

    const password =
        document.getElementById("registerPassword");

    if (
        !fullName ||
        !email ||
        !password
    ) {
        alert(
            t(
                "Registration form is not available."
            )
        );
        return;
    }

    const nameValue =
        fullName.value.trim();

    const emailValue =
        email.value.trim().toLowerCase();

    const passwordValue =
        password.value;

    if (!nameValue) {
        alert(
            t("Please enter your full name.")
        );
        fullName.focus();
        return;
    }

    if (
        !emailValue ||
        !emailValue.includes("@")
    ) {
        alert(
            t("Please enter a valid email.")
        );
        email.focus();
        return;
    }

    if (
        passwordValue.length < 6
    ) {
        alert(
            t(
                "Password must be at least 6 characters."
            )
        );
        password.focus();
        return;
    }

    const account = {
        fullName: nameValue,
        email: emailValue,
        password: passwordValue,
        createdAt:
            new Date().toISOString()
    };

    save(
        STORAGE.ACCOUNT,
        account
    );

    save(
        STORAGE.USER,
        {
            email: emailValue,
            fullName: nameValue
        }
    );

    save(
        STORAGE.PROFILE,
        {
            fullName: nameValue
        }
    );

    save(
        STORAGE.SETTINGS,
        {
            ...DEFAULT_SETTINGS
        }
    );

    save(
        STORAGE.PRIVACY,
        {
            ...DEFAULT_PRIVACY
        }
    );

    save(
        STORAGE.PURCHASE,
        {
            ...DEFAULT_PURCHASE
        }
    );

    save(
        STORAGE.PHOTOS,
        []
    );

    alert(
        t(
            "Account created successfully."
        )
    );

    showPage("app");

    refreshDashboard();
}
    "Password":"Nenosiri",
    "My Account":"Akaunti Yangu",
    "Free":"Bure",
    "Profile":"Wasifu",
    "Photos":"Picha",
    "Settings":"Mipangilio",
    "Privacy":"Faragha",
    "Logout":"Ondoka",
    "Pass":"Ruka",
    "Like":"Penda",
    "Super Like":"Penda Sana",
    "Search":"Tafuta",
    "Male":"Mwanaume",
    "Female":"Mwanamke",
    "Country":"Nchi",
    "City":"Jiji",
    "Education":"Elimu",
    "Profession":"Kazi",
    "Notifications":"Arifa",
    "Dark Mode":"Hali ya Giza",
    "$2 / month":"$2 / mwezi"
},

ha: {
    "Create Account":"Ƙirƙiri Asusun",
    "Login":"Shiga",
    "Back":"Koma",
    "Full Name":"Cikakken Suna",
    "Email":"Imel",
    "Password":"Kalmar sirri",
    "My Account":"Asusuna",
    "Free":"Kyauta",
    "Profile":"Bayani",
    "Photos":"Hotuna",
    "Settings":"Saituna",
    "Privacy":"Sirri",
    "Logout":"Fita",
    "Pass":"Tsallake",
    "Like":"So",
    "Super Like":"Babban So",
    "Search":"Nema",
    "Male":"Namiji",
    "Female":"Mace",
    "Country":"Ƙasa",
    "City":"Birni",
    "Education":"Ilimi",
    "Profession":"Sana'a",
    "Notifications":"Sanarwa",
    "Dark Mode":"Yanayin Duhu",
    "$2 / month":"$2 / wata"
},

bn: {
    "Create Account":"অ্যাকাউন্ট তৈরি করুন",
    "Login":"লগইন",
    "Back":"ফিরে যান",
    "Full Name":"পুরো নাম",
    "Email":"ইমেইল",
    "Password":"পাসওয়ার্ড",
    "My Account":"আমার অ্যাকাউন্ট",
    "Free":"ফ্রি",
    "Profile":"প্রোফাইল",
    "Photos":"ছবি",
    "Settings":"সেটিংস",
    "Privacy":"গোপনীয়তা",
    "Logout":"লগআউট",
    "Pass":"এড়িয়ে যান",
    "Like":"পছন্দ",
    "Super Like":"সুপার লাইক",
    "Search":"খুঁজুন",
    "Male":"পুরুষ",
    "Female":"মহিলা",
    "Country":"দেশ",
    "City":"শহর",
    "Education":"শিক্ষা",
    "Profession":"পেশা",
    "Notifications":"বিজ্ঞপ্তি",
    "Dark Mode":"ডার্ক মোড",
    "$2 / month":"$2 / মাস"
},

fi: {
    "Create Account":"Luo tili",
    "Login":"Kirjaudu",
    "Back":"Takaisin",
    "Full Name":"Koko nimi",
    "Email":"Sähköposti",
    "Password":"Salasana",
    "My Account":"Oma tili",
    "Free":"Ilmainen",
    "Profile":"Profiili",
    "Photos":"Kuvat",
    "Settings":"Asetukset",
    "Privacy":"Yksityisyys",
    "Logout":"Kirjaudu ulos",
    "Pass":"Ohita",
    "Like":"Tykkää",
    "Super Like":"Super Like",
    "Search":"Hae",
    "Male":"Mies",
    "Female":"Nainen",
    "Country":"Maa",
    "City":"Kaupunki",
    "Education":"Koulutus",
    "Profession":"Ammatti",
    "Notifications":"Ilmoitukset",
    "Dark Mode":"Tumma tila",
    "$2 / month":"2 $ / kuukausi"
},

cs: {
    "Create Account":"Vytvořit účet",
    "Login":"Přihlásit se",
    "Back":"Zpět",
    "Full Name":"Celé jméno",
    "Email":"E-mail",
    "Password":"Heslo",
    "My Account":"Můj účet",
    "Free":"Zdarma",
    "Profile":"Profil",
    "Photos":"Fotky",
    "Settings":"Nastavení",
    "Privacy":"Soukromí",
    "Logout":"Odhlásit se",
    "Pass":"Přeskočit",
    "Like":"To se mi líbí",
    "Super Like":"Super Like",
    "Search":"Hledat",
    "Male":"Muž",
    "Female":"Žena",
    "Country":"Země",
    "City":"Město",
    "Education":"Vzdělání",
    "Profession":"Povolání",
    "Notifications":"Oznámení",
    "Dark Mode":"Tmavý režim",
    "$2 / month":"2 $ / měsíc"
},

sl: {
    "Create Account":"Ustvari račun",
    "Login":"Prijava",
    "Back":"Nazaj",
    "Full Name":"Polno ime",
    "Email":"E-pošta",
    "Password":"Geslo",
    "My Account":"Moj račun",
    "Free":"Brezplačno",
    "Profile":"Profil",
    "Photos":"Fotografije",
    "Settings":"Nastavitve",
    "Privacy":"Zasebnost",
    "Logout":"Odjava",
    "Pass":"Preskoči",
    "Like":"Všeč mi je",
    "Super Like":"Super všeček",
    "Search":"Išči",
    "Male":"Moški",
    "Female":"Ženska",
    "Country":"Država",
    "City":"Mesto",
    "Education":"Izobrazba",
    "Profession":"Poklic",
    "Notifications":"Obvestila",
    "Dark Mode":"Temni način",
    "$2 / month":"2 $ / mesec"
},

sk: {
    "Create Account":"Vytvoriť účet",
    "Login":"Prihlásiť sa",
    "Back":"Späť",
    "Full Name":"Celé meno",
    "Email":"E-mail",
    "Password":"Heslo",
    "My Account":"Môj účet",
    "Free":"Zdarma",
    "Profile":"Profil",
    "Photos":"Fotografie",
    "Settings":"Nastavenia",
    "Privacy":"Súkromie",
    "Logout":"Odhlásiť sa",
    "Pass":"Preskočiť",
    "Like":"Páči sa mi",
    "Super Like":"Super Like",
    "Search":"Hľadať",
    "Male":"Muž",
    "Female":"Žena",
    "Country":"Krajina",
    "City":"Mesto",
    "Education":"Vzdelanie",
    "Profession":"Povolanie",
    "Notifications":"Oznámenia",
    "Dark Mode":"Tmavý režim",
    "$2 / month":"2 $ / mesiac"
},

bg: {
    "Create Account":"Създай акаунт",
    "Login":"Вход",
    "Back":"Назад",
    "Full Name":"Пълно име",
    "Email":"Имейл",
    "Password":"Парола",
    "My Account":"Моят акаунт",
    "Free":"Безплатно",
    "Profile":"Профил",
    "Photos":"Снимки",
    "Settings":"Настройки",
    "Privacy":"Поверителност",
    "Logout":"Изход",
    "Pass":"Пропусни",
    "Like":"Харесвам",
    "Super Like":"Супер харесване",
    "Search":"Търси",
    "Male":"Мъж",
    "Female":"Жена",
    "Country":"Държава",
    "City":"Град",
    "Education":"Образование",
    "Profession":"Професия",
    "Notifications":"Известия",
    "Dark Mode":"Тъмен режим",
    "$2 / month":"2 $ / месец"
},

hu: {
    "Create Account":"Fiók létrehozása",
    "Login":"Bejelentkezés",
    "Back":"Vissza",
    "Full Name":"Teljes név",
    "Email":"E-mail",
    "Password":"Jelszó",
    "My Account":"Fiókom",
    "Free":"Ingyenes",
    "Profile":"Profil",
    "Photos":"Fotók",
    "Settings":"Beállítások",
    "Privacy":"Adatvédelem",
    "Logout":"Kijelentkezés",
    "Pass":"Kihagyás",
    "Like":"Tetszik",
    "Super Like":"Szuper kedvelés",
    "Search":"Keresés",
    "Male":"Férfi",
    "Female":"Nő",
    "Country":"Ország",
    "City":"Város",
    "Education":"Oktatás",
    "Profession":"Foglalkozás",
    "Notifications":"Értesítések",
    "Dark Mode":"Sötét mód",
    "$2 / month":"2 $ / hónap"
},

uz: {
    "Create Account":"Hisob yaratish",
    "Login":"Kirish",
    "Back":"Orqaga",
    "Full Name":"To‘liq ism",
    "Email":"Elektron pochta",
    "Password":"Parol",
    "My Account":"Mening hisobim",
    "Free":"Bepul",
    "Profile":"Profil",
    "Photos":"Rasmlar",
    "Settings":"Sozlamalar",
    "Privacy":"Maxfiylik",
    "Logout":"Chiqish",
    "Pass":"O‘tkazib yuborish",
    "Like":"Yoqdi",
    "Super Like":"Super yoqdi",
    "Search":"Qidirish",
    "Male":"Erkak",
    "Female":"Ayol",
    "Country":"Mamlakat",
    "City":"Shahar",
    "Education":"Ta’lim",
    "Profession":"Kasb",
    "Notifications":"Bildirishnomalar",
    "Dark Mode":"Qorong‘i rejim",
    "$2 / month":"Oyiga 2 $"
},

de: {
    "Create Account":"Konto erstellen",
    "Login":"Anmelden",
    "Back":"Zurück",
    "Full Name":"Vollständiger Name",
    "Email":"E-Mail",
    "Password":"Passwort",
    "My Account":"Mein Konto",
    "Free":"Kostenlos",
    "Your Plan":"Dein Tarif",
    "Profile":"Profil",
    "Photos":"Fotos",
    "Settings":"Einstellungen",
    "Privacy":"Datenschutz",
    "Logout":"Abmelden",
    "Pass":"Überspringen",
    "Like":"Gefällt mir",
    "Super Like":"Super Like",
    "Save Profile":"Profil speichern",
    "Save Settings":"Einstellungen speichern",
    "Search":"Suchen",
    "Male":"Männlich",
    "Female":"Weiblich",
    "Country":"Land",
    "City":"Stadt",
    "Education":"Ausbildung",
    "Profession":"Beruf",
    "Notifications":"Benachrichtigungen",
    "Dark Mode":"Dunkler Modus",
    "$2 / month":"2 $ / Monat"
}

};

/* =========================================================
   TRANSLATION HELPERS
   ========================================================= */

function getCurrentLanguage() {
    const saved =
        localStorage.getItem(STORAGE.LANGUAGE) || "en";

    return HALAL_RISHTA_LANGUAGES.includes(saved)
        ? saved
        : "en";
}

function t(text) {
    const language = getCurrentLanguage();

    if (
        TRANSLATIONS[language] &&
        TRANSLATIONS[language][text]
    ) {
        return TRANSLATIONS[language][text];
    }

    if (
        TRANSLATIONS.en &&
        TRANSLATIONS.en[text]
    ) {
        return TRANSLATIONS.en[text];
    }

    return text;
}

/* =========================================================
   APPLY TRANSLATIONS
   ========================================================= */

function applyTranslations(language = getCurrentLanguage()) {

    if (!HALAL_RISHTA_LANGUAGES.includes(language)) {
        language = "en";
    }

    localStorage.setItem(
        STORAGE.LANGUAGE,
        language
    );

    document.documentElement.lang = language;

    if (
        language === "ar" ||
        language === "fa"
    ) {
        document.documentElement.dir = "rtl";
    } else {
        document.documentElement.dir = "ltr";
    }

    const selector =
        document.getElementById("languageSelect");

    if (selector) {
        selector.value = language;
    }

    /*
     * Translate visible text without destroying
     * buttons containing icons or child elements.
     */

    document
        .querySelectorAll(
            "h1,h2,h3,h4,h5,h6,p,label,button,li,option"
        )
        .forEach(element => {

            if (element.children.length === 0) {

                const original =
                    element.getAttribute(
                        "data-i18n-original"
                    ) ||
                    element.textContent.trim();

                if (original) {

                    element.setAttribute(
                        "data-i18n-original",
                        original
                    );

                    const translated =
                        t(original);

                    if (translated !== original) {
                        element.textContent =
                            translated;
                    }
                }
            }
        });

    /*
     * Placeholders
     */

    const placeholderMap = {
        "Full Name": "Full Name",
        "Email": "Email",
        "Password": "Password",
        "Country": "Country",
        "City": "City",
        "Education": "Education",
        "Profession": "Profession",
        "Phone": "Phone",
        "About me": "About me",
        "Guardian Name": "Guardian Name",
        "Guardian Email": "Guardian Email",
        "Write a respectful message...":
            "Write a respectful message...",
        "Country":
            "Country"
    };

    Object.keys(placeholderMap).forEach(
        key => {

            document
                .querySelectorAll(
                    `[placeholder="${key}"]`
                )
                .forEach(element => {

                    element.placeholder =
                        t(key);
                });
        }
    );

    /*
     * Document title
     */

    document.title =
        "Halal Rishta";

    window.currentLanguage = language;
}

/* =========================================================
   CHANGE LANGUAGE
   ========================================================= */

function changeLanguage(language) {

    if (
        !HALAL_RISHTA_LANGUAGES.includes(language)
    ) {
        language = "en";
    }

    localStorage.setItem(
        STORAGE.LANGUAGE,
        language
    );

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    settings.language = language;

    save(
        STORAGE.SETTINGS,
        settings
    );

    applyTranslations(language);
}
function isPremium() {

    const purchase =
        load(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );

    if (!purchase.active) {
        return false;
    }

    if (purchase.expiresAt) {
        return new Date(purchase.expiresAt) > new Date();
    }

    return true;
}

/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {
            page.classList.remove("active");
        });

    const page =
        document.getElementById(pageId);

    if (!page) {
        console.warn("Page not found:", pageId);
        return;
    }

    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    switch (pageId) {

        case "app":
            updateDashboard();
            break;

        case "swipe":
            loadSwipeProfile();
            break;

        case "likes":
            renderLikes();
            break;

        case "matches":
            renderMatches();
            break;

        case "chat":
            renderChat();
            break;

        case "photos":
            renderPhotos();
            break;

        case "purchases":
            openPurchases();
            break;

        case "guardian":
            loadGuardian();
            break;
    }

    setTimeout(() => {
        applyTranslations(getCurrentLanguage());
    }, 20);
}

/* =========================================================
   ACCOUNT CREATION
   ========================================================= */

function createAccount() {

    const form =
        document.querySelector("#register form");

    if (!form) return;

    const inputs =
        form.querySelectorAll("input");

    const fullName =
        inputs[0]?.value.trim() || "";

    const email =
        inputs[1]?.value.trim().toLowerCase() || "";

    const password =
        inputs[2]?.value || "";

    if (!fullName || !email || !password) {
        alert(t("Please complete all fields."));
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        alert(t("Please enter a valid email address."));
        return;
    }

    if (password.length < 6) {
        alert(
            t("Password must be at least 6 characters.")
        );
        return;
    }

    const existing =
        load(STORAGE.ACCOUNT, null);

    if (
        existing &&
        existing.email === email
    ) {
        alert(
            t("An account with this email already exists.")
        );

        showPage("login");
        return;
    }

    const account = {
        id: generateId("user"),
        fullName,
        email,
        password
    };

    save(
        STORAGE.ACCOUNT,
        account
    );

    save(
        STORAGE.USER,
        {
            id: account.id,
            fullName: account.fullName,
            email: account.email
        }
    );

    save(
        STORAGE.PROFILE,
        {
            id: account.id,
            fullName,
            age: "",
            gender: "",
            country: "",
            city: "",
            education: "",
            profession: "",
            maritalStatus: "",
            religiousLevel: "",
            phone: "",
            about: "",
            religion: "islam",
            sect: "",
            seriousIntent: false
        }
    );

    save(
        STORAGE.SETTINGS,
        {
            ...DEFAULT_SETTINGS,
            language: getCurrentLanguage()
        }
    );

    save(
        STORAGE.PRIVACY,
        DEFAULT_PRIVACY
    );

    save(
        STORAGE.PURCHASE,
        DEFAULT_PURCHASE
    );

    resetActivity();

    alert(
        t("Account created successfully.")
    );

    showPage("app");
}

/* =========================================================
   LOGIN
   ========================================================= */

function loginUser() {

    const form =
        document.querySelector("#login form");

    if (!form) return;

    const inputs =
        form.querySelectorAll("input");

    const email =
        inputs[0]?.value.trim().toLowerCase() || "";

    const password =
        inputs[1]?.value || "";

    const account =
        load(STORAGE.ACCOUNT, null);

    if (!account) {

        alert(
            t(
                "No account found. Please create an account first."
            )
        );

        showPage("register");
        return;
    }

    if (
        account.email !== email ||
        account.password !== password
    ) {

        alert(
            t("Incorrect email or password.")
        );

        return;
    }

    save(
        STORAGE.USER,
        {
            id: account.id,
            fullName: account.fullName,
            email: account.email
        }
    );

    if (!load(STORAGE.PROFILE)) {

        save(
            STORAGE.PROFILE,
            {
                id: account.id,
                fullName: account.fullName,
                age: "",
                gender: "",
                country: "",
                city: "",
                education: "",
                profession: "",
                maritalStatus: "",
                religiousLevel: "",
                phone: "",
                about: "",
                religion: "islam",
                sect: "",
                seriousIntent: false
            }
        );
    }

    alert(
        t("Login successful.")
    );

    showPage("app");
}

/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    remove(STORAGE.USER);

    currentSwipeProfileId = null;
    currentChatProfileId = null;

    showPage("home");
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

    const user =
        getCurrentUser();

    if (!user) {
        showPage("login");
        return;
    }

    const emailElement =
        document.getElementById(
            "dashboardEmail"
        );

    if (emailElement) {
        emailElement.textContent =
            user.email;
    }

    const premium =
        isPremium();

    document
        .querySelectorAll(
            "[data-package-status]"
        )
        .forEach(element => {

            element.textContent =
                premium
                    ? t("Rishta Plus")
                    : t("Free");
        });

    const planName =
        document.getElementById(
            "planName"
        );

    const planDescription =
        document.getElementById(
            "planDescription"
        );

    if (planName) {

        planName.textContent =
            premium
                ? t("Rishta Plus")
                : t("Free");
    }

    if (planDescription) {

        planDescription.textContent =
            premium
                ? "Unlimited daily swipes"
                : "30 daily swipes";
    }

    updateSwipeDisplay();
    updateSuperLikeDisplay();
}

/* =========================================================
   SWIPE DATA
   ========================================================= */

function getSwipeData() {

    const data =
        load(
            STORAGE.SWIPES,
            {
                date: todayKey(),
                count: 0
            }
        );

    if (data.date !== todayKey()) {

        return {
            date: todayKey(),
            count: 0
        };
    }

    return data;
}

function getSuperLikeData() {

    const data =
        load(
            STORAGE.SUPERLIKES,
            {
                date: todayKey(),
                count: 0
            }
        );

    if (data.date !== todayKey()) {

        return {
            date: todayKey(),
            count: 0
        };
    }

    return data;
}

/* =========================================================
   SWIPE DISPLAY
   ========================================================= */

function updateSwipeDisplay() {

    const data =
        getSwipeData();

    const text =
        isPremium()
            ? `${data.count} / Unlimited`
            : `${data.count} / 30`;

    const dashboard =
        document.getElementById(
            "swipeCount"
        );

    const swipePage =
        document.getElementById(
            "swipePageCount"
        );

    if (dashboard) {
        dashboard.textContent = text;
    }

    if (swipePage) {
        swipePage.textContent = text;
    }
}

function updateSuperLikeDisplay() {

    const data =
        getSuperLikeData();

    const text =
        isPremium()
            ? `${data.count} / 5`
            : `${data.count} / 0`;

    const dashboard =
        document.getElementById(
            "superLikeCount"
        );

    const swipePage =
        document.getElementById(
            "swipePageSuperLikes"
        );

    if (dashboard) {
        dashboard.textContent = text;
    }

    if (swipePage) {
        swipePage.textContent = text;
    }
}

/* =========================================================
   SWIPE LIMIT
   ========================================================= */

function canSwipe() {
       if (isPremium()) {
        return true;
    }

    const data =
        getSwipeData();

    if (data.count >= 30) {

        alert(
            t(
                "You have reached today's 30 free swipes. Upgrade to Rishta Plus for unlimited swipes."
            )
        );

        return false;
    }

    return true;
}

function recordSwipe() {

    const data =
        getSwipeData();

    data.count += 1;

    save(
        STORAGE.SWIPES,
        data
    );

    updateSwipeDisplay();
}

/* =========================================================
   SWIPE PROFILES
   ========================================================= */

function getSwipeProfiles() {

    const profile =
        load(
            STORAGE.PROFILE,
            {}
        );

    const liked =
        load(
            STORAGE.LIKES,
            []
        );

    const passed =
        load(
            STORAGE.PASSES,
            []
        );

    const excluded = [
        profile.id,
        ...liked.map(
            item => item.profileId
        ),
        ...passed.map(
            item => item.profileId
        )
    ];

    return DEMO_PROFILES.filter(
        person =>
            !excluded.includes(person.id)
    );
}

/* =========================================================
   LOAD SWIPE PROFILE
   ========================================================= */

function loadSwipeProfile() {

    const profiles =
        getSwipeProfiles();

    const card =
        document.getElementById(
            "swipeCard"
        );

    const name =
        document.getElementById(
            "swipeName"
        );

    const details =
        document.getElementById(
            "swipeDetails"
        );

    const about =
        document.getElementById(
            "swipeAbout"
        );

    const intent =
        document.getElementById(
            "swipeIntent"
        );

    const photo =
        document.getElementById(
            "swipePhoto"
        );

    if (!name) return;

    if (!profiles.length) {

        currentSwipeProfileId = null;

        name.textContent =
            t("No profiles available");

        details.textContent =
            t(
                "New compatible members will appear here."
            );

        about.textContent =
            t(
                "Try changing your search preferences or check again later."
            );

        if (photo) {
            photo.textContent = "👤";
        }

        if (intent) {
            intent.style.display = "none";
        }

        if (card) {
            card.classList.remove(
                "has-profile"
            );
        }

        updateSwipeDisplay();
        updateSuperLikeDisplay();

        return;
    }

    const profile =
        profiles[0];

    currentSwipeProfileId =
        profile.id;

    if (card) {
        card.classList.add(
            "has-profile"
        );
    }

    name.textContent =
        profile.fullName;

    details.textContent =
        `${profile.age} • ${profile.city}, ${profile.country} • ${profile.profession}`;

    about.textContent =
        profile.about ||
        t(
            "Looking for a serious marriage."
        );

    if (intent) {

        intent.style.display =
            profile.seriousIntent
                ? "inline-block"
                : "none";
    }

    if (photo) {

        photo.innerHTML =
            `<span style="font-size:64px;">👤</span>`;
    }

    updateSwipeDisplay();
    updateSuperLikeDisplay();
}

/* =========================================================
   SWIPE PASS
   ========================================================= */

function swipePass() {

    if (!currentSwipeProfileId) {
        loadSwipeProfile();
        return;
    }

    if (!canSwipe()) {
        return;
    }

    const profileId =
        currentSwipeProfileId;

    const passes =
        load(
            STORAGE.PASSES,
            []
        );

    passes.push({
        id: generateId("pass"),
        profileId,
        createdAt:
            new Date().toISOString()
    });

    save(
        STORAGE.PASSES,
        passes
    );

    recordSwipe();

    currentSwipeProfileId = null;

    loadSwipeProfile();
}

/* =========================================================
   SWIPE LIKE
   ========================================================= */

function swipeLike() {

    if (!currentSwipeProfileId) {
        loadSwipeProfile();
        return;
    }

    if (!canSwipe()) {
        return;
    }

    const profileId =
        currentSwipeProfileId;

    const likes =
        load(
            STORAGE.LIKES,
            []
        );

    if (
        !likes.some(
            item =>
                item.profileId ===
                profileId
        )
    ) {

        likes.push({
            id: generateId("like"),
            profileId,
            createdAt:
                new Date().toISOString()
        });

        save(
            STORAGE.LIKES,
            likes
        );
    }

    recordSwipe();

    createMatchIfNeeded(
        profileId
    );

    currentSwipeProfileId = null;

    loadSwipeProfile();

    alert(
        "❤️ " + t("Like") + " sent."
    );
}

/* =========================================================
   SWIPE SUPER LIKE
   ========================================================= */

function swipeSuperLike() {

    if (!currentSwipeProfileId) {
        loadSwipeProfile();
        return;
    }

    if (!isPremium()) {

        alert(
            t(
                "Super Likes are available with Rishta Plus."
            )
        );

        return;
    }

    const data =
        getSuperLikeData();

    if (data.count >= 5) {

        alert(
            t(
                "You have used today's 5 Super Likes."
            )
        );

        return;
    }

    if (!canSwipe()) {
        return;
    }

    data.count += 1;

    save(
        STORAGE.SUPERLIKES,
        data
    );

    recordSwipe();

    createMatchIfNeeded(
        currentSwipeProfileId
    );

    currentSwipeProfileId = null;

    updateSuperLikeDisplay();

    loadSwipeProfile();

    alert(
        "⭐ " + t("Super Like") + " sent."
    );
}

/* =========================================================
   SEARCH
   ========================================================= */

function searchProfiles() {

    const results =
        document.getElementById(
            "searchResults"
        );

    if (!results) return;

    const ageMin =
        parseInt(
            document.getElementById(
                "ageMin"
            )?.value
        ) || 18;

    const ageMax =
        parseInt(
            document.getElementById(
                "ageMax"
            )?.value
        ) || 100;

    const country =
        document
            .getElementById(
                "searchCountry"
            )
            ?.value
            .trim()
            .toLowerCase() || "";

    const city =
        document
            .getElementById(
                "searchCity"
            )
            ?.value
            .trim()
            .toLowerCase() || "";

    const religion =
        document.getElementById(
            "searchReligion"
        )?.value || "";

    const sect =
        document.getElementById(
            "searchSect"
        )?.value || "";

    const serious =
        document.getElementById(
            "seriousIntent"
        )?.checked || false;

    let profiles =
        getSwipeProfiles();

    profiles =
        profiles.filter(profile => {

            if (
                profile.age < ageMin ||
                profile.age > ageMax
            ) {
                return false;
            }

            if (
                country &&
                profile.country
                    .toLowerCase() !== country
            ) {
                return false;
            }

            if (
                city &&
                profile.city
                    .toLowerCase() !== city
            ) {
                return false;
            }

            if (
                religion &&
                profile.religion !== religion
            ) {
                return false;
            }

            if (
                sect &&
                profile.sect !== sect
            ) {
                return false;
            }

            if (
                serious &&
                !profile.seriousIntent
            ) {
                return false;
            }

            return true;
        });

    if (!profiles.length) {

        results.innerHTML = `
            <div class="card">
                <p>${escapeHTML(
                    t("No matching profiles found.")
                )}</p>
            </div>
        `;

        return;
    }

    results.innerHTML =
        profiles.map(
            profile => `

            <div class="result-card">

                <h3>
                    ${escapeHTML(
                        profile.fullName
                    )}
                                    </h3>

                <p>
                    ${profile.age} •
                    ${escapeHTML(
                        profile.city
                    )},
                    ${escapeHTML(
                        profile.country
                    )}
                </p>

                <p>
                    ${escapeHTML(
                        profile.profession ||
                        "Not specified"
                    )}
                </p>

                ${
                    profile.seriousIntent
                        ? `
                            <p>
                                💍 ${escapeHTML(
                                    t(
                                        "Serious Marriage Intent"
                                    )
                                )}
                            </p>
                        `
                        : ""
                }

                <p>
                    ${escapeHTML(
                        profile.about || ""
                    )}
                </p>

                <div class="swipe-actions">

                    <button
                        type="button"
                        class="secondary"
                        onclick="passProfile('${profile.id}')">
                        ❌ ${escapeHTML(
                            t("Pass")
                        )}
                    </button>

                    <button
                        type="button"
                        class="primary"
                        onclick="likeProfile('${profile.id}')">
                        ❤️ ${escapeHTML(
                            t("Like")
                        )}
                    </button>

                    <button
                        type="button"
                        class="primary"
                        onclick="superLikeProfile('${profile.id}')">
                        ⭐ ${escapeHTML(
                            t("Super Like")
                        )}
                    </button>

                </div>

            </div>

        `
        ).join("");
}

/* =========================================================
   SEARCH LIKE
   ========================================================= */

function likeProfile(profileId) {

    if (!canSwipe()) return;

    const likes =
        load(
            STORAGE.LIKES,
            []
        );

    if (
        likes.some(
            item =>
                item.profileId ===
                profileId
        )
    ) {
        return;
    }

    likes.push({
        id: generateId("like"),
        profileId,
        createdAt:
            new Date().toISOString()
    });

    save(
        STORAGE.LIKES,
        likes
    );

    recordSwipe();

    createMatchIfNeeded(
        profileId
    );

    alert(
        "❤️ " +
        t("Like") +
        " sent."
    );

    searchProfiles();
}

/* =========================================================
   SEARCH PASS
   ========================================================= */

function passProfile(profileId) {

    if (!canSwipe()) return;

    const passes =
        load(
            STORAGE.PASSES,
            []
        );

    if (
        !passes.some(
            item =>
                item.profileId ===
                profileId
        )
    ) {

        passes.push({
            id: generateId("pass"),
            profileId,
            createdAt:
                new Date().toISOString()
        });
    }

    save(
        STORAGE.PASSES,
        passes
    );

    recordSwipe();

    searchProfiles();
}

/* =========================================================
   SEARCH SUPER LIKE
   ========================================================= */

function superLikeProfile(profileId) {

    if (!isPremium()) {

        alert(
            t(
                "Super Likes are available with Rishta Plus."
            )
        );

        return;
    }

    const data =
        getSuperLikeData();

    if (data.count >= 5) {

        alert(
            t(
                "You have used today's 5 Super Likes."
            )
        );

        return;
    }

    if (!canSwipe()) return;

    data.count += 1;

    save(
        STORAGE.SUPERLIKES,
        data
    );

    recordSwipe();

    createMatchIfNeeded(
        profileId
    );

    updateSuperLikeDisplay();

    alert(
        "⭐ " +
        t("Super Like") +
        " sent."
    );

    searchProfiles();
}

/* =========================================================
   REWARDED AD DEMO
   ========================================================= */

function watchRewardedAd() {

    const data =
        getSuperLikeData();

    if (data.count >= 5) {

        alert(
            t(
                "You already have today's maximum of 5 Super Likes."
            )
        );

        return;
    }

    data.count += 3;

    if (data.count > 5) {
        data.count = 5;
    }

    save(
        STORAGE.SUPERLIKES,
        data
    );

    updateSuperLikeDisplay();

    alert(
        "🎬 " +
        t(
            "Demo reward completed. Super Likes added."
        )
    );
}

/* =========================================================
   MATCH SYSTEM
   ========================================================= */

function createMatchIfNeeded(profileId) {

    const matches =
        load(
            STORAGE.MATCHES,
            []
        );

    const alreadyMatched =
        matches.some(
            match =>
                match.profileId ===
                profileId
        );

    if (alreadyMatched) {
        return;
    }

    const profile =
        DEMO_PROFILES.find(
            person =>
                person.id ===
                profileId
        );

    if (!profile) return;

    matches.push({
        id: generateId("match"),
        profileId: profile.id,
        fullName: profile.fullName,
        createdAt:
            new Date().toISOString()
    });

    save(
        STORAGE.MATCHES,
        matches
    );
}

/* =========================================================
   MATCHES
   ========================================================= */

function renderMatches() {

    const container =
        document.getElementById(
            "matchesList"
        );

    if (!container) return;

    const matches =
        load(
            STORAGE.MATCHES,
            []
        );

    if (!matches.length) {

        container.innerHTML = `
            <p class="small">
                ${escapeHTML(
                    t(
                        "No matches yet. Start finding a Rishta."
                    )
                )}
            </p>
        `;

        return;
    }

    container.innerHTML =
        matches.map(
            match => `

            <div class="result-card">

                <h3>
                    💚 ${escapeHTML(
                        match.fullName
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        t("You have a match.")
                    )}
                </p>

                <button
                    type="button"
                    class="primary"
                    onclick="openChat('${match.profileId}')">
                    💬 ${escapeHTML(
                        t("Open Halal Chat")
                    )}
                </button>

            </div>

        `
        ).join("");
}

/* =========================================================
   LIKES
   ========================================================= */

function renderLikes() {

    const container =
        document.getElementById(
            "likesList"
        );

    if (!container) return;

    const likes =
        load(
            STORAGE.LIKES,
            []
        );

    if (!likes.length) {

        container.innerHTML = `
            <p class="small">
                ${escapeHTML(
                    t(
                        "Your likes will appear here."
                    )
                )}
            </p>
        `;

        return;
    }

    container.innerHTML =
        likes.map(
            like => {

                const profile =
                    DEMO_PROFILES.find(
                        person =>
                            person.id ===
                            like.profileId
                    );

                if (!profile) return "";

                return `
                    <div class="result-card">

                        <h3>
                            ❤️ ${escapeHTML(
                                profile.fullName
                            )}
                        </h3>

                        <p>
                            ${profile.age} •
                            ${escapeHTML(
                                profile.city
                            )},
                            ${escapeHTML(
                                profile.country
                            )}
                        </p>

                        <button
                            type="button"
                            class="primary"
                            onclick="openChat('${profile.id}')">
                            💬 ${escapeHTML(
                                t("Chat")
                            )}
                        </button>

                    </div>
                `;
            }
        ).join("");
}

/* =========================================================
   CHAT
   ========================================================= */

function openChat(profileId) {

    const matches =
        load(
            STORAGE.MATCHES,
            []
        );

    const isMatch =
        matches.some(
            match =>
                match.profileId ===
                profileId
        );

    if (!isMatch) {

        alert(
            t(
                "Chat is available after a mutual match."
            )
        );

        return;
    }

    currentChatProfileId =
        profileId;

    showPage("chat");
}

function renderChat() {

    const container =
        document.getElementById(
            "chatMessages"
        );
           );
    
    save(
        STORAGE.PHOTOS,
        updated
    );

    renderPhotos();
}

/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    const notifications =
        document.getElementById(
            "notifications"
        );

    const darkMode =
        document.getElementById(
            "darkMode"
        );

    const language =
        document.getElementById(
            "languageSelect"
        );

    if (notifications) {
        notifications.checked =
            !!settings.notifications;
    }

    if (darkMode) {
        darkMode.checked =
            !!settings.darkMode;
    }

    if (language) {
        language.value =
            settings.language ||
            getCurrentLanguage();
    }

    showPage("settings");
}

function saveSettings() {

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    const notifications =
        document.getElementById(
            "notifications"
        );

    const darkMode =
        document.getElementById(
            "darkMode"
        );

    const language =
        document.getElementById(
            "languageSelect"
        );

    if (notifications) {
        settings.notifications =
            notifications.checked;
    }

    if (darkMode) {
        settings.darkMode =
            darkMode.checked;
    }

    if (language) {
        settings.language =
            language.value;
    }

    save(
        STORAGE.SETTINGS,
        settings
    );

    applyDarkMode(
        settings.darkMode
    );

    if (settings.language) {
        changeLanguage(
            settings.language
        );
    }

    alert(
        t(
            "Settings saved successfully."
        )
    );
}

/* =========================================================
   DARK MODE
   ========================================================= */

function applyDarkMode(enabled) {

    document.body.classList.toggle(
        "dark-mode",
        !!enabled
    );
}

/* =========================================================
   PRIVACY
   ========================================================= */

function openPrivacy() {

    const privacy =
        load(
            STORAGE.PRIVACY,
            DEFAULT_PRIVACY
        );

    const visibility =
        document.getElementById(
            "profileVisibility"
        );

    const online =
        document.getElementById(
            "showOnline"
        );

    const messages =
        document.getElementById(
            "allowMessages"
        );

    if (visibility) {
        visibility.value =
            privacy.profileVisibility ||
            "members";
    }

    if (online) {
        online.checked =
            !!privacy.showOnline;
    }

    if (messages) {
        messages.checked =
            !!privacy.allowMessages;
    }

    showPage("privacy");
}

function savePrivacy() {

    const privacy =
        load(
            STORAGE.PRIVACY,
            DEFAULT_PRIVACY
        );

    const visibility =
        document.getElementById(
            "profileVisibility"
        );

    const online =
        document.getElementById(
            "showOnline"
        );

    const messages =
        document.getElementById(
            "allowMessages"
        );

    if (visibility) {
        privacy.profileVisibility =
            visibility.value;
    }

    if (online) {
        privacy.showOnline =
            online.checked;
    }

    if (messages) {
        privacy.allowMessages =
            messages.checked;
    }

    save(
        STORAGE.PRIVACY,
        privacy
    );

    alert(
        t(
            "Privacy settings saved successfully."
        )
    );
}

/* =========================================================
   PURCHASES
   ========================================================= */

function openPurchases() {

    const purchase =
        load(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );

    const status =
        document.getElementById(
            "purchaseStatus"
        );

    const packageName =
        document.getElementById(
            "purchasePackage"
        );

    const expiry =
        document.getElementById(
            "purchaseExpiry"
        );

    if (status) {

        status.textContent =
            purchase.active
                ? t("Active")
                : t("Not Active");
    }

    if (packageName) {

        packageName.textContent =
            purchase.package ||
            t("Free");
    }

    if (expiry) {

        expiry.textContent =
            purchase.expiresAt
                ? formatDate(
                    purchase.expiresAt
                )
                : "-";
    }

    showPage("purchases");
}

/* =========================================================
   ACTIVATE RISHTA PLUS
   ========================================================= */

function activatePackage() {

    const existing =
        load(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );

    const now =
        new Date();

    const expires =
        new Date(now);

    expires.setMonth(
        expires.getMonth() + 1
    );

    const purchase = {

        active: true,

        package:
            "Rishta Plus",

        price: 2,

        currency:
            "USD",

        paymentMethod:
            "Pending",

        activatedAt:
            now.toISOString(),

        expiresAt:
            expires.toISOString()
    };

    save(
        STORAGE.PURCHASE,
        purchase
    );

    alert(
        t(
            "Rishta Plus package activated for $2/month."
        )
    );

    openPurchases();
}

/* =========================================================
   PAYMENT METHOD
   ========================================================= */

function selectPaymentMethod(method) {

    const purchase =
        load(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );

    purchase.paymentMethod =
        method;

    save(
        STORAGE.PURCHASE,
        purchase
    );

    alert(
        t(
            "Payment method selected."
        )
    );
}

/* =========================================================
   GUARDIAN
   ========================================================= */

function openGuardian() {

    loadGuardian();

    showPage("guardian");
}

function loadGuardian() {

    const guardian =
        load(
            STORAGE.GUARDIAN,
            {
                name: "",
                email: "",
                phone: "",
                relationship: ""
            }
        );

    const fields = {
        guardianName:
            guardian.name,

        guardianEmail:
            guardian.email,

        guardianPhone:
            guardian.phone,

        guardianRelationship:
            guardian.relationship
    };

    Object.keys(fields).forEach(
        id => {

            const element =
                document.getElementById(id);

            if (element) {
                element.value =
                    fields[id] || "";
            }
        }
    );
}

function saveGuardian() {

    const guardian = {

        name:
            document.getElementById(
                "guardianName"
            )?.value.trim() || "",

        email:
            document.getElementById(
                "guardianEmail"
            )?.value.trim() || "",

        phone:
            document.getElementById(
                "guardianPhone"
            )?.value.trim() || "",

        relationship:
            document.getElementById(
                "guardianRelationship"
            )?.value.trim() || ""
    };

    save(
        STORAGE.GUARDIAN,
        guardian
    );

    alert(
        t(
            "Guardian details saved successfully."
        )
    );
}

/* =========================================================
   DASHBOARD REFRESH
   ========================================================= */

function refreshDashboard() {

    updateDashboard();

    renderLikes();

    renderMatches();

    updateSwipeDisplay();

    updateSuperLikeDisplay();
}

/* =========================================================
   APP INITIALIZATION
   ========================================================= */

function initializeApp() {

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    const language =
        settings.language ||
        getCurrentLanguage();

    localStorage.setItem(
        STORAGE.LANGUAGE,
        language
    );

    initializeLanguageSelect();

    applyTranslations(language);

    applyDarkMode(
        !!settings.darkMode
    );

    const user =
        getCurrentUser();

    if (user) {

        updateDashboard();

    } else {

        showPage("home");
    }

    /*
     * Login button
     */

    document
        .querySelectorAll(
            "[data-action='login']"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                openLogin
            );
        });

    /*
     * Register button
     */

    document
        .querySelectorAll(
            "[data-action='register']"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                openRegister
            );
        });

    /*
     * Logout button
     */

    document
        .querySelectorAll(
            "[data-action='logout']"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                logoutUser
            );
        });

    /*
     * Login form
     */

    const loginForm =
        document.querySelector(
            "#login form"
        );

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                loginUser();
            }
        );
    }

    /*
     * Register form
     */

    const registerForm =
        document.querySelector(
            "#register form"
        );

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();

                createAccount();
            }
        );
    }

    /*
     * Language selector
     */

    const languageSelect =
        document.getElementById(
            "languageSelect"
        );

    if (languageSelect) {

        languageSelect.addEventListener(
            "change",
            function() {

                changeLanguage(
                    this.value
                );
            }
        );
    }

    /*
     * Photo input
     */

    const photoInput =
        document.getElementById(
            "photoInput"
        );

    if (photoInput) {

        photoInput.addEventListener(
            "change",
            function() {

                if (this.files?.[0]) {

                    addPhoto(
                        this.files[0]
                    );

                    this.value = "";
                }
            }
        );
    }
}

/* =========================================================
   START APP
   ========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeApp
    );

} else {

    initializeApp();
   }
/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    const notifications =
        document.getElementById(
            "notifications"
        );

    const darkMode =
        document.getElementById(
            "darkMode"
        );

    if (notifications) {

        notifications.checked =
            !!settings.notifications;
    }

    if (darkMode) {

        darkMode.checked =
            !!settings.darkMode;
    }

    showPage("settings");
}

function saveSettings() {

    const oldSettings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    const settings = {

        ...oldSettings,

        notifications:
            document.getElementById(
                "notifications"
            )?.checked ?? true,

        darkMode:
            document.getElementById(
                "darkMode"
            )?.checked ?? false,

        language:
            getCurrentLanguage()
    };

    save(
        STORAGE.SETTINGS,
        settings
    );

    applySavedSettings();

    alert(
        t("Settings saved.")
    );
}

function applySavedSettings() {

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    document.body.classList.toggle(
        "dark-mode",
        !!settings.darkMode
    );

    const language =
        settings.language ||
        getCurrentLanguage();

    applyTranslations(language);
}

/* =========================================================
   PRIVACY
   ========================================================= */

function openPrivacy() {

    const privacy =
        load(
            STORAGE.PRIVACY,
            DEFAULT_PRIVACY
        );

    const visibility =
        document.getElementById(
            "profileVisibility"
        );

    const online =
        document.getElementById(
            "showOnline"
        );

    const messages =
        document.getElementById(
            "allowMessages"
        );

    const photoAfterMatch =
        document.getElementById(
            "photoAfterMatch"
        );

    if (visibility) {

        visibility.value =
            privacy.profileVisibility;
    }

    if (online) {

        online.checked =
            !!privacy.showOnline;
    }

    if (messages) {

        messages.checked =
            !!privacy.allowMessages;
    }

    if (photoAfterMatch) {

        photoAfterMatch.checked =
            !!privacy.photoAfterMatch;
    }

    showPage("privacy");
}

function savePrivacy() {

    const privacy = {

        profileVisibility:
            document.getElementById(
                "profileVisibility"
            )?.value ||
            "members",

        showOnline:
            document.getElementById(
                "showOnline"
            )?.checked ?? true,

        allowMessages:
            document.getElementById(
                "allowMessages"
            )?.checked ?? true,

        photoAfterMatch:
            document.getElementById(
                "photoAfterMatch"
            )?.checked ?? false
    };

    save(
        STORAGE.PRIVACY,
        privacy
    );

    alert(
        t(
            "Privacy settings saved."
        )
    );
}

/* =========================================================
   PURCHASES
   ========================================================= */

function openPurchases() {

    const status =
        document.getElementById(
            "purchaseStatus"
        );

    if (status) {

        if (isPremium()) {

            status.textContent =
                t(
                    "Rishta Plus is active."
                );

        } else {

            status.textContent =
                t(
                    "No active subscription."
                );
        }
    }

    showPage("purchases");
}

/* =========================================================
   PACKAGE
   ========================================================= */

function openPackage() {

    showPage("package");
}

function activatePackage() {

    const message =
        document.getElementById(
            "paymentMessage"
        );

    if (message) {

        message.textContent =
            t(
                "Secure payment setup is required before Rishta Plus can be activated."
            );
    }

    alert(
        t(
            "Secure payment is required. Rishta Plus will not be activated until a real payment provider verifies the $2/month subscription."
        )
    );
}

/* =========================================================
   GUARDIAN
   ========================================================= */

function loadGuardian() {

    const guardian =
        load(
            STORAGE.GUARDIAN,
            null
        );

    if (!guardian) return;

    const name =
        document.getElementById(
            "guardianName"
        );

    const email =
        document.getElementById(
            "guardianEmail"
        );

    if (name) {

        name.value =
            guardian.name || "";
    }

    if (email) {

        email.value =
            guardian.email || "";
    }
}

function saveGuardian() {

    const name =
        document.getElementById(
            "guardianName"
        )?.value.trim();

    const email =
        document.getElementById(
            "guardianEmail"
        )?.value.trim();

    if (!name || !email) {

        alert(
            t(
                "Please enter guardian name and email."
            )
        );

        return;
    }

    save(
        STORAGE.GUARDIAN,
        {
            name,
            email,
            updatedAt:
                new Date().toISOString()
        }
    );

    alert(
        t(
            "Guardian information saved."
        )
    );
}

/* =========================================================
   CUSTOM ICON
   ========================================================= */

function openCustomIcon() {

    showPage("customIcon");
}

function saveCustomIcon() {

    const input =
        document.getElementById(
            "customIconInput"
        );

    if (
        !input ||
        !input.files.length
    ) {

        alert(
            t(
                "Please select an image."
            )
        );

        return;
    }

    const file =
        input.files[0];

    if (
        file.size >
        5 * 1024 * 1024
    ) {

        alert(
            t(
                "Maximum 5MB."
            )
        );

        return;
    }

    if (
        !file.type.startsWith("image/")
    ) {

        alert(
            t(
                "Please select an image file."
            )
        );

        return;
    }

    const reader =
        new FileReader();

    reader.onload =
        function(event) {

            save(
                STORAGE.CUSTOM_ICON,
                {
                    data:
                        event.target.result,

                    updatedAt:
                        new Date().toISOString()
                }
            );

            alert(
                t(
                    "Custom icon saved."
                )
            );
        };

    reader.readAsDataURL(file);
}

/* =========================================================
   LANGUAGE SAVE
   ========================================================= */

function saveLanguage(language) {

    if (
        !HALAL_RISHTA_LANGUAGES.includes(
            language
        )
    ) {

        language = "en";
    }

    localStorage.setItem(
        STORAGE.LANGUAGE,
        language
    );

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    settings.language =
        language;

    save(
        STORAGE.SETTINGS,
        settings
    );

    applyTranslations(language);
}

/* =========================================================
   RESET ACTIVITY
   ========================================================= */

function resetActivity() {

    save(
        STORAGE.SWIPES,
        {
            date: todayKey(),
            count: 0
        }
    );

    save(
        STORAGE.SUPERLIKES,
        {
            date: todayKey(),
            count: 0
        }
    );

    save(
        STORAGE.LIKES,
        []
    );

    save(
        STORAGE.PASSES,
        []
    );

    save(
        STORAGE.MATCHES,
        []
    );

    save(
        STORAGE.MESSAGES,
        []
    );
}
/* =========================================================
   SECURITY / HTML ESCAPING
   ========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}

/* =========================================================
   LANGUAGE SELECTOR REPAIR
   ========================================================= */

function setupLanguageSelector() {

    const selector =
        document.getElementById(
            "languageSelect"
        );

    if (!selector) return;

    /*
     * Force the selector to contain exactly
     * the 32 approved languages.
     */

    selector.innerHTML = "";

    HALAL_RISHTA_LANGUAGES.forEach(
        code => {

            const option =
                document.createElement(
                    "option"
                );

            option.value = code;

            option.textContent =
                LANGUAGE_NAMES[code] ||
                code;

            selector.appendChild(
                option
            );
        }
    );

    selector.value =
        getCurrentLanguage();

    selector.onchange =
        function() {

            changeLanguage(
                this.value
            );
        };
}

/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupLanguageSelector();

        applySavedSettings();

        /* -----------------------------------------
           PHOTO INPUT
           ----------------------------------------- */

        const photoInput =
            document.getElementById(
                "photoInput"
            );

        if (photoInput) {

            photoInput.addEventListener(
                "change",
                function() {

                    Array.from(
                        this.files
                    ).forEach(
                        file =>
                            addPhoto(file)
                    );

                    this.value = "";
                }
            );
        }

        /* -----------------------------------------
           START APP
           ----------------------------------------- */

        if (isLoggedIn()) {
            updateDashboard();
        }

        /*
         * Apply translation again after all
         * HTML elements are loaded.
         */

        setTimeout(
            () => {

                applyTranslations(
                    getCurrentLanguage()
                );

            },
            50
        );
    }
);

/* =========================================================
   GLOBAL ERROR REPORTING
   ========================================================= */

window.addEventListener(
    "error",
    function(event) {

        console.error(
            "Halal Rishta JavaScript Error:",
            event.error ||
            event.message
        );
    }
);

/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.changeLanguage =
    changeLanguage;

window.applyTranslations =
    applyTranslations;

window.createAccount =
    createAccount;

window.loginUser =
    loginUser;

window.logoutUser =
    logoutUser;

window.showPage =
    showPage;

window.openProfile =
    openProfile;

window.updateProfile =
    updateProfile;

window.openPhotos =
    openPhotos;

window.openSettings =
    openSettings;

window.saveSettings =
    saveSettings;

window.openPrivacy =
    openPrivacy;

window.savePrivacy =
    savePrivacy;

window.openPurchases =
    openPurchases;

window.openPackage =
    openPackage;

window.activatePackage =
    activatePackage;

window.openCustomIcon =
    openCustomIcon;

window.saveCustomIcon =
    saveCustomIcon;

window.saveGuardian =
    saveGuardian;

window.openChat =
    openChat;

window.sendMessage =
    sendMessage;

window.showHalalIcebreaker =
    showHalalIcebreaker;

window.swipePass =
    swipePass;

window.swipeLike =
    swipeLike;

window.swipeSuperLike =
    swipeSuperLike;

window.likeProfile =
    likeProfile;

window.passProfile =
    passProfile;

window.superLikeProfile =
    superLikeProfile;

window.watchRewardedAd =
    watchRewardedAd;

window.searchProfiles =
    searchProfiles;

window.renderLikes =
    renderLikes;

window.renderMatches =
    renderMatches;

window.loadSwipeProfile =
    loadSwipeProfile;

window.addPhoto =
    addPhoto;

window.deletePhoto =
    deletePhoto;

/* =========================================================
   END
   ========================================================= */
