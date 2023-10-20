const path = require("path");

module.exports = {
  entry: "./src/index.js", //js파일의 진입점
  mode: "development",
  output: {
    // 빌드 했을 때, 번들 될 파일에 대해서 설정
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"), // 절대 경로를 찾을 수 있도록 path 사용
    clean: true,
  },
  experiments: {
    topLevelAwait: true,
  },
};