let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'paypal',
    run: async (client, message) => {
        if (message.guild) {
            let embed = new Discord.MessageEmbed()
            .setTitle('Viturna - Paypal')
            .setColor('7289da')
            .addField("<:paypal:794943234681995305> *Afin de me soutenir dans ma passion, vous pouvez me faire un* **don** *!* ","https://paypal.me/WorldGhost")
            .setFooter('⚒️ Créer par WorldGhost | 📄 Page paypal')
            message.channel.send(embed);
            message.delete();
        }
    }
}

