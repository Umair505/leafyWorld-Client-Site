import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "leafyworld"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "leafyworld" ? "leafyworlddark" : "leafyworld"
    );
  };

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-sm btn-outline"
      aria-label="Toggle Theme"
    >
      {theme === "leafyworld" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
