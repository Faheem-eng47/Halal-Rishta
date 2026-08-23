"use strict";

/* =========================================================
   HALAL RISHTA - MAIN SCRIPT
   Works with the supplied index.html
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
    GUARDIAN: "halal_rishta_guardian",
    LIKES: "halal_rishta_likes",
    MATCHES: "halal_rishta_matches",
    LANGUAGE: "halal_rishta_language",
    CUSTOM_ICON: "halal_rishta_custom_icon",
    SWIPES: "halal_rishta_swipes",
    SUPER_LIKES: "halal_rishta_super_likes",
    MESSAGES: "halal_rishta_messages"

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
    darkMode: false

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
   SAFE STORAGE HELPERS
   ========================================================= */

function readStorage(key, fallback) {

    try {

        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {

        console.error("Storage read error:", key, error);

        return fallback;

    }

}


function writeStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error("Storage write error:", key, error);

        return false;

    }

}


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    const pages =
        document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const target =
        document.getElementById(pageId);

    if (!target) {

        console.error(
            "Page not found:",
            pageId
        );

        return false;

    }


    target.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (pageId === "app") {
        updateDashboard();
    }


    if (pageId === "profile") {
        loadProfile();
    }


    if (pageId === "photos") {
        loadPhotos();
    }


    if (pageId === "settings") {
        loadSettings();
    }


    if (pageId === "privacy") {
        loadPrivacy();
    }


    if (pageId === "purchases") {
        updatePurchaseUI();
    }


    if (pageId === "likes") {
        loadLikes();
    }


    if (pageId === "matches") {
        loadMatches();
    }


    if (pageId === "swipe") {

        if (
            typeof loadSwipeProfile ===
            "function"
        ) {

            loadSwipeProfile();

        }

    }


    return true;

}


/* =========================================================
   CURRENT USER
   ========================================================= */

function getCurrentUser() {

    return readStorage(
        STORAGE.USER,
        null
    );

}


/* =========================================================
   REGISTER / CREATE ACCOUNT
   ========================================================= */

function createAccount() {

    try {

        const registerPage =
            document.getElementById("register");

        if (!registerPage) {

            alert("Registration page not found.");

            return false;

        }


        const inputs =
            registerPage.querySelectorAll(
                "input"
            );


        const fullNameInput =
            inputs[0];

        const emailInput =
            inputs[1];

        const passwordInput =
            inputs[2];


        if (
            !fullNameInput ||
            !emailInput ||
            !passwordInput
        ) {

            alert(
                "Registration form is incomplete."
            );

            return false;

        }


        const fullName =
            fullNameInput.value.trim();

        const email =
            emailInput.value.trim().toLowerCase();

        const password =
            passwordInput.value;


        if (!fullName) {

            alert("Please enter your full name.");

            fullNameInput.focus();

            return false;

        }


        if (!email) {

            alert("Please enter your email.");

            emailInput.focus();

            return false;

        }


        if (
            !email.includes("@") ||
            !email.includes(".")
        ) {

            alert(
                "Please enter a valid email address."
            );

            emailInput.focus();

            return false;

        }


        if (!password || password.length < 6) {

            alert(
                "Password must be at least 6 characters."
            );

            passwordInput.focus();

            return false;

        }


        const existingUser =
            getCurrentUser();


        if (existingUser) {

            if (
                existingUser.email &&
                existingUser.email !== email
            ) {

                const replace =
                    confirm(
                        "An account is already active. Create a new account?"
                    );

                if (!replace) {
                    return false;
                }

            }

        }


        const user = {

            id:
                "user_" +
                Date.now() +
                "_" +
                Math.random()
                    .toString(36)
                    .substring(2, 9),

            fullName: fullName,

            email: email,

            password: password,

            createdAt:
                new Date().toISOString(),

            loggedIn: true

        };


        writeStorage(
            STORAGE.USER,
            user
        );


        const profile =
            readStorage(
                STORAGE.PROFILE,
                DEFAULT_PROFILE
            );


        profile.fullName =
            fullName;


        writeStorage(
            STORAGE.PROFILE,
            profile
        );


        if (
            !localStorage.getItem(
                STORAGE.PHOTOS
            )
        ) {

            writeStorage(
                STORAGE.PHOTOS,
                []
            );

        }


        if (
            !localStorage.getItem(
                STORAGE.SETTINGS
            )
        ) {

            writeStorage(
                STORAGE.SETTINGS,
                DEFAULT_SETTINGS
            );

        }


        if (
            !localStorage.getItem(
                STORAGE.PRIVACY
            )
        ) {

            writeStorage(
                STORAGE.PRIVACY,
                DEFAULT_PRIVACY
            );

        }


        if (
            !localStorage.getItem(
                STORAGE.PURCHASE
            )
        ) {

            writeStorage(
                STORAGE.PURCHASE,
                DEFAULT_PURCHASE
            );

        }


        alert(
            "Account created successfully!"
        );


        registerPage
            .querySelector("form")
            ?.reset();


        showPage("app");

        updateDashboard();

        return true;

    } catch (error) {

        console.error(
            "Create account error:",
            error
        );

        alert(
            "Unable to create account. Please try again."
        );

        return false;

    }

}


