/* =========================================================
   HALAL RISHTA
   MAIN JAVASCRIPT
   Compatible with the new index.html
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
    GUARDIAN: "halal_rishta_guardian",
    CHAT: "halal_rishta_chat",
    CUSTOM_ICON: "halal_rishta_custom_icon"
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
    about: "",
    education: "",
    profession: "",
    maritalStatus: "",
    religiousLevel: "",
    phone: "",
    religion: "islam",
    sect: "",
    marriageIntent: false,
    verified: false
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
    package: null,
    price: 0,
    currency: "USD",
    paymentMethod: null,
    activatedAt: null,
    expiresAt: null
};


/* =========================================================
   STORAGE HELPERS
   ========================================================= */

function save(key, value) {

    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error(
            "Storage save error:",
            error
        );

        notify(
            "Unable to save data on this device.",
            "error"
        );

        return false;
    }
}


function load(key, fallback = null) {

    try {

        const value =
            localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error(
            "Storage load error:",
            error
        );

        return fallback;
    }
}


function remove(key) {

    try {
        localStorage.removeItem(key);

    } catch (error) {

        console.error(
            "Storage remove error:",
            error
        );
    }
}


/* =========================================================
   APPLICATION STATE
   ========================================================= */

let user =
    load(STORAGE.USER, null);

let profile = {
    ...DEFAULT_PROFILE,
    ...(load(STORAGE.PROFILE, {}) || {})
};

let photos =
    load(STORAGE.PHOTOS, []);

if (!Array.isArray(photos)) {
    photos = [];
}

let settings = {
    ...DEFAULT_SETTINGS,
    ...(load(STORAGE.SETTINGS, {}) || {})
};

let privacy = {
    ...DEFAULT_PRIVACY,
    ...(load(STORAGE.PRIVACY, {}) || {})
};

let purchase = {
    ...DEFAULT_PURCHASE,
    ...(load(STORAGE.PURCHASE, {}) || {})
};

let guardian =
    load(STORAGE.GUARDIAN, null);

let likes =
    load(STORAGE.LIKES, []);

if (!Array.isArray(likes)) {
    likes = [];
}

let matches =
    load(STORAGE.MATCHES, []);

if (!Array.isArray(matches)) {
    matches = [];
}

let chatMessages =
    load(STORAGE.CHAT, []);

if (!Array.isArray(chatMessages)) {
    chatMessages = [];
}


/* =========================================================
   UTILITY
   ========================================================= */

function getElement(id) {
    return document.getElementById(id);
}


function valueFromInput(input) {

    if (!input) {
        return "";
    }

    return String(
        input.value || ""
    ).trim();
}


function notify(
    message,
    type = "info"
) {

    if (
        typeof window.showToast ===
        "function"
    ) {

        window.showToast(
            message,
            type
        );

        return;
    }

    alert(message);
}


function isLoggedIn() {
    return !!user;
}


function generateId(
    prefix = "id"
) {

    return (
        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 9)
    );
}


function clearForm(section) {

    if (!section) {
        return;
    }

    const inputs =
        section.querySelectorAll(
            "input, textarea, select"
        );

    inputs.forEach(input => {

        if (
            input.type === "checkbox" ||
            input.type === "radio"
        ) {

            input.checked = false;

        } else if (
            input.type !== "file"
        ) {

            input.value = "";
        }
    });
}


/* =========================================================
   PREMIUM STATUS
   ========================================================= */

function isPremium() {

    if (!purchase.active) {
        return false;
    }

    if (
        purchase.expiresAt &&
        new Date(
            purchase.expiresAt
        ) <= new Date()
    ) {

        purchase.active = false;

        save(
            STORAGE.PURCHASE,
            purchase
        );

        return false;
    }

    return true;
}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(
            ".page, section[id]"
        );

    pages.forEach(page => {

        page.classList.remove(
            "active"
        );

        page.style.display =
            "none";
    });

    const page =
        getElement(pageId);

    if (!page) {

        console.warn(
            "Page not found:",
            pageId
        );

        return false;
    }

    page.classList.add(
        "active"
    );

    page.style.display =
        "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return true;
}


function openHome() {
    showPage("home");
}


