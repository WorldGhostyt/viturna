let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'sug',
    run: async (client, message) => {
        let args = message.content.substring(prefix.length).split(" ");
        message.delete();

        switch (args[0]) {
      
            case 'sug':
                
                const pollEmbed = new Discord.MessageEmbed()
                    .setColor(0xFFC300)
                    .setTitle("**💡 Suggestion !**")
                    .setDescription("t!sug");
      
                if (!args[1]) {
                    message.channel.send(pollEmbed);
                    break;
      
                }
                let msgArgs = args.slice(1).join(" ");
      
                const pollMessage = new Discord.MessageEmbed()
                    .setColor(0xFFC300)
                    .setTitle("💡 __Suggestion__ ")
                    .setDescription("A la communauté de choisir si votre idée est bonne ou non !")
                    .addField("**Idée :**", msgArgs)
                    .setFooter(message.guild.name);
                
      
      
                    message.channel.send(pollMessage).then(messageReaction => {
                    messageReaction.react("✔️");
                    messageReaction.react("➖");
                    messageReaction.react("❌");
                    message.delete(100).catch(console.error);
                    });
                    break;
      
        }
    }
}