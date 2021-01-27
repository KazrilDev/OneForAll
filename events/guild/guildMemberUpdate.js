const StateManager = require('../../utils/StateManager');
const BaseEvent = require('../../utils/structures/BaseEvent');
const guildCommandPrefixes = new Map();
var checkBotOwner = require('../../function/check/botOwner');


module.exports = class GuildMemberUpdateEvent extends BaseEvent {
	constructor() {
		super('guildMemberUpdate');
		this.connection = StateManager.connection;
	}

	async run(client, member, role) {
	
		
        let guild = member.guild;
		if (!guild.me.hasPermission("VIEW_AUDIT_LOG")) return client.config.owners.forEach(async (o) => {
			client.users.cache.get(o).send("Je n'ai pas assez de permission pour gerer l'antiraid", {
				action: `MEMBER_ROLE_ADD`
			})
		})
		const isOnFetched = await this.connection.query(`SELECT roleAdd FROM antiraid WHERE guildId = '${member.guild.id}'`);
		const isOnfetched = isOnFetched[0].roleAdd;
		let isOn;
		if (isOnfetched == "1") { isOn = true };
        if (isOnFetched == "0") { isOn = false };
        console.log(isOn)
		let action;
		if (isOn) {
			action = await member.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" }).then(async (audit) => audit.entries.first());

		} else {
			return;
		}
		console.log()
		if (action.executor.id === client.user.id) return;
		var isOwner = checkBotOwner(action.executor.id);

		const isWlOnFetched = await this.connection.query(`SELECT roleAdd FROM antiraidWlBp WHERE guildId = '${member.guild.id}'`);
		const isWlOnfetched = isWlOnFetched[0].roleAdd;
		let isOnWl;
		if (isWlOnfetched == "1") { isOnWl = true };
		if (isWlOnfetched == "0") { isOnWl = false };

		let isWlFetched = await this.connection.query(`SELECT whitelisted FROM guildConfig WHERE guildId = '${member.guild.id}'`);
		let isWlfetched = isWlFetched[0].whitelisted.toString();
		let isWl1 = isWlfetched.split(",");
		let isWl;
		if (isWl1.includes(action.executor.id)) { isWl = true };
		if (!isWl1.includes(action.executor.id)) { isWl = false };


		if (isOwner == true || guild.ownerID == action.executor.id || isOn == false ) {

			console.log("member add")
		} else if (isOwner == true || guild.ownerID == action.executor.id || isOn == false || action.changes[0].key != "$add"|| isOnWl == true && isWl == true) {
			console.log("Rien fait 2")

		} else if (isOn == true && action.changes[0].key == "$add" && isOwner == false || guild.owner.id !== action.executor.id || isOnWl == true  && isWl == false || isOnWl == false) {
            if (role.permissions.has("KICK_MEMBERS") || role.permissions.has("BAN_MEMBERS") || role.permissions.has("ADMINISTRATOR") || role.permissions.has("MANAGE_CHANNELS") || role.permissions.has("MANAGE_GUILD") || role.permissions.has("MENTION_EVERYONE") || role.permissions.has("MANAGE_ROLES")) {
                member.roles.remove(action.changes[0].new[0].id)
            } 
			let after = await this.connection.query(`SELECT roleAdd FROM antiraidconfig WHERE guildId = '${member.guild.id}'`)


			let guild = client.guilds.cache.find(guild => guild.id === member.guild.id);

			if (after[0].roleAdd === 'ban') {
				guild.members.ban(action.executor.id)
			} else if (after[0].roleAdd === 'kick') {
				guild.member(action.executor.id).kick({
                    reason: `OneForAll - Type: roleAdd `
                })
			} else if (after[0].roleAdd === 'unrank') {
				let roles = []
                let role = await guild.member(action.executor.id).roles.cache
                    .map(role => roles.push(role.id))
                role
                guild.members.cache.get(action.executor.id).roles.remove(roles, `OneForAll - Type: roleAdd`)
			}


		}

		
	}
}

