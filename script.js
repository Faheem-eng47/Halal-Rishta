/* =========================================================
   HALAL RISHTA
   Complete script.js
   Languages + Current App Functions
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
    CUSTOM_ICON: "halal_rishta_custom_icon"
};

/* =========================================================
   LANGUAGES
   30+ INTERNATIONAL LANGUAGES
   ========================================================= */

const LANGUAGES = [
    {
        code: "en",
        name: "English",
        nativeName: "English"
    },
    {
        code: "ar",
        name: "Arabic",
        nativeName: "العربية"
    },
    {
        code: "es",
        name: "Spanish",
        nativeName: "Español"
    },
    {
        code: "it",
        name: "Italian",
        nativeName: "Italiano"
    },
    {
        code: "fr",
        name: "French",
        nativeName: "Français"
    },
    {
        code: "nl",
        name: "Dutch",
        nativeName: "Nederlands"
    },
    {
        code: "el",
        name: "Greek",
        nativeName: "Ελληνικά"
    },
    {
        code: "tr",
        name: "Turkish",
        nativeName: "Türkçe"
    },
    {
        code: "fa",
        name: "Persian",
        nativeName: "فارسی"
    },
    {
        code: "hi",
        name: "Hindi",
        nativeName: "हिन्दी"
    },
    {
        code: "pl",
        name: "Polish",
        nativeName: "Polski"
    },
    {
        code: "ro",
        name: "Romanian",
        nativeName: "Română"
    },
    {
        code: "zh",
        name: "Chinese",
        nativeName: "中文"
    },
    {
        code: "ru",
        name: "Russian",
        nativeName: "Русский"
    },
    {
        code: "pt",
        name: "Portuguese",
        nativeName: "Português"
    },
    {
        code: "ms",
        name: "Malay",
        nativeName: "Bahasa Melayu"
    },
    {
        code: "id",
        name: "Indonesian",
        nativeName: "Bahasa Indonesia"
    },
    {
        code: "fil",
        name: "Filipino",
        nativeName: "Filipino"
    },
    {
        code: "th",
        name: "Thai",
        nativeName: "ไทย"
    },
    {
        code: "sq",
        name: "Albanian",
        nativeName: "Shqip"
    },
    {
        code: "so",
        name: "Somali",
        nativeName: "Soomaali"
    },
    {
        code: "sw",
        name: "Swahili",
        nativeName: "Kiswahili"
    },
    {
        code: "bn",
        name: "Bengali",
        nativeName: "বাংলা"
    },
    {
        code: "lg",
        name: "Luganda",
        nativeName: "Luganda"
    },
    {
        code: "ha",
        name: "Hausa",
        nativeName: "Hausa"
    },
    {
        code: "yo",
        name: "Yoruba",
        nativeName: "Yorùbá"
    },
    {
        code: "ig",
        name: "Igbo",
        nativeName: "Igbo"
    },
    {
        code: "fi",
        name: "Finnish",
        nativeName: "Suomi"
    },
    {
        code: "cs",
        name: "Czech",
        nativeName: "Čeština"
    },
    {
        code: "sl",
        name: "Slovenian",
        nativeName: "Slovenščina"
    },
    {
        code: "sk",
        name: "Slovak",
        nativeName: "Slovenčina"
    },
    {
        code: "bg",
        name: "Bulgarian",
        nativeName: "Български"
    },
    {
        code: "hu",
        name: "Hungarian",
        nativeName: "Magyar"
    }
];

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

/* =========================================================
   CURRENT STATE
   ========================================================= */

let currentSwipeProfileId = null;
let currentChatProfileId = null;

/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function save(key, value) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch (error) {
        console.error("Save error:", error);
        alert(
            "Unable to save this information on this device."
        );
    }
}

function load(key, fallback = null) {
    try {
        const value =
            localStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : fallback;

    } catch (error) {
        console.error(
            "Storage error:",
            error
        );

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
        Math.random()
            .toString(36)
            .substring(2, 8)
    );
}

