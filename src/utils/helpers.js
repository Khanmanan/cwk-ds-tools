const fs = require('fs');
const path = require('path');
const { log } = require('./logger');

function checkAndCreateFolders(dirs) {
    const foldersToCreate = [
        dirs.commandsDir,
        path.join(dirs.commandsDir, 'general'),
        path.join(dirs.commandsDir, 'fun'),
        dirs.eventsDir,
        dirs.interactionsDir,
        path.join(dirs.interactionsDir, 'buttons'),
        path.join(dirs.interactionsDir, 'modals')
    ];

    for (const folder of foldersToCreate) {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
            log(`Created directory: ${folder}`, 'info');
        }
    }
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
}

module.exports = {
    checkAndCreateFolders,
    formatBytes
};
