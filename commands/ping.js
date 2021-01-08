let Discord = require('discord.js');
const { prefix } = require('../configs.json');


module.exports = {
    name: 'ping',
    run: async (client, message) => {
        if (message.guild) {
            const start = Date.now()
            message.channel.send("Pinging...").then(message => {
        
              const end = Date.now()
              message.edit(`:ping_pong: Pong ! **${end - start}** ms!`)
            });
          
            message.delete();
        }
    }
}