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

    foldersToCreate.forEach(folder => {
        try {
            if (!fs.existsSync(folder)) {
                fs.mkdirSync(folder, { recursive: true });
                log(`Created directory: ${folder}`, 'info');
            }
        } catch (error) {
            log(`Failed to create directory ${folder}: ${error.message}`, 'error');
        }
    });
}

function formatBytes(bytes) {
    try {
        if (typeof bytes !== 'number' || isNaN(bytes)) {
            throw new Error('Invalid input: must be a number');
        }

        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        // Fixed the syntax error here - proper parentheses and operations
        const value = bytes / Math.pow(k, i);
        return `${parseFloat(value.toFixed(2))} ${sizes[i]}`;
    } catch (error) {
        log(`Error in formatBytes: ${error.message}`, 'error');
        return '0 Bytes';
    }
}

function formatUptime(seconds) {
    try {
        seconds = Number(seconds);
        if (isNaN(seconds)) return '0s';
        
        const days = Math.floor(seconds / 86400);
        seconds %= 86400;
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);

        const parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        parts.push(`${seconds}s`);

        return parts.join(' ');
    } catch (error) {
        log(`Error in formatUptime: ${error.message}`, 'error');
        return '0s';
    }
}

module.exports = {
    checkAndCreateFolders,
    formatBytes,
    formatUptime
};
