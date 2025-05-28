require('dotenv').config();
const { BotClient } = require('./src/core/BotClient');
const { checkAndCreateFolders } = require('./src/utils/helpers');
const path = require('path');

/**
 * Initialize the Discord bot with zero boilerplate
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.commandsDir] - Custom commands directory
 * @param {string} [options.eventsDir] - Custom events directory
 * @param {string} [options.interactionsDir] - Custom interactions directory
 */
module.exports = (options = {}) => {
  // Verify required environment variables
  if (!process.env.TOKEN) {
    throw new Error('TOKEN environment variable is required');
  }

  // Set default directories
  const baseDir = process.cwd();
  const defaultDirs = {
    commandsDir: path.join(baseDir, 'commands'),
    eventsDir: path.join(baseDir, 'events'),
    interactionsDir: path.join(baseDir, 'interactions')
  };

  // Merge with user options
  const dirs = { ...defaultDirs, ...options };

  // Create required folders if they don't exist
  checkAndCreateFolders(dirs);

  // Initialize the bot client
  const client = new BotClient(dirs);

  // Start the bot
  client.start()
    .then(() => console.log('Bot is online!'))
    .catch(err => console.error('Failed to start bot:', err));
};
