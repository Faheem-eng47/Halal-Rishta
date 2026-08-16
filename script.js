/* =========================================================
   HALAL RISHTA
   Professional Main Application Script
   Version 2.0
   ========================================================= */

"use strict";

/* =========================================================
   APP CONFIG
   ========================================================= */

const APP_NAME = "Halal Rishta";
const APP_VERSION = "2.0";

const STORAGE = {
    USER: "halal_rista_user",
    PROFILE: "halal_rista_profile",
    PHOTOS: "halal_rista_photos",
    SETTINGS: "halal_rista_settings",
    PRIVACY: "halal_rista_privacy",
    PURCHASE: "halal_rista_purchase",
    LANGUAGE: "halal_rista_language"
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
        console.error("Storage error:", error);
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
        console.error("Load error:", error);
        return fallback;
    }
}

function remove(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Remove error:", error);
    }
}

/* =========================================================
   APPLICATION STATE
   ========================================================= */

let user = load(STORAGE.USER, null);

let profile = {
    ...DEFAULT_PROFILE,
    ...load(STORAGE.PROFILE, {})
};

let photos = load(STORAGE.PHOTOS, []);

let settings = {
    ...DEFAULT_SETTINGS,
    ...load(STORAGE.SETTINGS, {})
};

let privacy = {
    ...DEFAULT_PRIVACY,
    ...load(STORAGE.PRIVACY, {})
};

let purchase = {
    ...DEFAULT_PURCHASE,
    ...load(STORAGE.PURCHASE, {})
};

/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function getElement(id) {
    return document.getElementById(id);
}

function valueFromInput(input) {
    if (!input) return "";
    return String(input.value || "").trim();
}

function notify(message, type = "info") {

    // Use existing alert system if app does not have toast
    if (typeof window.showToast === "function") {
        window.showToast(message, type);
        return;
    }

    alert(message);
}

function isLoggedIn() {
    return !!user;
}

function generateId(prefix = "id") {
    return (
        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.random().toString(36).substring(2, 8)
    );
}

/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(
        ".page, section[id], main > div[id]"
    );

    pages.forEach(page => {
        page.style.display = "none";
    });

    const page = getElement(pageId);

    if (!page) {
        console.warn("Page not found:", pageId);
        return false;
    }

    page.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return true;
}

/* =========================================================
   HOME
   ========================================================= */

function openHome() {
    showPage("home");
}

function goHome() {
    showPage("home");
}

/* =========================================================
   ACCOUNT CREATION
   ========================================================= */

