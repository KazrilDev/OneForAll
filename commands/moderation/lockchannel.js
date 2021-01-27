const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')

module.exports = class lockCommand extends BaseCommand {
    constructor(){
        super('lock', 'moderation', [])
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("<:720681441670725645:780539422479351809> \`ERREUR\` Vous n'avez pas la permission requise \`MANAGE_CHANNELS\`")
        const lockAllOn = args[0] == 'all' && args[1] == "on";
        const lockAllOff =  args[0] == 'all' && args[1] == "off";
        const on = args[0] == 'on';
        const off = args[0] == 'off';
        const color = guildEmbedColor.get(message.guild.id)

        const channels = message.guild.channels.cache.filter(ch => ch.type != 'category')
        const ch = message.channel
        
        if(!args[0]){
            const hEmbed = new Discord.MessageEmbed()
                .setAuthor(`Informations lock`, `https://images-ext-2.discordapp.net/external/1jym0uCwurjteTPUodKOyFbBriTlwJyS56xk9hDjo2s/https/images-ext-1.discordapp.net/external/io8pRqFGLz1MelORzIv2tAiPB3uulaHCX_QH7XEK0y4/%253Fwidth%253D588%2526height%253D588/https/media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg`)
                .setDescription(`[\`lock on\`](https://discord.gg/h69YZHB7Nh), [\`lock off\`](https://discord.gg/h69YZHB7Nh), [\`lock all on\`](https://discord.gg/h69YZHB7Nh), [\`lock alfl of\`](https://discord.gg/h69YZHB7Nh)`)
                .setFooter(`Informations lock`, `https://images-ext-2.discordapp.net/external/1jym0uCwurjteTPUodKOyFbBriTlwJyS56xk9hDjo2s/https/images-ext-1.discordapp.net/external/io8pRqFGLz1MelORzIv2tAiPB3uulaHCX_QH7XEK0y4/%253Fwidth%253D588%2526height%253D588/https/media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg`)
                .setColor(color)
                .setTimestamp();
            return message.channel.send(hEmbed)
        }
        
        if(lockAllOn){
            channels.forEach(channel =>{
                channel.updateOverwrite(message.guild.roles.everyone,{
                    SEND_MESSAGES : false
                })

            })
            message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` Tout les salons on été fermé.")


          
        }else if(lockAllOff){
            channels.forEach(channel =>{
                channel.updateOverwrite(message.guild.roles.everyone,{
                    SEND_MESSAGES : true
                })

            })
            message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` Tout les salons on été ouvert.")

        }else if(on){
            console.log(message.guild.channels.cache)
            ch.updateOverwrite(message.guild.roles.everyone,{
                SEND_MESSAGES : false
            }).then(() =>{
                message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` La salon a été fermé.")
            })
        }else if(off){
            ch.updateOverwrite(message.guild.roles.everyone,{
                SEND_MESSAGES : true
            }).then(() =>{
                message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` Le salon a été ouvert.")
            })
        }
    }
}

embedsColor(guildEmbedColor);