/* =========================================================
   LOGIN
   ========================================================= */

function loginUser() {

    try {

        const loginPage =
            document.getElementById("login");


        if (!loginPage) {

            alert("Login page not found.");

            return false;

        }


        const inputs =
            loginPage.querySelectorAll(
                "input"
            );


        const emailInput =
            inputs[0];

        const passwordInput =
            inputs[1];


        if (
            !emailInput ||
            !passwordInput
        ) {

            alert(
                "Login form is incomplete."
            );

            return false;

        }


        const email =
            emailInput.value
                .trim()
                .toLowerCase();


        const password =
            passwordInput.value;


        if (!email) {

            alert(
                "Please enter your email."
            );

            emailInput.focus();

            return false;

        }


        if (!password) {

            alert(
                "Please enter your password."
            );

            passwordInput.focus();

            return false;

        }


        const user =
            getCurrentUser();


        if (!user) {

            alert(
                "No account found. Please create an account first."
            );

            showPage("register");

            return false;

        }


        if (
            user.email !== email ||
            user.password !== password
        ) {

            alert(
                "Incorrect email or password."
            );

            return false;

        }


        user.loggedIn = true;

        writeStorage(
            STORAGE.USER,
            user
        );


        loginPage
            .querySelector("form")
            ?.reset();


        alert(
            "Login successful!"
        );


        showPage("app");

        updateDashboard();

        return true;

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        alert(
            "Unable to login. Please try again."
        );

        return false;

    }

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

    const user =
        getCurrentUser();


    if (!user) {

        showPage("home");

        return;

    }


    user.loggedIn = false;


    writeStorage(
        STORAGE.USER,
        user
    );


    alert(
        "You have been logged out."
    );


    showPage("home");

}


/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

    const user =
        getCurrentUser();


    if (!user) {

        showPage("home");

        return;

    }


    const emailElement =
        document.getElementById(
            "dashboardEmail"
        );


    if (emailElement) {

        emailElement.textContent =
            user.email || "";

    }


    const profile =
        readStorage(
            STORAGE.PROFILE,
            DEFAULT_PROFILE
        );


    if (
        profile.fullName &&
        user.fullName !== profile.fullName
    ) {

        user.fullName =
            profile.fullName;

        writeStorage(
            STORAGE.USER,
            user
        );

    }


    updatePurchaseUI();

    updateSwipeCounters();

}


/* =========================================================
   PROFILE
   ========================================================= */

function openProfile() {

    loadProfile();

    showPage("profile");

}


