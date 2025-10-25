// modules/lang.js
export const translations = {
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
    nav: ["หน้าแรก", "คลังการผจญภัย", "ห้องสมุดพิศวง", "แล็บรูปภาพ", "กูเกิล"],
  },
};

export function applyLanguage(lang) {
  const t = translations[lang] || translations.en;

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
