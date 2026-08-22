/* =========================================================
   HALAL RISHTA
   MAIN JAVASCRIPT
   Swipe + Like + Match + Chat + Profile + Settings
   Compatible with current index.html
   ========================================================= */


/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE = {

    USER: "halal_rishta_user",

    PROFILE: "halal_rishta_profile",

    PHOTOS: "halal_rishta_photos",

    SETTINGS: "halal_rishta_settings",

    PRIVACY: "halal_rishta_privacy",

    PURCHASE: "halal_rishta_purchase",

    SWIPES: "halal_rishta_swipes",

    SUPER_LIKES: "halal_rishta_super_likes",

    LIKES: "halal_rishta_likes",

    MATCHES: "halal_rishta_matches",

    MESSAGES: "halal_rishta_messages",

    GUARDIAN: "halal_rishta_guardian"

};


/* =========================================================
   DEFAULT DATA
   ========================================================= */

const DEFAULT_PROFILE = {

    fullName: "",

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

    seriousIntent: true

};


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

    activatedAt: "",

    expiresAt: ""

};


/* =========================================================
   DEMO PROFILES
   =========================================================
   These are temporary local demo profiles.
   Real members will later come from the database.
   ========================================================= */

const DEMO_PROFILES = [

    {
        id: "demo-001",
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
        about: "Looking for a respectful and serious marriage relationship."
    },

    {
        id: "demo-002",
        fullName: "Maryam",
        age: 25,
        gender: "female",
        country: "Pakistan",
        city: "Lahore",
        education: "Master",
        profession: "Designer",
        maritalStatus: "never_married",
        religiousLevel: "practicing",
        religion: "islam",
        sect: "sunni",
        seriousIntent: true,
        about: "Interested in a sincere and family-oriented marriage."
    },

    {
        id: "demo-003",
        fullName: "Fatima",
        age: 29,
        gender: "female",
        country: "United Arab Emirates",
        city: "Dubai",
        education: "Master",
        profession: "Accountant",
        maritalStatus: "never_married",
        religiousLevel: "practicing",
        religion: "islam",
        sect: "shia",
        seriousIntent: true,
        about: "Seeking a compatible partner with serious intentions."
    },

    {
        id: "demo-004",
        fullName: "Zainab",
        age: 26,
        gender: "female",
        country: "United Kingdom",
        city: "London",
        education: "Bachelor",
        profession: "Healthcare",
        maritalStatus: "never_married",
        religiousLevel: "moderate",
        religion: "islam",
        sect: "sunni",
        seriousIntent: true,
        about: "Looking for a respectful, honest and serious partner."
    },

    {
        id: "demo-005",
        fullName: "Hafsa",
        age: 30,
        gender: "female",
        country: "Canada",
        city: "Toronto",
        education: "Master",
        profession: "Engineer",
        maritalStatus: "never_married",
        religiousLevel: "practicing",
        religion: "islam",
        sect: "other",
        seriousIntent: true,
        about: "Marriage is my intention and family involvement is welcome."
    }

];


/* =========================================================
   BASIC HELPERS
   ========================================================= */

function saveData(key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

}


function loadData(key, fallback) {

    try {

        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error("Storage error:", error);

        return fallback;
    }

}


function removeData(key) {

    localStorage.removeItem(key);

}


function generateId() {

    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 9)
    );

}


function getCurrentUser() {

    return loadData(
        STORAGE.USER,
        null
    );

}


function isLoggedIn() {

    return !!getCurrentUser();

}


function isPremium() {

    const purchase = loadData(
        STORAGE.PURCHASE,
        DEFAULT_PURCHASE
    );

    return (
        purchase &&
        purchase.active === true
    );

}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {

        page.classList.remove("active");

    });


    const target = document.getElementById(pageId);

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


    if (pageId === "app") {

        updateDashboard();

    }


    if (pageId === "swipe") {

        loadSwipeScreen();

    }


    if (pageId === "likes") {

        renderLikes();

    }


    if (pageId === "matches") {

        renderMatches();

    }


    if (pageId === "chat") {

        renderChat();

    }

}


