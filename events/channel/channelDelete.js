const StateManager = require('../../utils/StateManager');
const BaseEvent = require('../../utils/structures/BaseEvent');
var checkBotOwner = require('../../function/check/botOwner');
var checkWl = require('../../function/check/checkWl');
module.exports = class ChannelDeleteEvent extends BaseEvent {
    constructor() {
        super('channelDelete')
        this.connection = StateManager.connection;
    }

    async run(client, channel) {
        let guild = channel.guild
        if (!channel.guild.me.hasPermission("VIEW_AUDIT_LOG")) return client.config.owners.forEach(async (o) => {
            client.users.cache.get(o).send("Je n'ai pas assez de permission pour gerer l'antiraid", {
                action: `CHANNEL_DELETE`
            })
        })
        const isOnFetched = await this.connection.query(`SELECT channelDelete FROM antiraid WHERE guildId = '${channel.guild.id}'`);
        const isOnfetched = isOnFetched[0].channelDelete;
        let isOn;
        if (isOnfetched == "1") { isOn = true };
        if (isOnFetched == "0") { isOn = false };
        let action;
        if(isOn){
            action = await channel.guild.fetchAuditLogs({ type: "CHANNEL_DELETE" }).then(async (audit) => audit.entries.first());

        }else{
            return;
        }
        if (action.executor.id === client.user.id) return;
        var isOwner = checkBotOwner(action.executor.id);
       

        const isWlOnFetched = await this.connection.query(`SELECT channelDelete FROM antiraidWlBp WHERE guildId = '${channel.guild.id}'`);
        const isWlOnfetched = isWlOnFetched[0].channelDelete;
        let isOnWl;
        if (isWlOnfetched == "1") { isOnWl = true };
        if (isWlOnfetched == "0") { isOnWl = false };

        let isWlFetched = await this.connection.query(`SELECT whitelisted FROM guildConfig WHERE guildId = '${channel.guild.id}'`);
        let isWlfetched =  isWlFetched[0].whitelisted.toString();
        let isWl1 = isWlfetched.split(",");
        let isWl;
        if (isWl1.includes(action.executor.id)) { isWl = true };
        if (!isWl1.includes(action.executor.id)) { isWl = false };

        if (isOwner == true || guild.ownerID == action.executor.id || isOn == false) {
            console.log("Rien fait 1")
        } else if (isOwner == true || guild.ownerID == action.executor.id || isOn == false || isOnWl == true && isWl == true) {
            console.log("Rien fait 2")

        } else if (isOn == true && isOwner == false || guild.owner.id !== action.executor.id  || isOnWl == true && isWl == false || isOnWl == false) {
            let newChannel = await channel.clone()
            newChannel.setPosition(channel.position)

            let after = await this.connection.query(`SELECT channelDelete FROM antiraidconfig WHERE guildId = '${channel.guild.id}'`)


            
            let guild = client.guilds.cache.find(guild => guild.id === channel.guild.id);
            if (after[0].channelDelete === 'ban') {
                guild.members.ban(action.executor.id)
            } else if (after[0].channelDelete === 'kick') {
                guild.member(action.executor.id).kick({
                    reason: `OneForAll - Type: channelDelete `
                })
            } else if (after[0].channelDelete === 'unrank') {
                let roles = []
                let role = await guild.member(action.executor.id).roles.cache
                    .map(role => roles.push(role.id))
                role
                guild.members.cache.get(action.executor.id).roles.remove(roles, `OneForAll - Type: channelDelete`)
            }
        } 

      
     
    };

}
