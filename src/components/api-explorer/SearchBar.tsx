import React from "react";

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search APIs..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-primary"
    />
  );
};

export default SearchBar;
