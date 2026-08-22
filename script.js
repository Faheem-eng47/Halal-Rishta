/* =========================================================
   HALAL RISHTA
   COMPLETE MULTI-LANGUAGE TRANSLATION SYSTEM
   Add this section at the VERY END of script.js
   ========================================================= */

"use strict";

/* =========================================================
   LANGUAGE LIST
   ========================================================= */

const HALAL_RISHTA_LANGUAGES = {

    en: {
        name: "English",
        dir: "ltr"
    },

    ar: {
        name: "العربية",
        dir: "rtl"
    },

    es: {
        name: "Español",
        dir: "ltr"
    },

    it: {
        name: "Italiano",
        dir: "ltr"
    },

    fr: {
        name: "Français",
        dir: "ltr"
    },

    nl: {
        name: "Nederlands",
        dir: "ltr"
    },

    el: {
        name: "Ελληνικά",
        dir: "ltr"
    },

    tr: {
        name: "Türkçe",
        dir: "ltr"
    },

    fa: {
        name: "فارسی",
        dir: "rtl"
    },

    hi: {
        name: "हिन्दी",
        dir: "ltr"
    },

    pl: {
        name: "Polski",
        dir: "ltr"
    },

    ro: {
        name: "Română",
        dir: "ltr"
    },

    zh: {
        name: "中文",
        dir: "ltr"
    },

    ru: {
        name: "Русский",
        dir: "ltr"
    },

    pt: {
        name: "Português",
        dir: "ltr"
    },

    ms: {
        name: "Melayu",
        dir: "ltr"
    },

    id: {
        name: "Bahasa Indonesia",
        dir: "ltr"
    },

    fil: {
        name: "Filipino",
        dir: "ltr"
    },

    th: {
        name: "ไทย",
        dir: "ltr"
    },

    sq: {
        name: "Shqip",
        dir: "ltr"
    },

    so: {
        name: "Soomaali",
        dir: "ltr"
    },

    sw: {
        name: "Kiswahili",
        dir: "ltr"
    },

    bn: {
        name: "বাংলা",
        dir: "ltr"
    },

    ug: {
        name: "English — Uganda",
        dir: "ltr"
    },

    ng: {
        name: "English — Nigeria",
        dir: "ltr"
    },

    fi: {
        name: "Suomi",
        dir: "ltr"
    },

    cs: {
        name: "Čeština",
        dir: "ltr"
    },

    sl: {
        name: "Slovenščina",
        dir: "ltr"
    },

    sk: {
        name: "Slovenčina",
        dir: "ltr"
    },

    bg: {
        name: "Български",
        dir: "ltr"
    },

    hu: {
        name: "Magyar",
        dir: "ltr"
    }

};


/* =========================================================
   TRANSLATION TEXT
   ========================================================= */

