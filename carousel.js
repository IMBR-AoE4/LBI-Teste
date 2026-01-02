window.addEventListener("load", () => {
  const viewport = document.querySelector(".events-carousel");
  const track = document.querySelector(".events-carousel .events");
  if (!viewport || !track) return;

  // ✅ trava para não inicializar duas vezes
  if (viewport.dataset.carouselInit === "1") return;
  viewport.dataset.carouselInit = "1";

  const slides = Array.from(track.children);
  const total = slides.length;
  if (total < 2) return;

  // clones
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[total - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let index = 0;
  let slideWidth = 0;
  let isAnimating = false;

  function measure() {
    slideWidth = viewport.getBoundingClientRect().width;
  }

  function jumpTo(i) {
    measure();
    track.style.transition = "none";
    track.style.transform = `translateX(${-(i + 1) * slideWidth}px)`;
    track.offsetHeight; // força reflow
  }

  function goTo(i) {
    measure();
    track.style.transition = "transform .6s ease";
    track.style.transform = `translateX(${-(i + 1) * slideWidth}px)`;
  }

  // start
  jumpTo(0);

  window.addEventListener("resize", () => jumpTo(index));

  track.addEventListener("transitionend", () => {
    isAnimating = false;

    // caiu no clone do primeiro -> volta pro primeiro real
    if (index === total) {
      index = 0;
      jumpTo(index);
    }
  });

  setInterval(() => {
    if (isAnimating) return;
    isAnimating = true;

    index++;
    goTo(index);
  }, 5000);
});
