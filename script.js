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
},

fr: {
    "Create Account":"Créer un compte",
    "Login":"Connexion",
    "Back":"Retour",
    "Full Name":"Nom complet",
    "Email":"E-mail",
    "Password":"Mot de passe",
    "My Account":"Mon compte",
    "Free":"Gratuit",
    "Your Plan":"Votre forfait",
    "Profile":"Profil",
    "Photos":"Photos",
    "Settings":"Paramètres",
    "Privacy":"Confidentialité",
    "Logout":"Déconnexion",
    "Pass":"Passer",
    "Like":"J'aime",
    "Super Like":"Super Like",
    "Save Profile":"Enregistrer le profil",
    "Save Settings":"Enregistrer les paramètres",
    "Search":"Rechercher",
    "Male":"Homme",
    "Female":"Femme",
    "Country":"Pays",
    "City":"Ville",
    "Education":"Éducation",
    "Profession":"Profession",
    "Phone":"Téléphone",
    "About me":"À propos de moi",
    "Notifications":"Notifications",
    "Dark Mode":"Mode sombre",
    "$2 / month":"2 $ / mois"
},

nl: {
    "Create Account":"Account aanmaken",
    "Login":"Inloggen",
    "Back":"Terug",
    "Full Name":"Volledige naam",
    "Email":"E-mail",
    "Password":"Wachtwoord",
    "My Account":"Mijn account",
    "Free":"Gratis",
    "Your Plan":"Jouw abonnement",
    "Profile":"Profiel",
    "Photos":"Foto's",
    "Settings":"Instellingen",
    "Privacy":"Privacy",
    "Logout":"Uitloggen",
    "Pass":"Overslaan",
    "Like":"Vind ik leuk",
    "Super Like":"Super Like",
    "Search":"Zoeken",
    "Male":"Man",
    "Female":"Vrouw",
    "Country":"Land",
    "City":"Stad",
    "Education":"Opleiding",
    "Profession":"Beroep",
    "Phone":"Telefoon",
    "Notifications":"Meldingen",
    "Dark Mode":"Donkere modus",
    "$2 / month":"$2 / maand"
},

el: {
    "Create Account":"Δημιουργία λογαριασμού",
    "Login":"Σύνδεση",
    "Back":"Πίσω",
    "Full Name":"Πλήρες όνομα",
    "Email":"Email",
    "Password":"Κωδικός πρόσβασης",
    "My Account":"Ο λογαριασμός μου",
    "Free":"Δωρεάν",
    "Profile":"Προφίλ",
    "Photos":"Φωτογραφίες",
    "Settings":"Ρυθμίσεις",
    "Privacy":"Απόρρητο",
    "Logout":"Αποσύνδεση",
    "Pass":"Παράλειψη",
    "Like":"Μου αρέσει",
    "Super Like":"Super Like",
    "Search":"Αναζήτηση",
    "Male":"Άνδρας",
    "Female":"Γυναίκα",
    "Country":"Χώρα",
    "City":"Πόλη",
    "Education":"Εκπαίδευση",
    "Profession":"Επάγγελμα",
    "Notifications":"Ειδοποιήσεις",
    "Dark Mode":"Σκοτεινή λειτουργία",
    "$2 / month":"2 $ / μήνα"
},

tr: {
    "Create Account":"Hesap Oluştur",
    "Login":"Giriş Yap",
    "Back":"Geri",
    "Full Name":"Ad Soyad",
    "Email":"E-posta",
    "Password":"Şifre",
    "My Account":"Hesabım",
    "Free":"Ücretsiz",
    "Your Plan":"Planınız",
    "Profile":"Profil",
    "Photos":"Fotoğraflar",
    "Settings":"Ayarlar",
    "Privacy":"Gizlilik",
    "Logout":"Çıkış Yap",
    "Pass":"Geç",
    "Like":"Beğen",
    "Super Like":"Süper Beğeni",
    "Save Profile":"Profili Kaydet",
    "Search":"Ara",
    "Male":"Erkek",
    "Female":"Kadın",
    "Country":"Ülke",
    "City":"Şehir",
    "Education":"Eğitim",
    "Profession":"Meslek",
    "Notifications":"Bildirimler",
    "Dark Mode":"Karanlık Mod",
    "$2 / month":"Ayda 2 $"
},

