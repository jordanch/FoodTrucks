module.exports = {
  cache: true,
  entry: "./src/js/app.js",
  output: {
    filename: "./build/main.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
}
