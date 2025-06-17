
import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Show button after scrolling down 100px
      setIsVisible(scrollTop > 100);
      
      // Show scrolling state
      setIsScrolling(true);
      
      // Clear scrolling state after scroll stops
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    // Debounce scroll events for better performance
    let rafId: number;
    const debouncedHandleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className={`
        fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50
        h-12 w-12 md:h-14 md:w-14 rounded-full
        bg-gradient-to-r from-primary to-purple-600
        hover:from-primary/90 hover:to-purple-600/90
        text-white shadow-lg hover:shadow-xl
        transition-all duration-300 ease-out
        backdrop-blur-sm border border-white/20
        touch-target
        ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}
        ${isScrolling ? 'animate-pulse' : ''}
        hover:scale-110 active:scale-95
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
      `}
      size="icon"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ArrowUp 
        className={`
          h-5 w-5 md:h-6 md:w-6 
          transition-transform duration-200
          ${isScrolling ? 'animate-bounce' : ''}
        `} 
      />
    </Button>
  );
};

export default ScrollToTopButton;
