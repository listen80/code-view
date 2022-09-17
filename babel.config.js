module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: "chrome >= 86",
        },
      },
    ],
  ],
  plugins: [
    // '@babel/plugin-transform-runtime'
  ],
};
