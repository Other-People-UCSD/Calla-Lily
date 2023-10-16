/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // https://github.com/storybookjs/storybook/issues/11639#issuecomment-801724587
  webpackFinal: async (config, { configType }) => {
      config.resolve.modules = [
        path.resolve(__dirname, '..'), 
        'node_modules'
      ];

      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../'),
      };

      return config;
  }
};
export default config;

const path = require('path');