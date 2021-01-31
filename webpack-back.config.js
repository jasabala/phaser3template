const path = require('path')
const nodeExternals = require('webpack-node-externals')
module.exports = {
  target: "node",
  entry: {
    app: ["./src/backend/server.ts"]
  },
  output: {
    path: path.resolve(__dirname, "built-server"),
    filename: "bundle-back.js"
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  externals: [nodeExternals()],
  mode: "development"
};