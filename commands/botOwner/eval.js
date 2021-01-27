const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')
var checkOwner = require('../../function/check/botOwner')

module.exports = class evalCommand extends BaseCommand {
    constructor(){
        super('eval', 'botOwner', [])
    }

    async run(client, message, args) {
        const sender = message.author.id;
        var isOwner = checkOwner(sender);
        if(isOwner == false) return message.channel.send("<:720681441670725645:780539422479351809> `ERREUR` Vous n'êtes pas le créateur du bot.")
        
        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve) => resolve(eval(content)));

        return result.then((output) => {
            if (typeof output !== "string") {
                output = require("util").inspect(output, {
                    depth: 0
                });
            }
            if (output.includes(client.token)) {
                output = output.replace(client.token, "T0K3N");
            }
            message.channel.send(output, {
                code: "js"
            });
        }).catch((err) => {
            err = err.toString();
            if (err.includes(client.token)) {
                err = err.replace(client.token, "T0K3N");
            }
            message.channel.send(err, {
                code: "js"
            });
        });
    }
}

embedsColor(guildEmbedColor);