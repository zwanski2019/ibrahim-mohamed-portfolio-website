
import { Search, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

type SearchResult = {
  title: string;
  type: "project" | "skill" | "experience" | "service";
  link: string;
  description?: string;
};

const searchData: SearchResult[] = [
  { title: "Zwansave Dashboard", type: "project", link: "#zwansave", description: "Financial management platform" },
  { title: "Website Development", type: "project", link: "#websites", description: "Custom web solutions" },
  { title: "WordPress Theme Tracker", type: "project", link: "#theme-tracker", description: "Theme monitoring system" },
  { title: "EurOrbit", type: "project", link: "#eurorbit", description: "Orbital tracking application" },
  { title: "PHP Development", type: "skill", link: "#skills", description: "Backend development expertise" },
  { title: "JavaScript", type: "skill", link: "#skills", description: "Frontend development" },
  { title: "WordPress", type: "skill", link: "#skills", description: "CMS development" },
  { title: "Python", type: "skill", link: "#skills", description: "Automation & AI" },
  { title: "HTML/CSS", type: "skill", link: "#skills", description: "Frontend styling" },
  { title: "El Space Tunis", type: "experience", link: "#experience", description: "Lead Developer" },
  { title: "Tino-soft", type: "experience", link: "#experience", description: "Software Engineer" },
  { title: "IMEI Repair", type: "service", link: "/imei-check", description: "Device identification repair" },
  { title: "Computer Diagnostics", type: "service", link: "/computer-model", description: "Hardware analysis" },
  { title: "Web Development", type: "service", link: "/services", description: "Custom websites & apps" },
];

const typeColors = {
  project: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  skill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  experience: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  service: "bg-orange-500/20 text-orange-300 border-orange-500/30"
};

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  variant?: "default" | "hero" | "navbar";
}

export function SearchBar({ placeholder = "Search skills, projects, services...", onSearch, variant = "default" }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results with improved search algorithm
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay for better UX
    const timeoutId = setTimeout(() => {
      const filteredResults = searchData.filter((item) => {
        const searchLower = searchTerm.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(searchLower);
        const typeMatch = item.type.toLowerCase().includes(searchLower);
        const descriptionMatch = item.description?.toLowerCase().includes(searchLower);
        
        return titleMatch || typeMatch || descriptionMatch;
      }).slice(0, 6); // Limit to 6 results for better UX
      
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < searchResults.length - 1 ? prev + 1 : prev);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleResultClick(searchResults[selectedIndex].link);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedIndex(-1);
    
    if (value.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
    
    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleResultClick = (link: string) => {
    setSearchTerm("");
    setIsOpen(false);
    setSelectedIndex(-1);
    
    // Scroll to the section or navigate
    if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = link;
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "hero":
        return "w-full max-w-2xl bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-lg";
      case "navbar":
        return "w-full max-w-sm bg-muted/50 border-border";
      default:
        return "w-full max-w-sm bg-muted border-border";
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-sm">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`w-full py-3 pl-12 pr-10 text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-200 ${getVariantStyles()}`}
          autoComplete="off"
          role="searchbox"
          aria-label="Search"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        />
        
        <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
        
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-3 p-1 hover:bg-muted rounded-full transition-colors"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Enhanced Search Results Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-background/95 backdrop-blur-lg rounded-xl shadow-elevation-3 border border-border z-50 max-h-80 overflow-hidden">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-pulse flex items-center justify-center gap-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="py-2" role="listbox">
              {searchResults.map((result, index) => (
                <div
                  key={`${result.type}-${index}`}
                  onClick={() => handleResultClick(result.link)}
                  className={`flex items-center justify-between px-4 py-3 text-sm cursor-pointer transition-all duration-150 group ${
                    selectedIndex === index 
                      ? 'bg-primary/10 text-primary' 
                      : 'hover:bg-muted/80'
                  }`}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate group-hover:text-foreground transition-colors">
                      {result.title}
                    </div>
                    {result.description && (
                      <div className="text-xs text-muted-foreground mt-1 truncate">
                        {result.description}
                      </div>
                    )}
                  </div>
                  <span className={`ml-3 text-xs px-2 py-1 rounded-full border ${typeColors[result.type]} font-medium`}>
                    {result.type}
                  </span>
                </div>
              ))}
            </div>
          ) : searchTerm.length >= 2 ? (
            <div className="p-4 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{searchTerm}"</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
