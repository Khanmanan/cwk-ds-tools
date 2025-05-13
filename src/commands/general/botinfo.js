const { EmbedBuilder } = require('discord.js');
const { formatBytes } = require('../../utils/helpers');
const { version } = require('../../../package.json');

module.exports = {
    name: 'botinfo',
    description: 'Get information about the bot',
    slashCommand: true,

    async run(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('Bot Information')
            .setColor('#7289DA')
            .addFields(
                { name: 'Version', value: version, inline: true },
                { name: 'Node.js', value: process.version, inline: true },
                { name: 'Discord.js', value: `v${require('discord.js').version}`, inline: true },
                { name: 'Uptime', value: formatUptime(process.uptime()), inline: true },
                { name: 'Memory', value: formatBytes(process.memoryUsage().rss), inline: true },
                { name: 'Servers', value: client.guilds.cache.size.toString(), inline: true }
            )
            .setFooter({ text: `Owner: ${client.users.cache.get(process.env.OWNER_ID)?.tag || 'Unknown'}` })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};

function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}
