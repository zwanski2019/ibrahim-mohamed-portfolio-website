import { useEffect } from 'react';

export const AccessibilityEnhancer = () => {
  useEffect(() => {
    // Add skip links
    const addSkipLinks = () => {
      const skipLinksContainer = document.createElement('div');
      skipLinksContainer.className = 'skip-links';
      skipLinksContainer.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
        padding: 8px;
        z-index: 10000;
        text-decoration: none;
        border-radius: 4px;
        transition: top 0.3s;
      `;
      
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.style.cssText = `
        color: inherit;
        text-decoration: none;
      `;
      
      skipLink.addEventListener('focus', () => {
        skipLinksContainer.style.top = '6px';
      });
      
      skipLink.addEventListener('blur', () => {
        skipLinksContainer.style.top = '-40px';
      });
      
      skipLinksContainer.appendChild(skipLink);
      document.body.insertBefore(skipLinksContainer, document.body.firstChild);
    };

    // Add main content landmark
    const addMainLandmark = () => {
      const main = document.querySelector('main') || document.querySelector('#root > div');
      if (main && !main.id) {
        main.id = 'main-content';
        main.setAttribute('role', 'main');
      }
    };

    // Improve focus management
    const improveFocusManagement = () => {
      // Add focus outline for keyboard users
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      });
      
      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
      });
      
      // Add CSS for keyboard navigation
      const style = document.createElement('style');
      style.textContent = `
        .keyboard-navigation *:focus {
          outline: 2px solid hsl(var(--ring)) !important;
          outline-offset: 2px !important;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `;
      document.head.appendChild(style);
    };

    // Add ARIA live regions
    const addLiveRegions = () => {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.className = 'sr-only';
      liveRegion.id = 'live-region';
      document.body.appendChild(liveRegion);
    };

    // Improve button accessibility
    const improveButtonAccessibility = () => {
      const buttons = document.querySelectorAll('button, [role="button"]');
      buttons.forEach((button) => {
        // Add accessible name if missing
        if (!button.getAttribute('aria-label') && 
            !button.getAttribute('aria-labelledby') && 
            !button.textContent?.trim()) {
          console.warn('Button missing accessible name:', button);
        }
        
        // Ensure interactive elements have proper roles
        if (!button.getAttribute('role') && button.tagName !== 'BUTTON') {
          button.setAttribute('role', 'button');
        }
        
        // Add keyboard support for non-button elements
        if (button.tagName !== 'BUTTON' && !button.hasAttribute('tabindex')) {
          button.setAttribute('tabindex', '0');
          
          button.addEventListener('keydown', (e: KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              (button as HTMLElement).click();
            }
          });
        }
      });
    };

    // Improve form accessibility
    const improveFormAccessibility = () => {
      const inputs = document.querySelectorAll('input, select, textarea');
      inputs.forEach((input) => {
        // Check for labels
        const id = input.id;
        if (id) {
          const label = document.querySelector(`label[for="${id}"]`);
          if (!label && !input.getAttribute('aria-label') && 
              !input.getAttribute('aria-labelledby')) {
            console.warn('Form control missing label:', input);
          }
        }
        
        // Add required indicators
        if (input.hasAttribute('required')) {
          const label = document.querySelector(`label[for="${input.id}"]`);
          if (label && !label.querySelector('.required-indicator')) {
            const indicator = document.createElement('span');
            indicator.className = 'required-indicator';
            indicator.textContent = ' *';
            indicator.setAttribute('aria-label', 'required');
            label.appendChild(indicator);
          }
        }
      });
    };

    // Improve heading hierarchy
    const improveHeadingHierarchy = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      let previousLevel = 0;
      
      headings.forEach((heading) => {
        const currentLevel = parseInt(heading.tagName.charAt(1));
        
        if (currentLevel - previousLevel > 1) {
          console.warn('Heading hierarchy skip detected:', {
            element: heading,
            text: heading.textContent,
            level: currentLevel,
            previousLevel
          });
        }
        
        previousLevel = currentLevel;
      });
    };

    // Add color contrast checker
    const checkColorContrast = () => {
      // This is a simplified contrast checker
      const elements = document.querySelectorAll('*');
      elements.forEach((element) => {
        const style = window.getComputedStyle(element);
        const backgroundColor = style.backgroundColor;
        const color = style.color;
        
        // Skip elements without text or transparent backgrounds
        if (!element.textContent?.trim() || backgroundColor === 'rgba(0, 0, 0, 0)') {
          return;
        }
        
        // You could implement a more sophisticated contrast ratio calculation here
        // For now, we'll just check for some common problematic combinations
        if (backgroundColor === 'rgb(255, 255, 255)' && color === 'rgb(224, 224, 224)') {
          console.warn('Potential contrast issue detected:', element);
        }
      });
    };

    // Initialize all accessibility improvements
    addSkipLinks();
    addMainLandmark();
    improveFocusManagement();
    addLiveRegions();
    
    // Run checks after DOM is fully loaded
    setTimeout(() => {
      improveButtonAccessibility();
      improveFormAccessibility();
      improveHeadingHierarchy();
      checkColorContrast();
    }, 1000);

    // Set up mutation observer for dynamic content
    const observer = new MutationObserver(() => {
      improveButtonAccessibility();
      improveFormAccessibility();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};

// Utility function to announce messages to screen readers
export const announceToScreenReader = (message: string) => {
  const liveRegion = document.getElementById('live-region');
  if (liveRegion) {
    liveRegion.textContent = message;
    
    // Clear after a short delay
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  }
};