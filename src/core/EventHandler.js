const fs = require('fs');
const path = require('path');
const { log } = require('../utils/logger');

class EventHandler {
  constructor(client) {
    this.client = client;
  }

  async loadEvents() {
    const { eventsDir } = this.client.dirs;
    const eventFiles = fs.readdirSync(eventsDir)
      .filter(file => file.endsWith('.js'));

    // Load built-in events first
    const builtInEvents = [
      'guildMemberAdd',
      'guildMemberRemove',
      'messageDelete',
      'messageUpdate',
      'interactionCreate'
    ];

    for (const event of builtInEvents) {
      const eventPath = path.join(__dirname, '../../events', `${event}.js`);
      this.setupEvent(event, eventPath);
    }

    // Load custom events
    for (const file of eventFiles) {
      const eventName = file.split('.')[0];
      const eventPath = path.join(eventsDir, file);
      
      // Skip if already loaded as built-in
      if (builtInEvents.includes(eventName)) continue;
      
      this.setupEvent(eventName, eventPath);
    }
  }

  setupEvent(eventName, eventPath) {
    try {
      const event = require(eventPath);
      
      if (event.once) {
        this.client.once(eventName, (...args) => event.execute(...args, this.client));
      } else {
        this.client.on(eventName, (...args) => event.execute(...args, this.client));
      }
      
      log(`Loaded event: ${eventName}`, 'info');
    } catch (error) {
      log(`Failed to load event ${eventName}: ${error.message}`, 'error');
    }
  }
}

module.exports = { EventHandler };
