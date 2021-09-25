const { Client, Intents } = require('discord.js');
const { 
  joinVoiceChannel, 
  createAudioPlayer, 
  createAudioResource, 
  AudioPlayerStatus 
} = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const client = new Client({ intents: [
  Intents.FLAGS.GUILDS, 
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_VOICE_STATES
] });
const dotenv = require('dotenv');

dotenv.config();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const PREFIX = `!bia`;
const QUERIDA_MEU_AMOR = 'https://www.youtube.com/watch?v=4XKGfziuw5c';

client.on('messageCreate', async msg => {
  if (msg.author.bot) {
    return;
  }

  if (msg.content.trim().toLocaleLowerCase() === 'desculpa bia') {
    msg.reply('RAPARIGA!');
  }

  if (!msg.content.startsWith(PREFIX)) {
    return;
  }

  const command = msg.content.slice(PREFIX.length).trim().toLowerCase();
  if (command === 'querido meu amor') {
    const channel = msg.member.voice.channel;

    if (!channel) {
      return msg.reply("You have to be in a VoiceChannel");
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });


    const stream = ytdl(QUERIDA_MEU_AMOR, {filter: 'audioonly'}); 
    const resource = createAudioResource(stream);

    const player = createAudioPlayer();
    player.play(resource);
    const subscription = connection.subscribe(player);

    player.on(AudioPlayerStatus.Idle, () => connection.destroy());

    msg.reply(QUERIDA_MEU_AMOR);
  }

  if (command === 'rapariga') {
    const channel = msg.member.voice.channel;

    if (!channel) {
      return msg.reply("You have to be in a VoiceChannel");
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });


    const resource = createAudioResource('rapariga.mp3');

    const player = createAudioPlayer();
    player.play(resource);
    const subscription = connection.subscribe(player);

    msg.reply("👀");
  }
});

client.login(process.env.TOKEN);