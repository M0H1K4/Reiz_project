import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  buttonLabel?: string;
  className?: string;
}

export default function ThemeToggle({
  theme,
  toggleTheme,
  buttonLabel,
  className,
}: ThemeToggleProps) {
  return (
    <button onClick={toggleTheme} className={`theme-toggle ${className || ""}`}>
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      {buttonLabel && <span className="button-label">{buttonLabel}</span>}
    </button>
  );
}
