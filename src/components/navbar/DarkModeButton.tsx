import { useTheme } from "next-themes";
import { MoonStars, Sun } from "@phosphor-icons/react";

export default function DarkModeButton() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      className="transition-all bg-transparent rounded-lg p-1"
    >
      {currentTheme === "dark" ? (
        <Sun color="white" size={30} />
      ) : (
        <MoonStars size={30} />
      )}
    </button>
  );
}