const HR_TRANSLATIONS = {

    en: {

        "Create Account": "Create Account",
        "Login": "Login",
        "Back": "Back",
        "Full Name": "Full Name",
        "Email": "Email",
        "Password": "Password",
        "Already have an account? Login":
            "Already have an account? Login",
        "Create a new account":
            "Create a new account",

        "My Account": "My Account",
        "Free": "Free",
        "Your Plan": "Your Plan",
        "Rishta Plus": "Rishta Plus",
        "30 daily swipes": "30 daily swipes",
        "Unlimited daily swipes": "Unlimited daily swipes",

        "Upgrade to Rishta Plus":
            "Upgrade to Rishta Plus",

        "Today's Activity":
            "Today's Activity",

        "Swipes:": "Swipes:",
        "Super Likes:": "Super Likes:",

        "Watch Ad → Get 3 Super Likes":
            "Watch Ad → Get 3 Super Likes",

        "Profile": "Profile",
        "Swipe Rishtas": "Swipe Rishtas",
        "Photos": "Photos",
        "Find Rishta": "Find Rishta",
        "Who Liked Me": "Who Liked Me",
        "My Matches": "My Matches",
        "Settings": "Settings",
        "Privacy": "Privacy",
        "App Settings": "App Settings",
        "Manage Purchases": "Manage Purchases",
        "Custom Icon": "Custom Icon",
        "Wali / Guardian": "Wali / Guardian",
        "Logout": "Logout",

        "Discover Rishtas":
            "Discover Rishtas",

        "Pass": "Pass",
        "Like": "Like",
        "Super Like": "Super Like",

        "Profile": "Profile",
        "Save Profile": "Save Profile",

        "Gender": "Gender",
        "Male": "Male",
        "Female": "Female",

        "Country": "Country",
        "City": "City",
        "Education": "Education",
        "Profession": "Profession",

        "Marital Status": "Marital Status",
        "Never Married": "Never Married",
        "Divorced": "Divorced",
        "Widowed": "Widowed",

        "Religious Level": "Religious Level",
        "Practicing": "Practicing",
        "Moderate": "Moderate",
        "Prefer not to say":
            "Prefer not to say",

        "Phone": "Phone",
        "About me": "About me",

        "Find a Rishta":
            "Find a Rishta",

        "Age": "Age",
        "Min": "Min",
        "Max": "Max",
        "Religion": "Religion",
        "Any Religion": "Any Religion",
        "Islam": "Islam",
        "Sect / Maslak": "Sect / Maslak",
        "Any Sect": "Any Sect",
        "Sunni": "Sunni",
        "Shia": "Shia",
        "Other / Prefer not to say":
            "Other / Prefer not to say",

        "Marriage Intent: Serious":
            "Marriage Intent: Serious",

        "Search": "Search",

        "Who Liked Me":
            "Who Liked Me",

        "My Matches":
            "My Matches",

        "Notifications": "Notifications",
        "Dark Mode": "Dark Mode",
        "Save Settings": "Save Settings",

        "Profile Visibility":
            "Profile Visibility",

        "Members Only": "Members Only",
        "Private": "Private",
        "Public": "Public",

        "Show online status":
            "Show online status",

        "Allow messages":
            "Allow messages",

        "Show photos only after matching":
            "Show photos only after matching",

        "Save Privacy Settings":
            "Save Privacy Settings",

        "Manage Purchases":
            "Manage Purchases",

        "Current plan:":
            "Current plan:",

        "No active subscription.":
            "No active subscription.",

        "View Rishta Plus":
            "View Rishta Plus",

        "$2 / month":
            "$2 / month",

        "Secure payment will be required to activate the subscription.":
            "Secure payment will be required to activate the subscription.",

        "Save Custom Icon":
            "Save Custom Icon",

        "Save Guardian":
            "Save Guardian",

        "Guardian Name":
            "Guardian Name",

        "Guardian Email":
            "Guardian Email",

        "Halal Chat":
            "Halal Chat",

        "Send Message":
            "Send Message",

        "Halal Icebreaker":
            "Halal Icebreaker",

        "Write a respectful message...":
            "Write a respectful message..."

    },


    ar: {

        "Create Account": "إنشاء حساب",
        "Login": "تسجيل الدخول",
        "Back": "رجوع",
        "Full Name": "الاسم الكامل",
        "Email": "البريد الإلكتروني",
        "Password": "كلمة المرور",
        "Already have an account? Login":
            "لديك حساب بالفعل؟ تسجيل الدخول",
        "Create a new account":
            "إنشاء حساب جديد",

        "My Account": "حسابي",
        "Free": "مجاني",
        "Your Plan": "خطتك",
        "Rishta Plus": "رشتة بلس",
        "30 daily swipes": "30 اختياراً يومياً",
        "Unlimited daily swipes":
            "اختيارات يومية غير محدودة",

        "Upgrade to Rishta Plus":
            "الترقية إلى رشتة بلس",

        "Today's Activity":
            "نشاط اليوم",

        "Swipes:": "الاختيارات:",
        "Super Likes:": "الإعجابات المميزة:",

        "Watch Ad → Get 3 Super Likes":
            "شاهد إعلاناً واحصل على 3 إعجابات مميزة",

        "Profile": "الملف الشخصي",
        "Swipe Rishtas": "استكشف الزيجات",
        "Photos": "الصور",
        "Find Rishta": "ابحث عن شريك",
        "Who Liked Me": "من أعجب بي",
        "My Matches": "تطابقاتي",
        "Settings": "الإعدادات",
        "Privacy": "الخصوصية",
        "App Settings": "إعدادات التطبيق",
        "Manage Purchases": "إدارة المشتريات",
        "Custom Icon": "الأيقونة المخصصة",
        "Wali / Guardian": "الولي / الوصي",
        "Logout": "تسجيل الخروج",

        "Discover Rishtas":
            "اكتشف فرص الزواج",

        "Pass": "تخطي",
        "Like": "إعجاب",
        "Super Like": "إعجاب مميز",

        "Save Profile":
            "حفظ الملف الشخصي",

        "Gender": "الجنس",
        "Male": "ذكر",
        "Female": "أنثى",

        "Country": "الدولة",
        "City": "المدينة",
        "Education": "التعليم",
        "Profession": "المهنة",

        "Marital Status":
            "الحالة الاجتماعية",

        "Never Married":
            "لم يسبق له الزواج",

        "Divorced": "مطلق",
        "Widowed": "أرمل",

        "Religious Level":
            "مستوى الالتزام الديني",

        "Practicing": "ملتزم",
        "Moderate": "متوسط",
        "Prefer not to say":
            "أفضل عدم الإفصاح",

        "Phone": "الهاتف",
        "About me": "نبذة عني",

        "Find a Rishta":
            "البحث عن شريك زواج",

        "Age": "العمر",
        "Min": "الحد الأدنى",
        "Max": "الحد الأقصى",

        "Religion": "الدين",
        "Any Religion": "أي دين",
        "Islam": "الإسلام",

        "Sect / Maslak":
            "المذهب",

        "Any Sect": "أي مذهب",
        "Sunni": "سني",
        "Shia": "شيعي",

        "Other / Prefer not to say":
            "آخر / أفضل عدم الإفصاح",

        "Marriage Intent: Serious":
            "نية الزواج: جادة",

        "Search": "بحث",

        "Notifications": "الإشعارات",
        "Dark Mode": "الوضع الداكن",
        "Save Settings":
            "حفظ الإعدادات",

        "Profile Visibility":
            "ظهور الملف الشخصي",

        "Members Only":
            "للأعضاء فقط",

        "Private": "خاص",
        "Public": "عام",

        "Show online status":
            "إظهار حالة الاتصال",

        "Allow messages":
            "السماح بالرسائل",

        "Show photos only after matching":
            "إظهار الصور بعد التطابق فقط",

        "Save Privacy Settings":
            "حفظ إعدادات الخصوصية",

        "Manage Purchases":
            "إدارة المشتريات",

        "Current plan:":
            "الخطة الحالية:",

        "No active subscription.":
            "لا يوجد اشتراك نشط.",

        "View Rishta Plus":
            "عرض رشتة بلس",

        "$2 / month":
            "2 دولار / شهرياً",

        "Custom Icon":
            "الأيقونة المخصصة",

        "Save Custom Icon":
            "حفظ الأيقونة المخصصة",

        "Guardian Name":
            "اسم الولي / الوصي",

        "Guardian Email":
            "بريد الولي / الوصي",

        "Save Guardian":
            "حفظ بيانات الولي",

        "Halal Chat":
            "المحادثة الحلال",

        "Send Message":
            "إرسال الرسالة",

        "Halal Icebreaker":
            "سؤال تعارف حلال",

        "Write a respectful message...":
            "اكتب رسالة محترمة..."
    },


    es: {
        "Create Account": "Crear cuenta",
        "Login": "Iniciar sesión",
        "Back": "Atrás",
        "Full Name": "Nombre completo",
        "Email": "Correo electrónico",
        "Password": "Contraseña",
        "Profile": "Perfil",
        "Photos": "Fotos",
        "Settings": "Configuración",
        "Privacy": "Privacidad",
        "App Settings": "Configuración de la aplicación",
        "Manage Purchases": "Gestionar compras",
        "Logout": "Cerrar sesión",
        "Save Profile": "Guardar perfil",
        "Find Rishta": "Buscar pareja",
        "Who Liked Me": "Quién indicó que le gusto",
        "My Matches": "Mis coincidencias",
        "Search": "Buscar",
        "Age": "Edad",
        "Country": "País",
        "City": "Ciudad",
        "Education": "Educación",
        "Profession": "Profesión",
        "Male": "Hombre",
        "Female": "Mujer",
        "Pass": "Pasar",
        "Like": "Me gusta",
        "Super Like": "Me gusta especial",
        "Save Settings": "Guardar configuración",
        "Notifications": "Notificaciones",
        "Dark Mode": "Modo oscuro",
        "Send Message": "Enviar mensaje",
        "Halal Chat": "Chat Halal",
        "Back": "Atrás"
    },


    fr: {
        "Create Account": "Créer un compte",
        "Login": "Connexion",
        "Back": "Retour",
        "Full Name": "Nom complet",
        "Email": "E-mail",
        "Password": "Mot de passe",
        "Profile": "Profil",
        "Photos": "Photos",
        "Settings": "Paramètres",
        "Privacy": "Confidentialité",
        "App Settings": "Paramètres de l'application",
        "Manage Purchases": "Gérer les achats",
        "Logout": "Déconnexion",
        "Save Profile": "Enregistrer le profil",
        "Find Rishta": "Trouver un partenaire",
        "Who Liked Me": "Qui m'a aimé",
        "My Matches": "Mes correspondances",
        "Search": "Rechercher",
        "Age": "Âge",
        "Country": "Pays",
        "City": "Ville",
        "Education": "Éducation",
        "Profession": "Profession",
        "Male": "Homme",
        "Female": "Femme",
        "Pass": "Passer",
        "Like": "J'aime",
        "Super Like": "Super J'aime",
        "Save Settings": "Enregistrer les paramètres",
        "Notifications": "Notifications",
        "Dark Mode": "Mode sombre",
        "Send Message": "Envoyer le message",
        "Halal Chat": "Chat Halal"
    },


    it: {
        "Create Account": "Crea account",
        "Login": "Accedi",
        "Back": "Indietro",
        "Full Name": "Nome completo",
        "Email": "Email",
        "Password": "Password",
        "Profile": "Profilo",
        "Photos": "Foto",
        "Settings": "Impostazioni",
        "Privacy": "Privacy",
        "App Settings": "Impostazioni app",
        "Manage Purchases": "Gestisci acquisti",
        "Logout": "Esci",
        "Save Profile": "Salva profilo",
        "Find Rishta": "Trova partner",
        "Who Liked Me": "Chi mi ha messo Mi piace",
        "My Matches": "I miei match",
        "Search": "Cerca",
        "Age": "Età",
        "Country": "Paese",
        "City": "Città",
        "Education": "Istruzione",
        "Profession": "Professione",
        "Male": "Uomo",
        "Female": "Donna",
        "Pass": "Passa",
        "Like": "Mi piace",
        "Super Like": "Super Mi piace",
        "Save Settings": "Salva impostazioni",
        "Notifications": "Notifiche",
        "Dark Mode": "Modalità scura",
        "Send Message": "Invia messaggio",
        "Halal Chat": "Chat Halal"
    },


    de: {
        "Create Account": "Konto erstellen",
        "Login": "Anmelden",
        "Back": "Zurück",
        "Full Name": "Vollständiger Name",
        "Email": "E-Mail",
        "Password": "Passwort",
        "Profile": "Profil",
        "Photos": "Fotos",
        "Settings": "Einstellungen",
        "Privacy": "Datenschutz",
        "App Settings": "App-Einstellungen",
        "Manage Purchases": "Käufe verwalten",
        "Logout": "Abmelden",
        "Save Profile": "Profil speichern",
        "Find Rishta": "Partner finden",
        "Who Liked Me": "Wer mich mag",
        "My Matches": "Meine Matches",
        "Search": "Suchen",
        "Age": "Alter",
        "Country": "Land",
        "City": "Stadt",
        "Education": "Ausbildung",
        "Profession": "Beruf",
        "Male": "Männlich",
        "Female": "Weiblich",
        "Pass": "Überspringen",
        "Like": "Gefällt mir",
        "Super Like": "Super-Like",
        "Save Settings": "Einstellungen speichern",
        "Notifications": "Benachrichtigungen",
        "Dark Mode": "Dunkelmodus",
        "Send Message": "Nachricht senden",
        "Halal Chat": "Halal-Chat"
    },


    tr: {
        "Create Account": "Hesap Oluştur",
        "Login": "Giriş Yap",
        "Back": "Geri",
        "Full Name": "Ad Soyad",
        "Email": "E-posta",
        "Password": "Şifre",
        "Profile": "Profil",
        "Photos": "Fotoğraflar",
        "Settings": "Ayarlar",
        "Privacy": "Gizlilik",
        "App Settings": "Uygulama Ayarları",
        "Manage Purchases": "Satın Almaları Yönet",
        "Logout": "Çıkış Yap",
        "Save Profile": "Profili Kaydet",
        "Find Rishta": "Eş Bul",
        "Who Liked Me": "Beni Beğenenler",
        "My Matches": "Eşleşmelerim",
        "Search": "Ara",
        "Age": "Yaş",
        "Country": "Ülke",
        "City": "Şehir",
        "Education": "Eğitim",
        "Profession": "Meslek",
        "Male": "Erkek",
        "Female": "Kadın",
        "Pass": "Geç",
        "Like": "Beğen",
        "Super Like": "Süper Beğeni",
        "Save Settings": "Ayarları Kaydet",
        "Notifications": "Bildirimler",
        "Dark Mode": "Karanlık Mod",
        "Send Message": "Mesaj Gönder",
        "Halal Chat": "Helal Sohbet"
    },


    hi: {
        "Create Account": "खाता बनाएँ",
        "Login": "लॉगिन",
        "Back": "वापस",
        "Full Name": "पूरा नाम",
        "Email": "ईमेल",
        "Password": "पासवर्ड",
        "Profile": "प्रोफ़ाइल",
        "Photos": "फ़ोटो",
        "Settings": "सेटिंग्स",
        "Privacy": "गोपनीयता",
        "App Settings": "ऐप सेटिंग्स",
        "Manage Purchases": "खरीदारी प्रबंधित करें",
        "Logout": "लॉगआउट",
        "Save Profile": "प्रोफ़ाइल सेव करें",
        "Find Rishta": "रिश्ता खोजें",
        "Who Liked Me": "किसने मुझे पसंद किया",
        "My Matches": "मेरे मैच",
        "Search": "खोजें",
        "Age": "उम्र",
        "Country": "देश",
        "City": "शहर",
        "Education": "शिक्षा",
        "Profession": "पेशा",
        "Male": "पुरुष",
        "Female": "महिला",
        "Pass": "छोड़ें",
        "Like": "पसंद",
        "Super Like": "सुपर लाइक",
        "Save Settings": "सेटिंग्स सेव करें",
        "Notifications": "सूचनाएँ",
        "Dark Mode": "डार्क मोड",
        "Send Message": "संदेश भेजें",
        "Halal Chat": "हलाल चैट"
    },


    fa: {
        "Create Account": "ایجاد حساب",
        "Login": "ورود",
        "Back": "بازگشت",
        "Full Name": "نام کامل",
        "Email": "ایمیل",
        "Password": "رمز عبور",
        "Profile": "پروفایل",
        "Photos": "عکس‌ها",
        "Settings": "تنظیمات",
        "Privacy": "حریم خصوصی",
        "App Settings": "تنظیمات برنامه",
        "Manage Purchases": "مدیریت خریدها",
        "Logout": "خروج",
        "Save Profile": "ذخیره پروفایل",
        "Find Rishta": "پیدا کردن همسر",
        "Who Liked Me": "چه کسی من را پسندیده",
        "My Matches": "تطابق‌های من",
        "Search": "جستجو",
        "Age": "سن",
        "Country": "کشور",
        "City": "شهر",
        "Education": "تحصیلات",
        "Profession": "شغل",
        "Male": "مرد",
        "Female": "زن",
        "Pass": "رد کردن",
        "Like": "پسندیدن",
        "Super Like": "پسند ویژه",
        "Save Settings": "ذخیره تنظیمات",
        "Notifications": "اعلان‌ها",
        "Dark Mode": "حالت تاریک",
        "Send Message": "ارسال پیام",
        "Halal Chat": "گفتگوی حلال"
    },


    sq: {
        "Create Account": "Krijo llogari",
        "Login": "Hyr",
        "Back": "Kthehu",
        "Full Name": "Emri i plotë",
        "Email": "Email",
        "Password": "Fjalëkalimi",
        "Profile": "Profili",
        "Photos": "Fotot",
        "Settings": "Cilësimet",
        "Privacy": "Privatësia",
        "App Settings": "Cilësimet e aplikacionit",
        "Manage Purchases": "Menaxho blerjet",
        "Logout": "Dil",
        "Save Profile": "Ruaj profilin",
        "Find Rishta": "Gjej partner",
        "Who Liked Me": "Kush më pëlqeu",
        "My Matches": "Përputhjet e mia",
        "Search": "Kërko",
        "Age": "Mosha",
        "Country": "Shteti",
        "City": "Qyteti",
        "Education": "Arsimi",
        "Profession": "Profesioni",
        "Male": "Mashkull",
        "Female": "Femër",
        "Pass": "Kalo",
        "Like": "Pëlqej",
        "Super Like": "Super Pëlqim",
        "Save Settings": "Ruaj cilësimet",
        "Notifications": "Njoftimet",
        "Dark Mode": "Modaliteti i errët",
        "Send Message": "Dërgo mesazh",
        "Halal Chat": "Bisedë Halal"
    }

};


