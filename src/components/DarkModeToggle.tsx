export function DarkModeToggle() {
  // https://docs.astro.build/en/tutorial/6-islands/2/#add-and-style-a-theme-toggle-icon
  // https://tailwindcss.com/docs/dark-mode#supporting-system-preference-and-manual-selection
  return (
    <button
      className="border-0 bg-none"
      onClick={() => {
        const resolvedTheme = resolveTheme();
        const oppositeTheme = resolvedTheme === 'light' ? 'dark' : 'light';
        console.log('clicked!', resolvedTheme);
        setDataThemeAttribute(oppositeTheme);
        window['localStorage'].setItem('theme', oppositeTheme);
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

type Theme = 'light' | 'dark';

export function resolveTheme() {
  const defaultMode: Theme = 'light';
  const respectPrefersColorScheme = true;

  const initialTheme = getQueryStringTheme() || getStoredTheme();
  if (initialTheme === 'light' || initialTheme === 'dark') {
    return setDataThemeAttribute(initialTheme);
  } else {
    if (
      respectPrefersColorScheme &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return setDataThemeAttribute('dark');
    } else if (
      respectPrefersColorScheme &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      return setDataThemeAttribute('light');
    }

    return setDataThemeAttribute(defaultMode);
  }
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

function setDataThemeAttribute(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
}
