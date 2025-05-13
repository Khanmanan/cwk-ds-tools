const { EmbedBuilder } = require('discord.js');
const { log } = require('../utils/logger');

function setupAutoModLog(client) {
  if (!process.env.MODLOG_CHANNEL_ID) {
    log('MODLOG_CHANNEL_ID not set - skipping automodlog setup', 'warn');
    return;
  }

  client.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.get(process.env.MODLOG_CHANNEL_ID);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#43b581')
      .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
      .setDescription(`${member} has joined the server`)
      .addFields(
        { name: 'Account Created', value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>` }
      )
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  });

  client.on('guildMemberRemove', async member => {
    const channel = member.guild.channels.cache.get(process.env.MODLOG_CHANNEL_ID);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#f04747')
      .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
      .setDescription(`${member.user.tag} has left the server`)
      .setFooter({ text: `ID: ${member.id}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  });

  client.on('messageDelete', async message => {
    if (message.author.bot) return;
    const channel = message.guild?.channels.cache.get(process.env.MODLOG_CHANNEL_ID);
    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor('#faa61a')
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
      .setDescription(`Message deleted in ${message.channel}`)
      .addFields(
        { name: 'Content', value: message.content || 'No content' }
      )
      .setFooter({ text: `ID: ${message.author.id}` })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  });

  log('Auto-modlog system initialized', 'info');
}

module.exports = { setupAutoModLog };