/* =========================================================
   FALLBACK TRANSLATIONS
   =========================================================
   For languages not yet manually translated above,
   English is safely used as fallback instead of breaking
   the application.
   ========================================================= */

const HR_EXTRA_LANGUAGE_CODES = [
    "nl",
    "el",
    "pl",
    "ro",
    "zh",
    "ru",
    "pt",
    "ms",
    "id",
    "fil",
    "th",
    "so",
    "sw",
    "bn",
    "ug",
    "ng",
    "fi",
    "cs",
    "sl",
    "sk",
    "bg",
    "hu"
];

HR_EXTRA_LANGUAGE_CODES.forEach(code => {

    if (!HR_TRANSLATIONS[code]) {
        HR_TRANSLATIONS[code] = {
            ...HR_TRANSLATIONS.en
        };
    }

});


/* =========================================================
   LANGUAGE SELECT SETUP
   ========================================================= */

function setupHalalRishtaLanguageDropdown() {

    const select =
        document.getElementById(
            "languageSelect"
        );

    if (!select) return;

    const currentSettings =
        typeof load === "function"
            ? load(
                STORAGE.SETTINGS,
                DEFAULT_SETTINGS
            )
            : {
                language: "en"
            };

    const savedLanguage =
        currentSettings.language || "en";

    select.innerHTML = "";

    Object.keys(
        HALAL_RISHTA_LANGUAGES
    ).forEach(code => {

        const option =
            document.createElement("option");

        option.value = code;

        option.textContent =
            HALAL_RISHTA_LANGUAGES[code].name;

        select.appendChild(option);

    });

    select.value =
        HALAL_RISHTA_LANGUAGES[savedLanguage]
            ? savedLanguage
            : "en";

    select.onchange = function() {

        changeHalalRishtaLanguage(
            this.value
        );

    };

}


