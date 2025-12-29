const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  context: __dirname,

  entry: {
    // single React entry insetad of many  ts files listed
    main: "./src/main.tsx",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/[name].js",
    publicPath: "/",
    clean: true,
  },

  resolve: {
    // imports work without specifying .ts or .js
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },

  module: {
    // rules on what to load, allowing images every format and for styles different loaders
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        // babel config to translate tsx (config is in babel.config.js)
        use: "babel-loader",
      },
      {
        // plugins that webpack comes with to directly inject styles
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        // store images in assets folder inside dist
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name][ext]",
        },
      },
    ],
  },

  plugins: [
    // html page loader
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ["main"],
    }),
    // images go in assets folder
    new CopyWebpackPlugin({
      // copy everything from public  into the output
      patterns: [{ from: "public", to: "." }],
    }),

    // esLint plugin for linting during builds
    new ESLintPlugin({
      extensions: ["ts", "tsx", "js", "jsx"],
      emitWarning: true, // show warnings
      emitError: true, // show errors
      failOnError: false, // dont crash on errors
    }),
  ],

  // dev server config
  devServer: {
    static: "./dist",
    open: true,
    hot: true,
    // allow react-router routes
    historyApiFallback: true,
  },
};
