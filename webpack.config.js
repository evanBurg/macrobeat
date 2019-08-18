let path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  node: {
    fs: "empty"
  },
  entry: {
    home: "./src/front_end/app.js"
  },
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/env",
              "@babel/preset-flow",
              "@babel/preset-react"
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/proposal-class-properties",
              "@babel/proposal-object-rest-spread",
              "@babel/plugin-proposal-optional-chaining"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
