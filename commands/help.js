let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'help',
    run: async (client, message) => {
        if (message.guild) {
            message.channel.send(':incoming_envelope:  **Check tes DM !**');
            message.delete();
            let embed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }), 'https://discord.gg/Pb2XgRG')
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle('Viturna - Help')
            .setColor('7289da')
            .setDescription(`Le bot a été créé afin d'aider les membres du serveur de Viturna !\nRetrouvez ci-dessous les commandes de ce bot ! \nBot dev par WorldGhost*YT#9290`)
            .addField('**Pages Help** :', '**Pages 2**: :information_source: Commandes Général \n**Pages 3**: :police_officer: Commandes Modération')
            .setFooter('Créer par WorldGhost | Pages 1/3')
            message.author.send(embed);
            }
        if (!message.guild) {
            let embed = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }), 'https://discord.gg/Pb2XgRG')
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTitle('Viturna - Help')
            .setColor('7289da')
            .setDescription(`Le bot a été créé afin d'aider les membres du serveur de Viturna !\nRetrouvez ci-dessous les commandes de ce bot ! \nBot dev par WorldGhost*YT#9290`)
            .addField('**Pages Help** :', '**Pages 2**: :information_source: Commandes Général \n**Pages 3**: :police_officer: Commandes Modération \n**Pages 4**: :ticket: Commandes Tickets')
            .setFooter('Créer par WorldGhost | Pages 1/3')
            message.author.send(embed);
            }
        if (message.guild) {
                let embed2 = new Discord.MessageEmbed()
                .setColor('00e4d2')
                .addField(':information_source: Commandes Général\n', '\n\n\`v!ping\`: Pour obtenir votre ping \n\n \`v!info\`: Pour retrouver ma présentation \n\n \`v!insta\`: Pour obtenir le lien de mon Instagram \n\n \`v!site\`: Pour obtenir le lien de mon site \n\n \`v!paypal\`: Pour obtenir le lien de mon PayPal \n\n \`v!discord\`: Pour obtenir le lien de mon Discord \n\n \`v!mail\`: Pour obtenir mon mail \n\n \`v!twitter\`: Pour obtenir le lien de mon Twitter \n\n \`v!commande\`: Pour savoir comment passer une commande \n\n \`v!avatar\`: Pour voir votre photo de profil \n\n \`v!level\`: Pour connaître votre xp')
                .setFooter('Créer par WorldGhost | Pages 2/3')
             message.author.send(embed2);
            }
        if (message.guild) {
                let embed3 = new Discord.MessageEmbed()
                .setColor('ff0000')
                .addField(':police_officer: Commandes Modération\n', '\n\n\`v!kick\`: Pour kick un membre *(Forme : \`v!kick @user <raison>\`)* \n\n \`v!ban\`: Pour ban un membre *(Forme : \`v!ban @user <raison>\`)* \n\n \`v!tempmute\`: Pour mute un membre *(Forme : \`v!tempmute @user <durée> <raison>\`)* \n\n \`v!warn\`: Pour avertir un utilisateur *(Forme : \`v!warn @user <raison>\`)* \n\n \`v!clear\`: Pour supprimer des messages *(Forme : \`v!clear <Nombre entre 1-99>\`)*  \n\n \`v!poll\`: Pour faire un sondage \n\n \`v!giveaway\`: Pour créer un giveaway *(Forme : \`v!giveaway <durée> <récompense>\`)*')
                .setFooter('Créer par WorldGhost | Pages 3/3')
             message.author.send(embed3);
        }
    }
}