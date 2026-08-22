/* =========================================================
   HALAL RISHTA - SWIPE SYSTEM
   Complete replacement: swipe.js
   ========================================================= */

const SWIPE_CONFIG = {
    FREE_DAILY_LIMIT: 30,
    PREMIUM_PACKAGE: "Monthly",
    SUPER_LIKES_PER_DAY: 5,
    API_BASE: "/api"
};


/* =========================================================
   STATE
   ========================================================= */

let swipeProfiles = [];
let currentSwipeIndex = 0;

let swipeState = {
    count: 0,
    superLikes: 0,
    date: new Date().toISOString().slice(0, 10)
};


/* =========================================================
   STORAGE
   ========================================================= */

function swipeLoad(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);

        if (!value) {
            return fallback;
        }

        return JSON.parse(value);

    } catch (error) {
        console.error("Swipe storage load error:", error);
        return fallback;
    }
}


function swipeSave(key, value) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {
        console.error("Swipe storage save error:", error);
        return false;
    }
}


/* =========================================================
   CURRENT USER
   ========================================================= */

function getSwipeUser() {

    const user =
        swipeLoad("halal_rishta_user", null);

    if (!user || !user.id) {
        return null;
    }

    return user;
}


/* =========================================================
   PREMIUM CHECK
   ========================================================= */

function isSwipePremium() {

    const purchase =
        swipeLoad(
            "halal_rishta_purchase",
            null
        );

    if (!purchase) {
        return false;
    }

    if (!purchase.active) {
        return false;
    }

    if (
        purchase.expiresAt &&
        new Date(purchase.expiresAt) <= new Date()
    ) {
        return false;
    }

    return true;
}


/* =========================================================
   DAILY RESET
   ========================================================= */

function resetSwipeDayIfNeeded() {

    const today =
        new Date().toISOString().slice(0, 10);

    if (swipeState.date !== today) {

        swipeState = {
            count: 0,
            superLikes: 0,
            date: today
        };

        swipeSave(
            "halal_rishta_swipe_state",
            swipeState
        );
    }
}


/* =========================================================
   LOAD SWIPE STATE
   ========================================================= */

function loadSwipeState() {

    const saved =
        swipeLoad(
            "halal_rishta_swipe_state",
            null
        );

    if (
        saved &&
        typeof saved === "object"
    ) {
        swipeState = {
            count: Number(saved.count) || 0,
            superLikes: Number(saved.superLikes) || 0,
            date:
                saved.date ||
                new Date()
                    .toISOString()
                    .slice(0, 10)
        };
    }

    resetSwipeDayIfNeeded();

    updateSwipeCounters();
}


/* =========================================================
   SAVE SWIPE STATE
   ========================================================= */

function saveSwipeState() {

    swipeSave(
        "halal_rishta_swipe_state",
        swipeState
    );

    updateSwipeCounters();
}


/* =========================================================
   COUNTERS
   ========================================================= */

function updateSwipeCounters() {

    const swipeCount =
        document.getElementById("swipeCount");

    const superLikeCount =
        document.getElementById("superLikeCount");

    const premium =
        isSwipePremium();

    if (swipeCount) {

        if (premium) {
            swipeCount.textContent =
                `${swipeState.count} / Unlimited`;
        } else {
            swipeCount.textContent =
                `${swipeState.count} / ${SWIPE_CONFIG.FREE_DAILY_LIMIT}`;
        }
    }

    if (superLikeCount) {

        if (premium) {
            superLikeCount.textContent =
                `${swipeState.superLikes} / ${SWIPE_CONFIG.SUPER_LIKES_PER_DAY}`;
        } else {
            superLikeCount.textContent =
                `${swipeState.superLikes} / 0`;
        }
    }

    updatePlanDisplay();
}


/* =========================================================
   PLAN DISPLAY
   ========================================================= */

function updatePlanDisplay() {

    const planName =
        document.getElementById("planName");

    const planDescription =
        document.getElementById("planDescription");

    const statusElements =
        document.querySelectorAll(
            "[data-package-status]"
        );

    const premium =
        isSwipePremium();

    if (premium) {

        if (planName) {
            planName.textContent =
                "Rishta Plus";
        }

        if (planDescription) {
            planDescription.textContent =
                "Unlimited swipes + premium features";
        }

        statusElements.forEach(element => {
            element.textContent =
                "Premium";
        });

    } else {

        if (planName) {
            planName.textContent =
                "Free";
        }

        if (planDescription) {
            planDescription.textContent =
                "30 daily swipes";
        }

        statusElements.forEach(element => {
            element.textContent =
                "Free";
        });
    }
}


/* =========================================================
   SWIPE LIMIT
   ========================================================= */

