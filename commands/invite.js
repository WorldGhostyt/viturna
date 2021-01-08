let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'invite',
    run: async (client, message) => {
        if (message.guild) {
            message.channel.send(`*__Voici le lien du serveur__* **__Viturna__** : https://discord.gg/XmfeYj2US4`);
            message.delete();
        }
    }
}