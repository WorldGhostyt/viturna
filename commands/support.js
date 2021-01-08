let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'support',
    run: async (client, message) => {
        if (message.guild) {
            message.channel.send(':incoming_envelope:  **Check tes DM !**');
            message.delete();
            message.author.send("**Bonjour/Bonsoir !** *Merci d'utiliser le support de Viturna !*\n\n**__Afin de facilité le travaille de la modération veuillez lire le message suivant :__**\n\n- Si ta demande nécessite une intervention en **vocal** explique nous rapidement le problème et on te  donnera nos disponibilité \n\n- Si ta demande nécessite une intervention à **l'écrit**, décrit nous le problème ou ta question ici ! Un modérateur vous répondra dans la journée.\n\n\n *Merci*\n*- Le Staff de Viturna*");
            }
        if (!message.guild) {
            message.author.send("**Bonjour/Bonsoir !** *Merci d'utiliser le support de Viturna !*\n\n**__Afin de facilité le travaille de la modération veuillez lire le message suivant :__**\n\n- Si ta demande nécessite une intervention en **vocal** explique nous rapidement le problème et on te  donnera nos disponibilité \n\n- Si ta demande nécessite une intervention à **l'écrit**, décrit nous le problème ou ta question ici ! Un modérateur vous répondra dans la journée.\n\n\n *Merci*\n*- Le Staff de Viturna*");
            }
    }
}