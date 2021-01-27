const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor');

module.exports = class commabNameCommand extends BaseCommand {
    constructor(){
        super('setup', 'moderation', [])
        this.connection = StateManager.connection
    }

    async run(client, message, args) {
        const owner = message.guild.ownerID;
        const owner2 = '277861902732886016';
        const owner3 = '379298716391178250';
        if (message.author.id != owner & message.author.id != owner2 & message.author.id != owner3) return message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\` Seulement le membre qui possède la couronne peux executer cette commande (<@${owner}>)!`)
        
        message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` Mentionne le role mute !(timeout dans 30s & \`cancel\` pour annuler)")
        const responseMuteRole = await message.channel.awaitMessages(m => m.author.id === message.author.id, {max : 1, timeout: 30000}).catch(() => {message.channel.send("Opération annulé pas de réponse après 30s")})
        const CollectedMuteRole = responseMuteRole.first()
        if(CollectedMuteRole.content.toLowerCase()  == "cancel") return message.channel.send("L'opération a été annulé")


        const muteRole = CollectedMuteRole.mentions.roles.first();
        const mureRoleId = muteRole.id;


    
        const guildId = message.guild.id;
        const setup = true

        try {

            await this.connection.query(
                `UPDATE guildConfig SET muteRoleId = '${mureRoleId}' WHERE guildId = '${guildId}'`
            );

            await this.connection.query(
                `UPDATE guildConfig SET setup = '1' WHERE guildId = '${guildId}'`
            );
    

            message.channel.send(`<:720681705219817534:780540043033837622> \`SUCCÈS\` Le role (<@&${mureRoleId}>) a bien été ajouté`)
            StateManager.emit('addMuteRole', guildId, mureRoleId);
            StateManager.emit('setupDone', guildId, setup);
        } catch(err) {
            console.log(err)
            message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\` Oupsi une erreur est survennue pour ajouter <@${mureRoleId}> dans la liste base de donée`)
        }
    }
}

embedsColor(guildEmbedColor);
