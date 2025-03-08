/**
 * Custom Svelte action for IntersectionObserver
 */
export function intersectionObserver(node: Element, options = {}) {
    const defaults = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
      once: false
    };
    
    const config = { ...defaults, ...options };
    let observer: IntersectionObserver;
    
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        // Create a custom event
        const event = new CustomEvent('intersect', {
          detail: {
            isIntersecting: entry.isIntersecting,
            entry
          }
        });
        
        // Dispatch the event
        node.dispatchEvent(event);
        
        // If once is true and element is intersecting, unobserve
        if (config.once && entry.isIntersecting) {
          observer.unobserve(node);
        }
      });
    };
    
    // Create the observer
    observer = new IntersectionObserver(handleIntersect, {
      root: config.root,
      rootMargin: config.rootMargin,
      threshold: config.threshold
    });
    
    // Start observing
    observer.observe(node);
    
    return {
      destroy() {
        observer.unobserve(node);
      },
      update(newOptions: IntersectionObserverInit) {
        observer.unobserve(node);
        const newConfig = { ...config, ...newOptions };
        
        observer = new IntersectionObserver(handleIntersect, {
          root: newConfig.root,
          rootMargin: newConfig.rootMargin,
          threshold: newConfig.threshold
        });
        
        observer.observe(node);
      }
    };
}
  