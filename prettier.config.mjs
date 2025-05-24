/**
 * @satisfies {import("prettier").Config}
 * @see https://prettier.io/docs/en/configuration.html
 */
const config = {
  attributeGroups: ['^(id|name)$', '^data-', '^class$', '$DEFAULT'],
  bracketSpacing: true,
  plugins: [
    'prettier-plugin-organize-attributes',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-astro',
  ],
  pluginSearchDirs: false,
  singleQuote: true,
  tailwindFunctions: ['cva', 'twMerge'],
  tailwindStylesheet: 'src/styles/global.css',
  trailingComma: 'es5',
};

export default config;
