const path = require("path");
const { merge } = require("webpack-merge");

const SRC_DIR = path.join(__dirname, "src");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        include: SRC_DIR,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
          }
        ]
      }
    ]
  }
});