fa: {
    "Create Account":"ایجاد حساب",
    "Login":"ورود",
    "Back":"بازگشت",
    "Full Name":"نام کامل",
    "Email":"ایمیل",
    "Password":"رمز عبور",
    "My Account":"حساب من",
    "Free":"رایگان",
    "Profile":"پروفایل",
    "Photos":"عکس‌ها",
    "Settings":"تنظیمات",
    "Privacy":"حریم خصوصی",
    "Logout":"خروج",
    "Pass":"رد کردن",
    "Like":"پسندیدن",
    "Super Like":"پسند ویژه",
    "Search":"جستجو",
    "Male":"مرد",
    "Female":"زن",
    "Country":"کشور",
    "City":"شهر",
    "Education":"تحصیلات",
    "Profession":"شغل",
    "Notifications":"اعلان‌ها",
    "Dark Mode":"حالت تاریک",
    "$2 / month":"۲ دلار / ماه"
},

hi: {
    "Create Account":"खाता बनाएं",
    "Login":"लॉगिन",
    "Back":"वापस",
    "Full Name":"पूरा नाम",
    "Email":"ईमेल",
    "Password":"पासवर्ड",
    "My Account":"मेरा खाता",
    "Free":"मुफ्त",
    "Profile":"प्रोफ़ाइल",
    "Photos":"फ़ोटो",
    "Settings":"सेटिंग्स",
    "Privacy":"गोपनीयता",
    "Logout":"लॉग आउट",
    "Pass":"पास",
    "Like":"पसंद",
    "Super Like":"सुपर लाइक",
    "Search":"खोजें",
    "Male":"पुरुष",
    "Female":"महिला",
    "Country":"देश",
    "City":"शहर",
    "Education":"शिक्षा",
    "Profession":"पेशा",
    "Notifications":"सूचनाएं",
    "Dark Mode":"डार्क मोड",
    "$2 / month":"$2 / माह"
},

pl: {
    "Create Account":"Utwórz konto",
    "Login":"Zaloguj się",
    "Back":"Wstecz",
    "Full Name":"Imię i nazwisko",
    "Email":"E-mail",
    "Password":"Hasło",
    "My Account":"Moje konto",
    "Free":"Darmowy",
    "Profile":"Profil",
    "Photos":"Zdjęcia",
    "Settings":"Ustawienia",
    "Privacy":"Prywatność",
    "Logout":"Wyloguj",
    "Pass":"Pomiń",
    "Like":"Lubię to",
    "Super Like":"Super Like",
    "Search":"Szukaj",
    "Male":"Mężczyzna",
    "Female":"Kobieta",
    "Country":"Kraj",
    "City":"Miasto",
    "Education":"Wykształcenie",
    "Profession":"Zawód",
    "Notifications":"Powiadomienia",
    "Dark Mode":"Tryb ciemny",
    "$2 / month":"2 $ / miesiąc"
},

ro: {
    "Create Account":"Creează cont",
    "Login":"Autentificare",
    "Back":"Înapoi",
    "Full Name":"Nume complet",
    "Email":"E-mail",
    "Password":"Parolă",
    "My Account":"Contul meu",
    "Free":"Gratuit",
    "Profile":"Profil",
    "Photos":"Fotografii",
    "Settings":"Setări",
    "Privacy":"Confidențialitate",
    "Logout":"Deconectare",
    "Pass":"Treci peste",
    "Like":"Îmi place",
    "Super Like":"Super Like",
    "Search":"Caută",
    "Male":"Bărbat",
    "Female":"Femeie",
    "Country":"Țară",
    "City":"Oraș",
    "Education":"Educație",
    "Profession":"Profesie",
    "Notifications":"Notificări",
    "Dark Mode":"Mod întunecat",
    "$2 / month":"2 $ / lună"
},

zh: {
    "Create Account":"创建账户",
    "Login":"登录",
    "Back":"返回",
    "Full Name":"姓名",
    "Email":"电子邮件",
    "Password":"密码",
    "My Account":"我的账户",
    "Free":"免费",
    "Profile":"个人资料",
    "Photos":"照片",
    "Settings":"设置",
    "Privacy":"隐私",
    "Logout":"退出登录",
    "Pass":"跳过",
    "Like":"喜欢",
    "Super Like":"超级喜欢",
    "Search":"搜索",
    "Male":"男性",
    "Female":"女性",
    "Country":"国家",
    "City":"城市",
    "Education":"教育",
    "Profession":"职业",
    "Notifications":"通知",
    "Dark Mode":"深色模式",
    "$2 / month":"每月 2 美元"
},

