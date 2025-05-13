const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    warn: '\x1b[33m',
    error: '\x1b[31m',
    debug: '\x1b[35m',
    reset: '\x1b[0m'
};

function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const color = colors[type] || colors.info;
    console.log(`[${timestamp}] ${color}[${type.toUpperCase()}]${colors.reset} ${message}`);
}

module.exports = { log };
