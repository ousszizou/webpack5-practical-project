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
