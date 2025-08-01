import React from "react";
import ApiCard, { ApiEntry } from "./ApiCard";

interface ApiListProps {
  entries: ApiEntry[];
}

const ApiList: React.FC<ApiListProps> = ({ entries }) => {
  if (!entries.length) {
    return <p className="text-center text-muted-foreground">No APIs found.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((entry) => (
        <ApiCard key={entry.API + entry.Link} entry={entry} />
      ))}
    </div>
  );
};

export default ApiList;
