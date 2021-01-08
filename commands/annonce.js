let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'annonce',
    run: async (client, message) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(perm);
        let args = message.content.substring(prefix.length).split(" ");
        message.delete();

        switch (args[0]) {
      
            case 'annonce':
      
                const annonceEmbed = new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle("**Créer une annonce !**")
                    .setDescription("v!annonce");
      
                if (!args[1]) {
                    message.channel.send(annonceEmbed);
                    break;
      
                }
                let msgArgs = args.slice(1).join(" ");
      
                const annonceMessage = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle(":loudspeaker: **__Annonce__**")
                    .setDescription(msgArgs)
                    .setFooter("🎨 - Viturna");
                
      
      
                    message.channel.send(annonceMessage).then(messageReaction => {
                    messageReaction.react("✅");
                    message.delete(100).catch(console.error);
                    });
                    break;
      
        }
    }}