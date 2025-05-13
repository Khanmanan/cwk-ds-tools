const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { CommandHandler } = require('./CommandHandler');
const { EventHandler } = require('./EventHandler');
const { InteractionHandler } = require('./InteractionHandler');
const { connectToDatabase } = require('./Database');
const { setupAutoModLog } = require('../features/automodlog');

class BotClient extends Client {
  constructor(dirs) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
      ]
    });

    this.dirs = dirs;
    this.commands = new Collection();
    this.interactions = {
      buttons: new Collection(),
      modals: new Collection(),
      selects: new Collection()
    };
    this.cooldowns = new Collection();
  }

  async start() {
    // Connect to MongoDB if URI is provided
    if (process.env.MONGO_URI) {
      await connectToDatabase(process.env.MONGO_URI);
      console.log('Connected to MongoDB');
    }

    // Initialize handlers
    const commandHandler = new CommandHandler(this);
    const eventHandler = new EventHandler(this);
    const interactionHandler = new InteractionHandler(this);

    // Load everything
    await commandHandler.loadCommands();
    await eventHandler.loadEvents();
    await interactionHandler.loadInteractions();

    // Setup automodlog if channel ID is provided
    if (process.env.MODLOG_CHANNEL_ID) {
      setupAutoModLog(this);
    }

    // Login to Discord
    await this.login(process.env.TOKEN);
  }
}

module.exports = { BotClient };
