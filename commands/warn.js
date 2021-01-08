var Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");

let perm = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(":x: **Tu n'a pas la permission**");

let men = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(":label: **Veuillez mentionner un membre !**")

let raison = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("📝 **Veuillez ajouter une raison !**")


let nothere = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("❌ **Membre non présent sur le serveur !**")

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.reply(perm);

    var user = msg.mentions.users.first();
    if(!user) return msg.reply(men);

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(!member) return msg.reply(nothere);

    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply(raison);

    var channel = msg.guild.channels.cache.find(c => c.name === '😡┆sanction');

    var log = new Discord.MessageEmbed()
    .setTitle('🤖  Warn')
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .addField(':warning:  Utilisateur :', user, true)
    .addField(':telephone_receiver: Par :', msg.author, true)
    .addField(':page_facing_up: Raison :', reason)
    .setColor("RED")
    channel.send(log);
 
    var embed = new Discord.MessageEmbed()
    .setTitle('📞 Tu est warn sur le serveur Viturna !')
    .addField(':page_facing_up: Raison :', reason)
    .setColor("RED");

    try {
        user.send(embed);
    } catch(err) {
        console.warn(err);
    }
    let msgwarn = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`:warning: ${user}** est warn par ${msg.author}**!`)

    msg.channel.send(msgwarn);
}