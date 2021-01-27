const Discord = require('discord.js')



module.exports = class setProfileCommand extends BaseCommand {
    constructor(){
        super('setprofile', 'botOwner', [])
    }

    async run(client, message, args) {
        const sender = message.author.id;


        let msg = await message.channel.send("Chargement ...")
        const embed = new Discord.MessageEmbed()

        embed.setTitle(`**__Paramètres du profile du bot__**`)
        embed.setTimestamp()
        embed.setColor(`BLACK`)
        embed.setFooter(`${client.user.username}`)

        embed.setDescription(`🇦・Changer le nom d'utilisateur\nActuel: ${client.user.username}\n\n🇧・Changer l'avatar\nActuel: [Clique ici](${client.user.displayAvatarURL()})\n\n🇨・Changer l'activitée\nActuel: ${client.user.presence.activities[0] ? `${activity[client.user.presence.activities[0].type]} ${client.user.presence.activities[0].name}` : `:x:`}`)

        await msg.react('🇦')
        await msg.react('🇧')
        await msg.react('🇨')
        await msg.react('❌').then(async (m) => {

            msg.edit(" ", embed)

            let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
            collector.on("collect", async (reaction, user) => {
                if (reaction._emoji.name === "🇦") {
                    updateEmbed()
                    let question = await message.channel.send("Quel nom voulez-vous attribuez au bot ?",)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        client.user.setUsername(collected.first().content).then(async () => {
                            updateEmbed()
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            message.channel.send(":x: | Je n'ai pas pu changer mon pseudo :/").then((mm) => mm.delete({
                                timeout: 5000
                            }));
                        })
                    })
                }
                if (reaction._emoji.name === "🇧") {
                    let question = await message.channel.send("Quel avatar voulez-vous attribuez au bot ?")
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        client.user.setAvatar(collected.first().content).then(async () => {
                            updateEmbed()
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            message.channel.send(":x: | Je n'ai pas pu changer mon avatar car le lien est invalide :/").then((mm) => mm.delete({
                                timeout: 5000
                            }));
                        })
                    })
                }

                if (reaction._emoji.name === "🇨") {
                    let question = await message.channel.send("Quel type d'activité voulez-vous attribuez au bot (\`play\`, \`stream\`, \`watch\`, \`listen\`)")
                    const filter = m => message.author.id === m.author.id;

                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        let type = ""

                        if (collected.first().content.toLowerCase().startsWith("play")) {
                            type = "PLAYING"
                        } else if (collected.first().content.toLowerCase().startsWith("stream")) {
                            type = "STREAMING"
                        } else if (collected.first().content.toLowerCase().startsWith("listen")) {
                            type = "LISTENING"
                        } else if (collected.first().content.toLowerCase().startsWith("watch")) {
                            type = "WATCHING"
                        } else {
                            return message.channel.send(":x: | Type d'activité invalide")
                        }

                        let question2 = await message.channel.send("Quel nom voulez-vous attribuez à l'activité du bot ?")

                        message.channel.awaitMessages(filter, {
                            max: 1,
                            time: 60000,
                            errors: ['time']
                        }).then(async (collected2) => {
                            collected2.first().delete()
                            question2.delete()

                            client.user.setActivity(collected2.first().content, { type: type, url: "https://www.twitch.tv/monstercat" }).then(async (a) => {
                                updateEmbed()
                            })
                        });
                    })
                }

                if (reaction._emoji.name === "❌") {
                    msg.delete()
                }
                await reaction.users.remove(message.author.id);
            })

            function updateEmbed() {
                embed.setDescription("Permet de changer les paramètres du bot")
                msg.edit(embed)
            }
        });
    }
}


        
      