/* =========================================================
   SAVE LANGUAGE
   ========================================================= */

function changeHalalRishtaLanguage(language) {

    if (
        !HALAL_RISHTA_LANGUAGES[language]
    ) {
        language = "en";
    }

    const settings =
        typeof load === "function"
            ? load(
                STORAGE.SETTINGS,
                DEFAULT_SETTINGS
            )
            : {
                ...DEFAULT_SETTINGS
            };

    settings.language =
        language;

    if (typeof save === "function") {

        save(
            STORAGE.SETTINGS,
            settings
        );

    } else {

        localStorage.setItem(
            "halal_rishta_settings",
            JSON.stringify(settings)
        );

    }

    applyHalalRishtaTranslation(
        language
    );

}


/* =========================================================
   GET CURRENT LANGUAGE
   ========================================================= */

function getHalalRishtaLanguage() {

    try {

        const settings =
            JSON.parse(
                localStorage.getItem(
                    "halal_rishta_settings"
                )
            );

        return (
            settings?.language ||
            "en"
        );

    } catch (error) {

        return "en";

    }

}


/* =========================================================
   RTL / LTR
   ========================================================= */

function applyHalalRishtaDirection(
    language
) {

    const lang =
        HALAL_RISHTA_LANGUAGES[language];

    if (!lang) return;

    document.documentElement.lang =
        language;

    document.documentElement.dir =
        lang.dir;

    document.body.dir =
        lang.dir;

}


