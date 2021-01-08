let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'pub',
    run: async (client, message) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
        if (message.guild) {
            let embed = new Discord.MessageEmbed()
            .setColor("GREEN")
                    .setDescription(`➡️  **Si vous quittez le serveur, vos publicités seront supprimées.** \n➡️  **Salon vérifié par ${message.author.toString()}** `)
            message.channel.send(embed);
            message.delete();
        }
    }
}