function todayKey() {
    return new Date()
        .toISOString()
        .slice(0, 10);
}

function getCurrentUser() {
    return load(
        STORAGE.USER,
        null
    );
}

function isLoggedIn() {
    return !!getCurrentUser();
}

/* =========================================================
   LANGUAGE HELPERS
   ========================================================= */

function getLanguageByCode(code) {

    return LANGUAGES.find(
        language =>
            language.code === code
    );
}

function getCurrentLanguage() {

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    const code =
        settings.language || "en";

    return (
        getLanguageByCode(code) ||
        getLanguageByCode("en")
    );
}

/* =========================================================
   BUILD LANGUAGE DROPDOWN
   ========================================================= */

function setupLanguageSelector() {

    const select =
        document.getElementById(
            "languageSelect"
        );

    if (!select) return;

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    const savedLanguage =
        settings.language || "en";

    select.innerHTML = "";

    LANGUAGES.forEach(language => {

        const option =
            document.createElement("option");

        option.value =
            language.code;

        option.textContent =
            language.nativeName;

        option.title =
            language.name;

        if (
            language.code ===
            savedLanguage
        ) {
            option.selected = true;
        }

        select.appendChild(option);
    });

    select.addEventListener(
        "change",
        function () {

            saveLanguage(
                this.value
            );

            applyLanguageDirection();

            alert(
                "Language preference saved."
            );
        }
    );
}

/* =========================================================
   SAVE LANGUAGE
   ========================================================= */

function saveLanguage(language) {

    const validLanguage =
        getLanguageByCode(language);

    if (!validLanguage) {

        console.warn(
            "Unsupported language:",
            language
        );

        return;
    }

    const settings =
        load(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    settings.language =
        validLanguage.code;

    save(
        STORAGE.SETTINGS,
        settings
    );

    applyLanguageDirection();
}

/* =========================================================
   LANGUAGE DIRECTION
   ========================================================= */

function applyLanguageDirection() {

    const language =
        getCurrentLanguage();

    if (!language) return;

    const rtlLanguages = [
        "ar",
        "fa"
    ];

    const isRTL =
        rtlLanguages.includes(
            language.code
        );

    document.documentElement.lang =
        language.code;

    document.documentElement.dir =
        isRTL
            ? "rtl"
            : "ltr";
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

        return (
            new Date(
                purchase.expiresAt
            ) > new Date()
        );
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

            page.classList.remove(
                "active"
            );
        });

    const page =
        document.getElementById(
            pageId
        );

    if (!page) {

        console.warn(
            "Page not found:",
            pageId
        );

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
}

/* =========================================================
   ACCOUNT CREATION
   ========================================================= */

