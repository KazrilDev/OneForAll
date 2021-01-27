const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const StateManager = require('../../utils/StateManager');
var hexColorRegex = require('hex-color-regex');
const guildWlId = new Map();
var checkSetup = require('../../function/check/checkSetup');
var checkOwner = require('../../function/check/botOwner')

module.exports = class SetColorCommand extends BaseCommand {
    constructor(){
        super('setcolor', 'moderation', [])
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        const color = args[0];
        
        const sender = message.author.id;
        var isOwner = checkOwner(sender);
        var checkColor = hexColorCheck(color);
        if(message.guild.ownerID == message.author.id || message.author.id == isOwner){
            if(!color) return message.channel.send("<:720681441670725645:780539422479351809> `ERREUR` Vous devez spécifiez une couleur !")
            if(color){
                if(checkColor == true){
                    try{
                        await this.connection.query(
                            `UPDATE guildConfig SET embedColors = '${color}' WHERE guildId = '${message.guild.id}'`
                        );
                        message.channel.send(`<:720681705219817534:780540043033837622> \`SUCCÈS\` La couleur des embeds a été modfié à ${color} `);
                        const exampleEmbed = new discord.MessageEmbed()
                            .setColor(`${color}`)
                            .setDescription("Ceci est la nouvelle couleurs des embeds.")
                            .setTitle("Résultat !")
                        message.channel.send(exampleEmbed);

                        StateManager.emit('colorUpdate', message.guild.id, color);
                    } catch(err){
                        console.log(err);
                        message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\`Oups, la mis à jour de la couleurs de embeds en ${color} a échouhé.`)
                    }
                  
                }else{
                    message.channel.send("<:720681441670725645:780539422479351809> \`ERREUR\` Vous devez spécifiez une couleur valide (``#36393F``) !")
                }
            }
            
        }else{
            message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\` Vous n'êtes pas whitelist.`)
        }
        

    }
}

function hexColorCheck(a){
    var check = hexColorRegex().test(a);
    var checkVerify = false;
    if(check == true){
        checkVerify = true;
    }
    return checkVerify;
}
StateManager.on('wlIdFetched', (guildId, wlId) =>{
    guildWlId.set(guildId, wlId)
})

