(() => {
  const track = document.querySelector(".events-carousel .events");
  if (!track) return;

  let slides = Array.from(track.children);
  const total = slides.length;
  let index = 0;
  let slideWidth = track.getBoundingClientRect().width;

  // clones para loop infinito
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[total - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  function setPosition() {
    slideWidth = track.getBoundingClientRect().width;
    track.style.transition = "none";
    track.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;
  }

  window.addEventListener("resize", setPosition);
  setPosition();

  function moveNext() {
    index++;
    track.style.transition = "transform .6s ease";
    track.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;

    if (index === total) {
      setTimeout(() => {
        track.style.transition = "none";
        index = 0;
        track.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;
      }, 650);
    }
  }

  setInterval(moveNext, 5000);
})();
