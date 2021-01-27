const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
const guildPrefix = new Map();
var embedsColor = require('../../function/embedsColor')
module.exports = class HelpCommand extends BaseCommand {
    constructor(){
        super('invite', 'everyone', [])
    }

    async run(client, message, args) {
        const prefix = guildPrefix.get(message.guild.id);
        const color = guildEmbedColor.get(message.guild.id)
        const embed = new discord.MessageEmbed()
            .setAuthor(`Inviter le bot`, `https://media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg?width=588&height=588`)
            .setColor(`${color}`)
            .setTimestamp()
         //   .setThumbnail(`https://images-ext-1.discordapp.net/external/io8pRqFGLz1MelORzIv2tAiPB3uulaHCX_QH7XEK0y4/%3Fwidth%3D588%26height%3D588/https/media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg`)
            .setFooter("Inviter le bot", `https://media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg?width=588&height=588`)
            .setDescription(`[\`Clique ici\`](https://discord.com/oauth2/authorize?client_id=780019344511336518&scope=bot&permissions=8)`)
      message.channel.send(embed); 
    }
}

embedsColor(guildEmbedColor);

StateManager.on('prefixUpdate', (guildId, prefix) =>{
    guildPrefix.set(guildId, prefix)
})

StateManager.on('prefixFetched', (guildId, prefix) =>{
    guildPrefix.set(guildId, prefix)
})