function loadProfile() {

    const profile =
        readStorage(
            STORAGE.PROFILE,
            DEFAULT_PROFILE
        );


    setValue(
        "fullName",
        profile.fullName
    );

    setValue(
        "age",
        profile.age
    );

    setValue(
        "gender",
        profile.gender
    );

    setValue(
        "country",
        profile.country
    );

    setValue(
        "city",
        profile.city
    );

    setValue(
        "education",
        profile.education
    );

    setValue(
        "profession",
        profile.profession
    );

    setValue(
        "maritalStatus",
        profile.maritalStatus
    );

    setValue(
        "religiousLevel",
        profile.religiousLevel
    );

    setValue(
        "phone",
        profile.phone
    );

    setValue(
        "about",
        profile.about
    );

}


function updateProfile() {

    const profile = {

        fullName:
            getValue("fullName"),

        age:
            getValue("age"),

        gender:
            getValue("gender"),

        country:
            getValue("country"),

        city:
            getValue("city"),

        education:
            getValue("education"),

        profession:
            getValue("profession"),

        maritalStatus:
            getValue("maritalStatus"),

        religiousLevel:
            getValue("religiousLevel"),

        phone:
            getValue("phone"),

        about:
            getValue("about")

    };


    if (!profile.fullName) {

        alert(
            "Please enter your full name."
        );

        return false;

    }


    writeStorage(
        STORAGE.PROFILE,
        profile
    );


    const user =
        getCurrentUser();


    if (user) {

        user.fullName =
            profile.fullName;

        writeStorage(
            STORAGE.USER,
            user
        );

    }


    alert(
        "Profile saved successfully!"
    );


    showPage("app");

    return true;

}


/* =========================================================
   PHOTOS
   ========================================================= */

function openPhotos() {

    loadPhotos();

    showPage("photos");

}


function loadPhotos() {

    const list =
        document.getElementById(
            "photosList"
        );


    if (!list) {
        return;
    }


    list.innerHTML = "";


    const photos =
        readStorage(
            STORAGE.PHOTOS,
            []
        );


    if (
        !Array.isArray(photos) ||
        photos.length === 0
    ) {

        list.innerHTML =
            "<p class='small'>No photos added yet.</p>";

        return;

    }


    photos.forEach(
        function(photo, index) {

            const source =
                getPhotoSource(photo);


            if (!source) {
                return;
            }


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
                source;

            image.alt =
                "Profile photo";


            image.style.width =
                "100%";

            image.style.maxWidth =
                "250px";

            image.style.borderRadius =
                "12px";


            const remove =
                document.createElement(
                    "button"
                );


            remove.type =
                "button";

            remove.className =
                "secondary";

            remove.textContent =
                "Remove";


            remove.onclick =
                function() {

                    removePhoto(index);

                };


            wrapper.appendChild(
                image
            );


            wrapper.appendChild(
                remove
            );


            list.appendChild(
                wrapper
            );

        }
    );

}


function getPhotoSource(photo) {

    if (!photo) {
        return null;
    }


    if (
        typeof photo ===
        "string"
    ) {

        return photo;

    }


    if (
        typeof photo ===
        "object"
    ) {

        return (
            photo.data ||
            photo.url ||
            photo.src ||
            photo.image ||
            null
        );

    }


    return null;

}


function removePhoto(index) {

    const photos =
        readStorage(
            STORAGE.PHOTOS,
            []
        );


    if (
        !Array.isArray(photos)
    ) {
        return;
    }


    photos.splice(
        index,
        1
    );


    writeStorage(
        STORAGE.PHOTOS,
        photos
    );


    loadPhotos();

}


/* =========================================================
   PHOTO UPLOAD
   ========================================================= */

