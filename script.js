/* =========================================================
   HALAL RISHTA
   MAIN JAVASCRIPT
   Frontend connected to Vercel API + Neon
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
    CUSTOM_ICON: "halal_rishta_custom_icon"
};


/* =========================================================
   API
   ========================================================= */

const API = {
    AUTH: "/api/auth"
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
    phone: ""
};

const DEFAULT_SETTINGS = {
    notifications: true,
    darkMode: false,
    language: "en"
};

const DEFAULT_PRIVACY = {
    profileVisibility: "members",
    showOnline: true,
    allowMessages: true
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
   SAFE STORAGE
   ========================================================= */

function save(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error("Storage save error:", error);
        return false;
    }
}

function load(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {
        console.error("Storage load error:", error);
        return fallback;
    }
}

function remove(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Storage remove error:", error);
    }
}


/* =========================================================
   APPLICATION STATE
   ========================================================= */

let user = load(STORAGE.USER, null);

let profile = {
    ...DEFAULT_PROFILE,
    ...(load(STORAGE.PROFILE, {}) || {})
};

let photos = load(STORAGE.PHOTOS, []);

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


/* =========================================================
   UTILITY
   ========================================================= */

function getElement(id) {
    return document.getElementById(id);
}

function valueFromInput(input) {
    if (!input) return "";
    return String(input.value || "").trim();
}

function notify(message, type = "info") {

    if (typeof window.showToast === "function") {
        window.showToast(message, type);
        return;
    }

    alert(message);
}

function isLoggedIn() {
    return !!user;
}

function clearForm(section) {

    if (!section) return;

    const inputs = section.querySelectorAll(
        "input, textarea, select"
    );

    inputs.forEach(input => {

        if (
            input.type === "checkbox" ||
            input.type === "radio"
        ) {
            input.checked = false;
        } else if (input.type !== "file") {
            input.value = "";
        }
    });
}


/* =========================================================
   API REQUEST HELPER
   ========================================================= */

async function apiRequest(action, data = {}) {

    try {

        const response = await fetch(API.AUTH, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                action,
                ...data
            })
        });

        let result = {};

        try {
            result = await response.json();
        } catch (jsonError) {
            result = {};
        }

        if (!response.ok) {

            const message =
                result.error ||
                "Something went wrong. Please try again.";

            throw new Error(message);
        }

        return result;

    } catch (error) {

        console.error("API error:", error);

        if (
            error instanceof TypeError &&
            error.message.toLowerCase().includes("fetch")
        ) {
            throw new Error(
                "Unable to connect to the server. Please check your internet connection."
            );
        }

        throw error;
    }
}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(
        ".page, section[id]"
    );

    pages.forEach(page => {

        page.classList.remove("active");
        page.style.display = "none";

    });

    const page = getElement(pageId);

    if (!page) {

        console.warn(
            "Page not found:",
            pageId
        );

        return false;
    }

    page.classList.add("active");
    page.style.display = "block";

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
   REGISTER
   ========================================================= */

