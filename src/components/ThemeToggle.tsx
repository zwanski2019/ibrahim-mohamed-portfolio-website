
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 cursor-default opacity-50"
      disabled
      aria-label="Dark mode (fixed)"
    >
      <Moon className="h-4 w-4" />
    </Button>
  );
}