function setupPhotoUpload() {

    const input =
        document.getElementById(
            "photoInput"
        );


    if (!input) {
        return;
    }


    if (
        input.dataset.ready ===
        "true"
    ) {
        return;
    }


    input.dataset.ready =
        "true";


    input.addEventListener(
        "change",
        function(event) {

            const files =
                Array.from(
                    event.target.files || []
                );


            if (!files.length) {
                return;
            }


            let photos =
                readStorage(
                    STORAGE.PHOTOS,
                    []
                );


            if (
                !Array.isArray(photos)
            ) {
                photos = [];
            }


            files.forEach(
                function(file) {

                    if (
                        file.size >
                        5 * 1024 * 1024
                    ) {

                        alert(
                            file.name +
                            " is larger than 5MB."
                        );

                        return;

                    }


                    if (
                        photos.length >= 10
                    ) {

                        alert(
                            "Maximum 10 photos allowed."
                        );

                        return;

                    }


                    const reader =
                        new FileReader();


                    reader.onload =
                        function(e) {

                            photos.push({
                                data:
                                    e.target.result,
                                name:
                                    file.name,
                                createdAt:
                                    new Date()
                                        .toISOString()
                            });


                            writeStorage(
                                STORAGE.PHOTOS,
                                photos
                            );


                            loadPhotos();

                        };


                    reader.readAsDataURL(
                        file
                    );

                }
            );


            input.value = "";

        }
    );

}


/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {

    loadSettings();

    showPage("settings");

}


function loadSettings() {

    const settings =
        readStorage(
            STORAGE.SETTINGS,
            DEFAULT_SETTINGS
        );


    setChecked(
        "notifications",
        settings.notifications
    );


    setChecked(
        "darkMode",
        settings.darkMode
    );


    applyDarkMode(
        settings.darkMode
    );

}


function saveSettings() {

    const settings = {

        notifications:
            getChecked("notifications"),

        darkMode:
            getChecked("darkMode")

    };


    writeStorage(
        STORAGE.SETTINGS,
        settings
    );


    applyDarkMode(
        settings.darkMode
    );


    alert(
        "Settings saved successfully!"
    );

}


function applyDarkMode(enabled) {

    document.body.classList.toggle(
        "dark-mode",
        Boolean(enabled)
    );

}


/* =========================================================
   PRIVACY
   ========================================================= */

function openPrivacy() {

    loadPrivacy();

    showPage("privacy");

}


function loadPrivacy() {

    const privacy =
        readStorage(
            STORAGE.PRIVACY,
            DEFAULT_PRIVACY
        );


    setValue(
        "profileVisibility",
        privacy.profileVisibility
    );


    setChecked(
        "showOnline",
        privacy.showOnline
    );


    setChecked(
        "allowMessages",
        privacy.allowMessages
    );


    setChecked(
        "photoAfterMatch",
        privacy.photoAfterMatch
    );

}


function savePrivacy() {

    const privacy = {

        profileVisibility:
            getValue("profileVisibility"),

        showOnline:
            getChecked("showOnline"),

        allowMessages:
            getChecked("allowMessages"),

        photoAfterMatch:
            getChecked("photoAfterMatch")

    };


    writeStorage(
        STORAGE.PRIVACY,
        privacy
    );


    alert(
        "Privacy settings saved!"
    );

}


/* =========================================================
   PURCHASE / RISHTA PLUS
   ========================================================= */

function openPurchases() {

    updatePurchaseUI();

    showPage("purchases");

}


function openPackage() {

    showPage("package");

}


function activatePackage() {

    const purchase =
        readStorage(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );


    const now =
        new Date();


    const expires =
        new Date(
            now.getTime() +
            30 * 24 * 60 * 60 * 1000
        );


    /*
       This activates the local demo subscription.
       Real payment gateway integration must be connected
       separately before accepting real money.
    */

    purchase.active =
        true;

    purchase.package =
        "Rishta Plus";

    purchase.price =
        2;

    purchase.currency =
        "USD";

    purchase.paymentMethod =
        "Pending Payment Gateway";

    purchase.activatedAt =
        now.toISOString();

    purchase.expiresAt =
        expires.toISOString();


    writeStorage(
        STORAGE.PURCHASE,
        purchase
    );


    const message =
        document.getElementById(
            "paymentMessage"
        );


    if (message) {

        message.textContent =
            "Rishta Plus activated in this test version.";

    }


    alert(
        "Rishta Plus activated for testing."
    );


    updatePurchaseUI();

    showPage("app");

}


