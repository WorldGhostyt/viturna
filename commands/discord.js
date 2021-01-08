let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'discord',
    run: async (client, message) => {
        if (message.guild) {
            let embed = new Discord.MessageEmbed()
            .setTitle('Viturna - Discord')
            .setColor('7289da')
            .addField("<:discord:794942876051439626> Voici le lien du discord ! ","\nhttps://discord.gg/Pb2XgRG")
            .setFooter('⚒️ Créer par WorldGhost | 📄 Page discord')
            message.channel.send(embed);
            message.delete();
        }
    }
}