/* =========================================================
   TRANSLATE TEXT NODE
   ========================================================= */

function translateHalalRishtaTextNode(
    node,
    dictionary
) {

    const original =
        node.nodeValue.trim();

    if (!original) return;

    if (
        dictionary[original]
    ) {

        node.nodeValue =
            node.nodeValue.replace(
                original,
                dictionary[original]
            );

    }

}


/* =========================================================
   TRANSLATE PLACEHOLDERS
   ========================================================= */

function translateHalalRishtaInputs(
    dictionary
) {

    document
        .querySelectorAll(
            "input[placeholder], textarea[placeholder]"
        )
        .forEach(element => {

            const original =
                element.getAttribute(
                    "placeholder"
                );

            if (
                dictionary[original]
            ) {

                element.setAttribute(
                    "placeholder",
                    dictionary[original]
                );

            }

        });

}


/* =========================================================
   TRANSLATE SELECT OPTIONS
   ========================================================= */

function translateHalalRishtaOptions(
    dictionary
) {

    document
        .querySelectorAll(
            "option"
        )
        .forEach(option => {

            const original =
                option.textContent.trim();

            if (
                dictionary[original]
            ) {

                option.textContent =
                    dictionary[original];

            }

        });

}


/* =========================================================
   TRANSLATE LABELS / BUTTONS / HEADINGS
   ========================================================= */