/* =========================================================
   REGISTER
   ========================================================= */

function createAccount() {

    const registerPage =
        document.getElementById("register");

    if (!registerPage) {
        return;
    }


    const inputs =
        registerPage.querySelectorAll("input");


    const fullName =
        inputs[0]?.value.trim();


    const email =
        inputs[1]?.value.trim().toLowerCase();


    const password =
        inputs[2]?.value;


    if (!fullName || !email || !password) {

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


    const existingUser =
        loadData(
            STORAGE.USER,
            null
        );


    const user = {

        id:
            existingUser?.id ||
            generateId(),

        fullName,

        email,

        password,

        createdAt:
            existingUser?.createdAt ||
            new Date().toISOString()

    };


    saveData(
        STORAGE.USER,
        user
    );


    if (!loadData(STORAGE.PROFILE, null)) {

        saveData(
            STORAGE.PROFILE,
            {
                ...DEFAULT_PROFILE,
                fullName
            }
        );

    }


    if (!loadData(STORAGE.SETTINGS, null)) {

        saveData(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );

    }


    if (!loadData(STORAGE.PRIVACY, null)) {

        saveData(
            STORAGE.PRIVACY,
            DEFAULT_PRIVACY
        );

    }


    if (!loadData(STORAGE.PURCHASE, null)) {

        saveData(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );

    }


    alert(
        "Account created successfully."
    );


    showPage("app");

}


/* =========================================================
   LOGIN
   ========================================================= */

function loginUser() {

    const loginPage =
        document.getElementById("login");

    if (!loginPage) {
        return;
    }


    const inputs =
        loginPage.querySelectorAll("input");


    const email =
        inputs[0]?.value.trim().toLowerCase();


    const password =
        inputs[1]?.value;


    const user =
        loadData(
            STORAGE.USER,
            null
        );


    if (!user) {

        alert(
            "No account found. Please create an account first."
        );

        showPage("register");

        return;
    }


    if (
        email !== user.email ||
        password !== user.password
    ) {

        alert(
            "Incorrect email or password."
        );

        return;
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
                ? "Unlimited swipes + premium features"
                : "30 daily swipes";

    }


    updateSwipeCounters();

}


/* =========================================================
   PROFILE
   ========================================================= */

function openProfile() {

    fillProfileForm();

    showPage("profile");

}


function fillProfileForm() {

    const profile =
        loadData(
            STORAGE.PROFILE,
            DEFAULT_PROFILE
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


    fields.forEach(id => {

        const element =
            document.getElementById(id);

        if (element) {

            element.value =
                profile[id] || "";

        }

    });

}


function updateProfile() {

    const profile = {

        fullName:
            document.getElementById(
                "fullName"
            )?.value.trim() || "",

        age:
            document.getElementById(
                "age"
            )?.value || "",

        gender:
            document.getElementById(
                "gender"
            )?.value || "",

        country:
            document.getElementById(
                "country"
            )?.value.trim() || "",

        city:
            document.getElementById(
                "city"
            )?.value.trim() || "",

        education:
            document.getElementById(
                "education"
            )?.value.trim() || "",

        profession:
            document.getElementById(
                "profession"
            )?.value.trim() || "",

        maritalStatus:
            document.getElementById(
                "maritalStatus"
            )?.value || "",

        religiousLevel:
            document.getElementById(
                "religiousLevel"
            )?.value || "",

        phone:
            document.getElementById(
                "phone"
            )?.value.trim() || "",

        about:
            document.getElementById(
                "about"
            )?.value.trim() || "",

        religion: "islam",

        sect: "",

        seriousIntent: true

    };


    saveData(
        STORAGE.PROFILE,
        profile
    );


    const user =
        getCurrentUser();


    if (user && profile.fullName) {

        user.fullName =
            profile.fullName;

        saveData(
            STORAGE.USER,
            user
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

    renderPhotos();

    showPage("photos");

}


function renderPhotos() {

    const container =
        document.getElementById(
            "photosList"
        );


    if (!container) {
        return;
    }


    const photos =
        loadData(
            STORAGE.PHOTOS,
            []
        );


    if (!photos.length) {

        container.innerHTML =
            "<p>No photos uploaded yet.</p>";

        return;
    }


    container.innerHTML =
        photos.map(
            (photo, index) => `

                <div class="photo-item">

                    <img
                        src="${photo}"
                        alt="Profile photo"
                        style="
                            max-width:100%;
                            border-radius:12px;
                            margin-bottom:8px;
                        "
                    >

                    <button
                        type="button"
                        class="link-btn"
                        onclick="deletePhoto(${index})"
                    >
                        Delete
                    </button>

                </div>

            `
        ).join("");

}


function addPhoto() {

    const input =
        document.getElementById(
            "photoInput"
        );


    if (!input || !input.files.length) {

        alert(
            "Please select an image."
        );

        return;
    }


    const files =
        Array.from(input.files);


    const photos =
        loadData(
            STORAGE.PHOTOS,
            []
        );


    files.forEach(file => {

        if (file.size > 5 * 1024 * 1024) {

            alert(
                `${file.name} is larger than 5MB.`
            );

            return;
        }


        const reader =
            new FileReader();


        reader.onload = function(event) {

            photos.push(
                event.target.result
            );

            saveData(
                STORAGE.PHOTOS,
                photos
            );

            renderPhotos();

        };


        reader.readAsDataURL(file);

    });

}


function deletePhoto(index) {

    const photos =
        loadData(
            STORAGE.PHOTOS,
            []
        );


    photos.splice(
        index,
        1
    );


    saveData(
        STORAGE.PHOTOS,
        photos
    );


    renderPhotos();

}


/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {

    loadSettingsForm();

    showPage("settings");

}


function loadSettingsForm() {

    const settings =
        loadData(
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
            settings.notifications;

    }


    if (darkMode) {

        darkMode.checked =
            settings.darkMode;

    }


    applyDarkMode(
        settings.darkMode
    );

}


function saveSettings() {

    const settings = {

        notifications:
            document.getElementById(
                "notifications"
            )?.checked || false,

        darkMode:
            document.getElementById(
                "darkMode"
            )?.checked || false,

        language:
            document.getElementById(
                "languageSelect"
            )?.value || "en"

    };


    saveData(
        STORAGE.SETTINGS,
        settings
    );


    applyDarkMode(
        settings.darkMode
    );


    alert(
        "Settings saved."
    );

}


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
        loadData(
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
            privacy.showOnline;

    }


    if (messages) {

        messages.checked =
            privacy.allowMessages;

    }


    if (photoAfterMatch) {

        photoAfterMatch.checked =
            privacy.photoAfterMatch;

    }


    showPage("privacy");

}


function savePrivacy() {

    const privacy = {

        profileVisibility:
            document.getElementById(
                "profileVisibility"
            )?.value || "members",

        showOnline:
            document.getElementById(
                "showOnline"
            )?.checked || false,

        allowMessages:
            document.getElementById(
                "allowMessages"
            )?.checked || false,

        photoAfterMatch:
            document.getElementById(
                "photoAfterMatch"
            )?.checked || false

    };


    saveData(
        STORAGE.PRIVACY,
        privacy
    );


    alert(
        "Privacy settings saved."
    );


    showPage("app");

}


/* =========================================================
   PURCHASES
   ========================================================= */

function openPurchases() {

    const purchase =
        loadData(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );


    const status =
        document.getElementById(
            "purchaseStatus"
        );


    if (status) {

        status.textContent =
            purchase.active
                ? "Rishta Plus is active."
                : "No active subscription.";

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
            "Payment setup is required before Rishta Plus can be activated.";

    }


    alert(
        "Payment setup is required to activate the $2/month Rishta Plus package."
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


    if (!input || !input.files.length) {

        alert(
            "Please select an image first."
        );

        return;
    }


    const file =
        input.files[0];


    const reader =
        new FileReader();


    reader.onload = function(event) {

        localStorage.setItem(
            "halal_rishta_custom_icon",
            event.target.result
        );


        alert(
            "Custom icon saved."
        );

    };


    reader.readAsDataURL(file);

}


/* =========================================================
   WALI / GUARDIAN
   ========================================================= */

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


    saveData(
        STORAGE.GUARDIAN,
        {
            name,
            email
        }
    );


    alert(
        "Guardian information saved."
    );


    showPage("app");

}


/* =========================================================
   SWIPE SYSTEM
   ========================================================= */

let currentSwipeProfile = null;


function getSwipeData() {

    const today =
        new Date().toISOString().slice(0, 10);


    const saved =
        loadData(
            STORAGE.SWIPES,
            {
                date: today,
                count: 0,
                seen: []
            }
        );


    if (saved.date !== today) {

        saved.date = today;

        saved.count = 0;

        saved.seen = [];

        saveData(
            STORAGE.SWIPES,
            saved
        );

    }


    return saved;

}


function getSuperLikeData() {

    const today =
        new Date().toISOString().slice(0, 10);


    const saved =
        loadData(
            STORAGE.SUPER_LIKES,
            {
                date: today,
                count: 0
            }
        );


    if (saved.date !== today) {

        saved.date = today;

        saved.count = 0;

        saveData(
            STORAGE.SUPER_LIKES,
            saved
        );

    }


    return saved;

}


function updateSwipeCounters() {

    const swipeData =
        getSwipeData();


    const superData =
        getSuperLikeData();


    const premium =
        isPremium();


    const swipeLimit =
        premium
            ? "Unlimited"
            : "30";


    const superLimit =
        premium
            ? "5"
            : String(
                superData.count
            );


    const swipeCount =
        document.getElementById(
            "swipeCount"
        );


    const swipePageCount =
        document.getElementById(
            "swipePageCount"
        );


    const superLikeCount =
        document.getElementById(
            "superLikeCount"
        );


    const swipePageSuperLikes =
        document.getElementById(
            "swipePageSuperLikes"
        );


    if (swipeCount) {

        swipeCount.textContent =
            `${swipeData.count} / ${swipeLimit}`;

    }


    if (swipePageCount) {

        swipePageCount.textContent =
            `${swipeData.count} / ${swipeLimit}`;

    }


    if (superLikeCount) {

        superLikeCount.textContent =
            premium
                ? `${superData.count} / 5`
                : `${superData.count} / 0`;

    }


    if (swipePageSuperLikes) {

        swipePageSuperLikes.textContent =
            premium
                ? `${superData.count} / 5`
                : `${superData.count} / 0`;

    }

}


function openSwipe() {

    showPage("swipe");

}


function getAvailableProfiles() {

    const swipeData =
        getSwipeData();


    return DEMO_PROFILES.filter(
        profile =>
            !swipeData.seen.includes(
                profile.id
            )
    );

}


function loadSwipeScreen() {

    updateSwipeCounters();


    const profiles =
        getAvailableProfiles();


    if (!profiles.length) {

        currentSwipeProfile = null;

        renderEmptySwipe();

        return;
    }


    currentSwipeProfile =
        profiles[0];


    renderSwipeProfile(
        currentSwipeProfile
    );

}


function renderSwipeProfile(profile) {

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


    if (name) {

        name.textContent =
            `${profile.fullName}, ${profile.age}`;

    }


    if (details) {

        details.textContent =
            `${profile.city}, ${profile.country} • ${profile.profession}`;

    }


    if (about) {

        about.textContent =
            profile.about || "";

    }


    if (intent) {

        intent.style.display =
            profile.seriousIntent
                ? "inline-block"
                : "none";

    }


    const photo =
        document.getElementById(
            "swipePhoto"
        );


    if (photo) {

        const photos =
            loadData(
                STORAGE.PHOTOS,
                []
            );


        photo.innerHTML =
            "👤";


        if (photos.length) {

            photo.innerHTML =
                `<img
                    src="${photos[0]}"
                    alt="Profile"
                    style="
                        width:100%;
                        height:100%;
                        object-fit:cover;
                        border-radius:16px;
                    "
                >`;

        }

    }

}


function renderEmptySwipe() {

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


    if (name) {

        name.textContent =
            "No more profiles";

    }


    if (details) {

        details.textContent =
            "New members will appear here.";

    }


    if (about) {

        about.textContent =
            "Check back later for more serious rishtas.";

    }


    const intent =
        document.getElementById(
            "swipeIntent"
        );


    if (intent) {

        intent.style.display =
            "none";

    }

}


function canSwipe() {

    if (isPremium()) {

        return true;

    }


    const data =
        getSwipeData();


    if (data.count >= 30) {

        alert(
            "You have reached your 30 daily swipes. Upgrade to Rishta Plus for unlimited swipes."
        );

        return false;

    }


    return true;

}


function recordSwipe(profileId) {

    const data =
        getSwipeData();


    if (!data.seen.includes(profileId)) {

        data.seen.push(
            profileId
        );

    }


    data.count++;


    saveData(
        STORAGE.SWIPES,
        data
    );


    updateSwipeCounters();

}


function swipePass() {

    if (!currentSwipeProfile) {

        loadSwipeScreen();

        return;
    }


    if (!canSwipe()) {
        return;
    }


    recordSwipe(
        currentSwipeProfile.id
    );


    currentSwipeProfile = null;


    loadSwipeScreen();

}


function swipeLike() {

    if (!currentSwipeProfile) {

        loadSwipeScreen();

        return;
    }


    if (!canSwipe()) {
        return;
    }


    const profile =
        currentSwipeProfile;


    recordSwipe(
        profile.id
    );


    addLike(
        profile
    );


    currentSwipeProfile = null;


    loadSwipeScreen();

}


function swipeSuperLike() {

    if (!currentSwipeProfile) {

        loadSwipeScreen();

        return;
    }


    if (!canSwipe()) {
        return;
    }


    const premium =
        isPremium();


    const superData =
        getSuperLikeData();


    if (!premium) {

        alert(
            "Super Likes are available through Rishta Plus or rewarded ads."
        );

        return;

    }


    if (superData.count >= 5) {

        alert(
            "You have used all 5 Super Likes for today."
        );

        return;

    }


    superData.count++;


    saveData(
        STORAGE.SUPER_LIKES,
        superData
    );


    recordSwipe(
        currentSwipeProfile.id
    );


    addLike(
        currentSwipeProfile,
        true
    );


    currentSwipeProfile = null;


    updateSwipeCounters();

    loadSwipeScreen();

}


/* =========================================================
   LIKES
   ========================================================= */

function addLike(
    profile,
    superLike = false
) {

    const likes =
        loadData(
            STORAGE.LIKES,
            []
        );


    const user =
        getCurrentUser();


    const alreadyLiked =
        likes.some(
            like =>
                like.profileId === profile.id
        );


    if (!alreadyLiked) {

        likes.push({

            id: generateId(),

            profileId:
                profile.id,

            profile,

            superLike,

            createdAt:
                new Date().toISOString()

        });


        saveData(
            STORAGE.LIKES,
            likes
        );

    }


    /*
       Demo match:
       A mutual match is simulated locally
       so the complete UI can be tested
       before the database is connected.
    */

    const match =
        createDemoMatch(
            profile
        );


    if (match) {

        alert(
            `💚 It's a Match with ${profile.fullName}!`
        );

    }

}


function renderLikes() {

    const container =
        document.getElementById(
            "likesList"
        );


    if (!container) {
        return;
    }


    const likes =
        loadData(
            STORAGE.LIKES,
            []
        );


    if (!likes.length) {

        container.innerHTML =
            `<p class="small">
                Your likes will appear here.
            </p>`;

        return;

    }


    container.innerHTML =
        likes.map(
            like => `

                <div class="result-card">

                    <h3>
                        ❤️ ${like.profile.fullName}
                    </h3>

                    <p>
                        ${like.profile.age},
                        ${like.profile.city},
                        ${like.profile.country}
                    </p>

                    <p>
                        ${like.superLike
                            ? "⭐ Super Liked"
                            : "❤️ Liked"}
                    </p>

                </div>

            `
        ).join("");

}


/* =========================================================
   MATCH SYSTEM
   ========================================================= */

function createDemoMatch(profile) {

    const matches =
        loadData(
            STORAGE.MATCHES,
            []
        );


    const exists =
        matches.some(
            match =>
                match.profileId === profile.id
        );


    if (exists) {

        return false;

    }


    const match = {

        id: generateId(),

        profileId:
            profile.id,

        profile,

        createdAt:
            new Date().toISOString(),

        lastMessage: ""

    };


    matches.push(
        match
    );


    saveData(
        STORAGE.MATCHES,
        matches
    );


    return true;

}


function renderMatches() {

    const container =
        document.getElementById(
            "matchesList"
        );


    if (!container) {
        return;
    }


    const matches =
        loadData(
            STORAGE.MATCHES,
            []
        );


    if (!matches.length) {

        container.innerHTML =
            `<p class="small">
                Your matches will appear here.
            </p>`;

        return;

    }


    container.innerHTML =
        matches.map(
            match => `

                <div class="result-card">

                    <h3>
                        💚 ${match.profile.fullName}
                    </h3>

                    <p>
                        ${match.profile.age},
                        ${match.profile.city},
                        ${match.profile.country}
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
        ).join("");

}


/* =========================================================
   CHAT
   ========================================================= */

let activeChatProfileId = null;


function openChat(profileId) {

    activeChatProfileId =
        profileId;


    showPage("chat");

}


function sendMessage() {

    if (!activeChatProfileId) {

        alert(
            "Please open a chat from My Matches."
        );

        showPage("matches");

        return;
    }


    const input =
        document.getElementById(
            "chatMessage"
        );


    const text =
        input?.value.trim();


    if (!text) {

        alert(
            "Please write a message."
        );

        return;
    }


    const messages =
        loadData(
            STORAGE.MESSAGES,
            []
        );


    messages.push({

        id: generateId(),

        profileId:
            activeChatProfileId,

        sender: "me",

        text,

        createdAt:
            new Date().toISOString()

    });


    saveData(
        STORAGE.MESSAGES,
        messages
    );


    input.value = "";


    renderChat();

}


function renderChat() {

    const container =
        document.getElementById(
            "chatMessages"
        );


    if (!container) {
        return;
    }


    if (!activeChatProfileId) {

        container.innerHTML =
            `<p class="small">
                Open a match to start chatting.
            </p>`;

        return;

    }


    const messages =
        loadData(
            STORAGE.MESSAGES,
            []
        ).filter(
            message =>
                message.profileId ===
                activeChatProfileId
        );


    if (!messages.length) {

        container.innerHTML =
            `<p class="small">
                No messages yet. Start with a respectful greeting.
            </p>`;

        return;

    }


    container.innerHTML =
        messages.map(
            message => `

                <div class="chat-message">

                    <strong>
                        You
                    </strong>

                    <p>
                        ${escapeHtml(
                            message.text
                        )}
                    </p>

                </div>

            `
        ).join("");

}


function showHalalIcebreaker() {

    const questions = [

        "What are the most important values you want in marriage?",

        "What role does family have in your marriage decision?",

        "What qualities do you value most in a life partner?",

        "What are your hopes for married life?",

        "How would you like both families to be involved?"

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


function escapeHtml(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


/* =========================================================
   SEARCH
   ========================================================= */

function searchProfiles() {

    const ageMin =
        Number(
            document.getElementById(
                "ageMin"
            )?.value || 0
        );


    const ageMax =
        Number(
            document.getElementById(
                "ageMax"
            )?.value || 0
        );


    const country =
        document.getElementById(
            "searchCountry"
        )?.value.trim().toLowerCase();


    const city =
        document.getElementById(
            "searchCity"
        )?.value.trim().toLowerCase();


    const religion =
        document.getElementById(
            "searchReligion"
        )?.value;


    const sect =
        document.getElementById(
            "searchSect"
        )?.value;


    const seriousIntent =
        document.getElementById(
            "seriousIntent"
        )?.checked;


    const results =
        DEMO_PROFILES.filter(
            profile => {

                if (
                    ageMin &&
                    profile.age < ageMin
                ) {
                    return false;
                }


                if (
                    ageMax &&
                    profile.age > ageMax
                ) {
                    return false;
                }


                if (
                    country &&
                    !profile.country
                        .toLowerCase()
                        .includes(country)
                ) {
                    return false;
                }


                if (
                    city &&
                    !profile.city
                        .toLowerCase()
                        .includes(city)
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
                    seriousIntent &&
                    !profile.seriousIntent
                ) {
                    return false;
                }


                return true;

            }
        );


    const container =
        document.getElementById(
            "searchResults"
        );


    if (!container) {
        return;
    }


    if (!results.length) {

        container.innerHTML =
            `<p class="small">
                No matching profiles found.
            </p>`;

        return;

    }


    container.innerHTML =
        results.map(
            profile => `

                <div class="result-card">

                    <h3>
                        💚 ${profile.fullName},
                        ${profile.age}
                    </h3>

                    <p>
                        ${profile.city},
                        ${profile.country}
                    </p>

                    <p>
                        ${profile.profession}
                    </p>

                    <p>
                        ${profile.about}
                    </p>

                    <button
                        type="button"
                        class="primary"
                        onclick="likeSearchProfile('${profile.id}')"
                    >
                        ❤️ Like
                    </button>

                </div>

            `
        ).join("");

}


function likeSearchProfile(profileId) {

    const profile =
        DEMO_PROFILES.find(
            item =>
                item.id === profileId
        );


    if (!profile) {
        return;
    }


    if (!canSwipe()) {
        return;
    }


    recordSwipe(
        profile.id
    );


    addLike(
        profile
    );


    alert(
        `❤️ You liked ${profile.fullName}.`
    );

}


/* =========================================================
   REWARDED AD PLACEHOLDER
   =========================================================
   Real ad network will be connected later.
   This test version grants 3 Super Likes.
   ========================================================= */

function watchRewardedAd() {

    if (isPremium()) {

        alert(
            "Rishta Plus members already have premium Super Likes."
        );

        return;

    }


    const superData =
        getSuperLikeData();


    superData.count += 3;


    saveData(
        STORAGE.SUPER_LIKES,
        superData
    );


    updateSwipeCounters();


    alert(
        "🎉 Test Reward: 3 Super Likes added!"
    );

}


/* =========================================================
   LANGUAGE
   ========================================================= */

function setupLanguage() {

    const select =
        document.getElementById(
            "languageSelect"
        );


    const settings =
        loadData(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );


    if (select) {

        select.value =
            settings.language || "en";


        select.addEventListener(
            "change",
            function() {

                settings.language =
                    this.value;


                saveData(
                    STORAGE.SETTINGS,
                    settings
                );

            }
        );

    }

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupLanguage();


        const settings =
            loadData(
                STORAGE.SETTINGS,
                DEFAULT_SETTINGS
            );


        applyDarkMode(
            settings.darkMode
        );


        /*
           Automatically connect photo input
           to addPhoto().
        */

        const photoInput =
            document.getElementById(
                "photoInput"
            );


        if (photoInput) {

            photoInput.addEventListener(
                "change",
                addPhoto
            );

        }


        updateDashboard();

    }
);
