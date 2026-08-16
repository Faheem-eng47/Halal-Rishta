/* =========================================================
   HALAL RISHTA - MAIN APP SCRIPT
   Version: 1.0
   ========================================================= */

const APP_NAME = "Halal Rishta";
const PACKAGE_PRICE = 2;
const PACKAGE_CURRENCY = "USD";

/* ---------- STORAGE ---------- */

const STORAGE = {
  user: "halal_rishta_user",
  profile: "halal_rishta_profile",
  photos: "halal_rishta_photos",
  settings: "halal_rishta_settings",
  purchase: "halal_rishta_purchase",
  privacy: "halal_rishta_privacy",
  icon: "halal_rishta_icon"
};

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function load(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

/* ---------- DEFAULT DATA ---------- */

let user = load(STORAGE.user, null);

let profile = load(STORAGE.profile, {
  fullName: "",
  age: "",
  gender: "",
  country: "",
  city: "",
  about: "",
  education: "",
  profession: "",
  maritalStatus: "",
  religiousLevel: ""
});

let photos = load(STORAGE.photos, []);

let settings = load(STORAGE.settings, {
  notifications: true,
  darkMode: false,
  language: "en"
});

let privacy = load(STORAGE.privacy, {
  profileVisibility: "members",
  showOnline: true,
  allowMessages: true
});

let purchase = load(STORAGE.purchase, {
  active: false,
  package: null,
  price: 0,
  currency: "USD",
  paymentMethod: null,
  activatedAt: null,
  expiresAt: null
});

/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(pageId);

  if (page) {
    page.classList.add("active");
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  updateApp();
}

/* =========================================================
   ACCOUNT
   ========================================================= */

function createAccount() {
  const inputs = document.querySelectorAll(
    '#register input'
  );

  const nameInput = inputs[0];
  const emailInput = inputs[1];
  const passwordInput = inputs[2];

  const name = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value : "";

  if (!name || !email || !password) {
    alert("Please complete all required fields.");
    return;
  }

  if (password.length < 6) {
    alert("Password must contain at least 6 characters.");
    return;
  }

  user = {
    name,
    email,
    createdAt: new Date().toISOString()
  };

  save(STORAGE.user, user);

  profile.fullName = name;
  save(STORAGE.profile, profile);

  alert("Account created successfully!");

  showPage("dashboard");
}

function login() {
  const section = document.getElementById("login");

  if (!section) return;

  const inputs = section.querySelectorAll("input");

  const email = inputs[0] ? inputs[0].value.trim() : "";
  const password = inputs[1] ? inputs[1].value : "";

  const savedUser = load(STORAGE.user, null);

  if (!email || !password) {
    alert("Please enter your email and password.");
    return;
  }

  if (!savedUser || savedUser.email !== email) {
    alert("Account not found. Please create an account first.");
    return;
  }

  user = savedUser;

  alert("Login successful!");

  showPage("dashboard");
}

function logout() {
  user = null;
  localStorage.removeItem(STORAGE.user);

  alert("You have been logged out.");

  showPage("home");
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function openDashboard() {
  if (!user) {
    alert("Please create an account or login first.");
    showPage("login");
    return;
  }

  showPage("dashboard");
}

/* =========================================================
   PROFILE
   ========================================================= */

function saveProfile() {
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
    "religiousLevel"
  ];

  fields.forEach(field => {
    const element = document.getElementById(field);

    if (element) {
      profile[field] = element.value;
    }
  });

  save(STORAGE.profile, profile);

  if (user && profile.fullName) {
    user.name = profile.fullName;
    save(STORAGE.user, user);
  }

  alert("Profile saved successfully.");

  updateProfileDisplay();
}

function loadProfile() {
  Object.keys(profile).forEach(field => {
    const element = document.getElementById(field);

    if (element) {
      element.value = profile[field] || "";
    }
  });

  updateProfileDisplay();
}

function updateProfileDisplay() {
  const nameElements = document.querySelectorAll(".profile-name");

  nameElements.forEach(element => {
    element.textContent =
      profile.fullName ||
      (user ? user.name : "Your Profile");
  });
}

/* =========================================================
   PHOTOS
   ========================================================= */

function addPhoto() {
  const input = document.getElementById("photoInput");

  if (!input) {
    alert("Photo upload input is not available yet.");
    return;
  }

  input.click();
}

function handlePhotoUpload(event) {
  const files = event.target.files;

  if (!files || !files.length) return;

  Array.from(files).forEach(file => {
    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
      photos.push({
        id: Date.now() + Math.random(),
        src: e.target.result,
        name: file.name
      });

      save(STORAGE.photos, photos);
      renderPhotos();
    };

    reader.readAsDataURL(file);
  });
}

