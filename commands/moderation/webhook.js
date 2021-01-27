const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')

module.exports = class webhookCommand extends BaseCommand {
    constructor() {
        super('webhook', 'moderation', ['wb'])
    }

    async run(client, message, args) {
        if(!message.member.hasPermission('MANAGE_WEBHOOKS')) return message.channel.send("<:720681441670725645:780539422479351809> \`ERREUR\` Vous n'avez pas la permission requise \`MANAGE_WEBHOOKS\`")
        const del = args[0] == 'delete';
        const size = args[0] == "size";
        if (size) {
            message.channel.fetchWebhooks().then((webhooks) => {
                message.channel.send('<:778353230589460530:780725963465687060> Le serveur **' + message.guild.name + '** contient **' + webhooks.size + '** webhook.')
            })
        } else if (del) {
            message.channel.send('<:720681705219817534:780540043033837622> Tout les webhook on été supprimé.')
            message.channel.fetchWebhooks().then((webhooks) => {
                webhooks.forEach((wh) => wh.delete());
            })
        }
    }
}

embedsColor(guildEmbedColor);
