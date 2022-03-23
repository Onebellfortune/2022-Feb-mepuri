const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    mode: "production",
    // mode: "development",
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    entry: {
        mainCodi: "./codi/main.js",
        mainSeed: "./seedRing/main.js",
    },
    output: {
        filename: "[name].main.js",
        path: path.resolve("./dist"),
    },
};