function goHome() {
    showPage("home");
}


/* =========================================================
   CREATE ACCOUNT
   ========================================================= */

function createAccount() {

    const section =
        getElement("register");

    if (!section) {

        notify(
            "Create Account page could not be found.",
            "error"
        );

        return;
    }

    const inputs =
        section.querySelectorAll(
            "input"
        );

    if (inputs.length < 3) {

        notify(
            "Account form is incomplete.",
            "error"
        );

        return;
    }

    const name =
        valueFromInput(
            inputs[0]
        );

    const email =
        valueFromInput(
            inputs[1]
        ).toLowerCase();

    const password =
        valueFromInput(
            inputs[2]
        );


    if (
        !name ||
        !email ||
        !password
    ) {

        notify(
            "Please complete all required fields.",
            "error"
        );

        return;
    }


    if (name.length < 2) {

        notify(
            "Please enter your full name.",
            "error"
        );

        return;
    }


    if (
        !email.includes("@") ||
        !email.includes(".")
    ) {

        notify(
            "Please enter a valid email address.",
            "error"
        );

        return;
    }


    if (password.length < 6) {

        notify(
            "Password must contain at least 6 characters.",
            "error"
        );

        return;
    }


    const existingUser =
        load(
            STORAGE.USER,
            null
        );


    if (
        existingUser &&
        existingUser.email &&
        existingUser.email
            .toLowerCase() === email
    ) {

        notify(
            "An account with this email already exists. Please login.",
            "error"
        );

        showPage("login");

        return;
    }


    user = {

        id: generateId("user"),

        name: name,

        email: email,

        password: password,

        createdAt:
            new Date()
                .toISOString()
    };


    profile = {

        ...DEFAULT_PROFILE,

        fullName: name
    };


    const userSaved =
        save(
            STORAGE.USER,
            user
        );

    const profileSaved =
        save(
            STORAGE.PROFILE,
            profile
        );


    if (
        !userSaved ||
        !profileSaved
    ) {

        user = null;

        return;
    }


    notify(
        "Account created successfully! Please login.",
        "success"
    );


    clearForm(section);


    setTimeout(
        () => {
            showPage("login");
        },
        500
    );
}


/* =========================================================
   LOGIN
   ========================================================= */

function loginUser() {

    const section =
        getElement("login");

    if (!section) {

        notify(
            "Login page could not be found.",
            "error"
        );

        return;
    }


    const inputs =
        section.querySelectorAll(
            "input"
        );


    if (inputs.length < 2) {

        notify(
            "Login form is incomplete.",
            "error"
        );

        return;
    }


    const email =
        valueFromInput(
            inputs[0]
        ).toLowerCase();


    const password =
        valueFromInput(
            inputs[1]
        );


    if (
        !email ||
        !password
    ) {

        notify(
            "Please enter your email and password.",
            "error"
        );

        return;
    }


    const savedUser =
        load(
            STORAGE.USER,
            null
        );


    if (!savedUser) {

        notify(
            "No account found. Please create an account first.",
            "error"
        );

        showPage("register");

        return;
    }


    if (
        !savedUser.email ||
        savedUser.email
            .toLowerCase() !== email
    ) {

        notify(
            "Incorrect email address.",
            "error"
        );

        return;
    }


    if (
        savedUser.password !==
        password
    ) {

        notify(
            "Incorrect password.",
            "error"
        );

        return;
    }


    user =
        savedUser;


    profile = {

        ...DEFAULT_PROFILE,

        ...(load(
            STORAGE.PROFILE,
            {}
        ) || {})
    };


    purchase = {

        ...DEFAULT_PURCHASE,

        ...(load(
            STORAGE.PURCHASE,
            {}
        ) || {})
    };


    save(
        STORAGE.USER,
        user
    );


    notify(
        "Login successful!",
        "success"
    );


    clearForm(section);


    setTimeout(
        () => {
            openDashboard();
        },
        500
    );
}


function login() {
    loginUser();
}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    user = null;

    remove(
        STORAGE.USER
    );

    notify(
        "You have been logged out.",
        "success"
    );

    showPage("home");
}


function logout() {
    logoutUser();
}


/* =========================================================
   DASHBOARD
   ========================================================= */

