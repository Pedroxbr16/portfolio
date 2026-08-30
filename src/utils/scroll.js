export const smoothScrollTo = (targetId) => {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - 80;
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  window.scrollTo({
    top: targetPosition,
    behavior: reduceMotion ? 'auto' : 'smooth',
  });
};
