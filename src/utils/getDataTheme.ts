export function getDataTheme() {
  const value = document.documentElement.getAttribute('data-theme');
  switch (value) {
    case 'light':
      return 'light';
    case 'dark':
      return 'dark';
    default:
      throw new Error(
        `Expected data-theme to be one of 'light' or 'dark', but got ${value}.`
      );
  }
}
