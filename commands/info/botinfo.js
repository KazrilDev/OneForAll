const BaseCommand = require('../../utils/structures/BaseCommand');
const { version } = require('../../package.json');
const moment = require('moment');
const { utc } = require('moment');
const { MessageEmbed, version: djsversion } = require('discord.js');
const os = require('os')
const ms = require('ms')
const Discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')

module.exports = class botInfoCommand extends BaseCommand {
    constructor() {
        super('botinfo', 'info', [])
    }

    async run(client, message, args) {
        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };

        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };

        const regions = {
            brazil: 'Brazil',
            europe: 'Europe',
            hongkong: 'Hong Kong',
            india: 'India',
            japan: 'Japan',
            russia: 'Russia',
            singapore: 'Singapore',
            southafrica: 'South Africa',
            sydeny: 'Sydeny',
            'us-central': 'US Central',
            'us-east': 'US East',
            'us-west': 'US West',
            'us-south': 'US South'
        };

        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };
        const rolesGuild = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const membersGuild = message.guild.members.cache;
        const channelsGuild = message.guild.channels.cache;
        const emojisGuild = message.guild.emojis.cache;
        const argument = args[0];

        const core = os.cpus()[0];
        const embedBot = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor || 'BLUE')
            .addField('General', [
                `**❯ Client:** ${client.user.tag} (${client.user.id})`,
                `**❯ Serveurs:** ${client.guilds.cache.size.toLocaleString()} `,
                `**❯ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `**❯ Channels:** ${client.channels.cache.size.toLocaleString()}`,
                `**❯ Date de création:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                `**❯ Node.js:** ${process.version}`,
                `**❯ Version:** v${version}`,
                `**❯ Discord.js:** v${djsversion}`,
                '\u200b'
            ])
            .addField('System', [
                `**❯ Platforme:** ${process.platform}`,
                `**❯ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
                `**❯ CPU:**`,
                `\u3000 Coeurs: ${os.cpus().length}`,
                `\u3000 Modèle: ${core.model}`,
                `\u3000 Vitesse: ${core.speed}MHz`,
            ])
            .setFooter(client.user.username)

            .setTimestamp();

        message.channel.send(embedBot);

    }
}
embedsColor(guildEmbedColor);