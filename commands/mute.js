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
.setDescription("🤬 **Impossible de mute !**")

let durée = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(":hourglass: **Veuillez indiquer une durée valide !**")

module.exports = {
    run: async (client, message, args) => {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(perm);
        const member = message.mentions.members.first()
        if (!member) return message.channel.send(men)
        if (member.id === message.guild.ownerID) return message.channel.send(errkick)
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(errkick)
        if (!member.manageable) return message.channel.send(errkick)
        const duration = parseDuration(args[1])
        if (!duration) return message.channel.send(durée)
        const reason = args.slice(2).join(' ') || 'Aucune raison'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        let mut = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`:clock1:  ${member} **a été mute pendant ${humanizeDuration(duration, {language: 'fr'})} par ${message.author}**`)

        let unmut = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`:clock1:  ${member} **a été unmute.**`)

        await member.roles.add(muteRole)
        message.channel.send(mut)
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            message.channel.send(unmut)
        }, duration)

    var channel = message.guild.channels.cache.find(c => c.name === '😡┆sanction');

    var log = new Discord.MessageEmbed()
    .setTitle('🤖 Mute')
    .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .addField(':mute: Utilisateur:', member, true)
    .addField(':telephone_receiver: Par :', message.author, true)
    .addField(':page_facing_up: Raison :', reason)
    .addField(':clock1: Expire dans :', `${humanizeDuration(duration, {language: 'fr'})}`)
    .setColor("RED")
    channel.send(log);

    var embed = new Discord.MessageEmbed()
    .setTitle(':mute: Tu est mute sur le serveur Viturna !')
    .addField(':page_facing_up: Raison :', reason)
    .addField(':clock1: Expire dans :', `${humanizeDuration(duration, {language: 'fr'})}`)
    .setColor("RED");

    try {
        member.send(embed);
    } catch(err) {
        console.warn(err);
    }
    }
    
}
