let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'poll',
    run: async (client, message) => {
        let args = message.content.substring(prefix.length).split(" ");
        message.delete();

        switch (args[0]) {
      
            case 'poll':
      
                const pollEmbed = new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("**Créer un sondage !**")
                    .setDescription("t!poll");
      
                if (!args[1]) {
                    message.channel.send(pollEmbed);
                    break;
      
                }
                let msgArgs = args.slice(1).join(" ");
      
                const pollMessage = new Discord.MessageEmbed()
                    .setColor("BLUE")
                    .setTitle("📊 __Sondage__ ")
                    .addField("**Message :**", msgArgs)
                    .setFooter(message.guild.name);
                
      
      
                    message.channel.send(pollMessage).then(messageReaction => {
                    messageReaction.react("✔️");
                    messageReaction.react("➖");
                    messageReaction.react("❌");
                    message.delete(100).catch(console.error);
                    });
                    break;
      
        }
    }}