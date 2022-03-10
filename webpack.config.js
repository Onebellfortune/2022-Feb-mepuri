const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        main: "./codi/main.js",
    },
    output: {
        filename: "main.js",
        path: path.resolve("./dist"),
    },
};
