const BaseEvent = require('../../utils/structures/BaseEvent');
const StateManager = require('../../utils/StateManager');

module.exports = class GuildDeleteEvent extends BaseEvent {
  constructor () {
    super('guildDelete');
    this.connection = StateManager.connection;
  }
  
  async run (client, guild) {
    try {
      await this.connection.query(
        `DELETE FROM guilds WHERE guildId = '${guild.id}'`
      );
      await this.connection.query(
        `DELETE FROM guildConfig WHERE guildId = '${guild.id}'`
      );

      await this.connection.query(
        `DELETE FROM antiraid WHERE guildId = '${guild.id}'`
      )
      await this.connection.query(
        `DELETE FROM antiraidConfig WHERE guildId = '${guild.id}'`
      )
      await this.connection.query(
        `DELETE FROM antiraidWlBp WHERE guildId = '${guild.id}'`
      )
      console.log(`Deleted from db.`)
    } catch(err) {
      console.log(err);
    }
  }
}
