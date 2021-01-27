const StateManager = require('../../utils/StateManager');
const BaseEvent = require('../../utils/structures/BaseEvent');
const mysql = require('mysql2/promise');
require('dotenv').config();
const db = mysql.createPool({
    user: process.env.DB_USER, 
    password: process.env.DB_PASS, 
    database: process.env.DB_NAME 
})


const guildCommandPrefixes = new Map();

module.exports = class ReadyEvent extends BaseEvent {
	constructor() {
		super('ready')
	}

	async run(client) {
		console.log(`${client.user.tag} est co.`)
		setInterval(() => {
			client.user.setActivity(`${client.guilds.cache.size} Servers | !help`, { type: 'WATCHING' })
		}, 60000); // Runs this every 60 seconds.

		client.guilds.cache.forEach(async guild => {
			let req = await db.query(`SELECT * FROM guildconfig WHERE guildId = '${guild.id}'`)
			if(req.length < 1) return db.query(`INSERT INTO guildconfig (guildId, prefix, muteChannelId, muteRoleId, setup, embedColors, whitelisted) VALUES ('${guild.id}', '!', 'NULL', 'NULL', 'NULL', 'NULL', 'NULL')`)
			// console.log(req)
			StateManager.emit('prefixFetched', guild.id, req[0].prefix);

			db.query(
				`SELECT embedColors FROM guildconfig WHERE guildId = '${guild.id}'`
			).then(result => {
				const guildId = guild.id;
				const color = result[0].embedColors;
				StateManager.emit('colorFetched', guildId, color);

			})
			db.query(`
			SELECT muteRoleId FROM guildconfig WHERE guildId = '${guild.id}';
			`
			).then(result => {
				const guildId = guild.id;
				const muteId = result[0].muteRoleId;
				StateManager.emit('muteIdFetched', guildId, muteId);

			}).catch(error => console.error(error))
			db.query(`
			SELECT setup FROM guildconfig WHERE guildId = '${guild.id}';
			`
			).then(result => {
				const guildId = guild.id;
				const setup = result[0].setup;
				StateManager.emit('setupDoneFetched', guildId, setup);

			}).catch(error => console.error(error))

			db.query(`
			SELECT spam FROM antiraid WHERE guildId = '${guild.id}';
			`
			).then(result => {
				const guildId = guild.id;
				const setup = result[0].setup;
				StateManager.emit('setupDoneFetched', guildId, setup);

			}).catch(error => console.error(error))


		});




	}
}
