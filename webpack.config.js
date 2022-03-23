const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        mainCodi: "./codi/main.js",
        mainSeed: "./seedRing/main.js"
    },
    output: {
        filename: "[name].main.js",
        path: path.resolve("./dist"),
    },
};
