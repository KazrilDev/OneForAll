const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')
var checkOwner = require('../../function/check/checkWl');
var checkSetup = require('../../function/check/checkSetup');


module.exports = class nukeCommand extends BaseCommand {
    constructor() {
        super('nuke', 'moderation', [])
    }

    async run(client, message, args) {
      
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("<:720681441670725645:780539422479351809> \`ERREUR\` Vous n'avez pas la permission requise \`MANAGE_MESSAGES\`");

        const position = message.channel.position;
        const rateLimitPerUser = message.channel.rateLimitPerUser;
        var newChannel = await message.channel.clone()
        message.channel.delete();
        newChannel.setPosition(position);

        newChannel.setRateLimitPerUser(rateLimitPerUser)
        newChannel.send(`💥 La purge réclamé par <@${message.author.id}> a été effectué.`)



    }
}

embedsColor(guildEmbedColor);