function openDashboard() {

    if (!isLoggedIn()) {

        notify(
            "Please create an account or login first."
        );

        showPage("login");

        return;
    }


    showPage("app");

    updateDashboard();
}


function updateDashboard() {

    if (!user) {
        return;
    }


    const name =
        profile.fullName ||
        user.name ||
        "";


    const email =
        user.email ||
        "";


    const nameElements =
        document.querySelectorAll(
            "[data-user-name], #dashboardName, #profileName"
        );


    nameElements.forEach(
        element => {

            element.textContent =
                name;
        }
    );


    const emailElements =
        document.querySelectorAll(
            "[data-user-email], #dashboardEmail"
        );


    emailElements.forEach(
        element => {

            element.textContent =
                email;
        }
    );


    updatePlanDisplay();

    updateSwipeDisplay();

    updatePurchaseDisplay();
}


/* =========================================================
   PLAN DISPLAY
   ========================================================= */

function updatePlanDisplay() {

    const planName =
        getElement("planName");

    const description =
        getElement(
            "planDescription"
        );


    if (isPremium()) {

        if (planName) {
            planName.textContent =
                "Rishta Plus ⭐";
        }

        if (description) {
            description.textContent =
                "Unlimited swipes • No ads • Premium features";
        }

    } else {

        if (planName) {
            planName.textContent =
                "Free";
        }

        if (description) {
            description.textContent =
                "30 daily swipes";
        }
    }
}


/* =========================================================
   PROFILE
   ========================================================= */

function openProfile() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    showPage("profile");

    fillProfileForm();
}


function fillProfileForm() {

    const fields = [

        "fullName",
        "age",
        "gender",
        "country",
        "city",
        "about",
        "education",
        "profession",
        "maritalStatus",
        "religiousLevel",
        "phone"

    ];


    fields.forEach(
        field => {

            const input =
                getElement(field);

            if (input) {

                input.value =
                    profile[field] ||
                    "";
            }
        }
    );
}


function updateProfile() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        return;
    }


    const fields = [

        "fullName",
        "age",
        "gender",
        "country",
        "city",
        "about",
        "education",
        "profession",
        "maritalStatus",
        "religiousLevel",
        "phone"

    ];


    fields.forEach(
        field => {

            const input =
                getElement(field);

            if (input) {

                profile[field] =
                    valueFromInput(
                        input
                    );
            }
        }
    );


    if (profile.fullName) {

        user.name =
            profile.fullName;
    }


    save(
        STORAGE.USER,
        user
    );

    save(
        STORAGE.PROFILE,
        profile
    );


    notify(
        "Profile updated successfully.",
        "success"
    );


    updateDashboard();
}


/* =========================================================
   PHOTOS
   ========================================================= */

function openPhotos() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    showPage("photos");

    renderPhotos();
}


function addPhoto(file) {

    if (!file) {
        return;
    }


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        notify(
            "Please select an image file.",
            "error"
        );

        return;
    }


    if (
        file.size >
        5 * 1024 * 1024
    ) {

        notify(
            "Image must be smaller than 5MB.",
            "error"
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

            const photo = {

                id:
                    generateId(
                        "photo"
                    ),

                name:
                    file.name,

                data:
                    event.target.result,

                createdAt:
                    new Date()
                        .toISOString()
            };


            photos.push(
                photo
            );


            save(
                STORAGE.PHOTOS,
                photos
            );


            renderPhotos();


            notify(
                "Photo added successfully.",
                "success"
            );
        };


    reader.readAsDataURL(file);
}


function deletePhoto(photoId) {

    photos =
        photos.filter(
            photo =>
                photo.id !==
                photoId
        );


    save(
        STORAGE.PHOTOS,
        photos
    );


    renderPhotos();


    notify(
        "Photo deleted.",
        "success"
    );
}


