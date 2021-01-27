const BaseCommand = require('../../utils/structures/BaseCommand');
const StateManager = require('../../utils/StateManager');
var checkOwner = require('../../function/check/botOwner')


module.exports = class SetPrefixCommand extends BaseCommand {
    constructor() {
        super('setprefix', 'moderation', [])
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {
        const owner = message.guild.ownerID;

        const sender = message.author.id;
        var isOwner = checkOwner(sender);
        if (message.member.id != owner && isOwner == false) return message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\` Seulement le membre qui possède la couronne peux executer cette commande (<@${owner}>)!`)

        var regex = /^[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{1}$/igm;
        var isValid = regex.test(args[0]);
        if (!isValid) return message.channel.send("Veuillez utiliser les prefixes suivants: ``!‎``, ``@``, ``#‎``, ``$‎``, ``%‎``, ``^‎``, ``&‎``, ``*‎``, ``(‎``, ``)‎``, ``_‎``, ``+‎``, ``\\‎``, ``-‎``, ``=‎``, ``{‎``, ``}‎``, ``;‎``, ``'‎``, ``:‎``, ``\"‎``, ``|‎``, ``,‎``, ``.‎``, ``<‎``, ``>‎``, ``\/‎``, ``?``")

        const [cmdName, newPrefix] = message.content.split(" ");
        if (newPrefix) {
            try {
                await this.connection.query(
                    `UPDATE guildConfig SET prefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
                );
                message.channel.send(`<:720681705219817534:780540043033837622> \`SUCCÈS\` Le prefix a été mis à jour en **${newPrefix}** `);
                StateManager.emit('prefixUpdate', message.guild.id, newPrefix);
            } catch (err) {
                console.log(err);
                message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\` Oups, la mis à jour du prefix en ${newPrefix} a échouhé.`);
            }
        } else {
            message.channel.send("<:720681441670725645:780539422479351809> \`ERREUR\` Nombre d'argument incorrect");
        }

    }
}
