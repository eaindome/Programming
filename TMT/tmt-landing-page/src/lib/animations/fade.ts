/**
 * Enhanced fade transition with configurable initial opacity
 */
export function enhancedFade(node: Element, { 
  delay = 0,
  duration = 400,
  initialOpacity = 0
}) {
  const o = getComputedStyle(node).opacity;

  return {
    delay,
    duration,
    css: (t: number) => `opacity: ${initialOpacity + t * (Number(o) - initialOpacity)}`
  };
}