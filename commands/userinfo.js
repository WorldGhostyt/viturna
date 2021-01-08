const Discord = require("discord.js");
const moment = require("moment");
const client = new Discord.Client();
require("moment-duration-format");

module.exports.run =async (client, message, args) => {
  let [month, date, year]    = new Date().toLocaleDateString("en-FR").split("/")
    let inline = true
    let resence = true
    const status = {
        online: ":green_circle: En ligne",
        idle: ":orange_circle: Absent ",
        dnd: ":red_circle: Ne pas déranger",
        offline: ":white_circle: Hors-ligne/Invisible",
        stream: ":purple_circle: En Stream"
      }
        
const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
let target = message.mentions.users.first() || message.author
const createcompte = moment.utc(member.user.createdAt).format("dddd, D MMMM, YYYY")

if (member.user.bot === true) {
    bot = ":white_check_mark: Oui";
  } else {
    bot = ":x: Non";
  }

            let embed = new Discord.MessageEmbed()
                //.setAuthor(member.user.username)
                .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setColor("#00ff00")
                .addField(":busts_in_silhouette: Pseudo", `${member.user.tag}`, inline)
                .addField(":gear: ID", member.user.id, inline)
                .addField(":paperclip: Surnom", `${member.nickname !== null ? `${member.nickname}` : ":x: Aucun"}`, true)
                .addField(":robot:  Bot", `${bot}`,inline, true)
                .addField(":yellow_circle:  Status", `${status[member.user.presence.status]}`, inline, true)
                .addField(":video_game: Joue à", `${member.presence.game ? member.presence.game.name : ':x: Ne joue pas'}`, true)
                .addField(':pushpin: Rôle le plus élevé', member.roles.highest, true)
                .addField(":paperclip: Compte créé le", createcompte)
                .addField(':inbox_tray: A rejoint le serveur le', `${moment(member.joinedAt).format('dddd D MMMM YYYY')}`, true)
                .setFooter(`Information sur ${member.user.username}`)
                .setTimestamp()
    
            message.channel.send(embed);

            message.delete();
    }

    module.exports.help = {
        name: "userinfo"
    }