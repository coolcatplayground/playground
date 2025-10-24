// ===============================
// 🌐 CoolCat Dynamic Page Loader
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("page-container");
  const navLinks = document.querySelectorAll("nav a[data-page]");
  const langSwitcher = document.getElementById("lang-switcher");

  // Default Language Setup
  const savedLang = localStorage.getItem("appLanguage") || "en";
  langSwitcher.value = savedLang;
  applyLanguage(savedLang);

  // Load the default page on start
  loadPage("top-page");

  // =============== NAVIGATION ===============
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      loadPage(page);

      // Update active link
      navLinks.forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // =============== LANGUAGE SWITCHER ===============
langSwitcher.addEventListener("change", (e) => {
  const lang = e.target.value;
  localStorage.setItem("appLanguage", lang);
  applyLanguage(lang);

  // Reload the currently visible page in the new language
  const activePage = document.querySelector("nav a.active")?.dataset.page || "top-page";
  loadPage(activePage);
});

  // =============== PAGE LOADER FUNCTION ===============
  async function loadPage(pageName) {
  const container = document.getElementById("page-container");
  const lang = localStorage.getItem("appLanguage") || "en"; // current language

  try {
    // Start fade-out animation
    container.style.opacity = 0;

    // Try to load the localized page first
    const localizedPath = `pages/${pageName}-${lang}.html`;
    let res = await fetch(localizedPath);

    // If localized file not found, fall back to English
    if (!res.ok) {
      console.warn(`Missing ${localizedPath}, loading English fallback`);
      res = await fetch(`pages/${pageName}-en.html`);
    }

    // Load and inject HTML
    const html = await res.text();
    container.innerHTML = html;

    // Smooth fade-in
    setTimeout(() => {
      container.style.opacity = 1;
    }, 100);

    // Reinitialize any dynamic features
    if (pageName === "diary-archive") initializeArchiveToggles();

  } catch (error) {
    console.error("Error loading page:", error);
    container.innerHTML = `<section><h2>Page not found</h2><p>The requested page "${pageName}" could not be loaded.</p></section>`;
    container.style.opacity = 1;
  }
}


  // =============== COLLAPSIBLE TOGGLES (FOR ARCHIVE) ===============
  function initializeArchiveToggles() {
    document.querySelectorAll(".archive-card-header").forEach(header => {
      header.addEventListener("click", () => {
        const wrapper = header.nextElementSibling;
        const icon = header.querySelector(".toggle-icon");

        if (!wrapper) return;

        const isExpanded = wrapper.classList.contains("expanded");
        if (isExpanded) {
          wrapper.style.maxHeight = "0";
          wrapper.classList.remove("expanded");
          icon?.classList.remove("rotate-180");
        } else {
          wrapper.classList.add("expanded");
          const contentHeight = wrapper.scrollHeight;
          wrapper.style.maxHeight = `${contentHeight + 25}px`;
          icon?.classList.add("rotate-180");
        }
      });
    });
  }

  // =============== MULTILANGUAGE SUPPORT (Simplified) ===============
  function applyLanguage(lang) {
  const text = {
    en: {
      title: "CoolCat's Hobby & Daily Diary",
      subtitle: "Elegant musings on hobbies and daily life",
      footer: "© 2025 CoolCat's Hobby & Daily Diary. All rights reserved.",
      cta: "Which language do you prefer to talk with CC?",
      nav: ["Top Page", "Adventure Archive", "Omnious Library", "Image Lab", "Google"],
    },
    ja: {
      title: "クールキャットの趣味と日々の記録",
      subtitle: "趣味と日常生活に関する優雅な思索",
      footer: "© 2025 クールキャットの趣味と日々の記録. 全著作権所有.",
      cta: "CCとどの言語で話したいですか？",
      nav: ["トップページ", "冒険アーカイブ", "不吉な図書館", "画像ラボ", "グーグル"],
    },
    th: {
      title: "บันทึกประจำวันและงานอดิเรกของ CoolCat",
      subtitle: "แรงบันดาลใจจากงานอดิเรกและชีวิตประจำวัน",
      footer: "© 2025 บันทึกประจำวันและงานอดิเรกของ CoolCat สงวนลิขสิทธิ์ทั้งหมด",
      cta: "คุณต้องการคุยกับ CC ด้วยภาษาใด?",
      nav: ["หน้าแรก", "บันทึกการผจญภัย", "ห้องสมุดลึกลับ", "ห้องภาพศิลป์", "กูเกิล"],
    },
  };

  const t = text[lang] || text.en;

  // Header/Footer
  document.getElementById("title").textContent = t.title;
  document.getElementById("subtitle").textContent = t.subtitle;
  document.getElementById("footer-text").textContent = t.footer;
  document.getElementById("cta-text").textContent = t.cta;

  // Navigation
  const navLabels = document.querySelectorAll("#main-nav a");
  navLabels.forEach((link, i) => {
    if (t.nav[i]) link.textContent = t.nav[i];
  });
}

});
