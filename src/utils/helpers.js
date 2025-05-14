const fs = require('fs');
const path = require('path');
const { log } = require('./logger');

function checkAndCreateFolders(dirs) {
    try {
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
    } catch (error) {
        log(`Error creating directories: ${error.message}`, 'error');
        throw error; // Re-throw to prevent further execution
    }
}

function formatBytes(bytes) {
    try {
        if (isNaN(bytes)) throw new Error('Input must be a number');
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        // Handle potential floating point issues
        const formatted = parseFloat((bytes / Math.pow(k, i)).toFixed(2);
        return `${formatted} ${sizes[i]}`;
    } catch (error) {
        log(`Error formatting bytes: ${error.message}`, 'error');
        return '0 Bytes'; // Fallback value
    }
}

function formatUptime(seconds) {
    try {
        if (isNaN(seconds)) throw new Error('Input must be a number');
        
        const days = Math.floor(seconds / (3600 * 24));
        seconds %= 3600 * 24;
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } catch (error) {
        log(`Error formatting uptime: ${error.message}`, 'error');
        return '0s'; // Fallback value
    }
}

module.exports = {
    checkAndCreateFolders,
    formatBytes,
    formatUptime
};
