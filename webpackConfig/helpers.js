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