function renderPhotos() {

    const container =
        getElement(
            "photosList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        photos.length === 0
    ) {

        container.innerHTML =
            "<p>No photos uploaded yet.</p>";

        return;
    }


    photos.forEach(
        photo => {

            const wrapper =
                document.createElement(
                    "div"
                );


            wrapper.className =
                "photo-item";


            const image =
                document.createElement(
                    "img"
                );


            image.src =
                photo.data;

            image.alt =
                "Profile photo";

            image.style.width =
                "160px";

            image.style.height =
                "160px";

            image.style.objectFit =
                "cover";

            image.style.borderRadius =
                "15px";


            const deleteButton =
                document.createElement(
                    "button"
                );


            deleteButton.type =
                "button";

            deleteButton.textContent =
                "Delete";


            deleteButton.onclick =
                function() {

                    deletePhoto(
                        photo.id
                    );
                };


            wrapper.appendChild(
                image
            );

            wrapper.appendChild(
                document.createElement(
                    "br"
                )
            );

            wrapper.appendChild(
                deleteButton
            );


            container.appendChild(
                wrapper
            );
        }
    );
}


/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    showPage("settings");

    loadSettingsForm();
}


function loadSettingsForm() {

    const notifications =
        getElement(
            "notifications"
        );

    const darkMode =
        getElement(
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


    applyDarkMode();
}


function saveSettings() {

    const notifications =
        getElement(
            "notifications"
        );

    const darkMode =
        getElement(
            "darkMode"
        );


    if (notifications) {

        settings.notifications =
            notifications.checked;
    }


    if (darkMode) {

        settings.darkMode =
            darkMode.checked;
    }


    save(
        STORAGE.SETTINGS,
        settings
    );


    applyDarkMode();


    notify(
        "Settings saved successfully.",
        "success"
    );
}


function applyDarkMode() {

    if (
        settings.darkMode
    ) {

        document.body.classList.add(
            "dark-mode"
        );

    } else {

        document.body.classList.remove(
            "dark-mode"
        );
    }
}


/* =========================================================
   PRIVACY
   ========================================================= */

function openPrivacy() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    showPage("privacy");

    loadPrivacyForm();
}


function loadPrivacyForm() {

    const visibility =
        getElement(
            "profileVisibility"
        );

    const showOnline =
        getElement(
            "showOnline"
        );

    const allowMessages =
        getElement(
            "allowMessages"
        );

    const photoAfterMatch =
        getElement(
            "photoAfterMatch"
        );


    if (visibility) {

        visibility.value =
            privacy.profileVisibility;
    }


    if (showOnline) {

        showOnline.checked =
            !!privacy.showOnline;
    }


    if (allowMessages) {

        allowMessages.checked =
            !!privacy.allowMessages;
    }


    if (photoAfterMatch) {

        photoAfterMatch.checked =
            !!privacy.photoAfterMatch;
    }
}


function savePrivacy() {

    const visibility =
        getElement(
            "profileVisibility"
        );

    const showOnline =
        getElement(
            "showOnline"
        );

    const allowMessages =
        getElement(
            "allowMessages"
        );

    const photoAfterMatch =
        getElement(
            "photoAfterMatch"
        );


    if (visibility) {

        privacy.profileVisibility =
            visibility.value;
    }


    if (showOnline) {

        privacy.showOnline =
            showOnline.checked;
    }


    if (allowMessages) {

        privacy.allowMessages =
            allowMessages.checked;
    }


    if (photoAfterMatch) {

        privacy.photoAfterMatch =
            photoAfterMatch.checked;
    }


    save(
        STORAGE.PRIVACY,
        privacy
    );


    notify(
        "Privacy settings saved.",
        "success"
    );
}


/* =========================================================
   SWIPE SYSTEM
   ========================================================= */

function getTodayKey() {

    const now =
        new Date();

    return (
        now.getFullYear() +
        "-" +
        String(
            now.getMonth() + 1
        ).padStart(2, "0") +
        "-" +
        String(
            now.getDate()
        ).padStart(2, "0")
    );
}


function getSwipeData() {

    const data =
        load(
            STORAGE.SWIPES,
            null
        );


    if (
        !data ||
        data.date !==
        getTodayKey()
    ) {

        return {
            date:
                getTodayKey(),

            count: 0
        };
    }


    return data;
}


function canSwipe() {

    if (isPremium()) {
        return true;
    }


    const data =
        getSwipeData();


    return data.count < 30;
}


