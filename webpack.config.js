const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
  entry: {
    main: path.resolve(appDirectory, "src/index.ts"),
    game: path.resolve(appDirectory, "src/app.ts"), // Entrée pour le premier niveau de jeu
    level2: path.resolve(appDirectory, "src/gameLevel2.ts"), // Entrée pour le deuxième niveau de jeu
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
    devMiddleware: {
      publicPath: "/public",
    },
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
      chunks: ["main", "game"], // Inclure le bundle pour le premier niveau de jeu
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
      chunks: ["main", "level2"], // Inclure le bundle pour le deuxième niveau de jeu
    }),
  ],
  mode: "development",
};
