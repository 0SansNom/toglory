const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  entry: {
    main: path.resolve(appDirectory, "src/index.ts"),
    game: path.resolve(appDirectory, "src/level1.ts"),
    level2: path.resolve(appDirectory, "src/level2.ts"),
    level3: path.resolve(appDirectory, "src/level3.ts")
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(appDirectory, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    static: path.resolve(appDirectory, "public"),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, "public/index.html"),
      filename: "index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, "public/game.html"),
      filename: "game.html",
      chunks: ["main", "game"],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, "public/scores.html"),
      filename: "scores.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, "public/game-level2.html"),
      filename: "game-level2.html",
      chunks: ["main", "level2"],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(appDirectory, "public/game-level3.html"),
      filename: "game-level3.html",
      chunks: ["main", "level3"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(appDirectory, "public"), to: path.resolve(appDirectory, "dist") },
      ],
    }),
  ],
  mode: "production",
};
