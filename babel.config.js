module.exports = {
  // previously installed dependencies for babel / react / typescript to work
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};
