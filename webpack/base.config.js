const FOLDERS = require("./constants").FOLDERS;
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: path.join(FOLDERS.SRC, "index.ts"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({ title: "DnDice" })
    ],
    output: {
        filename: "[name].js",
        path: FOLDERS.DIST
    }
};
