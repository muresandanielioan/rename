//written by Daniel Muresan
//daniel.muresan@gmail.com

var fs = require('fs');
var util = require('util');
if (process.argv[2]) {
    var picDir = process.argv[2];
    var oldFileNames = fileNamesByDate(picDir);
    console.log("\nDaniel Muresan's rename.js => Renaming the following files:\n");

    for (var i = 0; i < oldFileNames.length; i++) {
        console.log('\t|| ' + oldFileNames[i]);
        fs.renameSync(picDir + '/' + oldFileNames[i], picDir + '/' + 'Picture_' + i + '.' + oldFileNames[i].split('.')[1]);
    };
    console.log("\nDaniel Muresan's rename.js => Done.\n");
} else {
    console.log("\nDaniel Muresan's rename.js => Please provide the directory name containing the files to be renamed in chronologic order. \n");
}

function fileNamesByDate(dir) {
    var files = [];
    fs.readdirSync(dir).forEach(function (filename) {
        if (filename != '.DS_Store') {
            var stats = fs.statSync(dir + "/" + filename);
            var ctime = new Date(util.inspect(stats.ctime));
            var file = { name: filename, ctime: ctime };
            files.push(file);
        }
    });
    return files
        .sort((a, b) => { return a.ctime - b.ctime })
        .map((fileDetails) => { return fileDetails.name; });
};