ru: {
    "Create Account":"Создать аккаунт",
    "Login":"Войти",
    "Back":"Назад",
    "Full Name":"Полное имя",
    "Email":"Электронная почта",
    "Password":"Пароль",
    "My Account":"Мой аккаунт",
    "Free":"Бесплатно",
    "Profile":"Профиль",
    "Photos":"Фотографии",
    "Settings":"Настройки",
    "Privacy":"Конфиденциальность",
    "Logout":"Выйти",
    "Pass":"Пропустить",
    "Like":"Нравится",
    "Super Like":"Суперлайк",
    "Search":"Поиск",
    "Male":"Мужчина",
    "Female":"Женщина",
    "Country":"Страна",
    "City":"Город",
    "Education":"Образование",
    "Profession":"Профессия",
    "Notifications":"Уведомления",
    "Dark Mode":"Тёмный режим",
    "$2 / month":"2 $ / месяц"
},

pt: {
    "Create Account":"Criar conta",
    "Login":"Entrar",
    "Back":"Voltar",
    "Full Name":"Nome completo",
    "Email":"E-mail",
    "Password":"Senha",
    "My Account":"Minha conta",
    "Free":"Grátis",
    "Profile":"Perfil",
    "Photos":"Fotos",
    "Settings":"Configurações",
    "Privacy":"Privacidade",
    "Logout":"Sair",
    "Pass":"Passar",
    "Like":"Curtir",
    "Super Like":"Super Like",
    "Search":"Pesquisar",
    "Male":"Homem",
    "Female":"Mulher",
    "Country":"País",
    "City":"Cidade",
    "Education":"Educação",
    "Profession":"Profissão",
    "Notifications":"Notificações",
    "Dark Mode":"Modo escuro",
    "$2 / month":"2 $ / mês"
},

ms: {
    "Create Account":"Cipta Akaun",
    "Login":"Log Masuk",
    "Back":"Kembali",
    "Full Name":"Nama Penuh",
    "Email":"E-mel",
    "Password":"Kata Laluan",
    "My Account":"Akaun Saya",
    "Free":"Percuma",
    "Profile":"Profil",
    "Photos":"Foto",
    "Settings":"Tetapan",
    "Privacy":"Privasi",
    "Logout":"Log Keluar",
    "Pass":"Langkau",
    "Like":"Suka",
    "Super Like":"Super Like",
    "Search":"Cari",
    "Male":"Lelaki",
    "Female":"Perempuan",
    "Country":"Negara",
    "City":"Bandar",
    "Education":"Pendidikan",
    "Profession":"Pekerjaan",
    "Notifications":"Pemberitahuan",
    "Dark Mode":"Mod Gelap",
    "$2 / month":"$2 / bulan"
},

id: {
    "Create Account":"Buat Akun",
    "Login":"Masuk",
    "Back":"Kembali",
    "Full Name":"Nama Lengkap",
    "Email":"Email",
    "Password":"Kata Sandi",
    "My Account":"Akun Saya",
    "Free":"Gratis",
    "Profile":"Profil",
    "Photos":"Foto",
    "Settings":"Pengaturan",
    "Privacy":"Privasi",
    "Logout":"Keluar",
    "Pass":"Lewati",
    "Like":"Suka",
    "Super Like":"Super Like",
    "Search":"Cari",
    "Male":"Pria",
    "Female":"Wanita",
    "Country":"Negara",
    "City":"Kota",
    "Education":"Pendidikan",
    "Profession":"Profesi",
    "Notifications":"Notifikasi",
    "Dark Mode":"Mode Gelap",
    "$2 / month":"$2 / bulan"
},

fil: {
    "Create Account":"Gumawa ng Account",
    "Login":"Mag-login",
    "Back":"Bumalik",
    "Full Name":"Buong Pangalan",
    "Email":"Email",
    "Password":"Password",
    "My Account":"Aking Account",
    "Free":"Libre",
    "Profile":"Profile",
    "Photos":"Mga Larawan",
    "Settings":"Mga Setting",
    "Privacy":"Privacy",
    "Logout":"Mag-logout",
    "Pass":"Laktawan",
    "Like":"Like",
    "Super Like":"Super Like",
    "Search":"Maghanap",
    "Male":"Lalaki",
    "Female":"Babae",
    "Country":"Bansa",
    "City":"Lungsod",
    "Education":"Edukasyon",
    "Profession":"Propesyon",
    "Notifications":"Mga Notification",
    "Dark Mode":"Dark Mode",
    "$2 / month":"$2 / buwan"
},

