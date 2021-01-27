const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')

module.exports = class vocalCommand extends BaseCommand {
    constructor() {
        super('vocal', 'everyone', [])
    }

    async run(client, message, args) {
        const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
        const color = guildEmbedColor.get(message.guild.id)

        let count = 0;
        let counter = 0;
        for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
        let Embed = new discord.MessageEmbed()
            .setTitle("<:775296098356428801:781188223481282570> __Salons vocaux__")
            .setDescription("Il y a actuellement <:585880690835587073:781188743150436472> **" + count + " ** personnes en vocal sur le serveur.")
            .setColor(`${color}`)
            .setFooter(`${client.user.username}`, `https://media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg?width=588&height=588`)
            .setTimestamp()
        message.channel.send(Embed)

    }


}


embedsColor(guildEmbedColor);