function canSwipe() {

    resetSwipeDayIfNeeded();

    if (isSwipePremium()) {
        return true;
    }

    return (
        swipeState.count <
        SWIPE_CONFIG.FREE_DAILY_LIMIT
    );
}


/* =========================================================
   OPEN DISCOVER
   ========================================================= */

async function openDiscover() {

    const user =
        getSwipeUser();

    if (!user) {

        if (typeof showPage === "function") {
            showPage("login");
        }

        return;
    }

    resetSwipeDayIfNeeded();

    if (typeof showPage === "function") {
        showPage("discover");
    }

    loadSwipeState();

    await loadDiscoverProfiles();
}


/* =========================================================
   LOAD PROFILES
   ========================================================= */

async function loadDiscoverProfiles() {

    const user =
        getSwipeUser();

    if (!user) {
        return;
    }

    const card =
        document.getElementById("swipeCard");

    if (card) {

        card.innerHTML = `
            <div class="swipe-loading">
                <h3>Finding Rishtas...</h3>
                <p>Please wait.</p>
            </div>
        `;
    }

    try {

        const response =
            await fetch(
                `${SWIPE_CONFIG.API_BASE}/discover?userId=${encodeURIComponent(user.id)}`
            );

        if (!response.ok) {
            throw new Error(
                `Discover request failed: ${response.status}`
            );
        }

        const data =
            await response.json();

        swipeProfiles =
            Array.isArray(data.profiles)
                ? data.profiles
                : [];

        currentSwipeIndex = 0;

        renderCurrentSwipe();

    } catch (error) {

        console.error(
            "Discover error:",
            error
        );

        /*
           If API is not connected yet,
           show a clear message instead of crashing.
        */

        swipeProfiles = [];
        currentSwipeIndex = 0;

        renderNoProfiles(
            "No profiles are available yet."
        );
    }
}


/* =========================================================
   CURRENT PROFILE
   ========================================================= */

function getCurrentSwipeProfile() {

    if (
        currentSwipeIndex < 0 ||
        currentSwipeIndex >= swipeProfiles.length
    ) {
        return null;
    }

    return swipeProfiles[
        currentSwipeIndex
    ];
}


/* =========================================================
   RENDER CURRENT PROFILE
   ========================================================= */

function renderCurrentSwipe() {

    const profile =
        getCurrentSwipeProfile();

    if (!profile) {

        renderNoProfiles(
            "No more profiles available right now."
        );

        return;
    }

    const card =
        document.getElementById("swipeCard");

    if (!card) {
        return;
    }

    const name =
        escapeSwipeHTML(
            profile.fullName ||
            profile.name ||
            "Member"
        );

    const age =
        profile.age
            ? escapeSwipeHTML(
                String(profile.age)
            )
            : "";

    const country =
        escapeSwipeHTML(
            profile.country || ""
        );

    const city =
        escapeSwipeHTML(
            profile.city || ""
        );

    const profession =
        escapeSwipeHTML(
            profile.profession || ""
        );

    const about =
        escapeSwipeHTML(
            profile.about || ""
        );

    const image =
        profile.photo ||
        profile.photoUrl ||
        "";

    const location =
        [city, country]
            .filter(Boolean)
            .join(", ");

    card.innerHTML = `

        ${
            image
                ? `
                    <img
                        src="${image}"
                        alt="Profile photo"
                        class="swipe-photo"
                    >
                  `
                : `
                    <div class="swipe-photo-placeholder">
                        💚
                    </div>
                  `
        }

        <div class="swipe-profile-content">

            <h3>
                ${name}
                ${
                    age
                        ? `, ${age}`
                        : ""
                }
            </h3>

            ${
                location
                    ? `<p>📍 ${location}</p>`
                    : ""
            }

            ${
                profession
                    ? `<p>💼 ${profession}</p>`
                    : ""
            }

            <p class="swipe-about">
                ${
                    about ||
                    "This member has not added an introduction yet."
                }
            </p>

            ${
                profile.seriousIntent
                    ? `
                        <div class="intent-badge">
                            💍 Serious Marriage Intent
                        </div>
                      `
                    : ""
            }

        </div>
    `;

    updateSwipeButtons();
}


/* =========================================================
   NO PROFILES
   ========================================================= */

function renderNoProfiles(message) {

    const card =
        document.getElementById("swipeCard");

    if (!card) {
        return;
    }

    card.innerHTML = `

        <div class="no-profiles">

            <div class="no-profile-icon">
                💚
            </div>

            <h3>
                No Rishtas Available
            </h3>

            <p>
                ${escapeSwipeHTML(message)}
            </p>

            <p class="small">
                New members will appear here
                when they join Halal Rishta.
            </p>

        </div>
    `;

    updateSwipeButtons();
}


/* =========================================================
   BUTTON STATE
   ========================================================= */

