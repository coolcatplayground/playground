// modules/transition.js
export function fadeTransition(target, callback) {
  if (!target) return;
  target.classList.add("fade-out");

  target.addEventListener("animationend", function handleFadeOut() {
    target.removeEventListener("animationend", handleFadeOut);

    // run the callback (load new content)
    callback?.();

    // trigger fade-in after DOM updates
    requestAnimationFrame(() => {
      target.classList.remove("fade-out");
      target.classList.add("fade-in");
      target.addEventListener("animationend", () => {
        target.classList.remove("fade-in");
      }, { once: true });
    });
  });
}
