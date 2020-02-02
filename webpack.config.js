const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  return {
    mode: "development",
    entry: {
      index: path.join(`${__dirname}`, "src", "index.ts")
    },

    output: {
      path: path.join(__dirname, "www"),
      filename: "main.js",
      library: "main",
      libraryTarget: "umd"
    },

    devServer: {
      contentBase: path.join(__dirname, "www"),
      port: "8080",
      compress: true
    },

    devtool: "source-map",

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [{ loader: "ts-loader" }]
        }
      ]
    },

    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      extensions: [".ts", ".js"]
    },

    plugins: [new webpack.optimize.OccurrenceOrderPlugin(), new webpack.optimize.AggressiveMergingPlugin()]
  };
};
