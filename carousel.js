window.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".events-carousel");
  const track = viewport?.querySelector("[data-carousel-track]");
  const btnPrev = viewport?.querySelector("[data-carousel-prev]");
  const btnNext = viewport?.querySelector("[data-carousel-next]");
  const view = viewport?.querySelector(".events");

  if (!viewport || !track || !btnPrev || !btnNext || !view) return;

  if (viewport.dataset.carouselInit === "1") return;
  viewport.dataset.carouselInit = "1";

  const slides = Array.from(track.children);
  const total = slides.length;
  if (total < 2) return;

  let page = 0;
  let step = 0;
  let perPage = 1;
  let maxPage = 0;

  function measure() {
    const slide = slides[0];
    const gap = parseInt(getComputedStyle(track).gap || 0, 10);
    const slideWidth = slide.offsetWidth + gap;

    const viewWidth = view.clientWidth + gap;
    perPage = Math.max(1, Math.floor(viewWidth / slideWidth));

    step = slideWidth * perPage;
    maxPage = Math.max(0, Math.ceil(total / perPage) - 1);

    page = Math.min(page, maxPage);
  }

  function updateButtons() {
    btnPrev.disabled = page === 0;
    btnNext.disabled = page === maxPage;

    btnPrev.style.opacity = btnPrev.disabled ? "0.35" : "1";
    btnNext.style.opacity = btnNext.disabled ? "0.35" : "1";
    btnPrev.style.pointerEvents = btnPrev.disabled ? "none" : "auto";
    btnNext.style.pointerEvents = btnNext.disabled ? "none" : "auto";
  }

  function goTo(p, animate = true) {
    measure();
    page = Math.min(Math.max(p, 0), maxPage);

    track.style.transition = animate ? "transform .35s ease" : "none";
    track.style.transform = `translateX(${-page * step}px)`;

    if (!animate) {
      track.offsetHeight;
      track.style.transition = "transform .35s ease";
    }

    updateButtons();
  }

  btnNext.addEventListener("click", () => goTo(page + 1));
  btnPrev.addEventListener("click", () => goTo(page - 1));

  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goTo(page + 1);
    if (e.key === "ArrowLeft") goTo(page - 1);
  });
  viewport.tabIndex = 0;

  window.addEventListener("resize", () => goTo(page, false));

  goTo(0, false);
});
