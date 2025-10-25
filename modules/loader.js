// modules/loader.js
import { initializeArchiveToggles } from "./archive.js";
import { fadeTransition } from "./transition.js";

export async function loadPage(pageName, lang) {
  const container = document.getElementById("page-container");

  fadeTransition(container, async () => {
    try {
      const localizedPath = `pages/${pageName}-${lang}.html`;
      let res = await fetch(localizedPath);
      if (!res.ok) res = await fetch(`pages/${pageName}-en.html`);

      const html = await res.text();
      container.innerHTML = html;

      if (pageName === "diary-archive") initializeArchiveToggles();
    } catch (err) {
      console.error(err);
      container.innerHTML = `<section><h2>Page not found</h2><p>The requested page "${pageName}" could not be loaded.</p></section>`;
    }
  });
}
