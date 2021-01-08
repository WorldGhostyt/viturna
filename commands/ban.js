var Discord = require('discord.js');

let perm = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(":x: **Tu n'a pas la permission**");

let men = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription(":label: **Veuillez mentionner un membre !**")

let raison = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("📝 **Veuillez ajouter une raison !**")

let errkick = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("🤬 **Impossible de ban !**")

let nothere = new Discord.MessageEmbed()
    .setColor("RED")
    .setDescription("❌ **Membre non présent sur le serveur !**")

exports.run = async(client, msg, args) => {
    if(!msg.member.hasPermission('BAN_MEMBERS')) return msg.reply(perm);

    var user = msg.mentions.users.first();
    if(!user) return msg.reply(men);

    var member;

    try {
        member = await msg.guild.members.fetch(user);
    } catch(err) {
        member = null;
    }

    if(member){
        if(member.hasPermission('MANAGE_MESSAGES')) return msg.reply(errkick);
    }
let msgban = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`:outbox_tray:  ${member} **est ban par** ${msg.author}`)
    var reason = args.splice(1).join(' ');
    if(!reason) return msg.reply(raison);

    var channel = msg.guild.channels.cache.find(c => c.name === '😡┆sanction');

    var log = new Discord.MessageEmbed()
    .setTitle('🤖 Ban')
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .addField(':boot: Utilisateur  :', user, true)
    .addField(':telephone_receiver: Par :', msg.author, true)
    .addField(':page_facing_up: Raison :', reason)
    .setColor("RED")
    channel.send(log);

    msg.guild.members.ban(user); // This should not be user.id like I said in my video. I made a mistake. Sorry! :)

    msg.channel.send(msgban);
}