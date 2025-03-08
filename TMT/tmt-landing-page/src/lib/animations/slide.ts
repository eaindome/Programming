import { cubicOut } from 'svelte/easing';

/**
 * Enhanced slide transition with configurable easing
 */
export function enhancedSlide(node: Element, { 
  delay = 0,
  duration = 400,
  easing = cubicOut,
  direction = 'y',
  distance = 20
}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  
  const transform = direction === 'y' 
    ? `translateY(${distance}px)` 
    : `translateX(${distance}px)`;

  return {
    delay,
    duration,
    easing,
    css: (t: number) => `
      transform: ${transform} scale(${0.95 + t * 0.05});
      opacity: ${t * opacity};
    `
  };
}