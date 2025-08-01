import React from "react";

interface FilterPanelProps {
  categories: string[];
  category: string;
  setCategory: (value: string) => void;
  auth: string;
  setAuth: (value: string) => void;
  httpsOnly: boolean;
  setHttpsOnly: (value: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  category,
  setCategory,
  auth,
  setAuth,
  httpsOnly,
  setHttpsOnly
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 border rounded-md"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={auth}
        onChange={(e) => setAuth(e.target.value)}
        className="px-3 py-2 border rounded-md"
      >
        <option value="">All Auth</option>
        <option value="none">No Auth</option>
        <option value="apiKey">API Key</option>
        <option value="OAuth">OAuth</option>
      </select>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={httpsOnly}
          onChange={(e) => setHttpsOnly(e.target.checked)}
        />
        <span>HTTPS Only</span>
      </label>
    </div>
  );
};

export default FilterPanel;
