"use strict";

/* =========================================================
   HALAL RISHTA - script.js
   LANGUAGES:
   English, Arabic, Spanish, French, Albanian,
   Bosnian, Russian, Bengali
   ========================================================= */

/* =========================
   STORAGE
   ========================= */

const STORAGE = {
    USER: "halal_rishta_user",
    ACCOUNT: "halal_rishta_account",
    PROFILE: "halal_rishta_profile",
    SETTINGS: "halal_rishta_settings",
    PRIVACY: "halal_rishta_privacy",
    PURCHASE: "halal_rishta_purchase",
    PHOTOS: "halal_rishta_photos",
    LIKES: "halal_rishta_likes",
    PASSES: "halal_rishta_passes",
    MATCHES: "halal_rishta_matches",
    MESSAGES: "halal_rishta_messages",
    SWIPES: "halal_rishta_swipes",
    SUPERLIKES: "halal_rishta_superlikes",
    GUARDIAN: "halal_rishta_guardian",
    CUSTOM_ICON: "halal_rishta_custom_icon"
};

/* =========================
   8 LANGUAGES ONLY
   ========================= */

const HALAL_RISHTA_LANGUAGES = [
    "en",
    "ar",
    "es",
    "fr",
    "sq",
    "bs",
    "ru",
    "bn"
];

const LANGUAGE_NAMES = {
    en: "English",
    ar: "العربية",
    es: "Español",
    fr: "Français",
    sq: "Shqip",
    bs: "Bosanski",
    ru: "Русский",
    bn: "বাংলা"
};

/* =========================
   DEFAULT DATA
   ========================= */

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
    package: null,
    price: 0,
    currency: "USD",
    paymentMethod: null,
    activatedAt: null,
    expiresAt: null
};

const DEMO_PROFILES = [
    {
        id: "demo1",
        fullName: "Ayesha",
        age: 27,
        gender: "female",
        country: "Saudi Arabia",
        city: "Riyadh",
        education: "Bachelor",
        profession: "Teacher",
        maritalStatus: "Never Married",
        religiousLevel: "Practicing",
        about: "Looking for a respectful and serious marriage.",
        seriousIntent: true
    },
    {
        id: "demo2",
        fullName: "Maryam",
        age: 25,
        gender: "female",
        country: "Pakistan",
        city: "Lahore",
        education: "Master's",
        profession: "Designer",
        maritalStatus: "Never Married",
        religiousLevel: "Practicing",
        about: "Family oriented and serious about marriage.",
        seriousIntent: true
    },
    {
        id: "demo3",
        fullName: "Fatima",
        age: 29,
        gender: "female",
        country: "UAE",
        city: "Dubai",
        education: "Bachelor",
        profession: "Accountant",
        maritalStatus: "Never Married",
        religiousLevel: "Practicing",
        about: "Interested in a genuine and respectful marriage.",
        seriousIntent: true
    },
    {
        id: "demo4",
        fullName: "Omar",
        age: 30,
        gender: "male",
        country: "Saudi Arabia",
        city: "Jeddah",
        education: "Bachelor",
        profession: "Engineer",
        maritalStatus: "Never Married",
        religiousLevel: "Practicing",
        about: "Serious about finding a compatible life partner.",
        seriousIntent: true
    },
    {
        id: "demo5",
        fullName: "Ahmed",
        age: 32,
        gender: "male",
        country: "Pakistan",
        city: "Islamabad",
        education: "Master's",
        profession: "Software Engineer",
        maritalStatus: "Never Married",
        religiousLevel: "Practicing",
        about: "Looking for a serious halal marriage.",
        seriousIntent: true
    }
];

/* =========================
   TRANSLATIONS
   ========================= */

const TRANSLATIONS = {

    en: {
        "Create Account":"Create Account",
        "Login":"Login",
        "Back":"Back",
        "Full Name":"Full Name",
        "Email":"Email",
        "Password":"Password",
        "My Account":"My Account",
        "Free":"Free",
        "Profile":"Profile",
        "Photos":"Photos",
        "Settings":"Settings",
        "Privacy":"Privacy",
        "App Settings":"App Settings",
        "Manage Purchases":"Manage Purchases",
        "Rishta Plus":"Rishta Plus",
        "Custom Icon":"Custom Icon",
        "Wali / Guardian":"Wali / Guardian",
        "Logout":"Logout",
        "Swipe Rishtas":"Swipe Rishtas",
        "Find Rishta":"Find Rishta",
        "Who Liked Me":"Who Liked Me",
        "My Matches":"My Matches",
        "Pass":"Pass",
        "Like":"Like",
        "Super Like":"Super Like",
        "Save Profile":"Save Profile",
        "Save Settings":"Save Settings",
        "Save Privacy Settings":"Save Privacy Settings",
        "Save Guardian":"Save Guardian",
        "Send Message":"Send Message",
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
        "$2 / month":"$2 / month",
        "Delete":"Delete",
        "Chat