function removePhoto(id) {
  photos = photos.filter(photo => photo.id !== id);

  save(STORAGE.photos, photos);

  renderPhotos();
}

function renderPhotos() {
  const container = document.getElementById("photoGallery");

  if (!container) return;

  container.innerHTML = "";

  if (!photos.length) {
    container.innerHTML =
      "<p>No photos added yet.</p>";
    return;
  }

  photos.forEach(photo => {
    const wrapper = document.createElement("div");

    wrapper.className = "photo-item";

    wrapper.innerHTML = `
      <img
        src="${photo.src}"
        alt="Profile photo"
        style="
          width:120px;
          height:120px;
          object-fit:cover;
          border-radius:16px;
        "
      >
      <button
        type="button"
        onclick="removePhoto(${photo.id})"
      >
        Remove
      </button>
    `;

    container.appendChild(wrapper);
  });
}

/* =========================================================
   PACKAGE / SUBSCRIPTION
   ========================================================= */

function openPackage() {
  const methods = [
    "Credit / Debit Card",
    "Visa",
    "Mastercard",
    "Apple Pay",
    "Google Pay",
    "PayPal"
  ];

  const methodText = methods
    .map((method, index) =>
      `${index + 1}. ${method}`
    )
    .join("\n");

  const choice = prompt(
    `Halal Rishta Package

$2 / month

Choose payment method:

${methodText}

Enter number:`
  );

  const index = Number(choice) - 1;

  if (index < 0 || index >= methods.length) {
    if (choice !== null) {
      alert("Invalid payment method.");
    }

    return;
  }

  const selectedMethod = methods[index];

  /*
    IMPORTANT:
    This section records the selected package locally.
    A real $2 charge requires a secure payment provider
    and backend/server-side verification.
  */

  activatePackage(selectedMethod);
}

function activatePackage(paymentMethod) {
  const now = new Date();

  const expires = new Date(now);
  expires.setMonth(expires.getMonth() + 1);

  purchase = {
    active: true,
    package: "Monthly Package",
    price: PACKAGE_PRICE,
    currency: PACKAGE_CURRENCY,
    paymentMethod,
    activatedAt: now.toISOString(),
    expiresAt: expires.toISOString()
  };

  save(STORAGE.purchase, purchase);

  alert(
    `Package selected successfully!

Package: $2 / month
Payment: ${paymentMethod}

Payment gateway will be connected before real payments are enabled.`
  );

  updatePurchaseDisplay();
}

function cancelPackage() {
  if (!purchase.active) {
    alert("No active package.");
    return;
  }

  const confirmCancel = confirm(
    "Are you sure you want to cancel your package?"
  );

  if (!confirmCancel) return;

  purchase.active = false;

  save(STORAGE.purchase, purchase);

  alert("Package cancelled.");

  updatePurchaseDisplay();
}

function updatePurchaseDisplay() {
  const elements =
    document.querySelectorAll(".package-status");

  elements.forEach(element => {
    if (purchase.active) {
      element.textContent =
        "Active - $2/month";
    } else {
      element.textContent =
        "Free Plan";
    }
  });
}

/* =========================================================
   MANAGE PURCHASES
   ========================================================= */

function managePurchases() {
  if (!purchase.active) {
    alert(
      "You currently have no active package.\n\n" +
      "Monthly Package: $2"
    );

    return;
  }

  const expiry = new Date(
    purchase.expiresAt
  ).toLocaleDateString();

  alert(
    `Manage Purchases

Package: ${purchase.package}
Price: $2/month
Payment: ${purchase.paymentMethod}
Expires: ${expiry}`
  );
}

/* =========================================================
   SETTINGS
   ========================================================= */

function saveSettings() {
  const notifications =
    document.getElementById("notifications");

  const darkMode =
    document.getElementById("darkMode");

  const language =
    document.getElementById("settingsLanguage");

  if (notifications) {
    settings.notifications =
      notifications.checked;
  }

  if (darkMode) {
    settings.darkMode =
      darkMode.checked;
  }

  if (language) {
    settings.language =
      language.value;
  }

  save(STORAGE.settings, settings);

  applySettings();

  alert("Settings saved.");
}