function translateHalalRishtaElements(
    dictionary
) {

    const elements =
        document.querySelectorAll(
            "h1,h2,h3,h4,h5,h6,p,button,label,li,span"
        );

    elements.forEach(element => {

        if (
            element.children.length > 0
        ) {

            return;

        }

        const original =
            element.textContent.trim();

        if (
            dictionary[original]
        ) {

            element.textContent =
                dictionary[original];

        }

    });

}


/* =========================================================
   FULL TRANSLATION
   ========================================================= */

function applyHalalRishtaTranslation(
    language
) {

    if (
        !HALAL_RISHTA_LANGUAGES[language]
    ) {
        language = "en";
    }

    const dictionary =
        HR_TRANSLATIONS[language] ||
        HR_TRANSLATIONS.en;

    applyHalalRishtaDirection(
        language
    );

    translateHalalRishtaElements(
        dictionary
    );

    translateHalalRishtaInputs(
        dictionary
    );

    translateHalalRishtaOptions(
        dictionary
    );

    /* -----------------------------------------
       Store selected language
       ----------------------------------------- */

    try {

        const settings =
            JSON.parse(
                localStorage.getItem(
                    "halal_rishta_settings"
                )
            ) || {};

        settings.language =
            language;

        localStorage.setItem(
            "halal_rishta_settings",
            JSON.stringify(settings)
        );

    } catch (error) {

        console.error(
            "Language save error:",
            error
        );

    }

}


