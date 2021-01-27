const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor');
const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');
module.exports = class roleCommand extends BaseCommand {
    constructor(){
        super('role', 'category', ['rl'])
    }

    async run(client, message, args) {
        const add = args[0] == 'add';
        const remove = args[0] == 'remove';
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send("<:720681441670725645:780539422479351809> \`ERREUR\` Vous n'avez pas la permission requise \`MANAGER_ROLES\`");
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
        if(role == undefined) return message.channel.send("Le rôle spécifié n'existe pas.")
        if(role.comparePositionTo(message.member.roles.highest) >= 0) return message.reply(`Vous ne pouvez pas ajouter le rôle ${role} à ${member} car vos permissions plus basse que ce rôle`)
        if(add && !member) return message.channel.send("Vous devez specifier un membre à ajouter le rôle")
        if(add && member && !role) return message.channel.send(`Vous devez specifier un rôle à ajouter à ${membre}` )
        if(member.user.id == message.author.id) return message.channel.send(`Vous ne pouvez pas vous ajoutez vous même le rôle (${role})`)
        if(!args[0]){
            const hEmbed = new Discord.MessageEmbed()
                .setTitle(`baby to design`)
                .setDescription(`Example ect`)
                .setFooter(`fdf`)
                .setColor(color)
                .setTimestamp();
            return message.channel.send(hEmbed)
        }else if(add){
            if(member.roles.cache.has(role.id)) return message.channel.send(`${member} possède déjà le rôle ${role}.`)
            member.roles.add(role).then(() =>{
                message.channel.send(`J'ai ajouté le rôle (${role}) à ${member}`)
            }).catch((err) =>{
                console.log(err)
                message.channel.send(`Il y a eu une erreur je n'ai pas pu enlever le rôle à ${member}`)
            })
        }else if(remove){
            if(!member.roles.cache.has(role.id)) return message.channel.send(`${member} ne possède pas le rôle ${role}.`)
            member.roles.remove(role).then(() =>{
                message.channel.send(`J'ai enlevé le rôle (${role}) à ${member}`)
            }).catch((err) =>{
                console.log(err)
                message.channel.send(`Il y a eu une erreur je n'ai pas pu enlever le rôle à ${member}`)
            })
        }
    }
}

embedsColor(guildEmbedColor);
