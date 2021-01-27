const StateManager = require('../../utils/StateManager');
const BaseEvent = require('../../utils/structures/BaseEvent');
const guildCommandPrefixes = new Map();
var checkBotOwner = require('../../function/check/botOwner');

module.exports = class GuildMemberUpdateEvent extends BaseEvent {
	constructor() {
		super('guildMemberRemove');
		this.connection = StateManager.connection;
	}

	async run(client, member) {
	
        const isWlFetched = await this.connection.query(`SELECT whitelisted FROM guildConfig WHERE guildId = '${member.guild.id}'`)
        const isWlfetched = isWlFetched[0].whitelisted.toString();
        const isWl1 = isWlfetched.split(',')
        let isWl = false;
        if(isWl1.includes(member.id)){isWl = true};
        if(isWl = true){
            for( var i = 0; i < isWl1.length; i++){ 
    
                if ( isWl1[i] === member.id) { 
            
                    isWl1.splice(i, 1); 
                    try{
                        await this.connection.query( `UPDATE guildConfig SET whitelisted = '${isWl1}' WHERE guildId = '${member.guild.id}'`)
                    } catch(err){
                        console.log(err);
                    }  
                }
            }
            
        }

        const isOwnerFetched = await this.connection.query(`SELECT owner FROM guildConfig WHERE guildId = '${member.guild.id}'`)
        const isOwnerfetched = isOwnerFetched[0].whitelisted.toString();
        const isOwner1 = isOwnerfetched.split(',')
        let isOwner = false;
        if(isOwner1.includes(member.id)){isOwner = true};
        if(isOwner = true){
            for( var i = 0; i < isOwner1.length; i++){ 
    
                if ( isOwner1[i] === member.id) { 
            
                    isOwner1.splice(i, 1); 
                    try{
                        await this.connection.query( `UPDATE guildConfig SET owner = '${isOwner1}' WHERE guildId = '${member.guild.id}'`)
                    } catch(err){
                        console.log(err);
                    }  
                }
            }
            
        }
	}
}