function updateSwipeButtons() {

    const profile =
        getCurrentSwipeProfile();

    const likeButton =
        document.getElementById("swipeLikeButton");

    const passButton =
        document.getElementById("swipePassButton");

    const superButton =
        document.getElementById(
            "swipeSuperLikeButton"
        );

    const disabled =
        !profile ||
        !canSwipe();

    if (likeButton) {
        likeButton.disabled =
            disabled;
    }

    if (passButton) {
        passButton.disabled =
            disabled;
    }

    if (superButton) {

        superButton.disabled =
            disabled ||
            !isSwipePremium();
    }

    if (
        profile &&
        !canSwipe() &&
        !isSwipePremium()
    ) {

        showSwipeLimitMessage();
    }
}


/* =========================================================
   LIKE / PASS COMPATIBILITY
   ========================================================= */

async function handleSwipe(action) {

    if (action === "like") {
        await sendSwipe("like");
        return;
    }

    if (action === "pass") {
        await sendSwipe("pass");
        return;
    }

    if (action === "superlike") {
        await sendSwipe("superlike");
        return;
    }
}


/* =========================================================
   SEND SWIPE
   ========================================================= */

async function sendSwipe(action) {

    const user =
        getSwipeUser();

    const profile =
        getCurrentSwipeProfile();

    if (!user) {

        showPage("login");
        return;
    }

    if (!profile) {
        return;
    }

    if (!canSwipe()) {

        showSwipeLimitMessage();

        return;
    }

    if (
        action === "superlike" &&
        !isSwipePremium()
    ) {

        notifySwipe(
            "Super Likes are available with Rishta Plus.",
            "info"
        );

        return;
    }

    if (
        action === "superlike" &&
        swipeState.superLikes >=
        SWIPE_CONFIG.SUPER_LIKES_PER_DAY
    ) {

        notifySwipe(
            "You have used today's Super Likes.",
            "info"
        );

        return;
    }

    const targetUserId =
        profile.userId ||
        profile.id;

    if (!targetUserId) {

        notifySwipe(
            "This profile cannot be selected right now.",
            "error"
        );

        moveToNextSwipe();
        return;
    }

    try {

        const response =
            await fetch(
                `${SWIPE_CONFIG.API_BASE}/swipe`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        userId: user.id,
                        targetUserId:
                            targetUserId,
                        action: action
                    })
                }
            );

        if (!response.ok) {
            throw new Error(
                `Swipe request failed: ${response.status}`
            );
        }

        const result =
            await response.json();

        swipeState.count++;

        if (action === "superlike") {
            swipeState.superLikes++;
        }

        saveSwipeState();

        if (result.match) {

            notifySwipe(
                "💚 It's a Match! You both liked each other.",
                "success"
            );

        } else if (action === "like") {

            notifySwipe(
                "❤️ Like sent.",
                "success"
            );

        } else if (action === "superlike") {

            notifySwipe(
                "⭐ Super Like sent.",
                "success"
            );
        }

        moveToNextSwipe();

    } catch (error) {

        console.error(
            "Swipe error:",
            error
        );

        notifySwipe(
            "Unable to save this swipe. Please try again.",
            "error"
        );
    }
}


/* =========================================================
   NEXT PROFILE
   ========================================================= */

function moveToNextSwipe() {

    currentSwipeIndex++;

    renderCurrentSwipe();
}


/* =========================================================
   SWIPE LIMIT MESSAGE
   ========================================================= */

function showSwipeLimitMessage() {

    if (isSwipePremium()) {
        return;
    }

    notifySwipe(
        "You have reached today's 30 free swipes. Upgrade to Rishta Plus for unlimited swipes.",
        "info"
    );
}


/* =========================================================
   REWARDED AD
   ========================================================= */

function watchRewardedAd() {

    /*
       Real rewarded ads will be connected
       when the Google AdMob / AdSense
       integration is added.

       For now this does NOT fake a completed ad.
    */

    notifySwipe(
        "Rewarded Ads will be activated when the advertising system is connected.",
        "info"
    );
}


/* =========================================================
   NOTIFICATION
   ========================================================= */

function notifySwipe(
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

    /*
       Use a simple message only if
       the main notification system
       is not available.
    */

    console.log(
        `[${type}] ${message}`
    );

    alert(message);
}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeSwipeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.openDiscover =
    openDiscover;

window.handleSwipe =
    handleSwipe;

window.sendSwipe =
    sendSwipe;

window.watchRewardedAd =
    watchRewardedAd;


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadSwipeState();

        /*
           Update plan/counters whenever
           the application is opened.
        */

        updateSwipeCounters();

        /*
           Automatically refresh counters
           after returning to the app.
        */

        window.addEventListener(
            "storage",
            function(event) {

                if (
                    event.key ===
                    "halal_rishta_purchase"
                ) {

                    updateSwipeCounters();
                }
            }
        );
    }
);
