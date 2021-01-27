const discord = require('discord.js')

module.exports = {
    info: {
        name: "support",
        description: "To show all commands",
        usage: "[command]",
        aliases: ["support", "server", ""]
    },

    run: async function(client, message, args){

        const embed = new discord.MessageEmbed()
            .setAuthor(`Serveur d'assistance`, `https://cdn.discordapp.com/icons/769897355658657793/a_4987a2ae640c32fff7c1e0b94bd3f11b.gif`)
            .setColor(`BLUE`)
            .setTimestamp()
         //   .setThumbnail(`https://images-ext-1.discordapp.net/external/io8pRqFGLz1MelORzIv2tAiPB3uulaHCX_QH7XEK0y4/%3Fwidth%3D588%26height%3D588/https/media.discordapp.net/attachments/780528735345836112/780725370584432690/c1258e849d166242fdf634d67cf45755cc5af310r1-1200-1200v2_uhq.jpg`)
            .setFooter("Serveur d'assistance", `https://cdn.discordapp.com/icons/769897355658657793/a_4987a2ae640c32fff7c1e0b94bd3f11b.gif`)
            .setDescription(`[\`Clique ici\`](https://discord.gg/GEhdsMBqeT)`)
      message.channel.send(embed); 
    }
}
