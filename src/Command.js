import ytdl from 'ytdl-core';
import { PlayerHelper } from './helper/PlayerHelper.js';
import { resolve } from 'path';

const PREFIX = `!b`;
const QUERIDO_MEU_AMOR = 'https://www.youtube.com/watch?v=4XKGfziuw5c';

const COMMAND_HELP = 'help';
const COMMAND_RAPARIGAR = 'raparigar';
const COMMAND_QUERIDO_MEU_AMOR = 'querido meu amor';
const COMMAND_DESCULPA = 'desculpa';

class Command {
    register(client) {
        client.on('messageCreate', async msg => {
            if (msg.author.bot) {
                return;
            }

            if (!msg.content.startsWith(PREFIX)) {
                return;
            }

            console.log(`Command received ${msg}...`)

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
                case COMMAND_DESCULPA :
                    this.showDesculpa(msg);
                default :
                    this.showQue(msg)
                    break;
            }
        });
    }

    showHelp(msg, reply = '') {
        reply += '```';
        reply += 'Commands: \n';
        reply += '\t - ' + PREFIX + ' ' + COMMAND_RAPARIGAR + '\n';
        reply += '\t - ' + PREFIX + ' ' + COMMAND_QUERIDO_MEU_AMOR + '\n';
        reply += '\t - ' + PREFIX + ' ' + COMMAND_DESCULPA + '\n';
        reply +=  '```';

        msg.reply(reply);
    }

    showQue(msg) {
        this.showHelp(msg, 'Que?\n');
    }

    showDesculpa(msg) {
        msg.reply('ARROMBADO!');
    }

    playQueridoMeuAmor(msg) {
        const stream = ytdl(QUERIDO_MEU_AMOR, { filter: 'audioonly' });
        const player = new PlayerHelper();
        player.playOnChannel(msg, stream, QUERIDO_MEU_AMOR);
    }

    playRapariga(msg) {
        const player = new PlayerHelper();
        const path = resolve('./assets/raparigar.mp3');
        player.playOnChannel(msg, path, "✌️");
    }
}

export { Command };