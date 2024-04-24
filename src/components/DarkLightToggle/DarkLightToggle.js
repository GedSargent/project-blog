"use client";
import React from "react";
import { Sun, Moon } from "react-feather";
import Cookie from "js-cookie";
import {
  LIGHT_TOKENS,
  DARK_TOKENS,
  COLOR_THEME_COOKIE_NAME,
} from "@/constants";
import VisuallyHidden from "@/components/VisuallyHidden";
import styles from "../Header/Header.module.css";

function DarkLightToggle({ initialTheme }) {
  const [theme, setTheme] = React.useState(initialTheme);

  const handleToggle = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    // Flip Sun/Moon icon
    setTheme(nextTheme);

    // Write cookie for future visits
    Cookie.set(COLOR_THEME_COOKIE_NAME, nextTheme, {
      expires: 1000,
    });

    // Apply theme to root HTML tag
    const root = document.documentElement;
    const newTokens = nextTheme === "light" ? LIGHT_TOKENS : DARK_TOKENS;

    root.setAttribute("data-color-theme", nextTheme);
    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return (
    <button className={styles.action} onClick={handleToggle}>
      {theme === "light" ? <Sun size="1.5rem" /> : <Moon size="1.5rem" />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
