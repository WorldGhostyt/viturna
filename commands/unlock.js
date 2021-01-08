var Discord = require('discord.js');
let prefix = 'v!'

let perm = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(":x: **Tu n'a pas la permission**");

let msgunlock = new Discord.MessageEmbed()
.setColor("GREEN")
.setDescription(":unlock: **Le salon est débloqué par la modération !**");

exports.run = async(client, message) => {
    let args = message.content.slice(prefix.length).trim().split(/ + /g);
  let cmd = args.shift().toLowerCase();
  if(cmd === 'unlock') {
      if(!message.member.permissions.has('BAN_MEMBERS')) return message.reply(perm);
      message.channel.createOverwrite('711284811922407485', {
          SEND_MESSAGES: null
      }, `unlock requested`);
  } if(!message.member.permissions.has('BAN_MEMBERS')) return;
  message.channel.createOverwrite('726349788315910206', {
      SEND_MESSAGES: null
  }, `unlock requested`);
  if(!message.member.permissions.has('BAN_MEMBERS')) return;
  message.channel.createOverwrite('711527288243748904', {
      SEND_MESSAGES: null
  }, `unlock requested`);
  message.channel.send(msgunlock)
}