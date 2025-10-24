// modules/archive.js
export function initializeArchiveToggles() {
  document.querySelectorAll(".archive-card-header").forEach(header => {
    header.addEventListener("click", () => {
      const wrapper = header.nextElementSibling;
      const icon = header.querySelector(".toggle-icon");

      if (!wrapper) return;

      const expanded = wrapper.classList.toggle("expanded");
      wrapper.style.maxHeight = expanded ? `${wrapper.scrollHeight + 25}px` : "0";
      icon?.classList.toggle("rotate-180", expanded);
    });
  });
}
