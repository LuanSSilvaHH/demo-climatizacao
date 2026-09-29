const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduced) {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  reveals.forEach((el) => observer.observe(el));

  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".heroContent");
  const layerBg = document.querySelector(".layer-bg");
  const layerCard = document.querySelector(".layer-card");
  const layerWord = document.querySelector(".layer-word");

  const animate = () => {
    const y = window.scrollY;
    if (hero && y < window.innerHeight * 1.2) {
      hero.style.setProperty("--hero-y", `${y * 0.18}px`);
      heroContent.style.transform = `translate3d(0, ${y * -0.07}px, 0)`;
      heroContent.style.opacity = Math.max(0, 1 - y / 760);
    }

    if (layerBg) {
      const rect = layerBg.parentElement.getBoundingClientRect();
      const progress =
        (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const move = (progress - 0.5) * 90;
      layerBg.style.transform = `scale(1.13) translate3d(0, ${move}px, 0)`;
      if (layerCard)
        layerCard.style.transform = `translate3d(0, ${move * -0.28}px, 0)`;
      if (layerWord)
        layerWord.style.transform = `translate3d(${move * 0.18}px, 0, 0)`;
    }
  };

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          animate();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true },
  );

  animate();
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((el) => el.classList.add("is-visible"));
}
