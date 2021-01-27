const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')
var checkSetup = require('../../function/check/checkSetup');
const { cpus } = require('os');
const guildId = new Map();
let ar1 = new Array();
var checkOwner = require('../../function/check/botOwner')
module.exports = class wlCommand extends BaseCommand {
    constructor() {
        super('wl', 'owner', [])
        this.connection = StateManager.connection;
    }

    async run(client, message, args) {

        const sender = message.author.id;
        var isOwner = checkOwner(sender);
        const result = await this.connection.query(`SELECT whitelisted FROM guildConfig WHERE guildId = '${message.guild.id}'`)
        const whitelisted = result[0].whitelisted;
        const strWhitelisted = whitelisted.toString();
        var ar2 = whitelisted.split(",")
        var tempdata = ar1.concat(ar2);
        const color = guildEmbedColor.get(message.guild.id);
        
        const owner = message.guild.ownerID;
    
        if (message.author.id != owner && !isOwner) return message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\` Seulement le membre qui possède la couronne peux executer cette commande (<@${owner}>)!`)
        const add = args[0] == "add";
        const remove = args[0] == 'remove';
        const list = args[0] == 'list';
        if (!add & !remove & !list) return message.channel.send("<:720681441670725645:780539422479351809> `ERREUR` Erreur de syntaxe (!wl add @TAKEFY)")
        if (add) {
            let member = message.guild.member(message.author.id);
            if (args[1]) {
                member = message.guild.member(args[1]);
            } else {
                return message.channel.send("<:720681441670725645:780539422479351809> `ERREUR` Erreur de syntaxe : !wl\`<add/ remove/ list>\` \`<mention / id/ tag>\`")
            }
            if (message.mentions.members.first()) {
                member = message.guild.member(message.mentions.members.first().id);
            }
            if (!member) return message.channel.send("<:720681441670725645:780539422479351809> `ERREUR` Erreur de syntaxe : !wl\`<add/ remove/ list>\` \`<mention / id/ tag>\`")

            if (tempdata.includes(member.user.id)) return message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\` <@${member.user.id}> est déjà dans la whitelist`)
            while (tempdata[0] == '==' || tempdata[0] == '') {
                tempdata.shift()
            }
            if (!tempdata.includes(member.user.id)) {
                tempdata.push(member.user.id);
            }



            this.connection.query(
                `UPDATE guildConfig SET whitelisted = '${tempdata}' WHERE guildId = '${message.guild.id}'`
            ).then(() => {

                message.channel.send(`<:720681705219817534:780540043033837622> \`SUCCÈS\` J'ai ajouté <@${member.user.id}> à la whitelist`)

            })
        } else if (remove) {
            let member = message.guild.member(message.author.id);
            if (args[1]) {
                member = message.guild.member(args[1]);
            } else {
                return message.channel.send("<:720681441670725645:780539422479351809> `ERREUR` Erreur de syntaxe : !wl\`<add/ remove/ list>\` \`<mention / id/ tag>\`")
            }
            if (message.mentions.members.first()) {
                member = message.guild.member(message.mentions.members.first().id);
            }
            if (!member) return message.channel.send("<:720681441670725645:780539422479351809> `ERREUR` Erreur de syntaxe : !wl\`<add/ remove/ list>\` \`<mention / id/ tag>\`")
            while (tempdata[0] == '==' || tempdata[0] == '') {
                tempdata.shift()
            }
          

            if (tempdata.includes(member.user.id) == false) return message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\` <@${member.user.id}> n'est pas dans la whitelist`)

            tempdata = tempdata.filter(x => x !== member.user.id)

            this.connection.query(
                `UPDATE guildConfig SET whitelisted = '${tempdata}' WHERE guildId = '${message.guild.id}'`
            ).then(() => {

                message.channel.send(`<:720681705219817534:780540043033837622> \`SUCCÈS\` J'ai enlevé <@${member.user.id}> à la whitelist`)

            })
        } else if (list) {
            try{
                let tdata = await message.channel.send(`Chargement ...`)

                let p0 = 0;
                let p1 = 15;
                let page = 1;


                let embed = new Discord.MessageEmbed()

                console.log(tempdata)
                embed.setTitle(`<:778353230383546419:781153631881265173> Liste whitelist (${tempdata.length})`)
                    .setColor(`${color}`)
                    .setDescription(tempdata
                        .filter(x => message.guild.members.cache.get(x))
                        .map(r => r)
                        .map((user, i) => `${i + 1} ・ **${message.guild.members.cache.get(user).user.tag}**`)
                        .slice(0, 15)
                        .join('\n') + `\n\n<:778353230467825704:781155103566331904> Page **${page}** / **${Math.ceil(tempdata.length / 15)}**`)
                    .setTimestamp()
                    .setFooter(`${client.user.username}`);

                let reac1
                let reac2
                let reac3

                if (tempdata.length > 15) {
                    reac1 = await tdata.react("⬅");
                    reac2 = await tdata.react("❌");
                    reac3 = await tdata.react("➡");
                }

                tdata.edit(" ", embed);

                const data_res = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

                data_res.on("collect", async (reaction) => {

                    if (reaction.emoji.name === "⬅") {

                        p0 = p0 - 15;
                        p1 = p1 - 15;
                        page = page - 1

                        if (p0 < 0) {
                            return
                        }
                        if (p0 === undefined || p1 === undefined) {
                            return
                        }


                        embed.setDescription(tempdata
                            .filter(x => message.guild.members.cache.get(x))
                            .map(r => r)
                            .map((user, i) => `${i + 1} ・ **${message.guild.members.cache.get(user).user.tag}**`)
                            .slice(p0, p1)
                            .join('\n') + `\n\n<:778353230467825704:781155103566331904> Page **${page}** / **${Math.ceil(tempdata.length / 15)}**`)
                        tdata.edit(embed);

                    }

                    if (reaction.emoji.name === "➡") {

                        p0 = p0 + 15;
                        p1 = p1 + 15;

                        page++;

                        if (p1 > tempdata.length + 15) {
                            return
                        }
                        if (p0 === undefined || p1 === undefined) {
                            return
                        }


                        embed.setDescription(tempdata
                            .filter(x => message.guild.members.cache.get(x))
                            .map(r => r)
                            .map((user, i) => `${i + 1} ・ **${message.guild.members.cache.get(user).user.tag}**`)
                            .slice(p0, p1)
                            .join('\n') + `\n\n<:778353230467825704:781155103566331904> Page **${page}** / **${Math.ceil(tempdata.length / 15)}**`)
                        tdata.edit(embed);

                    }

                    if (reaction.emoji.name === "❌") {
                        data_res.stop()
                        reac1.remove()
                        reac2.remove()
                        return reac3.remove()
                    }

                    await reaction.users.remove(message.author.id);

                })

            } catch(err){
                console.log(err)
            }

        }


    }






}

embedsColor(guildEmbedColor);


