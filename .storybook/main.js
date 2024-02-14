/** @type { import('@storybook/nextjs').StorybookConfig } */
import path from 'path';

const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-storysource",
    "@storybook/addon-styling-webpack",
    ({
      name: "@storybook/addon-styling-webpack",

      options: {
        rules: [{
          test: /\.css$/,
          sideEffects: true,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                // Want to add more CSS Modules options? Read more here: https://github.com/webpack-contrib/css-loader#modules
                modules: {
                  auto: true,
                },
                importLoaders: 1,
              },
            }, {
              loader: "postcss-loader",
              options: {
                implementation: "postcss",
              },
            },
          ],
        }, {
          test: /\.s[ac]ss$/,
          sideEffects: true,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                // Want to add more CSS Modules options? Read more here: https://github.com/webpack-contrib/css-loader#modules
                modules: {
                  auto: true,
                },
                importLoaders: 3,
              },
            }, {
              loader: "postcss-loader",
              options: {
                implementation: "postcss",
              },
            },
            "resolve-url-loader",
            {
              loader: "sass-loader",
              options: {
                // Want to add more Sass options? Read more here: https://webpack.js.org/loaders/sass-loader/#options
                implementation: "sass",
                sourceMap: true,
                sassOptions: {},
              },
            },
          ],
        },],
      }
    })
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

    console.log(__dirname);

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../'),
      '/fonts': path.resolve(__dirname, '../public/fonts'),
      '/svg': path.resolve(__dirname, '../public/svg')
    };

    return config;
  },
  staticDirs: ['../public/svg']
};
export default config;