function loadSettings() {
  const notifications =
    document.getElementById("notifications");

  const darkMode =
    document.getElementById("darkMode");

  const language =
    document.getElementById("settingsLanguage");

  if (notifications) {
    notifications.checked =
      settings.notifications;
  }

  if (darkMode) {
    darkMode.checked =
      settings.darkMode;
  }

  if (language) {
    language.value =
      settings.language;
  }

  applySettings();
}

function applySettings() {
  document.body.classList.toggle(
    "dark-mode",
    settings.darkMode
  );
}

/* =========================================================
   PRIVACY
   ========================================================= */

function savePrivacy() {
  const visibility =
    document.getElementById("profileVisibility");

  const online =
    document.getElementById("showOnline");

  const messages =
    document.getElementById("allowMessages");

  if (visibility) {
    privacy.profileVisibility =
      visibility.value;
  }

  if (online) {
    privacy.showOnline =
      online.checked;
  }

  if (messages) {
    privacy.allowMessages =
      messages.checked;
  }

  save(STORAGE.privacy, privacy);

  alert("Privacy settings saved.");
}

function loadPrivacy() {
  const visibility =
    document.getElementById("profileVisibility");

  const online =
    document.getElementById("showOnline");

  const messages =
    document.getElementById("allowMessages");

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
}

/* =========================================================
   CUSTOM APP ICON
   ========================================================= */

function setCustomIcon(icon) {
  save(STORAGE.icon, icon);

  applyCustomIcon();

  alert("Custom icon selected.");
}

function applyCustomIcon() {
  const icon =
    load(STORAGE.icon, "💚");

  const elements =
    document.querySelectorAll(".app-icon");

  elements.forEach(element => {
    element.textContent = icon;
  });
}

/* =========================================================
   MATCH / SEARCH
   ========================================================= */

function searchProfiles() {
  const country =
    document.getElementById("searchCountry");

  const gender =
    document.getElementById("searchGender");

  const results =
    document.getElementById("searchResults");

  if (!results) return;

  const selectedCountry =
    country ? country.value : "";

  const selectedGender =
    gender ? gender.value : "";

  results.innerHTML = `
    <div class="card">
      <h3>Compatible Matches</h3>
      <p>
        Search filters:
        ${selectedCountry || "Any country"}
        -
        ${selectedGender || "Any gender"}
      </p>

      <p>
        Matching profiles will appear here
        when the database is connected.
      </p>
    </div>
  `;
}

/* =========================================================
   DELETE ACCOUNT
   ========================================================= */

function deleteAccount() {
  const confirmed = confirm(
    "Delete your Halal Rishta account permanently?"
  );

  if (!confirmed) return;

  Object.values(STORAGE).forEach(key => {
    localStorage.removeItem(key);
  });

  user = null;
  profile = {};
  photos = [];
  purchase = {};
  settings = {};
  privacy = {};

  alert("Account deleted.");

  location.reload();
}

/* =========================================================
   APP INITIALIZATION
   ========================================================= */

function updateApp() {
  updateProfileDisplay();
  updatePurchaseDisplay();
  renderPhotos();
  applyCustomIcon();
}

function initApp() {
  loadProfile();
  loadSettings();
  loadPrivacy();
  updateApp();

  const photoInput =
    document.getElementById("photoInput");

  if (photoInput) {
    photoInput.addEventListener(
      "change",
      handlePhotoUpload
    );
  }

  const languageSelect =
    document.getElementById("languageSelect");

  if (languageSelect) {
    languageSelect.value =
      settings.language || "en";

    languageSelect.addEventListener(
      "change",
      function() {
        settings.language =
          this.value;

        save(
          STORAGE.settings,
          settings
        );

        if (
          window.languages &&
          window.languages[this.value]
        ) {
          console.log(
            "Language:",
            window.languages[this.value]
          );
        }
      }
    );
  }

  /* Login/Create account buttons */
  document.querySelectorAll(
    '[data-action="login"]'
  ).forEach(button => {
    button.addEventListener(
      "click",
      login
    );
  });

  document.querySelectorAll(
    '[data-action="register"]'
  ).forEach(button => {
    button.addEventListener(
      "click",
      createAccount
    );
  });
}

/* Start application */
document.addEventListener(
  "DOMContentLoaded",
  initApp
);
