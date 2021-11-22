# Dashboard Project

## Project Structure

  - dist/
    - app-assets/ **(It is not recommend to change any files from this folder, use assets folder instead)**
      - css/
      - css-rtl/
      - data/
      - fonts/
      - images
      - js/
      - vendors/
    - assets/ **(Use folder for user customization purpose, you can add any custom css,js files & images in this folder)**
    - html/
      - ltr/
      - rtl/

  - documentation/

  - html/

    - ltr/
      - horizontal-menu-template/
      - horizontal-menu-template-dark/
      - horizontal-collapsed-menu-template/
      - vertical-menu-template/
      - horizontal-menu-template-dark/
    - rtl/
      - horizontal-menu-template/
      - horizontal-menu-template-dark/
      - horizontal-collapsed-menu-template/
      - vertical-menu-template/
      - horizontal-menu-template-dark/

  - node_modules/

  - src/

    - css/
      - components/
      - core/
      - pages/
      - plugins/
      - themes/
    - js/
      - core/
        - libraries/
      - scripts/
        - pages

  - starter-kit/
  - .gitignore
  - babel.config.js
  - package-lock.json
  - package.json
  - webpackConfig/
    - webpack.config.js
    - webpack.common.js
    - webpack.dev.js
    - webpack.prod.js

## workflow for dashboard project

- [×] initalize the project with `yarn init -y`
- [×] install dependencies with `yarn`
  ```sh
  yarn add webpack webpack-cli webpack-dev-server webpack-merge
  ```
- [×] create folder structure
- [×] create webpack config files
- [×] set project's commands
  ```json
    "dev": "webpack serve --config ./webpackConfig/webpack.config.js --env env=dev --progress",
    "start": "webpack --config ./webpackConfig/webpack.config.js --env env=dev --progress",
    "build": "webpack --config ./webpackConfig/webpack.config.js --env env=prod --progress",
  ```
- [×] work with webpack config file
  ```js
    const {merge} = require('webpack-merge');
    const commonConfig = require('./webpack.common.js');

    module.exports = ({env}) => {
      const envConfig = require(`./webpack.${env}.js`);
      return merge(commonConfig, envConfig);
    }
  ```
- [×] work with webpack-dev config file
  ```js
  // webpack.dev.js: Webpack configuration only used by development mode.
  const path = require("path");

  module.exports = {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
      static: {
        directory: path.resolve(
          __dirname,
          "../",
          "dist/ltr/horizontal-menu-template/"
        ),
        watch: true,
      },
      port: 9000,
      open: true,
      client: {
        logging: "error",
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
      },
      devMiddleware: {
        writeToDisk: true,
      },
    },
  };
  ```
- [×] work with webpack-prod config file
  ```js
  // webpack.prod.js: Webpack configuration only used by production mode.
  module.exports = {
    mode: "production",
  };
  ```
- [×] work with webpack-common config file
  - define entry, output
    ```js
    // webpack.common.js: shared Webpack configuration for development and production mode.
    const path = require("path");
    module.exports = {
      entry: {
        index: Path.resolve(__dirname, "../", "src/js/core/main.js"),
        about: Path.resolve(__dirname, "../", "src/js/scripts/pages/about.js"),
      },
      output: {
        path: Path.resolve(__dirname, "../", "dist"),
        filename: "app-assets/js/[name].js",
        clean: true,
      }
    }
    ```
  - define loaders
    - working with pug
      ```sh
      yarn add -D pug pug-loader
      ```
      ```js
        module.exports = {
          ...,
          module: {
            rules: [
              {
                test: /\.pug$/,
                loader: "pug-loader",
                options: {
                  pretty: true,
                },
              },
            ],
          },
        }
      ```
    - working with css
      ```sh
      yarn add -D css-loader style-loader
      ```
      ```js
        module.exports = {
          ...,
          module: {
            rules: [
              ...,
              {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
            ],
          },
        }
      ```
    - working with js
      ```sh
      yarn add -D babel-loader @babel/core @babel/preset-env
      ```
      ```js
        module.exports = {
          ...,
          module: {
            rules: [
              ...,
              {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
              },
            ],
          },
        }
      ```
      ```js
        // babel.config.js
        module.exports = {
          presets: ["@babel/preset-env"],
        };
      ```
  - define plugins (CleanWebpackPlugin)
    ```sh
      yarn add -D html-webpack-plugin glob clean-webpack-plugin
    ```
    ```js
      module.exports = {
        ...,
        plugins: generateHtmlPlugins("html"),
      }
    ```
    ```js
    // helpers.js
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const glob = require("glob");
    const path = require("path");

    module.exports = {
      generateHtmlPlugins: (templateDir) => {
        const src = path.resolve(__dirname, "../", templateDir);
        // /home/algorithm/Desktop/forMe/me/my-projects/dashboards/dashboard/html
        const templateFiles = glob.sync(`${src}/**/*.pug`);
        /**
        [
          '/home/algorithm/Desktop/forMe/me/my-projects/dashboards/dashboard/html/ltr/horizontal-menu-template/index.pug',
          '/home/algorithm/Desktop/forMe/me/my-projects/dashboards/dashboard/html/ltr/horizontal-menu-template/pages/about.pug'
        ]
        */
        return templateFiles.map((file) => {
          // /home/algorithm/Desktop/forMe/me/my-projects/dashboards/dashboard/html/ltr/horizontal-menu-template/index.pug
          const base = file.split("html")[1].substring(1);
          // ltr/horizontal-menu-template/index.pug
          const name = base.split(".")[0];
          // ltr/horizontal-menu-template/index
          const arr = name.split("/");
          // [ 'ltr', 'horizontal-menu-template', 'index' ]
          const chunkName = arr[arr.length - 1];
          // index
          return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, "../../", `${file}`),
            chunks: [chunkName],
          });
        });
      },
    };
    ```
