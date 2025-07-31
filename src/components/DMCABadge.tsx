import { useEffect } from 'react';

interface DMCABadgeProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  className?: string;
}

export default function DMCABadge({ 
  size = 'small', 
  showText = false, 
  className = '' 
}: DMCABadgeProps) {
  
  useEffect(() => {
    // Dynamically load the DMCA badge helper script
    const script = document.createElement('script');
    script.src = 'https://images.dmca.com/Badges/DMCABadgeHelper.min.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector('script[src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  const getBadgeImage = () => {
    switch (size) {
      case 'large':
        return 'https://images.dmca.com/Badges/dmca-badge-w150-5x1-08.png?ID=b1852537-592e-4aa0-be62-f7a742ef2f18';
      case 'medium':
        return 'https://images.dmca.com/Badges/dmca-badge-w125-5x1-08.png?ID=b1852537-592e-4aa0-be62-f7a742ef2f18';
      default:
        return 'https://images.dmca.com/Badges/dmca-badge-w100-5x1-08.png?ID=b1852537-592e-4aa0-be62-f7a742ef2f18';
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <a 
        href="//www.dmca.com/Protection/Status.aspx?ID=b1852537-592e-4aa0-be62-f7a742ef2f18" 
        title="DMCA.com Protection Status" 
        className="dmca-badge hover:opacity-80 transition-opacity"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="DMCA Protection Status - Content is protected by DMCA.com"
      >
        <img 
          src={getBadgeImage()}
          alt="DMCA.com Protection Status" 
          className="max-w-none"
          loading="lazy"
        />
      </a>
      {showText && (
        <span className="text-xs text-muted-foreground">
          Content Protected
        </span>
      )}
    </div>
  );
}