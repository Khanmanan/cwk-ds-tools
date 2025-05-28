const fs = require('fs');
const path = require('path');
const { log } = require('../utils/logger');

class InteractionHandler {
    constructor(client) {
        this.client = client;
    }

    async loadInteractions() {
        const { interactionsDir } = this.client.dirs;
        const interactionTypes = fs.readdirSync(interactionsDir);

        for (const type of interactionTypes) {
            if (!this.client.interactions[type]) continue;

            const typePath = path.join(interactionsDir, type);
            const interactionFiles = fs.readdirSync(typePath)
                .filter(file => file.endsWith('.js'));

            for (const file of interactionFiles) {
                const interaction = require(path.join(typePath, file));
                const name = file.split('.')[0];

                this.client.interactions[type].set(name, interaction);
                log(`Loaded ${type} interaction: ${name}`, 'info');
            }
        }

        this.setupInteractionCreate();
    }

    setupInteractionCreate() {
        this.client.on('interactionCreate', async interaction => {
            if (interaction.isButton()) {
                const [name, ...args] = interaction.customId.split('_');
                const button = this.client.interactions.buttons.get(name);

                if (!button) return;
                await button.execute(interaction, args, this.client);
            }

            if (interaction.isModalSubmit()) {
                const modal = this.client.interactions.modals.get(interaction.customId);
                if (!modal) return;
                await modal.execute(interaction, this.client);
            }
        });
    }
}

module.exports = { InteractionHandler };
