const nodeExternals = require("webpack-node-externals");
const path = require('path');
const slsw = require("serverless-webpack");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  target: "node",
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
        },
      }),
    ],
  },
  externals: [nodeExternals(), 'pg-hstore', 'cardinal'],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "src/"),
      "@modules": path.resolve(__dirname, "src/modules/")
    },
    extensions: [".ts", ".js", ".js", ".json"],
  },
};
