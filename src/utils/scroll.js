export const smoothScrollTo = (targetId) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1000; // 1 segundo de animação suave
  let start = null;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    
    // Ease In Out Cubic - começa devagar, acelera no meio, freia no final
    let ease = progress / duration;
    ease = ease < 0.5
      ? 4 * ease * ease * ease
      : 1 - Math.pow(-2 * ease + 2, 3) / 2;

    if (progress < duration) {
      window.scrollTo(0, startPosition + distance * ease);
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition);
    }
  });
};