function recordSwipe() {

    if (isPremium()) {
        return true;
    }


    const data =
        getSwipeData();


    if (
        data.count >= 30
    ) {

        notify(
            "You have reached today's 30 free swipes. Upgrade to Rishta Plus for unlimited swipes.",
            "error"
        );

        return false;
    }


    data.count++;


    save(
        STORAGE.SWIPES,
        data
    );


    updateSwipeDisplay();

    return true;
}


function updateSwipeDisplay() {

    const swipeCount =
        getElement(
            "swipeCount"
        );

    const superLikeCount =
        getElement(
            "superLikeCount"
        );


    const swipeData =
        getSwipeData();


    if (swipeCount) {

        if (isPremium()) {

            swipeCount.textContent =
                "Unlimited";

        } else {

            swipeCount.textContent =
                swipeData.count +
                " / 30";
        }
    }


    if (superLikeCount) {

        const likesData =
            getSuperLikeData();

        superLikeCount.textContent =
            likesData.count +
            " / " +
            (isPremium() ? "5" : "0");
    }
}


/* =========================================================
   SUPER LIKES
   ========================================================= */

function getSuperLikeData() {

    const data =
        load(
            STORAGE.SUPER_LIKES,
            null
        );


    if (
        !data ||
        data.date !==
        getTodayKey()
    ) {

        return {

            date:
                getTodayKey(),

            count:
                0
        };
    }


    return data;
}


function addSuperLikes(amount) {

    const data =
        getSuperLikeData();


    data.count += amount;


    const maximum =
        isPremium()
            ? 5
            : 3;


    if (
        data.count >
        maximum
    ) {

        data.count =
            maximum;
    }


    save(
        STORAGE.SUPER_LIKES,
        data
    );


    updateSwipeDisplay();
}


function useSuperLike() {

    const data =
        getSuperLikeData();


    if (
        data.count <= 0
    ) {

        notify(
            "You don't have any Super Likes available. Watch a rewarded ad to get 3.",
            "error"
        );

        return false;
    }


    data.count--;


    save(
        STORAGE.SUPER_LIKES,
        data
    );


    updateSwipeDisplay();

    return true;
}


/* =========================================================
   REWARDED AD
   ========================================================= */

function watchRewardedAd() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    /*
       Placeholder for the real rewarded-ad SDK.

       IMPORTANT:
       This does NOT fake an ad view.
       It simply provides the UI flow until
       an approved ad network is connected.
    */


    notify(
        "Rewarded ad system is ready to be connected. No ad has been counted yet.",
        "info"
    );
}


/* =========================================================
   SEARCH
   ========================================================= */

function searchProfiles() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    const ageMin =
        valueFromInput(
            getElement("ageMin")
        );

    const ageMax =
        valueFromInput(
            getElement("ageMax")
        );

    const country =
        valueFromInput(
            getElement("searchCountry")
        );

    const city =
        valueFromInput(
            getElement("searchCity")
        );

    const religion =
        valueFromInput(
            getElement("searchReligion")
        );

    const sect =
        valueFromInput(
            getElement("searchSect")
        );

    const serious =
        getElement(
            "seriousIntent"
        );


    if (
        (religion ||
         sect ||
         serious?.checked) &&
        !isPremium()
    ) {

        notify(
            "Religion, Sect and advanced marriage filters are available with Rishta Plus.",
            "error"
        );

        openPackage();

        return;
    }


    const results =
        getElement(
            "searchResults"
        );


    if (!results) {
        return;
    }


    results.innerHTML = `

        <div class="result-card">

            <h3>Search Ready</h3>

            <p>
                Your search filters have been applied.
            </p>

            <p class="small">
                Real member discovery will be connected
                to the Neon database in the next stage.
            </p>

        </div>
    `;
}


/* =========================================================
   LIKES
   ========================================================= */

function openLikes() {

    if (!isLoggedIn()) {

        showPage("login");

        return;
    }


    if (!isPremium()) {

        notify(
            "See Who Liked You is a Rishta Plus feature.",
            "error"
        );

        openPackage();

        return;
    }


    showPage("likes");

    renderLikes();
}


