
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

type SearchResult = {
  title: string;
  type: "project" | "skill" | "experience";
  link: string;
};

const searchData: SearchResult[] = [
  { title: "Zwansave Dashboard", type: "project", link: "#zwansave" },
  { title: "Website Development", type: "project", link: "#websites" },
  { title: "WordPress Theme Tracker", type: "project", link: "#theme-tracker" },
  { title: "EurOrbit", type: "project", link: "#eurorbit" },
  { title: "PHP", type: "skill", link: "#skills" },
  { title: "JavaScript", type: "skill", link: "#skills" },
  { title: "WordPress", type: "skill", link: "#skills" },
  { title: "Python", type: "skill", link: "#skills" },
  { title: "HTML/CSS", type: "skill", link: "#skills" },
  { title: "El Space Tunis", type: "experience", link: "#experience" },
  { title: "Tino-soft", type: "experience", link: "#experience" },
];

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Filter results based on search term
  useEffect(() => {
    if (searchTerm.length < 2) {
      setSearchResults([]);
      return;
    }

    const filteredResults = searchData.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
  }, [searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleResultClick = (link: string) => {
    setSearchTerm("");
    setIsOpen(false);
    // Scroll to the section
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search skills, projects..."
          className="w-full py-2 pl-10 pr-4 text-sm bg-muted border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>

      {isOpen && searchResults.length > 0 && (
        <div className="absolute mt-2 w-full bg-background rounded-lg shadow-lg border border-border z-20 max-h-80 overflow-y-auto">
          <div className="p-2">
            {searchResults.map((result, index) => (
              <div
                key={index}
                onClick={() => handleResultClick(result.link)}
                className="flex items-center px-3 py-2 text-sm rounded-md hover:bg-muted cursor-pointer"
              >
                <span className="flex-1">{result.title}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-muted-foreground/10 text-muted-foreground">
                  {result.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
