const path = require('path')
const nodeExternals = require('webpack-node-externals')
module.exports = {
  target: "node",
  entry: {
    app: ["./src/backend/server.ts"]
  },
  output: {
    path: path.resolve(__dirname, "buildServer"),
    filename: "bundle-back.js"
  },
  externals: [nodeExternals()],
  mode: "development"
};