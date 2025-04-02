
import { Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme } = useTheme();

  return (
    <div
      className="flex items-center justify-center w-10 h-10 rounded-full bg-muted"
      aria-label="Dark mode is enabled"
    >
      <Moon className="h-5 w-5" />
    </div>
  );
}