function createAccount() {

    const form =
        document.querySelector(
            "#register form"
        );

    if (!form) return;

    const inputs =
        form.querySelectorAll(
            "input"
        );

    const fullName =
        inputs[0]?.value.trim() || "";

    const email =
        inputs[1]
            ?.value
            .trim()
            .toLowerCase() || "";

    const password =
        inputs[2]?.value || "";

    if (
        !fullName ||
        !email ||
        !password
    ) {

        alert(
            "Please complete all fields."
        );

        return;
    }

    if (password.length < 6) {

        alert(
            "Password must be at least 6 characters."
        );

        return;
    }

    const existing =
        load(
            STORAGE.ACCOUNT,
            null
        );

    if (
        existing &&
        existing.email === email
    ) {

        alert(
            "An account with this email already exists."
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
            fullName:
                account.fullName,
            email:
                account.email
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
            language:
                getCurrentLanguage()
                    ?.code || "en"
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
        "Account created successfully."
    );

    showPage("app");
}

/* =========================================================
   LOGIN
   ========================================================= */

function loginUser() {

    const form =
        document.querySelector(
            "#login form"
        );

    if (!form) return;

    const inputs =
        form.querySelectorAll(
            "input"
        );

    const email =
        inputs[0]
            ?.value
            .trim()
            .toLowerCase() || "";

    const password =
        inputs[1]?.value || "";

    const account =
        load(
            STORAGE.ACCOUNT,
            null
        );

    if (!account) {

        alert(
            "No account found. Please create an account first."
        );

        showPage("register");

        return;
    }

    if (
        account.email !== email ||
        account.password !== password
    ) {

        alert(
            "Incorrect email or password."
        );

        return;
    }

    save(
        STORAGE.USER,
        {
            id: account.id,
            fullName:
                account.fullName,
            email:
                account.email
        }
    );

    if (
        !load(
            STORAGE.PROFILE
        )
    ) {

        save(
            STORAGE.PROFILE,
            {
                id: account.id,
                fullName:
                    account.fullName,
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
        "Login successful."
    );

    showPage("app");
}

/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    remove(
        STORAGE.USER
    );

    currentSwipeProfileId =
        null;

    currentChatProfileId =
        null;

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
                    ? "Rishta Plus"
                    : "Free";
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
                ? "Rishta Plus"
                : "Free";
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
                date:
                    todayKey(),
                count: 0
            }
        );

    if (
        data.date !==
        todayKey()
    ) {

        return {
            date:
                todayKey(),
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
                date:
                    todayKey(),
                count: 0
            }
        );

    if (
        data.date !==
        todayKey()
    ) {

        return {
            date:
                todayKey(),
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

        dashboard.textContent =
            text;
    }

    if (swipePage) {

        swipePage.textContent =
            text;
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

        dashboard.textContent =
            text;
    }

    if (swipePage) {

        swipePage.textContent =
            text;
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
            "You have reached today's 30 free swipes. Upgrade to Rishta Plus for unlimited swipes."
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
            item =>
                item.profileId
        ),
        ...passed.map(
            item =>
                item.profileId
        )
    ];

    return DEMO_PROFILES.filter(
        person =>
            !excluded.includes(
                person.id
            )
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

        currentSwipeProfileId =
            null;

        name.textContent =
            "No profiles available";

        details.textContent =
            "New compatible members will appear here.";

        about.textContent =
            "Try changing your search preferences or check again later.";

        if (photo) {

            photo.textContent =
                "👤";
        }

        if (intent) {

            intent.style.display =
                "none";
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
        "Looking for a serious marriage.";

    if (intent) {

        intent.style.display =
            profile.seriousIntent
                ? "inline-block"
                : "none";
    }

    if (photo) {

        photo.innerHTML =
            `
                <span
                    style="font-size:64px;"
                >
                    👤
                </span>
            `;
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

        id:
            generateId("pass"),

        profileId,

        createdAt:
            new Date()
                .toISOString()
    });

    save(
        STORAGE.PASSES,
        passes
    );

    recordSwipe();

    currentSwipeProfileId =
        null;

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

            id:
                generateId("like"),

            profileId,

            createdAt:
                new Date()
                    .toISOString()
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

    currentSwipeProfileId =
        null;

    loadSwipeProfile();

    alert(
        "❤️ Like sent."
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
            "Super Likes are available with Rishta Plus. You can also earn Super Likes by watching a rewarded ad."
        );

        return;
    }

    const data =
        getSuperLikeData();

    if (data.count >= 5) {

        alert(
            "You have used today's 5 Super Likes."
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

    currentSwipeProfileId =
        null;

    updateSuperLikeDisplay();

    loadSwipeProfile();

    alert(
        "⭐ Super Like sent."
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
        profiles.filter(
            profile => {

                if (
                    profile.age <
                    ageMin ||
                    profile.age >
                    ageMax
                ) {
                    return false;
                }

                if (
                    country &&
                    profile.country
                        .toLowerCase() !==
                    country
                ) {
                    return false;
                }

                if (
                    city &&
                    profile.city
                        .toLowerCase() !==
                    city
                ) {
                    return false;
                }

                if (
                    religion &&
                    profile.religion !==
                    religion
                ) {
                    return false;
                }

                if (
                    sect &&
                    profile.sect !==
                    sect
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
            }
        );

    if (!profiles.length) {

        results.innerHTML =
            `
                <div class="card">
                    <p>
                        No matching profiles found.
                    </p>
                </div>
            `;

        return;
    }

    results.innerHTML =
        profiles
            .map(
                profile =>
                    `
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
                                            💍 Serious Marriage Intent
                                        </p>
                                    `
                                    : ""
                            }

                            <p>
                                ${escapeHTML(
                                    profile.about ||
                                    ""
                                )}
                            </p>

                            <div
                                class="swipe-actions"
                            >

                                <button
                                    type="button"
                                    class="secondary"
                                    onclick="passProfile('${profile.id}')"
                                >
                                    ❌ Pass
                                </button>

                                <button
                                    type="button"
                                    class="primary"
                                    onclick="likeProfile('${profile.id}')"
                                >
                                    ❤️ Like
                                </button>

                                <button
                                    type="button"
                                    class="primary"
                                    onclick="superLikeProfile('${profile.id}')"
                                >
                                    ⭐ Super Like
                                </button>

                            </div>

                        </div>
                    `
            )
            .join("");
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

        id:
            generateId("like"),

        profileId,

        createdAt:
            new Date()
                .toISOString()
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
        "❤️ Like sent."
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

            id:
                generateId("pass"),

            profileId,

            createdAt:
                new Date()
                    .toISOString()
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
            "Super Likes are available with Rishta Plus."
        );

        return;
    }

    const data =
        getSuperLikeData();

    if (data.count >= 5) {

        alert(
            "You have used today's 5 Super Likes."
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
        "⭐ Super Like sent."
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
            "You already have today's maximum of 5 Super Likes."
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
        "🎬 Demo reward completed. Super Likes added."
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

        id:
            generateId("match"),

        profileId:
            profile.id,

        fullName:
            profile.fullName,

        createdAt:
            new Date()
                .toISOString()
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

        container.innerHTML =
            `
                <p class="small">
                    No matches yet. Start finding a Rishta.
                </p>
            `;

        return;
    }

    container.innerHTML =
        matches
            .map(
                match =>
                    `
                        <div class="result-card">

                            <h3>
                                💚
                                ${escapeHTML(
                                    match.fullName
                                )}
                            </h3>

                            <p>
                                You have a match.
                            </p>

                            <button
                                type="button"
                                class="primary"
                                onclick="openChat('${match.profileId}')"
                            >
                                💬 Open Halal Chat
                            </button>

                        </div>
                    `
            )
            .join("");
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

        container.innerHTML =
            `
                <p class="small">
                    Your likes will appear here.
                </p>
            `;

        return;
    }

    container.innerHTML =
        likes
            .map(
                like => {

                    const profile =
                        DEMO_PROFILES.find(
                            person =>
                                person.id ===
                                like.profileId
                        );

                    if (!profile)
                        return "";

                    return `
                        <div class="result-card">

                            <h3>
                                ❤️
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

                            <button
                                type="button"
                                class="primary"
                                onclick="openChat('${profile.id}')"
                            >
                                💬 Chat
                            </button>

                        </div>
                    `;
                }
            )
            .join("");
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
            "Chat is available after a mutual match."
        );

        return;
    }

    currentChatProfileId =
        profileId;

    showPage("chat");
}

/* =========================================================
   RENDER CHAT
   ========================================================= */

function renderChat() {

    const container =
        document.getElementById(
            "chatMessages"
        );

    if (!container) return;

    if (!currentChatProfileId) {

        container.innerHTML =
            `
                <p class="small">
                    Select a match to start chatting.
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

        container.innerHTML =
            `
                <p class="small">
                    No messages yet. Start with a respectful message.
                </p>
            `;

        return;
    }

    container.innerHTML =
        messages
            .map(
                message =>
                    `
                        <div
                            class="chat-message"
                        >

                            <strong>
                                ${
                                    message.sender ===
                                    "me"
                                        ? "You"
                                        : "Match"
                                }
                            </strong>

                            <p>
                                ${escapeHTML(
                                    message.text
                                )}
                            </p>

                        </div>
                    `
            )
            .join("");
}

/* =========================================================
   SEND MESSAGE
   ========================================================= */

function sendMessage() {

    if (!currentChatProfileId) {

        alert(
            "Please open a match first."
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
            "Please write a message."
        );

        return;
    }

    const messages =
        load(
            STORAGE.MESSAGES,
            []
        );

    messages.push({

        id:
            generateId("message"),

        profileId:
            currentChatProfileId,

        sender:
            "me",

        text,

        createdAt:
            new Date()
                .toISOString()
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
                document.getElementById(
                    id
                );

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
                document.getElementById(
                    id
                );

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
            "Users must be 18 or older."
        );

        return;
    }

    if (!profile.fullName) {

        alert(
            "Please enter your full name."
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
        "Profile saved successfully."
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

        container.innerHTML =
            `
                <p>
                    No photos uploaded yet.
                </p>
            `;

        return;
    }

    container.innerHTML =
        photos
            .map(
                photo =>
                    `
                        <div
                            class="photo-item"
                        >

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
                                onclick="deletePhoto('${photo.id}')"
                            >
                                Delete
                            </button>

                        </div>
                    `
            )
            .join("");
}

function addPhoto(file) {

    if (!file) return;

    if (
        file.size >
        5 * 1024 * 1024
    ) {

        alert(
            "Maximum 5MB per image."
        );

        return;
    }

    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        alert(
            "Please select an image file."
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
            "Maximum 6 photos allowed."
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
                    new Date()
                        .toISOString()
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
            )?.checked ?? false
    };

    save(
        STORAGE.SETTINGS,
        settings
    );

    applySavedSettings();

    alert(
        "Settings saved."
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

    setupLanguageSelector();

    applyLanguageDirection();
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
        "Privacy settings saved."
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
                "Rishta Plus is active.";

        } else {

            status.textContent =
                "No active subscription.";
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
            "Secure payment setup is required before Rishta Plus can be activated.";
    }

    alert(
        "Secure payment is required. Rishta Plus will not be activated until a real payment provider verifies the $2/month subscription."
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
            "Please enter guardian name and email."
        );

        return;
    }

    save(
        STORAGE.GUARDIAN,
        {
            name,
            email,
            updatedAt:
                new Date()
                    .toISOString()
        }
    );

    alert(
        "Guardian information saved."
    );
}

/* =========================================================
   CUSTOM ICON
   ========================================================= */

function openCustomIcon() {

    showPage(
        "customIcon"
    );
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
            "Please select an image."
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
            "Maximum 5MB."
        );

        return;
    }

    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        alert(
            "Please select an image file."
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
                        new Date()
                            .toISOString()
                }
            );

            alert(
                "Custom icon saved."
            );
        };

    reader.readAsDataURL(file);
}

/* =========================================================
   RESET ACTIVITY
   ========================================================= */

function resetActivity() {

    save(
        STORAGE.SWIPES,
        {
            date:
                todayKey(),
            count: 0
        }
    );

    save(
        STORAGE.SUPERLIKES,
        {
            date:
                todayKey(),
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

    return String(
        value ?? ""
    )
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
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* -----------------------------------------
           SETTINGS
           ----------------------------------------- */

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
                function () {

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
    }
);

/* =========================================================
   GLOBAL ERROR REPORTING
   ========================================================= */

window.addEventListener(
    "error",
    function (event) {

        console.error(
            "Halal Rishta JavaScript Error:",
            event.error ||
            event.message
        );
    }
);

/* =========================================================
   END
   ========================================================= */
