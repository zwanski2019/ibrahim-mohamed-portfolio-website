import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ApiEntry {
  API: string;
  Description: string;
  Auth: string;
  HTTPS: boolean;
  Cors: string;
  Category: string;
  Link: string;
}

interface ApiCardProps {
  entry: ApiEntry;
}

const ApiCard: React.FC<ApiCardProps> = ({ entry }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(entry.Link);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-background hover:shadow-md transition">
      <h3 className="text-lg font-semibold mb-1">
        <a href={entry.Link} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {entry.API}
        </a>
      </h3>
      <p className="text-sm text-muted-foreground mb-2">{entry.Description}</p>
      <div className="flex items-center flex-wrap gap-2 text-xs mb-2">
        {entry.Auth ? <Badge variant="secondary">Auth: {entry.Auth}</Badge> : <Badge variant="secondary">No Auth</Badge>}
        {entry.HTTPS && <Badge variant="secondary">HTTPS</Badge>}
        <Badge variant="outline">{entry.Category}</Badge>
      </div>
      <div className="flex gap-2">
        <Button asChild size="sm">
          <a href={entry.Link} target="_blank" rel="noopener noreferrer">View Docs</a>
        </Button>
        <Button size="sm" variant="secondary" onClick={handleCopy}>Copy Link</Button>
      </div>
    </div>
  );
};

export default ApiCard;
