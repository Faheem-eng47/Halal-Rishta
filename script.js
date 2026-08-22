/* =========================================================
   HALAL RISHTA
   Complete script.js
   Matches the current index.html
   ========================================================= */

"use strict";

/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE = {
    USER: "halal_rishta_user",
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
   HELPERS
   ========================================================= */

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
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

function isPremium() {
    const purchase = load(STORAGE.PURCHASE, DEFAULT_PURCHASE);

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
    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (!page) {
        console.warn("Page not found:", pageId);
        return;
    }

    page.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageId === "app") {
        updateDashboard();
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

    if (pageId === "photos") {
        renderPhotos();
    }
}

/* =========================================================
   ACCOUNT
   ========================================================= */

function createAccount() {
    const form = document.querySelector("#register form");

    if (!form) return;

    const inputs = form.querySelectorAll("input");

    const fullName = inputs[0].value.trim();
    const email = inputs[1].value.trim().toLowerCase();
    const password = inputs[2].value;

    if (!fullName || !email || !password) {
        alert("Please complete all fields.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }

    const existing = load("halal_rishta_account", null);

    if (existing && existing.email === email) {
        alert("An account with this email already exists.");
        showPage("login");
        return;
    }

    const account = {
        id: generateId("user"),
        fullName,
        email,
        password
    };

    save("halal_rishta_account", account);

    const user = {
        id: account.id,
        fullName: account.fullName,
        email: account.email
    };

    save(STORAGE.USER, user);

    const profile = {
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
    };

    save(STORAGE.PROFILE, profile);
    save(STORAGE.SETTINGS, DEFAULT_SETTINGS);
    save(STORAGE.PRIVACY, DEFAULT_PRIVACY);
    save(STORAGE.PURCHASE, DEFAULT_PURCHASE);

    resetActivity();

    alert("Account created successfully.");

    showPage("app");
    updateDashboard();
}

function loginUser() {
    const form = document.querySelector("#login form");

    if (!form) return;

    const inputs = form.querySelectorAll("input");

    const email = inputs[0].value.trim().toLowerCase();
    const password = inputs[1].value;

    const account = load("halal_rishta_account", null);

    if (!account) {
        alert("No account found. Please create an account first.");
        showPage("register");
        return;
    }

    if (
        account.email !== email ||
        account.password !== password
    ) {
        alert("Incorrect email or password.");
        return;
    }

    save(STORAGE.USER, {
        id: account.id,
        fullName: account.fullName,
        email: account.email
    });

    if (!load(STORAGE.PROFILE)) {
        save(STORAGE.PROFILE, {
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
        });
    }

    alert("Login successful.");

    showPage("app");
    updateDashboard();
}

function logoutUser() {
    remove(STORAGE.USER);
    showPage("home");
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {
    const user = getCurrentUser();

    if (!user) {
        showPage("login");
        return;
    }

    const emailElement = document.getElementById("dashboardEmail");

    if (emailElement) {
        emailElement.textContent = user.email;
    }

    const premium = isPremium();

    document.querySelectorAll("[data-package-status]").forEach(element => {
        element.textContent = premium ? "Rishta Plus" : "Free";
    });

    const planName = document.getElementById("planName");
    const planDescription = document.getElementById("planDescription");

    if (planName) {
        planName.textContent = premium
            ? "Rishta Plus"
            : "Free";
    }

    if (planDescription) {
        planDescription.textContent = premium
            ? "Unlimited daily swipes"
            : "30 daily swipes";
    }

    updateSwipeDisplay();
    updateSuperLikeDisplay();
}

/* =========================================================
   SWIPE SYSTEM
   ========================================================= */

function getSwipeData() {
    const data = load(STORAGE.SWIPES, {
        date: todayKey(),
        count: 0
    });

    if (data.date !== todayKey()) {
        return {
            date: todayKey(),
            count: 0
        };
    }

    return data;
}

function updateSwipeDisplay() {
    const element = document.getElementById("swipeCount");

    if (!element) return;

    const data = getSwipeData();

    element.textContent = isPremium()
        ? `${data.count} / Unlimited`
        : `${data.count} / 30`;
}

function canSwipe() {
    if (isPremium()) {
        return true;
    }

    const data = getSwipeData();

    if (data.count >= 30) {
        alert(
            "You have reached today's 30 free swipes. Upgrade to Rishta Plus for unlimited swipes."
        );

        return false;
    }

    return true;
}

function recordSwipe() {
    const data = getSwipeData();

    data.count += 1;

    save(STORAGE.SWIPES, data);

    updateSwipeDisplay();
}

function getSwipeProfiles() {
    const profile = load(STORAGE.PROFILE, {});
    const liked = load(STORAGE.LIKES, []);
    const passed = load(STORAGE.PASSES, []);

    const excluded = [
        profile.id,
        ...liked.map(item => item.profileId),
        ...passed.map(item => item.profileId)
    ];

    return DEMO_PROFILES.filter(
        person => !excluded.includes(person.id)
    );
}

/* =========================================================
   FIND RISHTA / SEARCH
   ========================================================= */

function searchProfiles() {
    const results = document.getElementById("searchResults");

    if (!results) return;

    const ageMin =
        parseInt(document.getElementById("ageMin")?.value) || 18;

    const ageMax =
        parseInt(document.getElementById("ageMax")?.value) || 100;

    const country =
        document.getElementById("searchCountry")?.value
            .trim()
            .toLowerCase() || "";

    const city =
        document.getElementById("searchCity")?.value
            .trim()
            .toLowerCase() || "";

    const religion =
        document.getElementById("searchReligion")?.value || "";

    const sect =
        document.getElementById("searchSect")?.value || "";

    const serious =
        document.getElementById("seriousIntent")?.checked || false;

    let profiles = getSwipeProfiles();

    profiles = profiles.filter(profile => {

        if (profile.age < ageMin || profile.age > ageMax) {
            return false;
        }

        if (
            country &&
            profile.country.toLowerCase() !== country
        ) {
            return false;
        }

        if (
            city &&
            profile.city.toLowerCase() !== city
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
                <p>No matching profiles found.</p>
            </div>
        `;
        return;
    }

    results.innerHTML = profiles.map(profile => `
        <div class="result-card">

            <h3>${escapeHTML(profile.fullName)}</h3>

            <p>
                ${profile.age} •
                ${escapeHTML(profile.city)},
                ${escapeHTML(profile.country)}
            </p>

            <p>
                ${escapeHTML(profile.profession || "Not specified")}
            </p>

            ${
                profile.seriousIntent
                    ? `<p>💍 Serious Marriage Intent</p>`
                    : ""
            }

            <p>
                ${escapeHTML(profile.about || "")}
            </p>

            <div class="swipe-actions">

                <button
                    type="button"
                    class="secondary"
                    onclick="passProfile('${profile.id}')">
                    ❌ Pass
                </button>

                <button
                    type="button"
                    class="primary"
                    onclick="likeProfile('${profile.id}')">
                    ❤️ Like
                </button>

                <button
                    type="button"
                    class="primary"
                    onclick="superLikeProfile('${profile.id}')">
                    ⭐ Super Like
                </button>

            </div>

        </div>
    `).join("");
}

function likeProfile(profileId) {
    if (!canSwipe()) return;

    const likes = load(STORAGE.LIKES, []);

    if (
        likes.some(item => item.profileId === profileId)
    ) {
        return;
    }

    likes.push({
        id: generateId("like"),
        profileId,
        createdAt: new Date().toISOString()
    });

    save(STORAGE.LIKES, likes);

    recordSwipe();

    /*
       Demo mutual-match logic:
       For testing, a demo profile can become a match
       when liked.
    */

    createMatchIfNeeded(profileId);

    alert("❤️ Like sent.");

    searchProfiles();
}

function passProfile(profileId) {
    if (!canSwipe()) return;

    const passes = load(STORAGE.PASSES, []);

    if (
        !passes.some(item => item.profileId === profileId)
    ) {
        passes.push({
            id: generateId("pass"),
            profileId,
            createdAt: new Date().toISOString()
        });
    }

    save(STORAGE.PASSES, passes);

    recordSwipe();

    alert("Profile passed.");

    searchProfiles();
}

/* =========================================================
   SUPER LIKES
   ========================================================= */

function getSuperLikeData() {
    const data = load(STORAGE.SUPERLIKES, {
        date: todayKey(),
        count: 0
    });

    if (data.date !== todayKey()) {
        return {
            date: todayKey(),
            count: 0
        };
    }

    return data;
}

function updateSuperLikeDisplay() {
    const element =
        document.getElementById("superLikeCount");

    if (!element) return;

    const data = getSuperLikeData();

    element.textContent = isPremium()
        ? `${data.count} / 5`
        : `${data.count} / 0`;
}

function superLikeProfile(profileId) {
    if (!isPremium()) {
        alert(
            "Super Likes are available with Rishta Plus. You can also earn 3 Super Likes by watching a rewarded ad."
        );
        return;
    }

    const data = getSuperLikeData();

    if (data.count >= 5) {
        alert("You have used today's 5 Super Likes.");
        return;
    }

    data.count += 1;

    save(STORAGE.SUPERLIKES, data);

    recordSwipe();

    createMatchIfNeeded(profileId);

    updateSuperLikeDisplay();

    alert("⭐ Super Like sent.");

    searchProfiles();
}

function watchRewardedAd() {
    /*
       Demo ad flow.
       Real rewarded ads will be connected later
       through the selected ad network.
    */

    const data = getSuperLikeData();

    data.count += 3;

    if (data.count > 5) {
        data.count = 5;
    }

    save(STORAGE.SUPERLIKES, data);

    updateSuperLikeDisplay();

    alert(
        "🎬 Reward completed. You received Super Likes."
    );
}

/* =========================================================
   MATCH SYSTEM
   ========================================================= */

function createMatchIfNeeded(profileId) {
    const matches = load(STORAGE.MATCHES, []);

    const alreadyMatched =
        matches.some(
            match => match.profileId === profileId
        );

    if (alreadyMatched) {
        return;
    }

    const profile =
        DEMO_PROFILES.find(
            person => person.id === profileId
        );

    if (!profile) return;

    matches.push({
        id: generateId("match"),
        profileId: profile.id,
        fullName: profile.fullName,
        createdAt: new Date().toISOString()
    });

    save(STORAGE.MATCHES, matches);
}

function renderMatches() {
    const container =
        document.getElementById("matchesList");

    if (!container) return;

    const matches = load(STORAGE.MATCHES, []);

    if (!matches.length) {
        container.innerHTML = `
            <p class="small">
                No matches yet. Start finding a Rishta.
            </p>
        `;
        return;
    }

    container.innerHTML = matches.map(match => `
        <div class="result-card">

            <h3>
                💚 ${escapeHTML(match.fullName)}
            </h3>

            <p>
                You have a match.
            </p>

            <button
                type="button"
                class="primary"
                onclick="openChat('${match.profileId}')">
                💬 Open Halal Chat
            </button>

        </div>
    `).join("");
}

/* =========================================================
   LIKES
   ========================================================= */

function renderLikes() {
    const container =
        document.getElementById("likesList");

    if (!container) return;

    const likes = load(STORAGE.LIKES, []);

    if (!likes.length) {
        container.innerHTML = `
            <p class="small">
                Your likes will appear here.
            </p>
        `;
        return;
    }

    container.innerHTML = likes.map(like => {

        const profile =
            DEMO_PROFILES.find(
                person => person.id === like.profileId
            );

        if (!profile) return "";

        return `
            <div class="result-card">

                <h3>
                    ❤️ ${escapeHTML(profile.fullName)}
                </h3>

                <p>
                    ${profile.age} •
                    ${escapeHTML(profile.city)},
                    ${escapeHTML(profile.country)}
                </p>

                <button
                    type="button"
                    class="primary"
                    onclick="openChat('${profile.id}')">
                    💬 Chat
                </button>

            </div>
        `;
    }).join("");
}

/* =========================================================
   CHAT
   ========================================================= */

let currentChatProfileId = null;

function openChat(profileId) {
    const matches = load(STORAGE.MATCHES, []);

    const isMatch =
        matches.some(
            match => match.profileId === profileId
        );

    if (!isMatch) {
        alert("Chat is available after a mutual match.");
        return;
    }

    currentChatProfileId = profileId;

    showPage("chat");
    renderChat();
}

function renderChat() {
    const container =
        document.getElementById("chatMessages");

    if (!container) return;

    if (!currentChatProfileId) {
        container.innerHTML = `
            <p class="small">
                Select a match to start chatting.
            </p>
        `;
        return;
    }

    const allMessages =
        load(STORAGE.MESSAGES, []);

    const messages =
        allMessages.filter(
            message =>
                message.profileId === currentChatProfileId
        );

    if (!messages.length) {
        container.innerHTML = `
            <p class="small">
                No messages yet. Start with a respectful message.
            </p>
        `;
        return;
    }

    container.innerHTML = messages.map(message => `
        <div class="chat-message">

            <strong>
                ${message.sender === "me" ? "You" : "Match"}
            </strong>

            <p>
                ${escapeHTML(message.text)}
            </p>

        </div>
    `).join("");
}

function sendMessage() {
    if (!currentChatProfileId) {
        alert("Please open a match first.");
        return;
    }

    const input =
        document.getElementById("chatMessage");

    if (!input) return;

    const text = input.value.trim();

    if (!text) {
        alert("Please write a message.");
        return;
    }

    const messages =
        load(STORAGE.MESSAGES, []);

    messages.push({
        id: generateId("message"),
        profileId: currentChatProfileId,
        sender: "me",
        text,
        createdAt: new Date().toISOString()
    });

    save(STORAGE.MESSAGES, messages);

    input.value = "";

    renderChat();
}

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
            Math.floor(Math.random() * questions.length)
        ];

    const input =
        document.getElementById("chatMessage");

    if (input) {
        input.value = question;
        input.focus();
    }
}

/* =========================================================
   PROFILE
   ========================================================= */

function openProfile() {
    const profile =
        load(STORAGE.PROFILE, {});

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
                profile[id] ?? "";
        }
    });

    showPage("profile");
}

function updateProfile() {
    const oldProfile =
        load(STORAGE.PROFILE, {});

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

    fields.forEach(id => {
        const element =
            document.getElementById(id);

        if (element) {
            profile[id] =
                element.value.trim();
        }
    });

    if (
        profile.age &&
        Number(profile.age) < 18
    ) {
        alert("Users must be 18 or older.");
        return;
    }

    save(STORAGE.PROFILE, profile);

    const user =
        getCurrentUser();

    if (user) {
        user.fullName =
            profile.fullName || user.fullName;

        save(STORAGE.USER, user);
    }

    alert("Profile saved successfully.");

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
        document.getElementById("photosList");

    if (!container) return;

    const photos =
        load(STORAGE.PHOTOS, []);

    if (!photos.length) {
        container.innerHTML = `
            <p>
                No photos uploaded yet.
            </p>
        `;
        return;
    }

    container.innerHTML = photos.map(photo => `
        <div class="photo-item">

            <img
                src="${photo.data}"
                alt="Profile photo"
                style="max-width:100%;border-radius:12px;"
            >

            <button
                type="button"
                class="secondary"
                onclick="deletePhoto('${photo.id}')">
                Delete
            </button>

        </div>
    `).join("");
}

function addPhoto(file) {
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        alert("Maximum 5MB per image.");
        return;
    }

    const reader =
        new FileReader();

    reader.onload = function(event) {

        const photos =
            load(STORAGE.PHOTOS, []);

        if (photos.length >= 6) {
            alert("Maximum 6 photos allowed.");
            return;
        }

        photos.push({
            id: generateId("photo"),
            data: event.target.result,
            createdAt: new Date().toISOString()
        });

        save(STORAGE.PHOTOS, photos);

        renderPhotos();
    };

    reader.readAsDataURL(file);
}

function deletePhoto(photoId) {
    const photos =
        load(STORAGE.PHOTOS, []);

    const updated =
        photos.filter(
            photo => photo.id !== photoId
        );

    save(STORAGE.PHOTOS, updated);

    renderPhotos();
}

/* =========================================================
   SETTINGS
   ========================================================= */

function openSettings() {
    const settings =
        load(STORAGE.SETTINGS, DEFAULT_SETTINGS);

    const notifications =
        document.getElementById("notifications");

    const darkMode =
        document.getElementById("darkMode");

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
    const settings = {
        notifications:
            document.getElementById("notifications")?.checked ?? true,

        darkMode:
            document.getElementById("darkMode")?.checked ?? false
    };

    save(STORAGE.SETTINGS, settings);

    document.body.classList.toggle(
        "dark-mode",
        settings.darkMode
    );

    alert("Settings saved.");
}

function applySavedSettings() {
    const settings =
        load(STORAGE.SETTINGS, DEFAULT_SETTINGS);

    document.body.classList.toggle(
        "dark-mode",
        !!settings.darkMode
    );
}

/* =========================================================
   PRIVACY
   ========================================================= */

function openPrivacy() {
    const privacy =
        load(STORAGE.PRIVACY, DEFAULT_PRIVACY);

    const visibility =
        document.getElementById("profileVisibility");

    const online =
        document.getElementById("showOnline");

    const messages =
        document.getElementById("allowMessages");

    const photoAfterMatch =
        document.getElementById("photoAfterMatch");

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
            document.getElementById("profileVisibility")?.value ||
            "members",

        showOnline:
            document.getElementById("showOnline")?.checked ??
            true,

        allowMessages:
            document.getElementById("allowMessages")?.checked ??
            true,

        photoAfterMatch:
            document.getElementById("photoAfterMatch")?.checked ??
            false
    };

    save(STORAGE.PRIVACY, privacy);

    alert("Privacy settings saved.");
}

/* =========================================================
   PURCHASES / RISHTA PLUS
   ========================================================= */

function openPurchases() {
    const purchase =
        load(STORAGE.PURCHASE, DEFAULT_PURCHASE);

    const status =
        document.getElementById("purchaseStatus");

    if (status) {
        status.textContent =
            purchase.active
                ? "Rishta Plus is active."
                : "No active subscription.";
    }

    showPage("purchases");
}

function openPackage() {
    showPage("package");
}

function activatePackage() {
    /*
       Payment provider is intentionally NOT faked here.

       This button prepares the subscription state only
       for testing. Real payment verification must happen
       through a secure payment provider/backend.
    */

    const message =
        document.getElementById("paymentMessage");

    if (message) {
        message.textContent =
            "Payment setup is required before Rishta Plus can be activated.";
    }

    alert(
        "Payment setup is required. The $2 subscription will not be marked as paid until a real payment provider is connected."
    );
}

/* =========================================================
   GUARDIAN
   ========================================================= */

function saveGuardian() {
    const name =
        document.getElementById("guardianName")?.value.trim();

    const email =
        document.getElementById("guardianEmail")?.value.trim();

    if (!name || !email) {
        alert("Please enter guardian name and email.");
        return;
    }

    save(STORAGE.GUARDIAN, {
        name,
        email,
        updatedAt: new Date().toISOString()
    });

    alert("Guardian information saved.");
}

/* =========================================================
   CUSTOM ICON
   ========================================================= */

function openCustomIcon() {
    showPage("customIcon");
}

function saveCustomIcon() {
    const input =
        document.getElementById("customIconInput");

    if (!input || !input.files.length) {
        alert("Please select an image.");
        return;
    }

    const file = input.files[0];

    if (file.size > 5 * 1024 * 1024) {
        alert("Maximum 5MB.");
        return;
    }

    const reader =
        new FileReader();

    reader.onload = function(event) {

        save(STORAGE.CUSTOM_ICON, {
            data: event.target.result,
            updatedAt: new Date().toISOString()
        });

        alert("Custom icon saved.");
    };

    reader.readAsDataURL(file);
}

/* =========================================================
   RESET ACTIVITY
   ========================================================= */

function resetActivity() {
    save(STORAGE.SWIPES, {
        date: todayKey(),
        count: 0
    });

    save(STORAGE.SUPERLIKES, {
        date: todayKey(),
        count: 0
    });

    save(STORAGE.LIKES, []);
    save(STORAGE.PASSES, []);
    save(STORAGE.MATCHES, []);
    save(STORAGE.MESSAGES, []);
}

/* =========================================================
   SECURITY / HTML ESCAPING
   ========================================================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/* =========================================================
   PHOTO INPUT EVENT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    applySavedSettings();

    const photoInput =
        document.getElementById("photoInput");

    if (photoInput) {
        photoInput.addEventListener(
            "change",
            function() {

                Array.from(this.files)
                    .forEach(file => addPhoto(file));

                this.value = "";
            }
        );
    }

    const languageSelect =
        document.getElementById("languageSelect");

    if (languageSelect) {

        const settings =
            load(
                STORAGE.SETTINGS,
                DEFAULT_SETTINGS
            );

        languageSelect.value =
            settings.language || "en";

        languageSelect.addEventListener(
            "change",
            function() {

                const current =
                    load(
                        STORAGE.SETTINGS,
                        DEFAULT_SETTINGS
                    );

                current.language =
                    this.value;

                save(STORAGE.SETTINGS, current);

                alert(
                    "Language preference saved."
                );
            }
        );
    }

    if (isLoggedIn()) {
        updateDashboard();
    }
});

/* =========================================================
   GLOBAL ERROR REPORTING
   ========================================================= */

window.addEventListener("error", function(event) {
    console.error(
        "Halal Rishta JavaScript Error:",
        event.error || event.message
    );
});

/* =========================================================
   END
   ========================================================= */