function createAccount() {

    const section = getElement("create-account");

    let inputs;

    if (section) {
        inputs = section.querySelectorAll("input");
    } else {
        inputs = document.querySelectorAll(
            "#createAccount input, #register input"
        );
    }

    const name = valueFromInput(inputs[0]);
    const email = valueFromInput(inputs[1]);
    const password = valueFromInput(inputs[2]);

    if (!name || !email || !password) {
        notify("Please complete all required fields.");
        return;
    }

    if (name.length < 2) {
        notify("Please enter your full name.");
        return;
    }

    if (!email.includes("@")) {
        notify("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        notify("Password must contain at least 6 characters.");
        return;
    }

    user = {
        id: generateId("user"),
        name: name,
        email: email.toLowerCase(),
        password: password,
        createdAt: new Date().toISOString()
    };

    profile.fullName = name;

    save(STORAGE.USER, user);
    save(STORAGE.PROFILE, profile);

    notify("Account created successfully!");

    clearForm(section);

    showPage("login");
}

/* =========================================================
   LOGIN
   ========================================================= */

function login() {

    const section = getElement("login");

    if (!section) {
        notify("Login page could not be found.");
        return;
    }

    const inputs = section.querySelectorAll("input");

    const email = valueFromInput(inputs[0]).toLowerCase();
    const password = valueFromInput(inputs[1]);

    if (!email || !password) {
        notify("Please enter your email and password.");
        return;
    }

    const savedUser = load(STORAGE.USER, null);

    if (!savedUser) {
        notify("Account not found. Please create an account first.");
        return;
    }

    if (savedUser.email !== email) {
        notify("Incorrect email address.");
        return;
    }

    if (savedUser.password !== password) {
        notify("Incorrect password.");
        return;
    }

    user = savedUser;

    save(STORAGE.USER, user);

    notify("Login successful!");

    clearForm(section);

    openDashboard();
}

/* =========================================================
   LOGOUT
   ========================================================= */

function logout() {

    user = null;

    remove(STORAGE.USER);

    notify("You have been logged out.");

    showPage("home");
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function openDashboard() {

    if (!isLoggedIn()) {
        notify("Please create an account or login first.");
        showPage("login");
        return;
    }

    showPage("dashboard");

    updateDashboard();
}

function updateDashboard() {

    if (!user) return;

    const nameElements = document.querySelectorAll(
        "[data-user-name], #dashboardName, #profileName"
    );

    nameElements.forEach(element => {
        element.textContent = profile.fullName || user.name;
    });

    const emailElements = document.querySelectorAll(
        "[data-user-email], #dashboardEmail"
    );

    emailElements.forEach(element => {
        element.textContent = user.email;
    });
}

/* =========================================================
   PROFILE
   ========================================================= */

function openProfile() {

    if (!isLoggedIn()) {
        notify("Please login first.");
        showPage("login");
        return;
    }

    showPage("profile");

    fillProfileForm();
}

function fillProfileForm() {

    const mapping = {
        fullName: "fullName",
        age: "age",
        gender: "gender",
        country: "country",
        city: "city",
        about: "about",
        education: "education",
        profession: "profession",
        maritalStatus: "maritalStatus",
        religiousLevel: "religiousLevel",
        phone: "phone"
    };

    Object.keys(mapping).forEach(key => {

        const input = getElement(mapping[key]);

        if (input) {
            input.value = profile[key] || "";
        }
    });
}

function updateProfile() {

    if (!isLoggedIn()) {
        notify("Please login first.");
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

        const input = getElement(field);

        if (input) {
            profile[field] = valueFromInput(input);
        }
    });

    user.name = profile.fullName || user.name;

    save(STORAGE.USER, user);
    save(STORAGE.PROFILE, profile);

    notify("Profile updated successfully.");

    updateDashboard();
}

/* =========================================================
   PHOTO MANAGEMENT
   ========================================================= */

function openPhotos() {

    if (!isLoggedIn()) {
        notify("Please login first.");
        showPage("login");
        return;
    }

    showPage("photos");

    renderPhotos();
}

function addPhoto(file) {

    if (!file) return;

    if (!file.type.startsWith("image/")) {
        notify("Please select an image file.");
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        notify("Image must be smaller than 5MB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {

        const photo = {
            id: generateId("photo"),
            name: file.name,
            data: event.target.result,
            createdAt: new Date().toISOString()
        };

        photos.push(photo);

        save(STORAGE.PHOTOS, photos);

        renderPhotos();

        notify("Photo added successfully.");
    };

    reader.readAsDataURL(file);
}

function deletePhoto(photoId) {

    photos = photos.filter(photo => photo.id !== photoId);

    save(STORAGE.PHOTOS, photos);

    renderPhotos();
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

        const wrapper = document.createElement("div");

        wrapper.className = "photo-item";

        wrapper.innerHTML = `
            <img
                src="${photo.data}"
                alt="Profile photo"
                style="
                    width:160px;
                    height:160px;
                    object-fit:cover;
                    border-radius:15px;
                "
            >
            <br>
            <button
                type="button"
                onclick="deletePhoto('${photo.id}')"
            >
                Delete
            </button>
        `;

        container.appendChild(wrapper);
    });
}

/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {

    if (!isLoggedIn()) {
        notify("Please login first.");
        showPage("login");
        return;
    }

    showPage("settings");

    loadSettingsForm();
}

function loadSettingsForm() {

    const notifications = getElement("notifications");
    const darkMode = getElement("darkMode");

    if (notifications) {
        notifications.checked = settings.notifications;
    }

    if (darkMode) {
        darkMode.checked = settings.darkMode;
    }
}

function saveSettings() {

    const notifications = getElement("notifications");
    const darkMode = getElement("darkMode");

    if (notifications) {
        settings.notifications = notifications.checked;
    }

    if (darkMode) {
        settings.darkMode = darkMode.checked;
    }

    save(ST
