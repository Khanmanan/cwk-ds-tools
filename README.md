# cwk-ds-tools 🚀

[![npm version](https://img.shields.io/npm/v/cwk-ds-tools)](https://www.npmjs.com/package/cwk-ds-tools)
[![License](https://img.shields.io/npm/l/cwk-ds-tools)](https://github.com/Khanmanan/cwk-ds-tools/blob/main/LICENSE)
[![Discord](https://img.shields.io/discord/YOUR_SERVER_ID)](https://discord.gg/YOUR_INVITE_CODE)

A zero-boilerplate Discord.js framework with built-in MongoDB, automod, slash commands, and more. Get your bot running in minutes!

## Features ✨

- **Zero Boilerplate** - Just create commands and go
- **Auto-modlog System** - Track joins, leaves, deletions, and more
- **MongoDB Integration** - Ready-to-use database connection
- **Automatic Slash Commands** - Register commands with zero effort
- **Built-in Utility Commands** - Help, ping, serverinfo, and more
- **Folder Auto-creation** - No manual setup needed
- **TypeScript Support** - Full type definitions included
- **Advanced Interaction Handling** - Buttons, modals, and select menus

## Installation 📦

```bash
npm install cwk-ds-tools
# or
yarn add cwk-ds-tools
```

## Quick Start 🚀

1. Create a `.env` file:
```env
TOKEN=your_bot_token_here
MONGO_URI=mongodb://localhost:27017/your_db
OWNER_ID=123456789012345678
MODLOG_CHANNEL_ID=987654321098765432
```

2. Create your first command (`commands/general/ping.js`):
```javascript
module.exports = {
  name: 'ping',
  description: 'Check bot latency',
  slashCommand: true,
  
  async run(interaction, client) {
    const start = Date.now();
    await interaction.deferReply();
    const end = Date.now();
    
    await interaction.editReply({
      content: `🏓 Pong!\nBot: ${end - start}ms\nAPI: ${client.ws.ping}ms`
    });
  }
};
```

3. Start your bot (`index.js`):
```javascript
require('dotenv').config();
require('cwk-ds-tools')();
```

## Advanced Usage 🛠️

### Command Structure

```javascript
module.exports = {
  name: 'command-name',
  description: 'Command description',
  slashCommand: true, // Register as slash command
  options: [ // Slash command options
    {
      name: 'user',
      description: 'User to target',
      type: 6, // USER type
      required: true
    }
  ],
  permissions: ['Administrator'], // Required permissions
  ownerOnly: false, // Restrict to owner
  
  async run(interaction, client) {
    // Your command logic here
  }
};
```

### Interaction Handling

Create button handlers in `interactions/buttons/`:

```javascript
// interactions/buttons/example.js
module.exports = {
  async execute(interaction, args, client) {
    await interaction.update({
      content: `You clicked with args: ${args.join(', ')}`,
      components: []
    });
  }
};
```

### Events

Create custom event handlers in `events/`:

```javascript
// events/guildCreate.js
module.exports = {
  name: 'guildCreate',
  once: false,
  
  async execute(guild, client) {
    console.log(`Joined new guild: ${guild.name}`);
  }
};
```

## Built-in Commands 🔧

| Command     | Description                          | Slash Support |
|-------------|--------------------------------------|---------------|
| `/help`     | Advanced help menu with pagination   | ✅            |
| `/botinfo`  | Shows bot statistics and info        | ✅            |
| `/serverinfo`| Shows server information            | ✅            |
| `/ping`     | Checks bot latency                   | ✅            |
| `/invite`   | Gets bot invite link                 | ✅            |

## Auto-modlog System 📝

When `MODLOG_CHANNEL_ID` is set, the bot automatically logs:

- Member joins/leaves
- Message deletions/edits
- Bans/kicks
- Channel changes

Example modlog entry:
![Modlog Example](https://i.imgur.com/example.png)

## Database Integration 🗃️

Access Mongoose directly through your commands:

```javascript
async run(interaction, client) {
  const User = mongoose.model('User');
  const user = await User.findOne({ userId: interaction.user.id });
  // ... use user data
}
```

## Configuration ⚙️

Customize initialization:

```javascript
require('cwk-ds-tools')({
  commandsDir: './my-commands', // Custom commands directory
  eventsDir: './custom-events', // Custom events directory
  disableSlashCommands: false // Disable slash command registration
});
```

## TypeScript Support 💻

Full type definitions included:

```typescript
import { CommandInteraction } from 'discord.js';
import { CommandOptions } from 'cwk-ds-tools';

const command: CommandOptions = {
  name: 'ping',
  description: 'Ping command',
  run: async (interaction: CommandInteraction) => {
    await interaction.reply('Pong!');
  }
};
```

## Contributing 🤝

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support 💬

For help, join our [Discord Server](https://cwkbot.fun/diacord) or open an issue on GitHub.

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Khanmanan](https://github.com/Khanmanan) | [Buy me a coffee](https://buymeacoffee.com/cwkhan)
