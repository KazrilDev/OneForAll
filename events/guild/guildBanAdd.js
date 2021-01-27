const StateManager = require('../../utils/StateManager');
const BaseEvent = require('../../utils/structures/BaseEvent');
const guildCommandPrefixes = new Map();
var checkBotOwner = require('../../function/check/botOwner');


module.exports = class GuildBanAddEvent extends BaseEvent {
	constructor() {
		super('guildBanAdd');
		this.connection = StateManager.connection;
	}

	async run(client, guild, user) {
		if (!guild.me.hasPermission("VIEW_AUDIT_LOG")) return client.guild.owner.i.forEach(async (o) => {
			client.users.cache.get(o).send("Je n'ai pas assez de permission pour gerer l'antiraid", {
				action: `MEMBER_BAN_ADD`
			})
		})
		const isOnFetched = await this.connection.query(`SELECT ban FROM antiraid WHERE guildId = '${guild.id}'`);
		const isOnfetched = isOnFetched[0].ban;
		let isOn;
		if (isOnfetched == "1") { isOn = true };
		if (isOnFetched == "0") { isOn = false };
		let action;
		if (isOn) {
			action = await guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" }).then(async (audit) => audit.entries.first());

		} else {
			return;
        }

		if (action.executor.id === client.user.id) return;
		var isOwner = checkBotOwner(action.executor.id);

		const isWlOnFetched = await this.connection.query(`SELECT ban FROM antiraidWlBp WHERE guildId = '${guild.id}'`);
		const isWlOnfetched = isWlOnFetched[0].ban;
		let isOnWl;
		if (isWlOnfetched == "1") { isOnWl = true };
		if (isWlOnfetched == "0") { isOnWl = false };

		let isWlFetched = await this.connection.query(`SELECT whitelisted FROM guildConfig WHERE guildId = '${guild.id}'`);
		let isWlfetched = isWlFetched[0].whitelisted.toString();
		let isWl1 = isWlfetched.split(",");
		let isWl;
		if (isWl1.includes(action.executor.id)) { isWl = true };
		if (!isWl1.includes(action.executor.id)) { isWl = false };


		if (isOwner == true || guild.ownerID == action.executor.id || isOn == false) {

			console.log("rien fait")
		} else if (isOwner == true || guild.ownerID == action.executor.id || isOn == false || isOnWl == true && isWl == true) {
			console.log("Rien fait 2")

		} else if (isOn == true && isOwner == false || guild.owner.id !== action.executor.id || isOnWl == true && isWl == false || isOnWl == false) {
            guild.members.unban(user)

			let after = await this.connection.query(`SELECT ban FROM antiraidconfig WHERE guildId = '${guild.id}'`)


			let guild = client.guilds.cache.find(g => g.id === guild.id);

			if (after[0].ban === 'ban') {
				guild.members.ban(action.executor.id)
			} else if (after[0].ban === 'kick') {
				guild.member(action.executor.id).kick({
                    reason: `OneForAll - Type: ban `
                })
			} else if (after[0].ban === 'unrank') {
				let roles = []
                let role = await guild.member(action.executor.id).roles.cache
                    .map(role => roles.push(role.id))
                role
                guild.members.cache.get(action.executor.id).roles.remove(roles, `OneForAll - Type: ban`)
			}


		}
	}
}

