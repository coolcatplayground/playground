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
  });

  // =============== PAGE LOADER FUNCTION ===============
  async function loadPage(pageName) {
    try {
      // Start fade-out transition
      container.style.opacity = 0;

      const res = await fetch(`pages/${pageName}.html`);
      if (!res.ok) throw new Error(`Page not found: ${pageName}`);

      const html = await res.text();
      container.innerHTML = html;

      // Fade-in animation
      setTimeout(() => {
        container.style.opacity = 1;
      }, 100);

      // After load, re-initialize internal features if needed
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
    const title = document.getElementById("title");
    const subtitle = document.getElementById("subtitle");
    const footer = document.getElementById("footer-text");
    const cta = document.getElementById("cta-text");

    const text = {
      en: {
        title: "CoolCat's Hobby & Daily Diary",
        subtitle: "Elegant musings on hobbies and daily life",
        footer: "© 2025 CoolCat's Hobby & Daily Diary. All rights reserved.",
        cta: "Which language do you prefer to talk with CC?",
      },
      ja: {
        title: "クールキャットの趣味と日々の記録",
        subtitle: "趣味と日常生活に関する優雅な思索",
        footer: "© 2025 クールキャットの趣味と日々の記録. 全著作権所有.",
        cta: "CCとどの言語で話したいですか？",
      },
      th: {
        title: "บันทึกประจำวันและงานอดิเรกของ CoolCat",
        subtitle: "การครุ่นคิดอันสง่างามเกี่ยวกับงานอดิเรกและชีวิตประจำวัน",
        footer: "© 2025 บันทึกประจำวันและงานอดิเรกของ CoolCat สงวนลิขสิทธิ์ทั้งหมด",
        cta: "คุณต้องการคุยกับ CC ด้วยภาษาใด?",
      }
    };

    const t = text[lang] || text.en;

    if (title) title.textContent = t.title;
    if (subtitle) subtitle.textContent = t.subtitle;
    if (footer) footer.textContent = t.footer;
    if (cta) cta.textContent = t.cta;
  }
});
