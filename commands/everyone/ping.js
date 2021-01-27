const BaseCommand = require('../../utils/structures/BaseCommand');
const discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')

module.exports = class pingCommand extends BaseCommand {
    constructor() {
        super('ping', 'everyone', [])
    }

    async run(client, message, args) {
        message.channel.send("Pinging...").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp; //calculate the ping of the bot

            //edit the message to the bot's ping and the ping to the API
            m.edit(`Latence du bot: \`${ping}\` ms, Latence de l'api: \`${Math.round(client.ws.ping)}\` ms`);
        })
    }  
} 
embedsColor(guildEmbedColor);