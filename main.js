// main.js
import { loadPage } from "./modules/loader.js";
import { applyLanguage } from "./modules/lang.js";

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a[data-page]");
  const langSwitcher = document.getElementById("lang-switcher");
  const container = document.getElementById("page-container");

  // language
  const savedLang = localStorage.getItem("appLanguage") || "en";
  langSwitcher.value = savedLang;
  applyLanguage(savedLang);

  // default page
  loadPage("top-page", savedLang);

  // navigation
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const page = link.dataset.page;
      navLinks.forEach(a => a.classList.remove("active"));
      link.classList.add("active");
      loadPage(page, langSwitcher.value);
    });
  });

  // language switch
  langSwitcher.addEventListener("change", e => {
    const lang = e.target.value;
    localStorage.setItem("appLanguage", lang);
    applyLanguage(lang);
    const activePage = document.querySelector("nav a.active")?.dataset.page || "top-page";
    loadPage(activePage, lang);
  });
});
