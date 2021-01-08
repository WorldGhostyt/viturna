const Discord = require('discord.js');
const moment = require("moment");
const client = new Discord.Client();
require("moment-duration-format");
module.exports = {
    name: 'stats',
    description: "Stats",
    run: async (client, message, args) => {
          const duration = moment.duration(client.uptime).format(" D [jours], H [hrs], m [mins], s [secs]");
          const createatb = moment.utc(client.user.createdAt).format("dddd, D MMMM, YYYY")

          const statEmbed = new Discord.MessageEmbed()
          .setTitle("**Statistiques • Viturna**")
          .setColor("RANDOM")
          .setDescription(`Créateur  : **WorldGhost*YT#9290** \n Mem Usage  : **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB** \n Bot ON depuis : **${duration}** \n Bot Créer le : **${createatb}**`)
          .setFooter("🤖 - Viturna#9289")
          message.channel.send(statEmbed)
        }
}