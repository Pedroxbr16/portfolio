let activeScrollFrame = null;

export const smoothScrollTo = (targetId) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  if (activeScrollFrame) {
    window.cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = null;
  }

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const absoluteDistance = Math.abs(distance);

  // Evita sensação de lentidão em navegação entre seções distantes.
  if (absoluteDistance > 900) {
    window.scrollTo(0, targetPosition);
    return;
  }

  const duration = Math.min(220, Math.max(120, absoluteDistance * 0.18));
  let start = null;

  activeScrollFrame = window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;

    const normalizedProgress = Math.min(progress / duration, 1);
    // EaseOutCubic: resposta rápida no começo e desaceleração suave no final.
    const easeOutCubic = 1 - Math.pow(1 - normalizedProgress, 3);

    if (normalizedProgress < 1) {
      window.scrollTo(0, startPosition + distance * easeOutCubic);
      activeScrollFrame = window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetPosition);
      activeScrollFrame = null;
    }
  });
};
