const path = require("path");
const CopyWebPackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: { noEmit: false },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new CopyWebPackPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  output: {
    filename: "content.js",
    path: path.resolve(__dirname, "dist"),
  },
};
