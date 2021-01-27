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
var embedsColor = require('../../function/embedsColor');

module.exports = class serverInfoCommand extends BaseCommand {
    constructor() {
        super('serverinfo', 'info', [])
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

        let online = message.guild.members.cache.filter(member => member.user.presence.status !== 'online');
        let offline = message.guild.members.cache.filter(member => member.user.presence.status !== 'offline');
        let idle = message.guild.members.cache.filter(member => member.user.presence.status !== 'idle');
        let dnd = message.guild.members.cache.filter(member => member.user.presence.status !== 'dnd');
        const embed = new Discord.MessageEmbed()
            .setDescription(`**Guild information for __${message.guild.name}__**`)
            .setColor('BLUE')
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .addField('General', [
                `**❯ Nom:** ${message.guild.name}`,
                `**❯ ID:** ${message.guild.id}`,
                `**❯ Owner:** <@${message.guild.ownerID}>`,
                `**❯ Région:** ${regions[message.guild.region]}`,
                `**❯ Niveau de boost:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
                `**❯ Filtre explicite:** ${filterLevels[message.guild.explicitContentFilter]}`,
                `**❯ Niveau de vérification:** ${verificationLevels[message.guild.verificationLevel]}`,
                `**❯ Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} ${moment(message.guild.createdTimestamp).fromNow()}`,
                '\u200b'
            ])
            .addField('Statistiques', [
                `**❯ Nombre de role:** ${rolesGuild.length}`,
                `**❯ Nombre d'Emoji:** ${emojisGuild.size}`,
                `**❯ Nombre d'Emoji normaux:** ${emojisGuild.filter(emoji => !emoji.animated).size}`,
                `**❯ Nombre d'Emoji animé(s):** ${emojisGuild.filter(emoji => emoji.animated).size}`,
                `**❯ Member Count:** ${message.guild.memberCount}`,
                `**❯ Humain:** ${membersGuild.filter(member => !member.user.bot).size}`,
                `**❯ Bots:** ${membersGuild.filter(member => member.user.bot).size}`,
                `**❯ Text Channels:** ${channelsGuild.filter(channel => channel.type === 'text').size}`,
                `**❯ Voice Channels:** ${channelsGuild.filter(channel => channel.type === 'voice').size}`,
                `**❯ Nombre de boost:** ${message.guild.premiumSubscriptionCount || '0'}`,
                '\u200b'
            ])
            .addField('Presence', [
                `**❯ En ligne:** ${online.size}`,
                `**❯ Invisible:** ${idle.size}`,
                `**❯ Ne pas déranger:** ${dnd.size}`,
                `**❯ Hors ligne:** ${offline.size}`,
                '\u200b'
            ])
            .setFooter(client.user.username)

            .setTimestamp();

        message.channel.send(embed);

    }
}
embedsColor(guildEmbedColor);