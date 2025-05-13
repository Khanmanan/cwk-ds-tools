import { Client, CommandInteraction, Message, Interaction } from 'discord.js';

declare module 'cwk-ds-tools' {
    interface CommandOptions {
        name: string;
        description?: string;
        slashCommand?: boolean;
        options?: any[];
        run: (interaction: CommandInteraction, client: Client) => Promise<void>;
    }

    interface BotClient extends Client {
        commands: Collection<string, CommandOptions>;
        dirs: {
            commandsDir: string;
            eventsDir: string;
            interactionsDir: string;
        };
    }

    export default function init(options?: {
        commandsDir?: string;
        eventsDir?: string;
        interactionsDir?: string;
    }): void;
}