th: {
    "Create Account":"สร้างบัญชี",
    "Login":"เข้าสู่ระบบ",
    "Back":"ย้อนกลับ",
    "Full Name":"ชื่อเต็ม",
    "Email":"อีเมล",
    "Password":"รหัสผ่าน",
    "My Account":"บัญชีของฉัน",
    "Free":"ฟรี",
    "Profile":"โปรไฟล์",
    "Photos":"รูปภาพ",
    "Settings":"การตั้งค่า",
    "Privacy":"ความเป็นส่วนตัว",
    "Logout":"ออกจากระบบ",
    "Pass":"ข้าม",
    "Like":"ถูกใจ",
    "Super Like":"ถูกใจพิเศษ",
    "Search":"ค้นหา",
    "Male":"ชาย",
    "Female":"หญิง",
    "Country":"ประเทศ",
    "City":"เมือง",
    "Education":"การศึกษา",
    "Profession":"อาชีพ",
    "Notifications":"การแจ้งเตือน",
    "Dark Mode":"โหมดมืด",
    "$2 / month":"$2 / เดือน"
},

sq: {
    "Create Account":"Krijo llogari",
    "Login":"Hyr",
    "Back":"Mbrapa",
    "Full Name":"Emri i plotë",
    "Email":"Email",
    "Password":"Fjalëkalimi",
    "My Account":"Llogaria ime",
    "Free":"Falas",
    "Profile":"Profili",
    "Photos":"Fotot",
    "Settings":"Cilësimet",
    "Privacy":"Privatësia",
    "Logout":"Dil",
    "Pass":"Kalo",
    "Like":"Pëlqej",
    "Super Like":"Super Pëlqim",
    "Search":"Kërko",
    "Male":"Mashkull",
    "Female":"Femër",
    "Country":"Shteti",
    "City":"Qyteti",
    "Education":"Arsimi",
    "Profession":"Profesioni",
    "Notifications":"Njoftimet",
    "Dark Mode":"Modaliteti i errët",
    "$2 / month":"2 $ / muaj"
},

so: {
    "Create Account":"Samee Akoon",
    "Login":"Gal",
    "Back":"Dib u noqo",
    "Full Name":"Magaca oo buuxa",
    "Email":"Iimayl",
    "Password":"Furaha sirta",
    "My Account":"Akoonkayga",
    "Free":"Bilaash",
    "Profile":"Xogta",
    "Photos":"Sawirro",
    "Settings":"Dejinta",
    "Privacy":"Asturnaanta",
    "Logout":"Ka bax",
    "Pass":"Gudub",
    "Like":"Jeclahay",
    "Super Like":"Jeceyl gaar ah",
    "Search":"Raadi",
    "Male":"Lab",
    "Female":"Dheddig",
    "Country":"Dalka",
    "City":"Magaalada",
    "Education":"Waxbarasho",
    "Profession":"Xirfad",
    "Notifications":"Ogeysiisyada",
    "Dark Mode":"Habka mugdiga",
    "$2 / month":"$2 / bishii"
},

sw: {
    "Create Account":"Fungua Akaunti",
    "Login":"Ingia",
    "Back":"Rudi",
    "Full Name":"Jina Kamili",
    "Email":"Barua pepe",
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

/* =========================================================
   PREMIUM
   ========================================================= */

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

    if (!container) return;

    if (!currentChatProfileId) {

        container.innerHTML = `
            <p class="small">
                ${escapeHTML(
                    t(
                        "Select a match to start chatting."
                    )
                )}
            </p>
        `;

        return;
    }

    const allMessages =
        load(
            STORAGE.MESSAGES,
            []
        );

    const messages =
        allMessages.filter(
            message =>
                message.profileId ===
                currentChatProfileId
        );

    if (!messages.length) {

        container.innerHTML = `
            <p class="small">
                ${escapeHTML(
                    t(
                        "No messages yet. Start with a respectful message."
                    )
                )}
            </p>
        `;

        return;
    }

    container.innerHTML =
        messages.map(
            message => `

            <div class="chat-message">

                <strong>
                    ${
                        message.sender === "me"
                            ? escapeHTML(
                                t("You")
                              )
                            : escapeHTML(
                                t("Match")
                              )
                    }
                </strong>

                <p>
                    ${escapeHTML(
                        message.text
                    )}
                </p>

            </div>

        `
        ).join("");
}

/* =========================================================
   SEND MESSAGE
   ========================================================= */

function sendMessage() {

    if (!currentChatProfileId) {

        alert(
            t(
                "Please open a match first."
            )
        );

        return;
    }

    const input =
        document.getElementById(
            "chatMessage"
        );

    if (!input) return;

    const text =
        input.value.trim();

    if (!text) {

        alert(
            t(
                "Please write a message."
            )
        );

        return;
    }

    const messages =
        load(
            STORAGE.MESSAGES,
            []
        );

    messages.push({
        id: generateId("message"),
        profileId:
            currentChatProfileId,
        sender: "me",
        text,
        createdAt:
            new Date().toISOString()
    });

    save(
        STORAGE.MESSAGES,
        messages
    );

    input.value = "";

    renderChat();
}