function updatePurchaseUI() {

    const purchase =
        readStorage(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );


    let active =
        Boolean(purchase.active);


    if (
        active &&
        purchase.expiresAt
    ) {

        const expiry =
            new Date(
                purchase.expiresAt
            );


        if (
            expiry.getTime() <=
            Date.now()
        ) {

            active = false;

            purchase.active =
                false;

            writeStorage(
                STORAGE.PURCHASE,
                purchase
            );

        }

    }


    const statuses =
        document.querySelectorAll(
            "[data-package-status]"
        );


    statuses.forEach(
        function(element) {

            element.textContent =
                active
                    ? "Rishta Plus"
                    : "Free";

        }
    );


    const planName =
        document.getElementById(
            "planName"
        );


    if (planName) {

        planName.textContent =
            active
                ? "Rishta Plus"
                : "Free";

    }


    const planDescription =
        document.getElementById(
            "planDescription"
        );


    if (planDescription) {

        planDescription.textContent =
            active
                ? "Unlimited swipes + premium features"
                : "30 daily swipes";

    }


    const purchaseStatus =
        document.getElementById(
            "purchaseStatus"
        );


    if (purchaseStatus) {

        purchaseStatus.textContent =
            active
                ? "Rishta Plus is active."
                : "No active subscription.";

    }

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
        !input.files ||
        !input.files[0]
    ) {

        alert(
            "Please select an image first."
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
            "Image must be smaller than 5MB."
        );

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

            writeStorage(
                STORAGE.CUSTOM_ICON,
                event.target.result
            );


            let icon =
                document.querySelector(
                    "link[rel='icon']"
                );


            if (!icon) {

                icon =
                    document.createElement(
                        "link"
                    );

                icon.rel =
                    "icon";

                document.head.appendChild(
                    icon
                );

            }


            icon.href =
                event.target.result;


            alert(
                "Custom icon saved."
            );

        };


    reader.readAsDataURL(
        file
    );

}


/* =========================================================
   GUARDIAN
   ========================================================= */

