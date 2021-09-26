import ytdl from 'ytdl-core';
import { PlayerHelper } from './helper/PlayerHelper.js';
import { resolve } from 'path';

const PREFIX = `!bia`;
const QUERIDO_MEU_AMOR = 'https://www.youtube.com/watch?v=4XKGfziuw5c';

const COMMAND_HELP = 'help';
const COMMAND_RAPARIGAR = 'raparigar';
const COMMAND_QUERIDO_MEU_AMOR = 'querido meu amor';

class Command {
    register(client) {
        client.on('messageCreate', async msg => {
            if (msg.author.bot) {
                return;
            }

            this.checkEasterEgg(msg);

            if (!msg.content.startsWith(PREFIX)) {
                return;
            }

            const command = msg.content.slice(PREFIX.length).trim().toLowerCase();

            switch (command) {
                case COMMAND_HELP:
                    this.showHelp(msg);
                    break;
                case COMMAND_QUERIDO_MEU_AMOR:
                    this.playQueridoMeuAmor(msg);
                    break;
                case COMMAND_RAPARIGAR:
                    this.playRapariga(msg);
                    break;
            }
        });
    }

    checkEasterEgg(msg) {
        if (msg.content.trim().toLocaleLowerCase().includes('desculpa bia')) {
            msg.reply('ARROMBADO!');
        }
    }

    showHelp(msg) {
        let reply = '```';
        reply += 'Commands: \n';
        reply += '\t - ' + PREFIX + ' ' + COMMAND_RAPARIGAR + '\n';
        reply += '\t - ' + PREFIX + ' ' + COMMAND_QUERIDO_MEU_AMOR + '\n';
        reply +=  '```';

        msg.reply(reply);
    }

    playQueridoMeuAmor(msg) {
        const stream = ytdl(QUERIDO_MEU_AMOR, { filter: 'audioonly' });
        const player = new PlayerHelper();
        player.playOnChannel(msg, stream, QUERIDO_MEU_AMOR);
    }

    playRapariga(msg) {
        const player = new PlayerHelper();
        const path = resolve('./assets/rapariga.mp3');
        player.playOnChannel(msg, path, "✌️");
    }
}

export { Command };