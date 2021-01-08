const parseDuration = require('parse-duration'),
    humanizeDuration = require('humanize-duration')
    var Discord = require('discord.js');
    const { MessageEmbed } = require("discord.js");

    
let perm = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(":x: **Tu n'a pas la permission**");

let men = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(":label: **Veuillez mentionner un membre !**")

let errkick = new Discord.MessageEmbed()
.setColor("RED")
.setDescription("🤬 **Impossible de unmute !**")



module.exports = {
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(perm);
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(men)
        if (!member.manageable) return message.channel.send(errkick)
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')

        let unmut = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`:clock1:  ${member} **a été unmute.**`)

        await member.roles.remove(muteRole)
        message.channel.send(unmut)



    try {
        member.send(embed);
    } catch(err) {
        console.warn(err);
    }
    }
    
}
