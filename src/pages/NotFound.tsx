import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Code */}
          <div className="text-9xl font-bold text-primary/20 mb-4">404</div>
          
          {/* Main Message */}
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>
          
          {/* Logo/Brand */}
          <div className="mb-8">
            <div className="text-2xl font-bold text-primary">ZWANSKI TECH</div>
            <p className="text-sm text-muted-foreground">Professional IT Services & Digital Education</p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </a>
            <a 
              href="/services" 
              className="inline-flex items-center justify-center px-6 py-3 border border-border text-foreground font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              View Our Services
            </a>
          </div>
          
          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">
              Need help finding what you're looking for?
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="/about" className="text-primary hover:underline">About Us</a>
              <a href="/academy" className="text-primary hover:underline">Academy</a>
              <a href="/jobs" className="text-primary hover:underline">Jobs</a>
              <a href="/support" className="text-primary hover:underline">Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
