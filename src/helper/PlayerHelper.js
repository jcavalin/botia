import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
    NoSubscriberBehavior
} from '@discordjs/voice';

class PlayerHelper {
    playOnChannel(msg, audio, reply) {
        const channel = msg.member.voice.channel;

        if (!channel) {
            return msg.reply("Você não está em um canal de voz, arrombado!");
        }

        console.log(`Connecting to channel ${channel.id}...`);

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        const resource = createAudioResource(audio);

        const player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        
        player.on(AudioPlayerStatus.Idle, () => {
            console.log(`Audio done!`);
            connection.destroy()
        }).on('error', error => {
            console.error(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
        });

        player.play(resource);

        const subscription = connection.subscribe(player);

        console.log('Playing...');

        if (reply) {
            msg.reply(reply);
        }
    }
}

export { PlayerHelper };