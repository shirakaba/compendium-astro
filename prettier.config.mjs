/**
 * @satisfies {import("prettier").Config}
 * @see https://prettier.io/docs/en/configuration.html
 */
const config = {
  attributeGroups: ['^(id|name)$', '^data-', '^class$', '$DEFAULT'],
  bracketSpacing: true,
  plugins: ['prettier-plugin-organize-attributes', 'prettier-plugin-astro'],
  singleQuote: true,
  trailingComma: 'es5',
};

export default config;
