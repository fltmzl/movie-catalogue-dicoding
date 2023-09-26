const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

const WorkboxWebapckPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src/templates/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/public/"),
          to: path.resolve(__dirname, "dist/"),
        },
      ],
    }),
    // new WorkboxWebapckPlugin.GenerateSW({
    //   swDest: "./sw.bundle.js",
    //   mode: "production",
    //   runtimeCaching: [
    //     {
    //       urlPattern: ({ url }) => url.href.startsWith("https://api.themoviedb.org/3/"),
    //       handler: "StaleWhileRevalidate",
    //       options: {
    //         cacheName: "themoviedb-api",
    //       },
    //     },
    //     {
    //       urlPattern: ({ url }) => url.href.startsWith("https://image.tmdb.org/t/p/w500/"),
    //       handler: "StaleWhileRevalidate",
    //       options: {
    //         cacheName: "themoviedb-image-api",
    //       },
    //     },
    //   ],
    // }),
    new WorkboxWebapckPlugin.InjectManifest({
      swSrc: path.resolve(__dirname, "src/scripts/sw.js"),
      swDest: "./sw.bundle.js",
    }),
  ],
};
