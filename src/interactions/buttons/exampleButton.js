module.exports = {
    async execute(interaction, args, _client) {
        await interaction.update({
            content: `You clicked the button with args: ${args.join(', ')}`,
            components: []
        });
    }
};
