const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js')
const guildEmbedColor = new Map();
const StateManager = require('../../utils/StateManager');
var embedsColor = require('../../function/embedsColor')
var checkOwner = require('../../function/check/botOwner')

module.exports = class antiraidCommand extends BaseCommand {
    constructor() {
        super('antiraid', 'antiraid', [])
        this.connection = StateManager.connection;

    }

    async run(client, message, args) {
        const color = guildEmbedColor.get(message.guild.id)

        const owner = message.guild.ownerID;
        const sender = message.author.id;
        var isOwner = checkOwner(sender);
        if (message.author.id != owner && !isOwner) return message.channel.send(`<:720681441670725645:780539422479351809> \`ERREUR\` Seulement le membre qui possède la couronne peux executer cette commande (<@${owner}>)!`)
        const allOn = args[0] == "on";
        const config = args[0] == "config";
        const allOff = args[0] == 'off';
        const sanction = args[0] == 'sanction'
        if(!args[0]){
             const embed = new Discord.MessageEmbed()
            .setAuthor(`Informations antiraid`, `https://media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg?width=588&height=588`)
            .setColor(`${color}`)
            .setTimestamp()
            .setThumbnail(`https://images-ext-1.discordapp.net/external/io8pRqFGLz1MelORzIv2tAiPB3uulaHCX_QH7XEK0y4/%3Fwidth%3D588%26height%3D588/https/media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg`)
            .setFooter("Informations antiraid", `https://media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg?width=588&height=588`)
            .addField('<:778353230559969320:780778719824183316> Anti Raid:', `[\`antiraid on\`](https://discord.gg/h69YZHB7Nh) ・ Desactive entierement l'antiraid\n[\`antiraid off\`](https://discord.gg/h69YZHB7Nh)・Active tout l'antiraid\n[\`antiraid config\`](https://discord.gg/h69YZHB7Nh)・Config antiraid\n[\`wl add\`](https://discord.gg/h69YZHB7Nh)・Whitelist un membre\n[\`wl remove\`](https://discord.gg/h69YZHB7Nh)・Enlève un membre de la whitelist\n[\`wl list\`](https://discord.gg/h69YZHB7Nh)・Liste de toute(s) le(s) personne(s) whitelist`)
      message.channel.send(embed); 
        }
        
        if (allOn) {

            await this.connection.query(`INSERT INTO antiraid VALUES ('${message.guild.id}','1', '1' , '1' , '1' , '1' , '1' , '1' , '1', '1', '1', '1') ON DUPLICATE KEY UPDATE webhookCreate=1,roleCreate=1, roleUpdate=1, roleDelete=1, channelCreate=1, channelUpdate=1,channelDelete=1,spam=1,ban=1, bot=1 , roleAdd =0`)
                .then((result) => {
                    console.log(result)
                    message.channel.send("Toutes les évènements ont été activées")
                })

        } else if (allOff) {
            await this.connection.query(`INSERT INTO antiraid VALUES ('${message.guild.id}', '0', '0' , '0' , '0' , '0' , '0' , '0' , '0', '0', '0', '0') ON DUPLICATE KEY UPDATE webhookCreate=0, roleCreate=0, roleUpdate=0, roleDelete=0, channelCreate=0, channelUpdate=0,channelDelete=0,spam=0,ban=0, bot=0, roleAdd =0`)
                .then(() => { message.channel.send("Toutes les évènements ont été désactivé") })
        } else if (config) {
            const type = args[1];
            const sanctions = args[2];
            const all = args[1] == 'all'
            let p0 = 0;
            let p1 = 5;
            let page = 1;
            const guildconfig = await this.connection.query(`SELECT muteRoleId FROM guildConfig WHERE guildId = ${message.guild.id}`)
            const muteRoleId = guildconfig[0].muteRoleId;
            const sanctionFetched = await this.connection.query(`SELECT * FROM antiraidConfig WHERE guildId = ${message.guild.id}`)
            const webhookCreate = sanctionFetched[0].webhookCreate;
            const roleCreate = sanctionFetched[0].roleCreate;
            const roleUpdate = sanctionFetched[0].roleUpdate;
            const roleDelete = sanctionFetched[0].roleDelete;
            const channelCreate = sanctionFetched[0].channelCreate;
            const channelUpdate = sanctionFetched[0].channelUpdate;
            const channelDelete = sanctionFetched[0].channelDelete;
            const spam = sanctionFetched[0].spam;
            const ban = sanctionFetched[0].ban;
            const bot = sanctionFetched[0].bot;
            const roleAdd = sanctionFetched[0].roleAdd;

            const actifFetched = await this.connection.query(`SELECT * FROM antiraid WHERE guildId = ${message.guild.id}`);
            const webhookCreateOn = actifFetched[0].webhookCreate;
            const roleCreateOn = actifFetched[0].roleCreate;
            const roleUpdateOn = actifFetched[0].roleUpdate;
            const roleDeleteOn = actifFetched[0].roleDelete;
            const channelCreateOn = actifFetched[0].channelCreate;
            const channelUpdateOn = actifFetched[0].channelUpdate;
            const channelDeleteOn = actifFetched[0].channelDelete;
            const spamOn = actifFetched[0].spam;
            const banOn = actifFetched[0].ban;
            const botOn = actifFetched[0].bot;
            const roleAddOn = actifFetched[0].roleAdd;


            const wlFetched = await this.connection.query(`SELECT * FROM antiraidWlBp WHERE guildId = ${message.guild.id}`);
            const webhookCreateWl = wlFetched[0].webhookCreate;
            const roleCreateOnWl = wlFetched[0].roleCreate;
            const roleUpdateOnWl = wlFetched[0].roleUpdate;
            const roleDeleteOnWl = wlFetched[0].roleDelete;
            const channelCreateWl = wlFetched[0].channelCreate;
            const channelUpdateWl = wlFetched[0].channelUpdate;
            const channelDeleteWl = wlFetched[0].channelDelete;
            const spamWl = wlFetched[0].spam;
            const banWl = wlFetched[0].ban;
            const botWl = wlFetched[0].bot;
            const roleAddWl = wlFetched[0].roleAdd;
            console.log(roleAdd, roleAddWl, roleAddOn)
            

            let isOnWbCr;
            let isOnRlCr;
            let isOnRlUp;
            let isOnRlDel;
            let isOnChCr;
            let isOnChUp;
            let isOnChDel;
            let isOnSpam;
            let isOnBan;
            let isOnBot;
            let isOnroleAdd;

            if (webhookCreateOn == "1") { isOnWbCr = '<:778348494712340561:781153837850820619>' }
            if (roleCreateOn == "1") { isOnRlCr = '<:778348494712340561:781153837850820619>' }
            if (roleUpdateOn == "1") { isOnRlUp = '<:778348494712340561:781153837850820619>' }
            if (roleDeleteOn == "1") { isOnRlDel = '<:778348494712340561:781153837850820619>' }
            if (channelCreateOn == "1") { isOnChCr = '<:778348494712340561:781153837850820619>' }
            if (channelUpdateOn == "1") { isOnChUp = '<:778348494712340561:781153837850820619>' }
            if (channelDeleteOn == "1") { isOnChDel = '<:778348494712340561:781153837850820619>' }
            if (spamOn == "1") { isOnSpam = '<:778348494712340561:781153837850820619>' }
            if (banOn == "1") { isOnBan = '<:778348494712340561:781153837850820619>' }
            if (botOn == "1") { isOnBot = '<:778348494712340561:781153837850820619>' }
            if (roleAddOn == "1") { isOnroleAdd = '<:778348494712340561:781153837850820619>' }

            if (webhookCreateOn == "0") { isOnWbCr = '<:778348495157329930:781189773645578311>' }
            if (roleCreateOn == "0") { isOnRlCr = '<:778348495157329930:781189773645578311>' }
            if (roleUpdateOn == "0") { isOnRlUp = '<:778348495157329930:781189773645578311>' }
            if (roleDeleteOn == "0") { isOnRlDel = '<:778348495157329930:781189773645578311>' }
            if (channelCreateOn == "0") { isOnChCr = '<:778348495157329930:781189773645578311>' }
            if (channelUpdateOn == "0") { isOnChUp = '<:778348495157329930:781189773645578311>' }
            if (channelDeleteOn == "0") { isOnChDel = '<:778348495157329930:781189773645578311>' }
            if (spamOn == "0") { isOnSpam = '<:778348495157329930:781189773645578311>' }
            if (banOn == "0") { isOnBan = '<:778348495157329930:781189773645578311>' }
            if (botOn == "0") { isOnBot = '<:778348495157329930:781189773645578311>' }
            if (roleAddOn == "0") { isOnroleAdd = '<:778348495157329930:781189773645578311>' }

            let isOnWlWbCr;
            let isOnWlRlCr;
            let isOnWlRlUp;
            let isOnWlRlDel;
            let isOnWlChCr;
            let isOnWlChUp;
            let isOnWlChDel;
            let isOnWlSpam;
            let isOnWlBan;
            let isOnWlBot;
            let isOnWlroleAdd;

            if (webhookCreateWl == "1") { isOnWlWbCr = 'Oui' }
            if (roleCreateOnWl == "1") { isOnWlRlCr = 'Oui' }
            if (roleUpdateOnWl == "1") { isOnWlRlUp = 'Oui' }
            if (roleDeleteOnWl == "1") { isOnWlRlDel = 'Oui' }
            if (channelCreateWl == "1") { isOnWlChCr = 'Oui' }
            if (channelUpdateWl == "1") { isOnWlChUp = 'Oui' }
            if (channelDeleteWl == "1") { isOnWlChDel = 'Oui' }
            if (spamWl == "1") { isOnWlSpam = 'Oui' }
            if (banWl == "1") { isOnWlBan = 'Oui' }
            if (botWl == "1") { isOnWlBot = 'Oui' }
            if (roleAddWl == "1") { isOnWlroleAdd = 'Oui' }
            
            if (webhookCreateWl == "0") { isOnWlWbCr = 'Non' }
            if (roleCreateOnWl == "0") { isOnWlRlCr = 'Non' }
            if (roleUpdateOnWl == "0") { isOnWlRlUp = 'Non' }
            if (roleDeleteOnWl == "0") { isOnWlRlDel = 'Non' }
            if (channelCreateWl == "0") { isOnWlChCr = 'Non' }
            if (channelUpdateWl == "0") { isOnWlChUp = 'Non' }
            if (channelDeleteWl == "0") { isOnWlChDel = 'Non' }
            if (spamWl == "0") { isOnWlSpam = 'Non' }
            if (banWl == "0") { isOnWlBan = 'Non' }
            if (botWl == "0") { isOnWlBot = 'Non' }
            if (roleAddWl == "0") { isOnWlroleAdd = 'Non' }





            let tdata = await message.channel.send(`Chargement ...`)

            let embed = new Discord.MessageEmbed();
            embed.setTitle(`Configuration des évènements (10)`)
                .setColor(`${color}`)
                .setDescription(`
            **1️⃣ ・WEBHOOK_CREE**\n
            Actif : **${isOnWbCr}**
            Sanction: **${webhookCreate}**
            Whitelist bypass : **${isOnWlWbCr}**
            
            **2️⃣・ROLE_CREE**\n
            Actif : **${isOnRlCr}**
            Sanction: **${roleCreate}**
            Whitelist bypass : **${isOnWlRlCr}**

            **3️⃣・ROLE_MODIFIE**\n
            Actif : **${isOnRlUp}**
            Sanction: **${roleUpdate}**
            Whitelist bypass : **${isOnWlRlUp}**

            **4️⃣・ROLE_SUPPRIME**\n
            Actif : **${isOnRlDel}**
            Sanction: **${roleDelete}**
            Whitelist bypass : **${isOnWlRlDel}**

            **5️⃣・ANTI_MASSBAN**\n
            Actif : **${isOnBan}**
            Sanction: **${ban}**
            Whitelist bypass : **${isOnWlBan}**

            **6️⃣・ANTI_ROLE_ADD**\n
            Actif : **${isOnroleAdd}**
            Sanction: **${roleAdd}**
            Whitelist bypass : **${isOnWlroleAdd}**
            
            Page ${page} / 2
            `)

            let reac1
            let reac2
            let reac3
            let reac4
            let reac5
            let reac6
            let reac7
            let reac8
            let reac9
            let reac10
            let reac11
            let reac12
            let reac13
            let reac14
            let reac15
            let reac16
            reac1 = await tdata.react("⬅");
            reac4 = await tdata.react("1️⃣");
            reac5 = await tdata.react("2️⃣");
            reac6 = await tdata.react("3️⃣");
            reac7 = await tdata.react("4️⃣");
            reac8 = await tdata.react("5️⃣");
            reac9 = await tdata.react("6️⃣");
            reac15 = await tdata.react("➡");
            reac16 = await tdata.react("❌");



            tdata.edit(" ", embed);
            const data_res = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);
            const data_res2 = tdata.createReactionCollector((reaction, user) => user.id === message.author.id);

            data_res.on("collect", async (reaction) => {
                if (reaction.emoji.name === "1️⃣") {
                    data_res.stop();
                    await tdata.reactions.removeAll()
                    embed.setDescription(`
                        \n
                        Modifier l'activité : 1️⃣
                        Modifier la sanctions : 2️⃣
                        Modifier whitelist by pass : 3️⃣
                    `)
                        .setTitle(`**WEBHOOK_CREE**`)
                    tdata.edit(embed);
                    reac4 = await tdata.react("1️⃣");
                    reac5 = await tdata.react("2️⃣");
                    reac6 = await tdata.react("3️⃣");

                    reac16 = await tdata.react("❌");
                    data_res2.on("collect", async (reaction) => {
                        if (reaction.emoji.name === "1️⃣") {
                            tdata.edit(embed)
                            let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")

                            const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbCr = responseWbCr.first()
                            const lowercase = CollectedWbCr.content.toLowerCase()
                            if (lowercase == "on") {
                                await this.connection.query(`
                                    UPDATE antiraid SET webhookCreate = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été activé")
                                    q.delete();
                                    CollectedWbCr.delete()
                                })
                            } else if (lowercase == "off") {
                                await this.connection.query(`
                                    UPDATE antiraid SET webhookCreate = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été desactivé")
                                    q.delete();
                                    CollectedWbCr.delete()
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                            }
                        }


                        if (reaction.emoji.name === "2️⃣") {
                            tdata.edit(embed)

                            let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                await this.connection.query(`
                                    UPDATE antiraidconfig SET webhookCreate = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }

                        } else if (reaction.emoji.name == "3️⃣") {
                            tdata.edit(embed)

                            let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "oui") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET webhookCreate = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            } else if (lowercase == "non") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET webhookCreate = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            }

                            else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }

                        } else if (reaction.emoji.name === "❌") {
                            tdata.delete();
                            return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                        }

                    })
                 } else if (reaction.emoji.name == "2️⃣") {
                    data_res.stop();
                    await tdata.reactions.removeAll()
                    embed.setDescription(`
                        \n
                        Modifier l'activité : 1️⃣
                        Modifier la sanctions : 2️⃣
                        Modifier whitelist by pass : 3️⃣
                    `)
                        .setTitle(`**ROLE_CREE**`)
                    tdata.edit(embed);
                    reac4 = await tdata.react("1️⃣");
                    reac5 = await tdata.react("2️⃣");
                    reac6 = await tdata.react("3️⃣");
                    reac16 = await tdata.react("❌");
                    data_res2.on("collect", async (reaction) => {
                        if (reaction.emoji.name === "1️⃣") {
                            let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbDel = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbDel = responseWbDel.first()
                            const lowercase = CollectedWbDel.content.toLowerCase()
                            if (lowercase == "on") {
                                await this.connection.query(`
                                    UPDATE antiraid SET roleCreate = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été activé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "off") {
                                await this.connection.query(`
                                    UPDATE antiraid SET roleCreate = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été desactivé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                            }
                        } else if (reaction.emoji.name === "2️⃣") {
                            let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")

                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                await this.connection.query(`
                                    UPDATE antiraidconfig SET roleCreate = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                    q.delete();
                                    CollectedWbSanc.delete();
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }
                        } else if (reaction.emoji.name == "3️⃣") {
                            tdata.edit(embed)

                            let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "oui") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET roleCreate = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            } else if (lowercase == "non") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET roleCreate = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            }

                            else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }

                        }
                        if (reaction.emoji.name === "❌") {
                            tdata.delete();
                            return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                        }
                    })
                } else if (reaction.emoji.name == "3️⃣") {
                    data_res.stop();
                    await tdata.reactions.removeAll()
                    embed.setDescription(`
                        \n
                        Modifier l'activité : 1️⃣
                        Modifier la sanctions : 2️⃣
                        Modifier whitelist by pass : 3️⃣
                    `)
                        .setTitle(`**ROLE_MODIFIE**`)
                    tdata.edit(embed);
                    reac4 = await tdata.react("1️⃣");
                    reac5 = await tdata.react("2️⃣");
                    reac6 = await tdata.react("3️⃣");
                    reac16 = await tdata.react("❌");
                    data_res2.on("collect", async (reaction) => {
                        if (reaction.emoji.name === "1️⃣") {
                            let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbDel = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbDel = responseWbDel.first()
                            const lowercase = CollectedWbDel.content.toLowerCase()
                            if (lowercase == "on") {
                                await this.connection.query(`
                                    UPDATE antiraid SET roleUpdate = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été activé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "off") {
                                await this.connection.query(`
                                    UPDATE antiraid SET roleUpdate = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été desactivé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                            }
                        } else if (reaction.emoji.name === "2️⃣") {
                            let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")

                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                await this.connection.query(`
                                    UPDATE antiraidconfig SET roleUpdate = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                    q.delete();
                                    CollectedWbSanc.delete();
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }
                        } else if (reaction.emoji.name == "3️⃣") {
                            tdata.edit(embed)

                            let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "oui") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET roleUpdate = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            } else if (lowercase == "non") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET roleUpdate = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            }

                            else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }

                        }
                        if (reaction.emoji.name === "❌") {
                            tdata.delete();
                            return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                        }
                    })
                } else if (reaction.emoji.name == "4️⃣") {
                    data_res.stop();
                    await tdata.reactions.removeAll()
                    embed.setDescription(`
                        \n
                        Modifier l'activité : 1️⃣
                        Modifier la sanctions : 2️⃣
                        Modifier whitelist by pass : 3️⃣
                    `)
                        .setTitle(`**ROLE_SUPPRIME**`)
                    tdata.edit(embed);
                    reac4 = await tdata.react("1️⃣");
                    reac5 = await tdata.react("2️⃣");
                    reac6 = await tdata.react("3️⃣");
                    reac16 = await tdata.react("❌");
                    data_res2.on("collect", async (reaction) => {
                        if (reaction.emoji.name === "1️⃣") {
                            let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbDel = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbDel = responseWbDel.first()
                            const lowercase = CollectedWbDel.content.toLowerCase()
                            if (lowercase == "on") {
                                await this.connection.query(`
                                    UPDATE antiraid SET roleDelete = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été activé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "off") {
                                await this.connection.query(`
                                    UPDATE antiraid SET roleDelete = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été desactivé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                            }
                        } else if (reaction.emoji.name === "2️⃣") {
                            let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")

                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                await this.connection.query(`
                                    UPDATE antiraidconfig SET roleDelete = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                    q.delete();
                                    CollectedWbSanc.delete();
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }
                        } else if (reaction.emoji.name == "3️⃣") {
                            tdata.edit(embed)

                            let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "oui") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET roleDelete = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            } else if (lowercase == "non") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET roleDelete = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            }

                            else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }

                        }
                        if (reaction.emoji.name === "❌") {
                            tdata.delete();
                            return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                        }
                    })
                }else if (reaction.emoji.name == "5️⃣") {
                    data_res.stop();
                    await tdata.reactions.removeAll()
                    embed.setDescription(`
                                    \n
                                    Modifier l'activité : 1️⃣
                                    Modifier la sanctions : 2️⃣
                                    Modifier whitelist by pass : 3️⃣
                                `)
                        .setTitle(`**ANTI_BAN**`)
                    tdata.edit(embed);
                    reac4 = await tdata.react("1️⃣");
                    reac5 = await tdata.react("2️⃣");
                    reac6 = await tdata.react("3️⃣");
                    reac16 = await tdata.react("❌");
                    data_res2.on("collect", async (reaction) => {
                        if (reaction.emoji.name === "1️⃣") {
                            let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbDel = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbDel = responseWbDel.first()
                            const lowercase = CollectedWbDel.content.toLowerCase()
                            if (lowercase == "on") {
                                await this.connection.query(`
                                                UPDATE antiraid SET ban = '1' WHERE guildId = '${message.guild.id}' 
                                            `).then(() => {
                                    message.channel.send("L'évènement a été activé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "off") {
                                await this.connection.query(`
                                                UPDATE antiraid SET ban = '0' WHERE guildId = '${message.guild.id}' 
                                            `).then(() => {
                                    message.channel.send("L'évènement a été desactivé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                            }
                        } else if (reaction.emoji.name === "2️⃣") {
                            let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")

                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                await this.connection.query(`
                                                UPDATE antiraidconfig SET ban = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                            `).then(() => {
                                    message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                    q.delete();
                                    CollectedWbSanc.delete();
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }
                        } else if (reaction.emoji.name == "3️⃣") {
                            tdata.edit(embed)

                            let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "oui") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET ban = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            } else if (lowercase == "non") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET ban = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            }

                            else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }

                        }
                        if (reaction.emoji.name === "❌") {
                            tdata.delete();

                            return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                        }
                    })
                } else if (reaction.emoji.name == "6️⃣") {
                    data_res.stop();
                    await tdata.reactions.removeAll()
                    embed.setDescription(`
                        \n
                        Modifier l'activité : 1️⃣
                        Modifier la sanctions : 2️⃣
                        Modifier whitelist by pass : 3️⃣
                    `)
                        .setTitle(`**ANTI_ROLE_ADD**`)
                    tdata.edit(embed);
                    reac4 = await tdata.react("1️⃣");
                    reac5 = await tdata.react("2️⃣");
                    reac6 = await tdata.react("3️⃣");
                    reac16 = await tdata.react("❌");
                    data_res2.on("collect", async (reaction) => {
                        if (reaction.emoji.name === "1️⃣") {
                            let q = await message.channel.send("L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbDel = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbDel = responseWbDel.first()
                            const lowercase = CollectedWbDel.content.toLowerCase()
                            if (lowercase == "on") {
                                await this.connection.query(`
                                    UPDATE antiraid SET roleAdd = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été activé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "off") {
                                await this.connection.query(`
                                    UPDATE antiraid SET roleAdd = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send("L'évènement a été desactivé")
                                    q.delete();
                                    CollectedWbDel.delete()
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                            }
                        } else if (reaction.emoji.name === "2️⃣") {
                            let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")

                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                await this.connection.query(`
                                    UPDATE antiraidconfig SET roleAdd = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                    q.delete();
                                    CollectedWbSanc.delete();
                                })
                            } else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }
                        } else if (reaction.emoji.name == "3️⃣") {
                            tdata.edit(embed)

                            let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                            const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                            const CollectedWbSanc = responseWbSanc.first()
                            const lowercase = CollectedWbSanc.content.toLowerCase()
                            if (lowercase != "cancel" && lowercase == "oui") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET roleAdd = '1' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            } else if (lowercase == "non") {
                                await this.connection.query(`
                                    UPDATE antiraidWlBp SET roleAdd = '0' WHERE guildId = '${message.guild.id}' 
                                `).then(() => {
                                    message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                    q.delete();
                                    CollectedWbSanc.delete()
                                })
                            }

                            else if (lowercase == "cancel") {
                                error = message.channel.send("L'opération a été annulé")
                                error.delete();
                                return
                            } else {
                                message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                            }

                        }
                        if (reaction.emoji.name === "❌") {
                            tdata.delete();
                            return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                        }
                    })
                }


                if (reaction.emoji.name === "➡") {

                    p0 = p0 + 5;
                    p1 = p1 + 5;

                    page++;

                    if (p1 > 11 + 5) {
                        return
                    }
                    if (p0 === undefined || p1 === undefined) {
                        return
                    }
                    embed.setDescription(`Page 2 est ouvert`)
                    tdata.edit(embed);
                    await tdata.reactions.removeAll()

                    let p2data = await message.channel.send("Chargement ...")
                    reac1 = await p2data.react("⬅");
                    reac4 = await p2data.react("1️⃣");
                    reac5 = await p2data.react("2️⃣");
                    reac6 = await p2data.react("3️⃣");
                    reac7 = await p2data.react("4️⃣");
                    reac8 = await p2data.react("5️⃣");
                    reac16 = await p2data.react("❌");

                    let p2Embed = new Discord.MessageEmbed();
                    p2Embed.setDescription(`
                    **1️⃣ ・CHANNEL_CREE**\n
                    Actif : **${isOnChCr}**
                    Sanction: **${channelCreate}**
                    Whitelist bypass : **${isOnWlChCr}**

                    **2️⃣ ・CHANNEL_MODIFIE**\n
                    Actif : **${isOnChUp}**
                    Sanction: **${channelUpdate}**
                    Whitelist bypass : **${isOnWlChUp}**
                    
                    **3️⃣ ・CHANNEL_SUPPRIME**\n
                    Actif : **${isOnChDel}**
                    Sanction: **${channelDelete}**
                    Whitelist bypass : **${isOnWlChDel}**
                    
                    **4️⃣・ANTI_SPAM**\n
                    Actif : **${isOnSpam}**
                    Sanction: **${spam}**
                    Rôle muet : **<@&${muteRoleId}>**
                    Whitelist bypass : **${isOnWlSpam}**
                    

                    **5️⃣・ANTI_BOT**\n
                    Actif : **${isOnBot}**
                    Sanction: **${bot}**
                    Whitelist bypass : **${isOnWlBot}**
                    
                    Page ${page} / 2
                    `)
                        .setTitle(`Configuration des évènements (10)`)
                        .setColor(`${color}`)
                    p2data.edit(" ", p2Embed)
                    const data_res3 = p2data.createReactionCollector((reaction, user) => user.id === message.author.id);
                    const data_res4 = p2data.createReactionCollector((reaction, user) => user.id === message.author.id);
                    data_res3.on("collect", async (reaction) => {
                        if (reaction.emoji.name === "⬅") {
                            p0 = p0 - 5;
                            p1 = p1 - 5;
                            page = page - 1

                            if (p0 < 0) {
                                return
                            }
                            if (p0 === undefined || p1 === undefined) {
                                return
                            }
                            p2data.delete();
                            embed.setDescription(`
                            **1️⃣ ・WEBHOOK_CREE**\n
                            Actif : **${isOnWbCr}**
                            Sanction: **${webhookCreate}**
                            Whitelist bypass : **${isOnWlWbCr}**
                            
                            **2️⃣・ROLE_CREE**\n
                            Actif : **${isOnRlCr}**
                            Sanction: **${roleCreate}**
                            Whitelist bypass : **${isOnWlRlCr}**

                            **3️⃣・ROLE_MODIFIE**\n
                            Actif : **${isOnRlUp}**
                            Sanction: **${roleUpdate}**
                            Whitelist bypass : **${isOnWlRlUp}**

                            **4️⃣・ROLE_SUPPRIME**\n
                            Actif : **${isOnRlDel}**
                            Sanction: **${roleDelete}**
                            Whitelist bypass : **${isOnWlRlDel}**

                            **5️⃣・ANTI_MASSBAN**\n
                            Actif : **${isOnBan}**
                            Sanction: **${ban}**
                            Whitelist bypass : **${isOnWlBan}**

                            **6️⃣・ANTI_ROLE_ADD**\n
                            Actif : **${isOnroleAdd}**
                            Sanction: **${roleAdd}**
                            Whitelist bypass : **${isOnWlroleAdd}**

                            Page ${page} / 2

                                            `)
                            tdata.edit(embed);
                            reac1 = await tdata.react("⬅");
                            reac4 = await tdata.react("1️⃣");
                            reac5 = await tdata.react("2️⃣");
                            reac6 = await tdata.react("3️⃣");
                            reac7 = await tdata.react("4️⃣");
                            reac8 = await tdata.react("5️⃣");
                            reac9 = await tdata.react("6️⃣");
                            reac15 = await tdata.react("➡");
                            reac16 = await tdata.react("❌");
                        }
                        if (reaction.emoji.name === "❌") {
                            p2data.delete()
                            tdata.delete();
                            return message.channel.send("Configuration annulé")
                        }
                        if (reaction.emoji.name === "1️⃣") {
                            data_res3.stop();
                            await p2data.reactions.removeAll()
                            embed.setDescription(`
                                            \n
                                            Modifier l'activité : 1️⃣
                                            Modifier la sanctions : 2️⃣
                                            Modifier whitelist by pass : 3️⃣
                                        `)
                                .setTitle(`**CHANNEL_CREE**`)
                            p2data.edit(embed);
                            reac4 = await p2data.react("1️⃣");
                            reac5 = await p2data.react("2️⃣");
                            reac6 = await p2data.react("3️⃣");

                            reac16 = await p2data.react("❌");
                            data_res4.on("collect", async (reaction) => {
                                if (reaction.emoji.name === "1️⃣") {
                                    p2data.edit(embed)
                                    let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")

                                    const responseWbCr = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbCr = responseWbCr.first()
                                    const lowercase = CollectedWbCr.content.toLowerCase()
                                    if (lowercase == "on") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET channelCreate = '1' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été activé")
                                            q.delete();
                                            CollectedWbCr.delete()
                                        })
                                    } else if (lowercase == "off") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET channelCreate = '0' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été desactivé")
                                            q.delete();
                                            CollectedWbCr.delete()
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                                    }
                                }


                                if (reaction.emoji.name === "2️⃣") {
                                    p2data.edit(embed)

                                    let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                        await this.connection.query(`
                                                        UPDATE antiraidconfig SET channelCreate = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                                    }

                                }  else if (reaction.emoji.name == "3️⃣") {
                                    tdata.edit(embed)
        
                                    let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "oui") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET channelCreate = '1' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    } else if (lowercase == "non") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET channelCreate = '0' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    }
        
                                    else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                                    }
        
                                }else
                                    if (reaction.emoji.name === "❌") {
                                        tdata.delete();
                                        p2data.delete();
                                        return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                                    }
                            })
                        } else if (reaction.emoji.name == "2️⃣") {
                            data_res3.stop();
                            await p2data.reactions.removeAll()
                            embed.setDescription(`
                                            \n
                                            Modifier l'activité : 1️⃣
                                            Modifier la sanctions : 2️⃣
                                            Modifier whitelist by pass : 3️⃣
                                        `)
                                .setTitle(`**CHANNEL_MODIFIE**`)
                            p2data.edit(embed);
                            reac4 = await p2data.react("1️⃣");
                            reac5 = await p2data.react("2️⃣");
                            reac6 = await p2data.react("3️⃣");
                            reac16 = await p2data.react("❌");
                            data_res4.on("collect", async (reaction) => {
                                if (reaction.emoji.name === "1️⃣") {
                                    let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbUp = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbUp = responseWbUp.first()
                                    const lowercase = CollectedWbUp.content.toLowerCase()
                                    if (lowercase == "on") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET channelUpdate = '1' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été activé")
                                            q.delete();
                                            CollectedWbUp.delete()
                                        })
                                    } else if (lowercase == "off") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET channelUpdate = '0' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été desactivé")
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                                    }

                                } else if (reaction.emoji.name === "2️⃣") {
                                    let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                        await this.connection.query(`
                                                        UPDATE antiraidconfig SET channelUpdate = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                                    }
                                } else if (reaction.emoji.name == "3️⃣") {
                                    tdata.edit(embed)
        
                                    let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "oui") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET channelUpdate = '1' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    } else if (lowercase == "non") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET channelUpdate = '0' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    }
        
                                    else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                                    }
        
                                }
                                if (reaction.emoji.name === "❌") {
                                    tdata.delete();

                                    p2data.delete();
                                    return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                                }
                            })
                        } else if (reaction.emoji.name == "3️⃣") {
                            data_res3.stop();
                            await p2data.reactions.removeAll()
                            embed.setDescription(`
                                            \n
                                            Modifier l'activité : 1️⃣
                                            Modifier la sanctions : 2️⃣
                                            Modifier whitelist by pass : 3️⃣
                                        `)
                                .setTitle(`**CHANNEL_SUPPRIME**`)
                            p2data.edit(embed);
                            reac4 = await p2data.react("1️⃣");
                            reac5 = await p2data.react("2️⃣");
                            reac6 = await p2data.react("3️⃣");
                            reac16 = await p2data.react("❌");
                            data_res4.on("collect", async (reaction) => {
                                if (reaction.emoji.name === "1️⃣") {
                                    let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbDel = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbDel = responseWbDel.first()
                                    const lowercase = CollectedWbDel.content.toLowerCase()
                                    if (lowercase == "on") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET channelDelete = '1' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été activé")
                                            q.delete();
                                            CollectedWbDel.delete()
                                        })
                                    } else if (lowercase == "off") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET channelDelete = '0' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été desactivé")
                                            q.delete();
                                            CollectedWbDel.delete()
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                                    }
                                } else if (reaction.emoji.name === "2️⃣") {
                                    let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")

                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                        await this.connection.query(`
                                                        UPDATE antiraidconfig SET channelDelete = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                            q.delete();
                                            CollectedWbSanc.delete();
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                                    }
                                } else if (reaction.emoji.name == "3️⃣") {
                                    tdata.edit(embed)
        
                                    let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "oui") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET channelDelete = '1' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    } else if (lowercase == "non") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET channelDelete = '0' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    }
        
                                    else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                                    }
        
                                }
                                if (reaction.emoji.name === "❌") {
                                    tdata.delete();

                                    p2data.delete();
                                    return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                                }
                            })
                        } else if (reaction.emoji.name == "4️⃣") {
                            data_res3.stop();
                            await p2data.reactions.removeAll()
                            embed.setDescription(`
                                            \n
                                            Modifier l'activité : 1️⃣
                                            Modifier la sanctions : 2️⃣
                                            Modifier le rôle muet : 3️⃣
                                            Modifier whitelist by pass : 4️⃣
                                        `)
                                .setTitle(`**ANTI_SPAM**`)
                            p2data.edit(embed);
                            reac4 = await p2data.react("1️⃣");
                            reac5 = await p2data.react("2️⃣");
                            reac6 = await p2data.react("3️⃣");
                            reac7 = await p2data.react("4️⃣");
                            reac16 = await p2data.react("❌");
                            data_res4.on("collect", async (reaction) => {
                                if (reaction.emoji.name === "1️⃣") {
                                    let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbDel = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbDel = responseWbDel.first()
                                    const lowercase = CollectedWbDel.content.toLowerCase()
                                    if (lowercase == "on") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET spam = '1' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été activé")
                                            q.delete();
                                            CollectedWbDel.delete()
                                        })
                                    } else if (lowercase == "off") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET spam = '0' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été desactivé")
                                            q.delete();
                                            CollectedWbDel.delete()
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                                    }
                                } else if (reaction.emoji.name === "2️⃣") {
                                    let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank /mute`\)!(timeout dans 30s & \`cancel\` pour annuler)")

                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank" || lowercase == "mute") {
                                        await this.connection.query(`
                                                        UPDATE antiraidconfig SET spam = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                            q.delete();
                                            CollectedWbSanc.delete();
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel /mute\``)
                                    }
                                } else if (reaction.emoji.name === "3️⃣") {
                                    let q = await message.channel.send("Quelle est le role muet ? (`\mention`\)!(timeout dans 30s & \`cancel\` pour annuler)")

                                    const responseRole = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedRole = responseRole.first()
                                    const lowercase = CollectedRole.content.toLowerCase()


                                    const muteRole = CollectedRole.mentions.roles.first();
                                    const mureRoleId = muteRole.id;
                                    if (lowercase != "cancel" && muteRole) {
                                        await this.connection.query(`
                                                        UPDATE guildConfig SET spam = '${mureRoleId}' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send(`Le role à été mis à jour pour \`${muteRole}\` `)
                                            q.delete();
                                            CollectedRole.delete();
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`mention le role mute / cancel\``)
                                    }
                                } else if (reaction.emoji.name == "4️⃣") {
                                    tdata.edit(embed)
        
                                    let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "oui") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET spam = '1' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    } else if (lowercase == "non") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET spam = '0' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    }
        
                                    else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                                    }
        
                                }
                                if (reaction.emoji.name === "❌") {
                                    tdata.delete();

                                    p2data.delete();
                                    return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                                }
                            })
                        
                        } else if (reaction.emoji.name == "5️⃣") {
                            data_res3.stop();
                            await p2data.reactions.removeAll()
                            embed.setDescription(`
                                            \n
                                            Modifier l'activité : 1️⃣
                                            Modifier la sanctions : 2️⃣
                                            Modifier whitelist by pass : 3️⃣
                                        `)
                                .setTitle(`**ANTI_BOT**`)
                            p2data.edit(embed);
                            reac4 = await p2data.react("1️⃣");
                            reac5 = await p2data.react("2️⃣");
                            reac6 = await p2data.react("3️⃣");
                            reac16 = await p2data.react("❌");
                            data_res4.on("collect", async (reaction) => {
                                if (reaction.emoji.name === "1️⃣") {
                                    let q = await message.channel.send("<:720681705219817534:780540043033837622> \`SUCCÈS\` L'événement doit être activé sur `\ on`\  ou `\ off`\ !(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbDel = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbDel = responseWbDel.first()
                                    const lowercase = CollectedWbDel.content.toLowerCase()
                                    if (lowercase == "on") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET bot = '1' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été activé")
                                            q.delete();
                                            CollectedWbDel.delete()
                                        })
                                    } else if (lowercase == "off") {
                                        await this.connection.query(`
                                                        UPDATE antiraid SET bot = '0' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send("L'évènement a été desactivé")
                                            q.delete();
                                            CollectedWbDel.delete()
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`on / off / cancel\``)
                                    }
                                } else if (reaction.emoji.name === "2️⃣") {
                                    let q = await message.channel.send(" Quelle sanction voulez-vous mettre ? (`\ ban / kick / unrank`\)!(timeout dans 30s & \`cancel\` pour annuler)")

                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "ban" || lowercase == "kick" || lowercase == "unrank") {
                                        await this.connection.query(`
                                                        UPDATE antiraidconfig SET bot = '${lowercase}' WHERE guildId = '${message.guild.id}' 
                                                    `).then(() => {
                                            message.channel.send(`La sanction à été mis à jour pour \`${lowercase}\` `)
                                            q.delete();
                                            CollectedWbSanc.delete();
                                        })
                                    } else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                                    }
                                } else if (reaction.emoji.name == "3️⃣") {
                                    tdata.edit(embed)
        
                                    let q = await message.channel.send(" Voulez-vous que les whitelist puisse by pass cette évènement ? (`\oui/non`\)!(timeout dans 30s & \`cancel\` pour annuler)")
                                    const responseWbSanc = await message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, timeout: 30000 }).catch(() => { message.channel.send("Opération annulé pas de réponse après 30s") })
                                    const CollectedWbSanc = responseWbSanc.first()
                                    const lowercase = CollectedWbSanc.content.toLowerCase()
                                    if (lowercase != "cancel" && lowercase == "oui") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET bot = '1' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists peuvent maintenant bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    } else if (lowercase == "non") {
                                        await this.connection.query(`
                                            UPDATE antiraidWlBp SET bot = '0' WHERE guildId = '${message.guild.id}' 
                                        `).then(() => {
                                            message.channel.send(`Les whitelists ne peuvent pas bypass l'évènement `)
                                            q.delete();
                                            CollectedWbSanc.delete()
                                        })
                                    }
        
                                    else if (lowercase == "cancel") {
                                        error = message.channel.send("L'opération a été annulé")
                                        error.delete();
                                        return
                                    } else {
                                        message.channel.send(`Vous devez choisir entre \`ban / kick / unrank / cancel\``)
                                    }
        
                                }
                                if (reaction.emoji.name === "❌") {
                                    tdata.delete();

                                    p2data.delete();
                                    return await message.channel.send(`Si c'est volontaire veuillez executez la commande a nouveau sinon merci d'avoir configurer l'évènement`)
                                }
                            })
                        }
                    })

                }
                if (reaction.emoji.name === "❌") {
                    data_res.stop()

                    return tdata.delete()
                }

                await reaction.users.remove(message.author.id);





            })








        }
    }
}
embedsColor(guildEmbedColor);