/* =========================================================
   TRANSLATE DYNAMIC CONTENT
   ========================================================= */

function setupHalalRishtaTranslationObserver() {

    if (
        typeof MutationObserver ===
        "undefined"
    ) {
        return;
    }

    const observer =
        new MutationObserver(
            function() {

                const language =
                    getHalalRishtaLanguage();

                const dictionary =
                    HR_TRANSLATIONS[language] ||
                    HR_TRANSLATIONS.en;

                translateHalalRishtaElements(
                    dictionary
                );

                translateHalalRishtaInputs(
                    dictionary
                );

                translateHalalRishtaOptions(
                    dictionary
                );

            }
        );

    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );

}


/* =========================================================
   LANGUAGE INITIALIZATION
   ========================================================= */

function initializeHalalRishtaLanguages() {

    setupHalalRishtaLanguageDropdown();

    const language =
        getHalalRishtaLanguage();

    applyHalalRishtaTranslation(
        language
    );

    setupHalalRishtaTranslationObserver();

}


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeHalalRishtaLanguages();

    }
);


/* =========================================================
   PUBLIC LANGUAGE API
   ========================================================= */

window.HalalRishtaLanguage = {

    set: function(language) {

        changeHalalRishtaLanguage(
            language
        );

    },

    get: function() {

        return getHalalRishtaLanguage();

    },

    languages:
        HALAL_RISHTA_LANGUAGES

};


/* =========================================================
   END — TRANSLATION SYSTEM
   ========================================================= */
