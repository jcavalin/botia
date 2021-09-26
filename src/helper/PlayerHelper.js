import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus
} from '@discordjs/voice';

class PlayerHelper {
    playOnChannel(msg, audio, reply) {
        const channel = msg.member.voice.channel;

        if (!channel) {
            return msg.reply("Você não está em um canal de voz, arrombado!");
        }

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const resource = createAudioResource(audio);

        const player = createAudioPlayer();
        player.play(resource);
        player.on(AudioPlayerStatus.Idle, () => connection.destroy());

        const subscription = connection.subscribe(player);

        if (reply) {
            msg.reply(reply);
        }
    }
}

export { PlayerHelper };