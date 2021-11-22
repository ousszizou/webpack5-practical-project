// webpack.common.js: shared Webpack configuration for development and production mode.
const path = require("path");
const { generateHtmlPlugins } = require("./helpers.js");
module.exports = {
  entry: {
    index: path.resolve(__dirname, "../", "src/js/core/main.js"),
    about: path.resolve(__dirname, "../", "src/js/scripts/pages/about.js"),
  },
  output: {
    path: path.resolve(__dirname, "../", "dist"),
    filename: "app-assets/js/[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: generateHtmlPlugins("html"),
};
