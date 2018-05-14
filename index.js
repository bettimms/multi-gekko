const gekkoPath = require('./src/isWindows.js')
    ? 'C:\\path\\to\\gekko\\gekko'
    : "/Volumes/path/to/gekko/gekko";

const generator = require("./src/generator");
generator.run(gekkoPath);