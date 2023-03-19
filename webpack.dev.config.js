const path = require("path");
const { merge } = require("webpack-merge");

const SRC_DIR = path.join(__dirname, "src");

const baseConfig = require("./webpack.base.config");

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    static: {
      directory: SRC_DIR,
      watch: { ignored: /node_modules/ }
    },
    port: 3030, 
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
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