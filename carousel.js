(() => {
  const viewport = document.querySelector(".events-carousel");
  const track = document.querySelector(".events-carousel .events");
  if (!viewport || !track) return;

  let slides = Array.from(track.children);
  const total = slides.length;
  if (total < 2) return;

  // clones para loop infinito
  const firstClone = slides[0].cloneNode(true);
  const lastClone  = slides[total - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  let index = 0;
  let slideWidth = viewport.getBoundingClientRect().width;

  function setPosition(noAnim = true) {
    slideWidth = viewport.getBoundingClientRect().width;
    track.style.transition = noAnim ? "none" : "transform .6s ease";
    track.style.transform = `translateX(${-(index + 1) * slideWidth}px)`;
  }

  // posição inicial (começa no 1º slide real)
  setPosition(true);

  window.addEventListener("resize", () => setPosition(true));

  function moveNext() {
    index++;
    setPosition(false);

    // quando chega no clone do primeiro, volta pro primeiro real sem animação
    if (index === total) {
      setTimeout(() => {
        index = 0;
        setPosition(true);
      }, 650);
    }
  }

  setInterval(moveNext, 5000);
})();