function saveGuardian() {

    const name =
        getValue("guardianName");

    const email =
        getValue("guardianEmail");


    if (!name) {

        alert(
            "Please enter guardian name."
        );

        return;

    }


    if (
        !email ||
        !email.includes("@")
    ) {

        alert(
            "Please enter a valid guardian email."
        );

        return;

    }


    writeStorage(
        STORAGE.GUARDIAN,
        {
            name: name,
            email: email
        }
    );


    alert(
        "Guardian information saved."
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


    if (!results) {
        return;
    }


    results.innerHTML = "";


    const currentProfile =
        readStorage(
            STORAGE.PROFILE,
            DEFAULT_PROFILE
        );


    const ageMin =
        Number(
            getValue("ageMin")
        ) || 0;


    const ageMax =
        Number(
            getValue("ageMax")
        ) || 999;


    const country =
        getValue(
            "searchCountry"
        ).toLowerCase();


    const city =
        getValue(
            "searchCity"
        ).toLowerCase();


    const candidates = [];


    const candidateProfile = {

        ...currentProfile

    };


    if (
        candidateProfile.fullName
    ) {

        candidates.push(
            candidateProfile
        );

    }


    if (!candidates.length) {

        results.innerHTML =
            "<p class='small'>No profiles found yet. Complete profiles will appear here.</p>";

        return;

    }


    const filtered =
        candidates.filter(
            function(profile) {

                const age =
                    Number(profile.age) || 0;


                if (
                    age &&
                    (
                        age < ageMin ||
                        age > ageMax
                    )
                ) {

                    return false;

                }


                if (
                    country &&
                    !String(
                        profile.country || ""
                    )
                    .toLowerCase()
                    .includes(country)
                ) {

                    return false;

                }


                if (
                    city &&
                    !String(
                        profile.city || ""
                    )
                    .toLowerCase()
                    .includes(city)
                ) {

                    return false;

                }


                return true;

            }
        );


    if (!filtered.length) {

        results.innerHTML =
            "<p class='small'>No matching profiles found.</p>";

        return;

    }


    filtered.forEach(
        function(profile) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "result-card";


            card.innerHTML =
                "<h3>" +
                escapeHTML(
                    profile.fullName
                ) +
                "</h3>" +

                "<p>" +
                escapeHTML(
                    profile.age || "Age not added"
                ) +
                "</p>" +

                "<p>" +
                escapeHTML(
                    [
                        profile.country,
                        profile.city
                    ]
                    .filter(Boolean)
                    .join(" • ")
                ) +
                "</p>" +

                "<p>" +
                escapeHTML(
                    profile.about || ""
                ) +
                "</p>";


            results.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   LIKES
   ========================================================= */

function loadLikes() {

    const list =
        document.getElementById(
            "likesList"
        );


    if (!list) {
        return;
    }


    const likes =
        readStorage(
            STORAGE.LIKES,
            []
        );


    if (
        !Array.isArray(likes) ||
        likes.length === 0
    ) {

        list.innerHTML =
            "<p class='small'>Your likes will appear here.</p>";

        return;

    }


    list.innerHTML = "";


    likes.forEach(
        function(item) {

            const p =
                document.createElement(
                    "p"
                );


            p.textContent =
                typeof item === "string"
                    ? item
                    : "Someone liked your profile.";


            list.appendChild(
                p
            );

        }
    );

}


/* =========================================================
   MATCHES
   ========================================================= */

function loadMatches() {

    const list =
        document.getElementById(
            "matchesList"
        );


    if (!list) {
        return;
    }


    const matches =
        readStorage(
            STORAGE.MATCHES,
            []
        );


    if (
        !Array.isArray(matches) ||
        matches.length === 0
    ) {

        list.innerHTML =
            "<p class='small'>Your matches will appear here.</p>";

        return;

    }


    list.innerHTML = "";


    matches.forEach(
        function(match) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";

            button.className =
                "primary";

            button.textContent =
                "💬 Open Chat";


            button.onclick =
                function() {

                    showPage("chat");

                };


            list.appendChild(
                button
            );

        }
    );

}


/* =========================================================
   SWIPE
   ========================================================= */

function getSwipeData() {

    return readStorage(
        STORAGE.SWIPES,
        {
            count: 0,
            date:
                new Date()
                    .toISOString()
                    .slice(0, 10)
        }
    );

}


function getSuperLikeData() {

    return readStorage(
        STORAGE.SUPER_LIKES,
        {
            count: 0,
            date:
                new Date()
                    .toISOString()
                    .slice(0, 10)
        }
    );

}


function resetDailyCounters() {

    const today =
        new Date()
            .toISOString()
            .slice(0, 10);


    let swipe =
        getSwipeData();


    let superLikes =
        getSuperLikeData();


    if (
        swipe.date !== today
    ) {

        swipe = {
            count: 0,
            date: today
        };

        writeStorage(
            STORAGE.SWIPES,
            swipe
        );

    }


    if (
        superLikes.date !== today
    ) {

        superLikes = {
            count: 0,
            date: today
        };

        writeStorage(
            STORAGE.SUPER_LIKES,
            superLikes
        );

    }

}


function updateSwipeCounters() {

    resetDailyCounters();


    const purchase =
        readStorage(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );


    const swipe =
        getSwipeData();


    const superLikes =
        getSuperLikeData();


    const swipeLimit =
        purchase.active
            ? "∞"
            : "30";


    setText(
        "swipeCount",
        swipe.count +
        " / " +
        swipeLimit
    );


    setText(
        "swipePageCount",
        swipe.count +
        " / " +
        swipeLimit
    );


    setText(
        "superLikeCount",
        superLikes.count +
        " / " +
        (
            purchase.active
                ? "5"
                : "0"
        )
    );


    setText(
        "swipePageSuperLikes",
        superLikes.count +
        " / " +
        (
            purchase.active
                ? "5"
                : "0"
        )
    );

}


function swipePass() {

    performSwipe(
        "pass"
    );

}


function swipeLike() {

    performSwipe(
        "like"
    );

}


function swipeSuperLike() {

    const purchase =
        readStorage(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );


    if (!purchase.active) {

        alert(
            "Super Likes are available with Rishta Plus."
        );

        openPackage();

        return;

    }


    resetDailyCounters();


    const data =
        getSuperLikeData();


    if (
        data.count >= 5
    ) {

        alert(
            "You have used all 5 Super Likes today."
        );

        return;

    }


    data.count++;


    writeStorage(
        STORAGE.SUPER_LIKES,
        data
    );


    updateSwipeCounters();


    alert(
        "Super Like sent!"
    );

}


function performSwipe(action) {

    const purchase =
        readStorage(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );


    resetDailyCounters();


    const data =
        getSwipeData();


    if (
        !purchase.active &&
        data.count >= 30
    ) {

        alert(
            "You have reached today's 30 swipe limit."
        );

        return;

    }


    data.count++;


    writeStorage(
        STORAGE.SWIPES,
        data
    );


    if (action === "like") {

        const likes =
            readStorage(
                STORAGE.LIKES,
                []
            );


        likes.push({
            date:
                new Date().toISOString()
        });


        writeStorage(
            STORAGE.LIKES,
            likes
        );


        alert(
            "Like sent!"
        );

    } else {

        alert(
            "Profile passed."
        );

    }


    updateSwipeCounters();

}


function loadSwipeProfile() {

    const profile =
        readStorage(
            STORAGE.PROFILE,
            DEFAULT_PROFILE
        );


    setText(
        "swipeName",
        profile.fullName ||
        "No profiles available"
    );


    setText(
        "swipeDetails",
        [
            profile.age,
            profile.country,
            profile.city
        ]
        .filter(Boolean)
        .join(" • ") ||
        "Complete your profile"
    );


    setText(
        "swipeAbout",
        profile.about ||
        "Complete your profile and start finding a compatible Rishta."
    );


    const photos =
        readStorage(
            STORAGE.PHOTOS,
            []
        );


    const photo =
        photos.length
            ? getPhotoSource(photos[0])
            : null;


    const photoElement =
        document.getElementById(
            "swipePhoto"
        );


    if (photoElement) {

        if (photo) {

            photoElement.innerHTML =
                "<img src='" +
                escapeAttribute(photo) +
                "' alt='Profile Photo' style='width:100%;height:100%;object-fit:cover;border-radius:16px;'>";

        } else {

            photoElement.textContent =
                "👤";

        }

    }


    updateSwipeCounters();

}


/* =========================================================
   REWARDED AD TEST
   ========================================================= */

function watchRewardedAd() {

    const purchase =
        readStorage(
            STORAGE.PURCHASE,
            DEFAULT_PURCHASE
        );


    if (!purchase.active) {

        alert(
            "Watch Ad feature is available for testing."
        );

    }


    resetDailyCounters();


    const data =
        getSuperLikeData();


    data.count =
        Math.min(
            5,
            data.count + 3
        );


    writeStorage(
        STORAGE.SUPER_LIKES,
        data
    );


    updateSwipeCounters();


    alert(
        "You received 3 Super Likes."
    );

}


/* =========================================================
   CHAT
   ========================================================= */

function sendMessage() {

    const input =
        document.getElementById(
            "chatMessage"
        );


    const container =
        document.getElementById(
            "chatMessages"
        );


    if (!input) {
        return;
    }


    const message =
        input.value.trim();


    if (!message) {

        alert(
            "Please write a message."
        );

        return;

    }


    const messages =
        readStorage(
            STORAGE.MESSAGES,
            []
        );


    messages.push({

        text: message,

        createdAt:
            new Date().toISOString()

    });


    writeStorage(
        STORAGE.MESSAGES,
        messages
    );


    if (container) {

        const item =
            document.createElement(
                "p"
            );


        item.textContent =
            message;


        container.appendChild(
            item
        );

    }


    input.value = "";

}


function showHalalIcebreaker() {

    const ideas = [

        "What are your intentions for marriage?",

        "What qualities are most important to you in a spouse?",

        "What are your family values?",

        "What does a successful marriage mean to you?",

        "What are your goals for the future?"

    ];


    const idea =
        ideas[
            Math.floor(
                Math.random() *
                ideas.length
            )
        ];


    const input =
        document.getElementById(
            "chatMessage"
        );


    if (input) {

        input.value =
            idea;

        input.focus();

    }

}


/* =========================================================
   LANGUAGE
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


function changeLanguage(language) {

    if (
        !HALAL_RISHTA_LANGUAGES.includes(
            language
        )
    ) {

        language =
            "en";

    }


    localStorage.setItem(
        STORAGE.LANGUAGE,
        language
    );


    document.documentElement.lang =
        language;


    document.documentElement.dir =
        (
            language === "ar" ||
            language === "fa"
        )
        ? "rtl"
        : "ltr";


    const selector =
        document.getElementById(
            "languageSelect"
        );


    if (selector) {

        selector.value =
            language;

    }


    window.currentLanguage =
        language;


    if (
        typeof window.applyTranslations ===
        "function"
    ) {

        try {

            window.applyTranslations(
                language
            );

        } catch (error) {

            console.error(
                "Translation error:",
                error
            );

        }

    }

}


/* =========================================================
   UTILITY FUNCTIONS
   ========================================================= */

function getValue(id) {

    const element =
        document.getElementById(id);


    if (!element) {
        return "";
    }


    return String(
        element.value || ""
    ).trim();

}


function setValue(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            value ?? "";

    }

}


function getChecked(id) {

    const element =
        document.getElementById(id);


    return element
        ? Boolean(element.checked)
        : false;

}


function setChecked(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.checked =
            Boolean(value);

    }

}


