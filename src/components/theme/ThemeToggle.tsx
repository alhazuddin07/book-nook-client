"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

const THEME_EVENT = "booknook:theme-change";
const STORAGE_KEY = "theme";

const subscribe = (callback: () => void) => {
    window.addEventListener(THEME_EVENT, callback);

    return () => window.removeEventListener(THEME_EVENT, callback);
};

const getSnapshot = () => document.documentElement.classList.contains("dark");

const getServerSnapshot = () => false;

const applyTheme = (isDark: boolean) => {
    const root = document.documentElement;

    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    window.dispatchEvent(new Event(THEME_EVENT));
};

const ThemeToggle = ({ className = "" }: { className?: string }) => {
    const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    // Without a saved choice, keep following the OS while the page is open.
    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (event: MediaQueryListEvent) => {
            if (localStorage.getItem(STORAGE_KEY)) return;

            applyTheme(event.matches);
        };

        media.addEventListener("change", handleChange);

        return () => media.removeEventListener("change", handleChange);
    }, []);

    const toggleTheme = () => {
        const next = !document.documentElement.classList.contains("dark");

        applyTheme(next);

        try {
            localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
        } catch (error) {
            console.error("Could not save theme preference:", error);
        }
    };

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-raised text-brand transition-colors duration-200 hover:border-brand/40 hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${className}`}
        >
            {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </button>
    );
};

export default ThemeToggle;
