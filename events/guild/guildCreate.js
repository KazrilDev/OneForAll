const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');
module.exports = class GuildCreateEvent extends BaseEvent {
  constructor () {
    super('guildCreate');
    this.connection = StateManager.connection;
  }
  
  async run (client, guild) {
    try {
      await this.connection.query(
        `INSERT INTO guilds VALUES('${guild.id}', '${guild.ownerID}')`
      );
      await this.connection.query(
        `INSERT INTO guildConfig (guildId) VALUES ('${guild.id}')`
      );
      
      await this.connection.query(
        `INSERT INTO antiraid (guildId) VALUES ('${guild.id}')`
      )
      await this.connection.query(
        `INSERT INTO antiraidConfig (guildId) VALUES ('${guild.id}')`
      )
      await this.connection.query(
        `INSERT INTO antiraidWlBp (guildId) VALUES ('${guild.id}')`
      )
      console.log(`Added to db.`)
    } catch(err) {
      console.log(err);
    }
    
		client.guilds.cache.forEach(guild => {
			this.connection.query(
				`SELECT prefix FROM guildConfig WHERE guildId = '${guild.id}'`
			).then(result => {
				const guildId = guild.id;
				const prefix = result[0].prefix;
				StateManager.emit('prefixFetched', guildId, prefix);
			}).catch(err => console.log(err));
		});
  }
}