/* =========================================================
   HALAL ICEBREAKER
   ========================================================= */

function showHalalIcebreaker() {

    const questions = [

        "What qualities are most important to you in a life partner?",

        "What does a successful marriage mean to you?",

        "How important is family involvement in marriage?",

        "What are your expectations about communication after marriage?",

        "What values would you like to build your future family around?"
    ];

    const question =
        questions[
            Math.floor(
                Math.random() *
                questions.length
            )
        ];

    const input =
        document.getElementById(
            "chatMessage"
        );

    if (input) {

        input.value =
            question;

        input.focus();
    }
}

/* =========================================================
   PROFILE
   ========================================================= */

function openProfile() {

    const profile =
        load(
            STORAGE.PROFILE,
            {}
        );

    const fields = [
        "fullName",
        "age",
        "gender",
        "country",
        "city",
        "education",
        "profession",
        "maritalStatus",
        "religiousLevel",
        "phone",
        "about"
    ];

    fields.forEach(
        id => {

            const element =
                document.getElementById(id);

            if (element) {

                element.value =
                    profile[id] ?? "";
            }
        }
    );

    showPage("profile");
}

/* =========================================================
   UPDATE PROFILE
   ========================================================= */

function updateProfile() {

    const oldProfile =
        load(
            STORAGE.PROFILE,
            {}
        );

    const profile = {
        ...oldProfile
    };

    const fields = [
        "fullName",
        "age",
        "gender",
        "country",
        "city",
        "education",
        "profession",
        "maritalStatus",
        "religiousLevel",
        "phone",
        "about"
    ];

    fields.forEach(
        id => {

            const element =
                document.getElementById(id);

            if (element) {

                profile[id] =
                    element.value.trim();
            }
        }
    );

    if (
        profile.age &&
        Number(profile.age) < 18
    ) {

        alert(
            t(
                "Users must be 18 or older."
            )
        );

        return;
    }

    if (!profile.fullName) {

        alert(
            t(
                "Please enter your full name."
            )
        );

        return;
    }

    save(
        STORAGE.PROFILE,
        profile
    );

    const user =
        getCurrentUser();

    if (user) {

        user.fullName =
            profile.fullName ||
            user.fullName;

        save(
            STORAGE.USER,
            user
        );
    }

    const account =
        load(
            STORAGE.ACCOUNT,
            null
        );

    if (account) {

        account.fullName =
            profile.fullName ||
            account.fullName;

        save(
            STORAGE.ACCOUNT,
            account
        );
    }

    alert(
        t(
            "Profile saved successfully."
        )
    );

    showPage("app");
}

/* =========================================================
   PHOTOS
   ========================================================= */

function openPhotos() {

    showPage("photos");

    renderPhotos();
}

function renderPhotos() {

    const container =
        document.getElementById(
            "photosList"
        );

    if (!container) return;

    const photos =
        load(
            STORAGE.PHOTOS,
            []
        );

    if (!photos.length) {

        container.innerHTML = `
            <p>
                ${escapeHTML(
                    t(
                        "No photos uploaded yet."
                    )
                )}
            </p>
        `;

        return;
    }

    container.innerHTML =
        photos.map(
            photo => `

            <div class="photo-item">

                <img
                    src="${photo.data}"
                    alt="Profile photo"
                    style="
                        max-width:100%;
                        border-radius:12px;
                    "
                >

                <button
                    type="button"
                    class="secondary"
                    onclick="deletePhoto('${photo.id}')">
                    ${escapeHTML(
                        t("Delete")
                    )}
                </button>

            </div>

        `
        ).join("");
}

function addPhoto(file) {

    if (!file) return;

    if (
        file.size >
        5 * 1024 * 1024
    ) {

        alert(
            t(
                "Maximum 5MB per image."
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

    const photos =
        load(
            STORAGE.PHOTOS,
            []
        );

    if (photos.length >= 6) {

        alert(
            t(
                "Maximum 6 photos allowed."
            )
        );

        return;
    }

    const reader =
        new FileReader();

    reader.onload =
        function(event) {

            photos.push({
                id:
                    generateId("photo"),
                data:
                    event.target.result,
                createdAt:
                    new Date().toISOString()
            });

            save(
                STORAGE.PHOTOS,
                photos
            );

            renderPhotos();
        };

    reader.readAsDataURL(file);
}

function deletePhoto(photoId) {

    const photos =
        load(
            STORAGE.PHOTOS,
            []
        );

    const updated =
        photos.filter(
            photo =>
                photo.id !==
                photoId
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