function renderLikes() {

    const container =
        getElement(
            "likesList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        likes.length === 0
    ) {

        container.innerHTML =
            "<p class='small'>No likes yet.</p>";

        return;
    }


    likes.forEach(
        like => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "result-card";


            item.textContent =
                like.name ||
                "Someone liked your profile";


            container.appendChild(
                item
            );
        }
    );
}


/* =========================================================
   MATCHES
   ========================================================= */

function openMatches() {

    if (!isLoggedIn()) {

        showPage("login");

        return;
    }


    showPage("matches");

    renderMatches();
}


function renderMatches() {

    const container =
        getElement(
            "matchesList"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        matches.length === 0
    ) {

        container.innerHTML =
            "<p class='small'>No matches yet.</p>";

        return;
    }


    matches.forEach(
        match => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "result-card";


            const name =
                document.createElement(
                    "strong"
                );

            name.textContent =
                match.name ||
                "Match";


            const chatButton =
                document.createElement(
                    "button"
                );

            chatButton.type =
                "button";

            chatButton.className =
                "primary";

            chatButton.textContent =
                "Open Chat";


            chatButton.onclick =
                function() {

                    showPage("chat");
                };


            item.appendChild(
                name
            );

            item.appendChild(
                document.createElement(
                    "br"
                )
            );

            item.appendChild(
                chatButton
            );


            container.appendChild(
                item
            );
        }
    );
}


/* =========================================================
   PURCHASES
   ========================================================= */

function openPurchases() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    showPage("purchases");

    updatePurchaseDisplay();
}


function openPackage() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    showPage("package");

    updatePurchaseDisplay();
}


function activatePackage() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    /*
       IMPORTANT:

       Do NOT mark Premium as paid here.

       The real payment provider will be connected
       in the payment stage.

       Until payment is confirmed, Premium remains inactive.
    */


    const paymentMessage =
        getElement(
            "paymentMessage"
        );


    if (paymentMessage) {

        paymentMessage.textContent =
            "Payment setup is required before Rishta Plus can be activated.";
    }


    notify(
        "Payment setup is required to activate Rishta Plus.",
        "info"
    );
}


function updatePurchaseDisplay() {

    const statusElements =
        document.querySelectorAll(
            "[data-package-status]"
        );


    statusElements.forEach(
        element => {

            element.textContent =
                isPremium()
                    ? "Premium"
                    : "Free";
        }
    );


    const purchaseStatus =
        getElement(
            "purchaseStatus"
        );


    if (purchaseStatus) {

        if (isPremium()) {

            purchaseStatus.textContent =
                "Rishta Plus is active.";

        } else {

            purchaseStatus.textContent =
                "No active subscription.";
        }
    }


    updatePlanDisplay();
}


/* =========================================================
   GUARDIAN
   ========================================================= */

function saveGuardian() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    const name =
        valueFromInput(
            getElement(
                "guardianName"
            )
        );

    const email =
        valueFromInput(
            getElement(
                "guardianEmail"
            )
        ).toLowerCase();


    if (!name || !email) {

        notify(
            "Please enter guardian name and email.",
            "error"
        );

        return;
    }


    guardian = {

        name:
            name,

        email:
            email,

        updatedAt:
            new Date()
                .toISOString()
    };


    save(
        STORAGE.GUARDIAN,
        guardian
    );


    notify(
        "Guardian information saved.",
        "success"
    );
}


/* =========================================================
   CHAT
   ========================================================= */

function sendMessage() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        return;
    }


    const input =
        getElement(
            "chatMessage"
        );


    if (!input) {
        return;
    }


    const message =
        valueFromInput(
            input
        );


    if (!message) {

        notify(
            "Please write a message.",
            "error"
        );

        return;
    }


    chatMessages.push({

        id:
            generateId(
                "message"
            ),

        text:
            message,

        createdAt:
            new Date()
                .toISOString()
    });


    save(
        STORAGE.CHAT,
        chatMessages
    );


    input.value = "";


    renderChat();


    notify(
        "Message saved.",
        "success"
    );
}


function renderChat() {

    const container =
        getElement(
            "chatMessages"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    chatMessages.forEach(
        message => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "chat-message";


            item.textContent =
                message.text;


            container.appendChild(
                item
            );
        }
    );
}


