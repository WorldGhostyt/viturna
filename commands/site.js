let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'site',
    run: async (client, message) => {
        if (message.guild) {
            let embed = new Discord.MessageEmbed()
            .setTitle('Viturna - Site')
            .setColor('7289da')
            .addField("🖥️ Retrouve moi sur mon site ! ","\nhttps://thomasriqpro.wixsite.com/thomasriqgraphic")
            .setFooter('⚒️ Créer par WorldGhost | 📄 Page site')
            message.channel.send(embed);
            message.delete();
        }
    }
}