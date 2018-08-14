const merge = require("webpack-merge");
const baseConf = require("./base.config");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(baseConf, {
    mode: "production",
    plugins: [
        new UglifyJsPlugin({ parallel: true })
    ]
});
