const StateManager = require('../../utils/StateManager')
const guildWlId = new Map();


module.exports = async function checkwl(guildId, authorId) {
  this.connection = StateManager.connection;

  const whitelisted = await this.connection.query(`SELECT whitelisted FROM guildConfig WHERE guildId = '${guildId}' `)
  var tempdata = new Array();
  var strWhitelisted = whitelisted[0].whitelisted.toString();
  var ar1 = strWhitelisted.split(",")
  var ar2 = new Array();
  var verify = false;

  var tempdata = ar1.concat(ar2)
  console.log(tempdata.includes(authorId))
  if (tempdata.includes(authorId)) {
    verify = true
  }
  return verify;


};

