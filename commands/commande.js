let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'commande',
    run: async (client, message) => {
        if (message.guild) {
            let embed = new Discord.MessageEmbed()
            .setTitle('Viturna - Commande')
            .setColor('7289da')
            .addField("🎨 *Comment passer* **commande** *auprès de moi ?* ","\n<:discord:794942876051439626> *Il suffit de se rendre dans le salon* **<#712313410749988876>** *et de suivre les instructions !*")
            .setFooter('⚒️ Créer par WorldGhost | 📄 Page commande')
            message.channel.send(embed);
            message.delete();
        }
    }
}