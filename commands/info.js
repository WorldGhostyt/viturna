let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'info',
    run: async (client, message) => {
        if (message.guild) {
            let embed = new Discord.MessageEmbed()
            .setTitle('Viturna - Information')
            .setColor('7289da')
            .setDescription(`:pushpin: **Thomas Riq Graphic** \n\n:wave: **Salut !** \n*Je vous présente le serveur Thomas Riq Graphic !*\n__*Ce serveur discord est un serveur*__\n\n :art: / De **graphisme/Web design et de montage vidéo**\nVous pouvez trouver plusieurs graphistes et monteurs vidéo sur le discord afin de vous entraider ou bien de passer une commande ! (Free ou payante).\n\n:video_game: / **Communautaire**\nIci il venez partager discuter vous amusez et jouer avec les membres du discord ! Des évents sont fait très régulièrement. \n\n:mega: / **Pub**\n*Des salons pour vous faire votre pub en fonction de votre niveau !*\n\n**Notre but est de pouvoir rassembler une communauté autour du graphisme, web design etc... et des jeux vidéos !**\n\n\n:oncoming_police_car: **__On recrute !__**\n\n **->** :man_police_officer: Des modérateurs/trices\n**->** :tada: Des animateurs/trices\n**->**:mobile_phone: Un(e) responsable marketing\n\n\n**Discord** : \nhttps://discord.gg/XmfeYj2US4`)
            .setFooter('⚒️ Créer par WorldGhost | 📄 Page d\'information')
            message.channel.send(embed);
            message.delete();
        }
    }
}