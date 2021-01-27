var checkOwner = require('../../function/check/botOwner')
const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')
require('dotenv').config();

module.exports = class rebootCommand extends BaseCommand {
    constructor(){
        super('reboot', 'owner', [])
    }

    async run(client, message, args) {
        const sender = message.author.id;
        var isOwner = checkOwner(sender);
        if(isOwner == false) return message.channel.send("<:720681441670725645:780539422479351809> `ERREUR` Vous n'êtes pas le créateur du bot.")
        message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` Je vais être redémarré dans quelque instants !")
        client.destroy();
        client.login(process.env.TOKEN);
        
    }
}

embedsColor(guildEmbedColor);

