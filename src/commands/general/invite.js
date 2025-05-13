const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Get the bot invite link',
    slashCommand: true,

    async run(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle('Invite Me To Your Server!')
            .setDescription('Click the button below to invite me to your server')
            .setColor('#7289DA');

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Invite')
                .setStyle(ButtonStyle.Link)
                .setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`),
            new ButtonBuilder()
                .setLabel('Support Server')
                .setStyle(ButtonStyle.Link)
                .setURL('https://discord.gg/your-invite-code')
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
};
