module.exports = function (api) {
  api.cache(true)
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@navigation": "./src/navigation",
            "@hooks": "./src/hooks",
            "@services": "./src/services",
            "@utils": "./src/utils",
            "@types": "./src/types",
            "@assets": "./src/assets",
          },
        },
      ],
    ],
  }
}
