const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.scss$/,
          use: [
              "style-loader",
              "css-loader",
              "sass-loader"
          ]
      }, {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }, {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/,
        use: [
            {
                loader: 'url-loader'
            },
        ]
    },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    })
  ]
};
