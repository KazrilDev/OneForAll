const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
const guildPrefix = new Map();
var embedsColor = require('../../function/embedsColor')
module.exports = class HelpCommand extends BaseCommand {
    constructor(){
        super('help', 'everyone', [])
    }

    async run(client, message, args) {
        const prefix = guildPrefix.get(message.guild.id);
        const color = guildEmbedColor.get(message.guild.id)
        const embed = new discord.MessageEmbed()
            .setAuthor(`Informations et commandes`, `https://media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg?width=588&height=588`)
            .setColor(`${color}`)
            .setTimestamp()
            .setThumbnail(`https://images-ext-1.discordapp.net/external/io8pRqFGLz1MelORzIv2tAiPB3uulaHCX_QH7XEK0y4/%3Fwidth%3D588%26height%3D588/https/media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg`)
            .setFooter("Informations et commandes", `https://media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg?width=588&height=588`)
            .addField(`<:775305392787685378:780731436771573770> Développeur:`, `[\`shutdown\`](https://discord.gg/h69YZHB7Nh), [\`eval\`](https://discord.gg/h69YZHB7Nh), [\`reboot\`](https://discord.gg/h69YZHB7Nh)`)
            .addField('<:778353230559969320:780778719824183316> Anti Raid:', `[\`antiraid\`](https://discord.gg/h69YZHB7Nh)`)
            .addField(`<:778353230589460530:780725963465687060> Modération:`, `[\`lock all off\`](https://discord.gg/h69YZHB7Nh), [\`lock all on\`](https://discord.gg/h69YZHB7Nh), [\`lock off\`](https://discord.gg/h69YZHB7Nh), [\`lock on\`](https://discord.gg/h69YZHB7Nh), [\`kick\`](https://discord.gg/h69YZHB7Nh), [\`ban\`](https://discord.gg/h69YZHB7Nh), [\`role add\`](https://discord.gg/h69YZHB7Nh), [\`role remove\`](https://discord.gg/h69YZHB7Nh), [\`webhook size\`](https://discord.gg/h69YZHB7Nh), [\`webhook delete\`](https://discord.gg/h69YZHB7Nh), [\`nuke\`](https://discord.gg/h69YZHB7Nh), [\`setcolor\`](https://discord.gg/h69YZHB7Nh), [\`setprefix\`](https://discord.gg/h69YZHB7Nh), [\`setup\`](https://discord.gg/h69YZHB7Nh)`)
            .addField(`<:778353230333476896:780830445741932597> Concours:(its not on)`, `[\`gstart\`](https://discord.gg/h69YZHB7Nh), [\`gstop\`](https://discord.gg/h69YZHB7Nh), [\`greroll\`](https://discord.gg/h69YZHB7Nh)`)            
            .addField(`<:778353230484471819:780727288903237663> Général:`, `[\`support\`](https://discord.gg/h69YZHB7Nh), [\`invite\`](https://discord.gg/h69YZHB7Nh), [\`vocal\`](https://discord.gg/h69YZHB7Nh), [\`authorinfo\`](https://discord.gg/h69YZHB7Nh), [\`ping\`](https://discord.gg/h69YZHB7Nh), [\`botinfo\`](https://discord.gg/h69YZHB7Nh), [\`serverinfo\`](https://discord.gg/h69YZHB7Nh), [\`userinfo\`](https://discord.gg/h69YZHB7Nh)`)
           // .setDescription('**A quoi je sers  ?** \n \n Je suis un atiraid ! je fais des antirole,weebhook,channel etc... (Je suis juste un complément je je vous déconseille de mettre que moi comme bot antiraid , car je suis juste la pour __ANTIRAID__ , je ne fais pas de modération etc... ');
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
