
import {useState, useEffect} from "react";
import { Menu, X, ChevronDown, Briefcase, MessageCircle, Search, MessageSquare } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mainNavigation = [
    { name: "Find Jobs", href: "/jobs", icon: Briefcase },
    { name: "Find Freelancers", href: "/freelancers", icon: Search },
    { name: "Services", href: "/services", icon: null },
    { name: "Academy", href: "/academy", icon: null },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-50 transition-all duration-200 border-b",
        scrolled
          ? "py-2 bg-background/95 backdrop-blur-lg shadow-md"
          : "py-3 bg-background"
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
              aria-label="ZWANSKI TECH - Job Marketplace"
            >
              ZWANSKI TECH
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="mr-4">
              <SearchBar />
            </div>
            
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {mainNavigation.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent hover:bg-accent/50 px-4 py-2 flex items-center gap-2"
                        )}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-accent/50">
                    More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[200px] gap-2 p-4 bg-background border border-border">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/newsletter"
                            className="block p-2 hover:bg-accent rounded-md"
                          >
                            Newsletter
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a
                            href="https://t.me/zwanski_tech"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 p-2 hover:bg-accent rounded-md text-blue-600 hover:text-blue-700"
                          >
                            <MessageSquare className="h-4 w-4" />
                            Join Telegram
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/chat"
                            className="block p-2 hover:bg-accent rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <MessageCircle className="h-4 w-4" />
                              Live Chat
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/post-job">Post a Job</Link>
              </Button>
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center lg:hidden">
            <LanguageSelector />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-2 rounded-md hover:bg-accent"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-lg shadow-lg border-t">
              <div className="px-3 py-2">
                <SearchBar />
              </div>
              
              {mainNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center gap-2 px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.name}
                </Link>
              ))}
              
              <hr className="border-border my-2" />
              
              <Link
                to="/post-job"
                className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Post a Job
              </Link>

              <Link
                to="/newsletter"
                className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Newsletter
              </Link>
              
              <a
                href="https://t.me/zwanski_tech"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare className="h-4 w-4" />
                Join Telegram
              </a>
              
              <Link
                to="/chat"
                className="flex items-center gap-2 px-3 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                Live Chat
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
