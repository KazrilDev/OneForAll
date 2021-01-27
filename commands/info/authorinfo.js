const discord = require('discord.js')


module.exports = {
    info: {
        name: "owner",
        description: "To show all commands",
        usage: "[command]",
        aliases: ["author-info", "author", "info-author"]
    },

    run: async function(client, message, args){
        const color = guildEmbedColor.get(message.guild.id)
        const embed = new discord.MessageEmbed()
         .setTimestamp()
         .setColor(`BLUE`)
            .setThumbnail(`https://images-ext-1.discordapp.net/external/nCpz7nwdwmOXXEHUTNjeJqnmyItda93E0NbXGpKvjdE/https/cdn.discordapp.com/icons/769897355658657793/a_4987a2ae640c32fff7c1e0b94bd3f11b.gif`)
            .setFooter("Owner", message.author.displayAvatarURL({ dynamic: true }))
         .setDescription(`__**4Music Blue**__\n\n*4Music Blue est un bot appartenant à* \`>_Kazril#9999\`\n\n**Développeurs :**\n[>_Kazril#9999](https://discord.gg/GEhdsMBqeT) -> Bot & Host\n[! Kazack¹³#0013](https://discord.gg/GEhdsMBqeT) -> Dev Site\n[21h27#2127](https://discord.gg/GEhdsMBqeT) -> Service Marketing`)
         message.channel.send(embed)
    }
}

