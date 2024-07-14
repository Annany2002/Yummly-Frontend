"use client";

import { useTheme } from "next-themes";
import { MoonStars, Sun } from "@phosphor-icons/react";

export default function DarkModeButton() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      className="transition-all duration-100 bg-transparent dark:text-slate-950 rounded-lg p-1"
    >
      {currentTheme === "dark" ? <MoonStars size={30} /> : <Sun size={30} />}
    </button>
  );
}