function showHalalIcebreaker() {

    const questions = [

        "What qualities are most important to you in a spouse?",

        "What are your hopes for married life?",

        "What role does family play in your marriage plans?",

        "What values would you like to build your marriage around?",

        "What does a peaceful marriage mean to you?"
    ];


    const question =
        questions[
            Math.floor(
                Math.random() *
                questions.length
            )
        ];


    const input =
        getElement(
            "chatMessage"
        );


    if (input) {

        input.value =
            question;
    }
}


/* =========================================================
   CUSTOM ICON
   ========================================================= */

function openCustomIcon() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    showPage("customIcon");
}


function saveCustomIcon() {

    const input =
        getElement(
            "customIconInput"
        );


    if (
        !input ||
        !input.files ||
        !input.files[0]
    ) {

        notify(
            "Please select an icon first.",
            "error"
        );

        return;
    }


    const file =
        input.files[0];


    if (
        !file.type.startsWith(
            "image/"
        )
    ) {

        notify(
            "Please select an image.",
            "error"
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

            save(
                STORAGE.CUSTOM_ICON,
                event.target.result
            );


            notify(
                "Custom icon saved successfully.",
                "success"
            );
        };


    reader.readAsDataURL(
        file
    );
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function changeLanguage(
    language
) {

    settings.language =
        language || "en";


    save(
        STORAGE.SETTINGS,
        settings
    );


    notify(
        "Language preference saved.",
        "success"
    );
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        settings = {

            ...DEFAULT_SETTINGS,

            ...(load(
                STORAGE.SETTINGS,
                {}
            ) || {})
        };


        privacy = {

            ...DEFAULT_PRIVACY,

            ...(load(
                STORAGE.PRIVACY,
                {}
            ) || {})
        };


        purchase = {

            ...DEFAULT_PURCHASE,

            ...(load(
                STORAGE.PURCHASE,
                {}
            ) || {})
        };


        photos =
            load(
                STORAGE.PHOTOS,
                []
            );


        if (
            !Array.isArray(photos)
        ) {

            photos = [];
        }


        applyDarkMode();


        const languageSelect =
            getElement(
                "languageSelect"
            );


        if (languageSelect) {

            languageSelect.value =
                settings.language ||
                "en";


            languageSelect.addEventListener(
                "change",
                function(event) {

                    changeLanguage(
                        event.target.value
                    );
                }
            );
        }


        const photoInput =
            getElement(
                "photoInput"
            );


        if (photoInput) {

            photoInput.addEventListener(
                "change",
                function(event) {

                    const files =
                        Array.from(
                            event.target.files ||
                            []
                        );


                    files.forEach(
                        file => {

                            addPhoto(
                                file
                            );
                        }
                    );


                    event.target.value =
                        "";
                }
            );
        }


        if (getElement("home")) {

            showPage(
                "home"
            );
        }


        if (user) {

            profile = {

                ...DEFAULT_PROFILE,

                ...(load(
                    STORAGE.PROFILE,
                    {}
                ) || {})
            };


            purchase = {

                ...DEFAULT_PURCHASE,

                ...(load(
                    STORAGE.PURCHASE,
                    {}
                ) || {})
            };
        }


        updateSwipeDisplay();

        updatePurchaseDisplay();

    }
);


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.showPage =
    showPage;

window.createAccount =
    createAccount;

window.loginUser =
    loginUser;

window.login =
    login;

window.logoutUser =
    logoutUser;

window.logout =
    logout;

window.openDashboard =
    openDashboard;

window.openProfile =
    openProfile;

window.updateProfile =
    updateProfile;

window.openPhotos =
    openPhotos;

window.addPhoto =
    addPhoto;

window.deletePhoto =
    deletePhoto;

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

window.watchRewardedAd =
    watchRewardedAd;

window.searchProfiles =
    searchProfiles;

window.openLikes =
    openLikes;

window.openMatches =
    openMatches;

window.saveGuardian =
    saveGuardian;

window.sendMessage =
    sendMessage;

window.showHalalIcebreaker =
    showHalalIcebreaker;

window.useSuperLike =
    useSuperLike;

window.canSwipe =
    canSwipe;

window.recordSwipe =
    recordSwipe;
