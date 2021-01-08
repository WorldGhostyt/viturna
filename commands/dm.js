let Discord = require('discord.js');

let perm = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(":x: **Tu n'a pas la permission**");

let men = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(":label: **Veuillez mentionner un membre !**")

let errmsg = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(":incoming_envelope:  **Vous n'avez pas spécifié votre message**")

let err = new Discord.MessageEmbed()
.setColor("RED")
.setDescription("🤬 **Cet utilisateur n'a pas pu recevoir de DM !**")


module.exports = {
    name: "dm",
    run: async (client, message, args) => {
      if (!message.member.permissions.has("MANAGE_MESSAGES"))
        return message.channel.send(perm);
      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

      if (!user)
        return message.channel.send(men);
      if (!args.slice(1).join(" "))
        return message.channel.send(errmsg);
      user.user

        .send(args.slice(1).join(" "))
        .catch(() => message.channel.send(err))
        .then(() => message.channel.send(`:white_check_mark: **Message envoyé à ${user.user.tag}**`))
      }
    }
    
  