let Discord = require('discord.js');
const { prefix } = require('../configs.json');

module.exports = {
    name: 'avatar',
    run: async (client, message) => {
        if (message.guild) {
            message.channel.send(message.reply(message.author.displayAvatarURL()));
            message.delete();
        }}}