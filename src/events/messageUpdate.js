const { EmbedBuilder } = require('discord.js');
const { log } = require('../utils/logger');

module.exports = {
    name: 'messageUpdate',
    once: false,

    async execute(oldMessage, newMessage, client) {
        try {
            // Ignore if message wasn't in a guild, from a bot, or content didn't change
            if (!newMessage.guild || 
                newMessage.author.bot || 
                oldMessage.content === newMessage.content) return;

            // Log to console for debugging
            log(`Message edited in ${newMessage.guild.name} by ${newMessage.author.tag}`, 'info');

            // Send to modlog channel if configured
            if (process.env.MODLOG_CHANNEL_ID) {
                const channel = newMessage.guild.channels.cache.get(process.env.MODLOG_CHANNEL_ID);
                if (!channel) {
                    log('MODLOG_CHANNEL_ID is set but channel not found', 'warn');
                    return;
                }

                const embed = new EmbedBuilder()
                    .setColor('#FFA500') // Orange for edits
                    .setAuthor({ 
                        name: newMessage.author.tag, 
                        iconURL: newMessage.author.displayAvatarURL() 
                    })
                    .setDescription(`[Message edited](${newMessage.url}) in ${newMessage.channel}`)
                    .addFields(
                        { name: 'Before', value: oldMessage.content || '*No content*' },
                        { name: 'After', value: newMessage.content || '*No content*' }
                    )
                    .setFooter({ text: `User ID: ${newMessage.author.id}` })
                    .setTimestamp();

                await channel.send({ embeds: [embed] });
            }

            // You can add additional logic here, like:
            // - Auto-moderation checks
            // - Edit logging to database
            // - Word filter monitoring

        } catch (error) {
            log(`Error in messageUpdate event: ${error.message}`, 'error');
            
            // Attempt to send error to owner if configured
            if (process.env.OWNER_ID) {
                const owner = await client.users.fetch(process.env.OWNER_ID).catch(() => null);
                if (owner) {
                    await owner.send(`❌ Error in messageUpdate event: \`${error.message}\``)
                        .catch(() => {});
                }
            }
        }
    }
};
