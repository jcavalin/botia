import { Client, Intents } from 'discord.js';
import dotenvPkg from 'dotenv';
import { Command } from './Command.js';

class Bot {
    client = null;

    constructor() {
        const dotenv = dotenvPkg;
        dotenv.config();

        this.client = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_VOICE_STATES
            ]
        });

        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });
    }

    start() {
        this.registerCommands();
        this.login();
    }

    registerCommands() {
        const command = new Command();
        command.register(this.client);
    }

    login() {
        this.client.login(process.env.TOKEN);
    }
}

export { Bot };