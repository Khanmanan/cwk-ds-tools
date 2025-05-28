const fs = require('fs');
const path = require('path');
const { log } = require('../utils/logger');

class CommandHandler {
  constructor(client) {
    this.client = client;
  }

  async loadCommands() {
    const { commandsDir } = this.client.dirs;
    const commandCategories = fs.readdirSync(commandsDir);

    for (const category of commandCategories) {
      const commandFiles = fs.readdirSync(path.join(commandsDir, category))
        .filter(file => file.endsWith('.js'));

      for (const file of commandFiles) {
        const commandPath = path.join(commandsDir, category, file);
        const command = require(commandPath);

        // Support both object and function exports
        const cmd = typeof command === 'function' ? command(this.client) : command;

        if (!cmd.name || !cmd.run) {
          log(`Command ${file} is missing required properties (name or run function)`, 'warn');
          continue;
        }

        this.client.commands.set(cmd.name, cmd);
        log(`Loaded command: ${category}/${cmd.name}`, 'info');
      }
    }

    // Register slash commands if enabled
    this.client.on('ready', async () => {
      if (process.env.SLASH_COMMANDS !== 'false') {
        await this.registerSlashCommands();
      }
    });
  }

  async registerSlashCommands() {
    const commands = [];
    
    this.client.commands.forEach(command => {
      if (command.slashCommand) {
        commands.push({
          name: command.name,
          description: command.description || 'No description provided',
          options: command.options || []
        });
      }
    });

    try {
      await this.client.application.commands.set(commands);
      log(`Registered ${commands.length} slash commands`, 'info');
    } catch (error) {
      log(`Failed to register slash commands: ${error.message}`, 'error');
    }
  }
}

module.exports = { CommandHandler };
