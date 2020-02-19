const fs = require('fs');
const path = require('path');


async function FolderClearFunction(directory) {
    // const directory = './Temp';
    // const directory1 = './Output';

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
}

module.exports = FolderClearFunction;