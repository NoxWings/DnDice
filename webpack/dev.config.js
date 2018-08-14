const merge = require("webpack-merge");
const baseConf = require("./base.config");
const FOLDERS = require("./constants").FOLDERS;

module.exports = merge(baseConf, {
    mode: "development",
    devtool: "source-map",
    devServer: {
        contentBase: FOLDERS.DIST,
        publicPath: "/",
        host: "0.0.0.0",
        stats: {
            all: false,
            warnings: true,
            errors: true,
            errorDetails: true,
            moduleTrace: true,
            timings: true,
            colors: true
        }
    }
});
