﻿const StateManager = require('../../utils/StateManager');
const BaseEvent = require('../../utils/structures/BaseEvent');
const guildCommandPrefixes = new Map();
let talkedRecently = new Set();
const mysql = require('mysql2/promise');
require('dotenv').config();
const db = mysql.createPool({
    user: process.env.DB_USER, 
    password: process.env.DB_PASS, 
    database: process.env.DB_NAME 
})
module.exports = class MessageEvent extends BaseEvent {
	constructor() {
		super('message');
		this.connection = StateManager.connection;
	}

	async run(client, message) {
		if (message.author.bot) return;
		const prefix = await db.query(`SELECT prefix FROM guildconfig WHERE guildId = "${message.guild.id}"`)
        if (message.content.startsWith(prefix[0].prefix)) {
			console.log('prefix used')
            let args = message.content.slice(1).trim().split(" ");
            const command = args.shift().toLowerCase();
            const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
            if (cmd) cmd.run(client, message, args);console.log('command used')
        }
		const botMention = message.mentions.has(client.user)
		
		if(botMention){
			if (message.content.includes("@here") || message.content.includes("@everyone")) return false;
			return message.channel.send(`<:778353230484471819:780727288903237663> Mon prefix est: \`${prefix}\``)
		}

		// // if (talkedRecently.has(message.author.id)) {
		// // 	message.delete();
		// // 	return message.channel.send('<:775305392787685378:780731436771573770> Wait **2** seconds to use next command!');
		// //   }else{
		// // 	const prefix = guildCommandPrefixes.get(message.guild.id);
		// // 	const [cmdName] = message.content.slice(prefix.length).split(/\s+/);
		// // 	const command = client.commands.get(cmdName);
		// // 	console.log(prefix + Object.values(command))
		// // 	if(message.content == prefix + command){
		// // 		message.delete();
		// // 		talkedRecently.add(message.author.id)
		// // 		let timeout = 2000;
		// // 		setTimeout(() => {
		// // 			talkedRecently.delete(message.author.id);
		// // 		}, timeout); 
		// // 	}
		
			
		
		// }
		 
	}
}

StateManager.on('prefixFetched', (guildId, prefix) => {
	guildCommandPrefixes.set(guildId, prefix)
})

StateManager.on('prefixUpdate', (guildId, prefix) => {
	guildCommandPrefixes.set(guildId, prefix);
});