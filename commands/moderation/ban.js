const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')

module.exports = class banCommand extends BaseCommand {
    constructor(){
        super('ban', 'moderation', [])
    }

    async run(client, message, args) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("<:720681441670725645:780539422479351809> \`ERREUR\` Vous n'avez pas la permission requise \`BAN_MEMBERS\`")
        const color = guildEmbedColor.get(message.guild.id)
        let member = message.mentions.members.first() ||message.guild.members.cache.get(args[0]);
        console.log(member.user.id)
        console.log(message.member.user.id)
        if(member.user.id == message.member.user.id) return message.channel.send("Vous ne pouvez pas vous bannir vous-même")
        if(!member) return message.channel.send("<:720681441670725645:780539422479351809> `ERREUR` Vous devez spécifier un membre a bannir (`\mention / id`\)")

        let reason = args[1];
        if(!reason) reason = "Aucune raison spécifique";

        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        today = mm+'/'+dd+'/'+yyyy;
        const banEmbed = new Discord.MessageEmbed()
        .setTitle("Nouveau joueur banni")
        .setDescription(`
            Membre banni : ${member}
            Banni le : ${today}
            Banni par : ${message.member}
            Reason : ${reason}
        `)
        .setFooter(`${client.user.username}`)
        .setColor(color)
        .setTimestamp();

        member.ban().then(() =>{
            message.channel.send(banEmbed);
        }).catch(()=>{
            message.channel.send(`<:720681705219817534:780540043033837622> \`SUCCÈS\` Désolé, je ne suis pas arrivé a ban ${member}`)
        })
        
        
    }
}

embedsColor(guildEmbedColor);
