const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const dotenv = require('dotenv');

dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.trim().toLocaleLowerCase() === 'desculpa bia') {
    msg.reply('RAPARIGA!');
  }
});

client.login(process.env.TOKEN);