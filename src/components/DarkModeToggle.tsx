import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

export function DarkModeToggle() {
  // https://www.joshwcomeau.com/react/dark-mode/
  // https://github.com/joshwcomeau/dark-mode-minimal/blob/master/src/components/DarkToggle.js
  //
  // https://docs.astro.build/en/tutorial/6-islands/2/#add-and-style-a-theme-toggle-icon
  // https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
  return (
    <button
      className="border-0 bg-none"
      onClick={() => {
        const resolvedTheme = resolveTheme();
        console.log('clicked!', resolvedTheme);

        const oppositeTheme = resolvedTheme === 'light' ? 'dark' : 'light';
        setDataTheme(oppositeTheme);
        persistTheme(oppositeTheme);
      }}
    >
      <svg width="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          className="fill-black dark:fill-transparent"
          fillRule="evenodd"
          d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1.5a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm12-7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1 0-1.6h2.4a.8.8 0 0 1 .8.8zM4 12a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1 0-1.6h2.5a.8.8 0 0 1 .8.8zm16.5-8.5a.8.8 0 0 1 0 1l-1.8 1.8a.8.8 0 0 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM6.3 17.7a.8.8 0 0 1 0 1l-1.7 1.8a.8.8 0 1 1-1-1l1.7-1.8a.8.8 0 0 1 1 0zM12 0a.8.8 0 0 1 .8.8v2.5a.8.8 0 0 1-1.6 0V.8A.8.8 0 0 1 12 0zm0 20a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-1.6 0v-2.4a.8.8 0 0 1 .8-.8zM3.5 3.5a.8.8 0 0 1 1 0l1.8 1.8a.8.8 0 1 1-1 1L3.5 4.6a.8.8 0 0 1 0-1zm14.2 14.2a.8.8 0 0 1 1 0l1.8 1.7a.8.8 0 0 1-1 1l-1.8-1.7a.8.8 0 0 1 0-1z"
        />
        <path
          className="fill-transparent dark:fill-white"
          fillRule="evenodd"
          d="M16.5 6A10.5 10.5 0 0 1 4.7 16.4 8.5 8.5 0 1 0 16.4 4.7l.1 1.3zm-1.7-2a9 9 0 0 1 .2 2 9 9 0 0 1-11 8.8 9.4 9.4 0 0 1-.8-.3c-.4 0-.8.3-.7.7a10 10 0 0 0 .3.8 10 10 0 0 0 9.2 6 10 10 0 0 0 4-19.2 9.7 9.7 0 0 0-.9-.3c-.3-.1-.7.3-.6.7a9 9 0 0 1 .3.8z"
        />
      </svg>
    </button>
  );
}

/**
 * -   "light": light mode
 * -    "dark": dark mode
 * -      null: context available, but light/dark mode not yet resolved
 * - undefined: context unavailable; need to use within ThemeProvider
 */
const ThemeContext = createContext<Theme | null | undefined>(undefined);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const theme = resolveTheme();
    setDataTheme(theme);
    setTheme(theme);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (theme === void 0) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return theme;
}

export type Theme = 'light' | 'dark';
const defaultMode: Theme = 'light';
const respectPrefersColorScheme: boolean = true;

export function resolveTheme() {
  const explicitTheme = getQueryStringTheme() || getStoredTheme();
  if (explicitTheme === 'light' || explicitTheme === 'dark') {
    return explicitTheme;
  }

  if (respectPrefersColorScheme) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  }

  return defaultMode;
}

function getQueryStringTheme() {
  try {
    return new URLSearchParams(window.location.search).get('docusaurus-theme');
  } catch {
    return;
  }
}

function getStoredTheme() {
  try {
    return window['localStorage'].getItem('theme');
  } catch {
    return;
  }
}

export function setDataTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
}

export function persistTheme(theme: 'light' | 'dark') {
  window['localStorage'].setItem('theme', theme);
}
