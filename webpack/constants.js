const path = require("path");

const PROJECT_FOLDER = path.resolve(__dirname, "..");
const DIST = path.resolve(PROJECT_FOLDER, "dist");

module.exports = {
    FOLDERS: {
        PROJECT: PROJECT_FOLDER,
        SRC: path.resolve(PROJECT_FOLDER, "src"),
        STATIC: path.resolve(PROJECT_FOLDER, "static"),
        DIST: DIST
    }
};