function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value ?? "";

    }

}


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


function escapeAttribute(value) {

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    );

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log(
            "Halal Rishta script loaded successfully."
        );


        /*
         * IMPORTANT:
         * Make sure the page starts on Home.
         */

        const pages =
            document.querySelectorAll(
                ".page"
            );


        pages.forEach(
            function(page) {

                page.classList.remove(
                    "active"
                );

            }
        );


        const home =
            document.getElementById(
                "home"
            );


        if (home) {

            home.classList.add(
                "active"
            );

        }


        /*
         * Restore language
         */

        const savedLanguage =
            localStorage.getItem(
                STORAGE.LANGUAGE
            ) || "en";


        changeLanguage(
            savedLanguage
        );


        /*
         * Setup photo uploader
         */

        setupPhotoUpload();


        /*
         * Restore dark mode
         */

        const settings =
            readStorage(
                STORAGE.SETTINGS,
                DEFAULT_SETTINGS
            );


        applyDarkMode(
            settings.darkMode
        );


        /*
         * Restore custom icon
         */

        const customIcon =
            localStorage.getItem(
                STORAGE.CUSTOM_ICON
            );


        if (customIcon) {

            let icon =
                document.querySelector(
                    "link[rel='icon']"
                );


            if (!icon) {

                icon =
                    document.createElement(
                        "link"
                    );

                icon.rel =
                    "icon";

                document.head.appendChild(
                    icon
                );

            }


            icon.href =
                customIcon;

        }


        /*
         * Prepare counters
         */

        resetDailyCounters();

        updateSwipeCounters();


        /*
         * If already logged in,
         * keep account available.
         */

        const user =
            getCurrentUser();


        if (
            user &&
            user.loggedIn === true
        ) {

            console.log(
                "Logged-in user:",
                user.email
            );

        }

    }
);


/* =========================================================
   GLOBAL ERROR REPORT
   ========================================================= */

window.addEventListener(
    "error",
    function(event) {

        console.error(
            "Halal Rishta JavaScript error:",
            event.error || event.message
        );

    }
);