async function createAccount() {

    const section =
        getElement("register") ||
        getElement("create-account");

    if (!section) {

        notify(
            "Create Account page could not be found.",
            "error"
        );

        return;
    }

    const inputs =
        section.querySelectorAll("input");

    if (inputs.length < 3) {

        notify(
            "Account form is incomplete.",
            "error"
        );

        return;
    }

    const name =
        valueFromInput(inputs[0]);

    const email =
        valueFromInput(inputs[1]).toLowerCase();

    const password =
        valueFromInput(inputs[2]);


    /* VALIDATION */

    if (!name || !email || !password) {

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

    /*
       API requires minimum 8 characters.
    */

    if (password.length < 8) {

        notify(
            "Password must contain at least 8 characters.",
            "error"
        );

        return;
    }


    /* DISABLE BUTTON DURING REQUEST */

    const button =
        section.querySelector(
            'button[type="submit"], .primary'
        );

    const originalText =
        button ? button.textContent : "";

    if (button) {

        button.disabled = true;
        button.textContent = "Creating Account...";

    }


    try {

        /*
           IMPORTANT:
           Password is sent only to API.
           It is NOT saved in localStorage.
        */

        const result =
            await apiRequest(
                "signup",
                {
                    name,
                    email,
                    password
                }
            );


        if (!result.success || !result.user) {

            throw new Error(
                "Account could not be created."
            );
        }


        /*
           Save only safe user information.
        */

        user = {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email
        };


        profile = {
            ...DEFAULT_PROFILE,
            fullName: result.user.name
        };


        save(
            STORAGE.USER,
            user
        );

        save(
            STORAGE.PROFILE,
            profile
        );


        notify(
            "Account created successfully! Please login.",
            "success"
        );


        clearForm(section);


        setTimeout(() => {

            showPage("login");

        }, 500);


    } catch (error) {

        notify(
            error.message ||
            "Unable to create account.",
            "error"
        );

    } finally {

        if (button) {

            button.disabled = false;
            button.textContent = originalText;

        }
    }
}


/* =========================================================
   LOGIN
   ========================================================= */

async function loginUser() {

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
        section.querySelectorAll("input");

    if (inputs.length < 2) {

        notify(
            "Login form is incomplete.",
            "error"
        );

        return;
    }

    const email =
        valueFromInput(inputs[0]).toLowerCase();

    const password =
        valueFromInput(inputs[1]);


    /* VALIDATION */

    if (!email || !password) {

        notify(
            "Please enter your email and password.",
            "error"
        );

        return;
    }

    if (!email.includes("@")) {

        notify(
            "Please enter a valid email address.",
            "error"
        );

        return;
    }


    const button =
        section.querySelector(
            'button[type="submit"], .primary'
        );

    const originalText =
        button ? button.textContent : "";


    if (button) {

        button.disabled = true;
        button.textContent = "Logging in...";

    }


    try {

        /*
           Login goes to:
           Browser
              ↓
           Vercel /api/auth
              ↓
           Neon
        */

        const result =
            await apiRequest(
                "login",
                {
                    email,
                    password
                }
            );


        if (!result.success || !result.user) {

            throw new Error(
                "Login failed."
            );
        }


        /*
           Save ONLY safe account information.
           Never save the password.
        */

        user = {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email
        };


        profile = {
            ...DEFAULT_PROFILE,
            ...(load(
                STORAGE.PROFILE,
                {}
            ) || {})
        };


        /*
           Make sure profile name is available.
        */

        if (!profile.fullName) {
            profile.fullName =
                result.user.name || "";
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
            "Login successful!",
            "success"
        );


        clearForm(section);


        setTimeout(() => {

            openDashboard();

        }, 400);


    } catch (error) {

        notify(
            error.message ||
            "Unable to login.",
            "error"
        );

    } finally {

        if (button) {

            button.disabled = false;
            button.textContent = originalText;

        }
    }
}


/* =========================================================
   LOGIN COMPATIBILITY
   ========================================================= */

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
   DASHBOARD / APP
   ========================================================= */

function openDashboard() {

    if (!isLoggedIn()) {

        notify(
            "Please create an account or login first."
        );

        showPage("login");

        return;
    }


    /*
       Current HTML uses #app.
    */

    if (getElement("app")) {

        showPage("app");

    } else {

        showPage("dashboard");

    }


    updateDashboard();
}

function updateDashboard() {

    if (!user) return;


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

    nameElements.forEach(element => {

        element.textContent = name;

    });


    const emailElements =
        document.querySelectorAll(
            "[data-user-email], #dashboardEmail"
        );

    emailElements.forEach(element => {

        element.textContent = email;

    });


    updatePurchaseDisplay();
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


    fields.forEach(field => {

        const input =
            getElement(field);

        if (input) {

            input.value =
                profile[field] || "";

        }
    });
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


    fields.forEach(field => {

        const input =
            getElement(field);

        if (input) {

            profile[field] =
                valueFromInput(input);

        }
    });


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


function saveData() {

    const currentPage =
        document.querySelector(
            ".page.active"
        );

    if (!currentPage) return;


    if (currentPage.id === "profile") {

        updateProfile();

        return;
    }


    if (currentPage.id === "settings") {

        saveSettings();

        return;
    }


    if (currentPage.id === "privacy") {

        savePrivacy();

        return;
    }


    save(
        STORAGE.PROFILE,
        profile
    );

    save(
        STORAGE.SETTINGS,
        settings
    );


    notify(
        "Data saved successfully.",
        "success"
    );
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

    if (!file) return;


    if (!file.type.startsWith("image/")) {

        notify(
            "Please select an image file.",
            "error"
        );

        return;
    }


    if (file.size > 5 * 1024 * 1024) {

        notify(
            "Image must be smaller than 5MB.",
            "error"
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload = function(event) {

        const photo = {

            id:
                "photo_" +
                Date.now() +
                "_" +
                Math.random()
                    .toString(36)
                    .substring(2, 8),

            name:
                file.name,

            data:
                event.target.result,

            createdAt:
                new Date().toISOString()
        };


        photos.push(photo);


        /*
           Photos are currently local device data.
           Later they can be moved to cloud storage.
        */

        if (
            !save(
                STORAGE.PHOTOS,
                photos
            )
        ) {
            return;
        }


        renderPhotos();


        notify(
            "Photo added successfully.",
            "success"
        );
    };


    reader.onerror = function() {

        notify(
            "Unable to read this image.",
            "error"
        );

    };


    reader.readAsDataURL(file);
}


function deletePhoto(photoId) {

    photos =
        photos.filter(
            photo =>
                photo.id !== photoId
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
        getElement("photosList") ||
        getElement("photoList");


    if (!container) return;


    container.innerHTML = "";


    if (photos.length === 0) {

        container.innerHTML =
            "<p>No photos uploaded yet.</p>";

        return;
    }


    photos.forEach(photo => {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "photo-item";


        const image =
            document.createElement("img");

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
            document.createElement("button");

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
            document.createElement("br")
        );

        wrapper.appendChild(
            deleteButton
        );


        container.appendChild(
            wrapper
        );
    });
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
        getElement("notifications");

    const darkMode =
        getElement("darkMode");


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
        getElement("notifications");

    const darkMode =
        getElement("darkMode");


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

    if (settings.darkMode) {

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
        getElement("profileVisibility");

    const showOnline =
        getElement("showOnline");

    const allowMessages =
        getElement("allowMessages");


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
}


function savePrivacy() {

    const visibility =
        getElement("profileVisibility");

    const showOnline =
        getElement("showOnline");

    const allowMessages =
        getElement("allowMessages");


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


/*
   IMPORTANT:
   This function DOES NOT pretend that payment
   has actually been completed.

   Real $2 international payment must be connected
   to a payment provider/backend before the package
   becomes genuinely active.
*/

function activatePackage() {

    if (!isLoggedIn()) {

        notify(
            "Please login first."
        );

        showPage("login");

        return;
    }


    notify(
        "Payment setup is required before the $2 monthly package can be activated.",
        "info"
    );
}


function updatePurchaseDisplay() {

    const statusElements =
        document.querySelectorAll(
            "[data-package-status], .status"
        );


    const isActive =
        purchase.active &&
        purchase.expiresAt &&
        new Date(
            purchase.expiresAt
        ) > new Date();


    statusElements.forEach(element => {

        element.textContent =
            isActive
                ? "Premium"
                : "Free";

    });
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


    if (!file.type.startsWith("image/")) {

        notify(
            "Please select an image file.",
            "error"
        );

        return;
    }


    if (file.size > 2 * 1024 * 1024) {

        notify(
            "Icon must be smaller than 2MB.",
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


    reader.readAsDataURL(file);
}


/* =========================================================
   LANGUAGE
   ========================================================= */

function changeLanguage(language) {

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


        profile = {
            ...DEFAULT_PROFILE,
            ...(load(
                STORAGE.PROFILE,
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


        if (!Array.isArray(photos)) {
            photos = [];
        }


        applyDarkMode();


        /* LANGUAGE */

        const languageSelect =
            getElement(
                "languageSelect"
            );


        if (languageSelect) {

            languageSelect.value =
                settings.language || "en";


            languageSelect.addEventListener(
                "change",
                function(event) {

                    changeLanguage(
                        event.target.value
                    );

                }
            );
        }


        /* PHOTO INPUT */

        const photosPage =
            getElement("photos");


        if (photosPage) {

            const fileInput =
                photosPage.querySelector(
                    'input[type="file"]'
                );


            if (fileInput) {

                fileInput.addEventListener(
                    "change",
                    function(event) {

                        const files =
                            Array.from(
                                event.target.files || []
                            );


                        files.forEach(
                            function(file) {

                                addPhoto(file);

                            }
                        );


                        event.target.value =
                            "";

                    }
                );
            }
        }


        /* START PAGE */

        if (getElement("home")) {

            showPage("home");

        }


        /*
           If a safe user record exists,
           keep it loaded.
        */

        if (user) {

            if (
                !user.id ||
                !user.email
            ) {

                user = null;

                remove(
                    STORAGE.USER
                );
            }
        }


        updateDashboard();

    }
);


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.showPage =
    showPage;

window.openHome =
    openHome;

window.goHome =
    goHome;

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

window.saveData =
    saveData;

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

window.changeLanguage =
    changeLanguage;
