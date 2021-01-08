let Discord = require('discord.js');
const { prefix } = require('../configs.json');

let perm = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(":x: **Tu n'a pas la permission**");

let nb = new Discord.MessageEmbed()
.setColor("RED")
.setDescription(":1234: **Vous devez indiquer un nombre à supprimer !**")

let err = new Discord.MessageEmbed()
.setColor("RED")
.setDescription("🤬 **Vous devez indiquer une valeur entre 1 et 99 !**")




module.exports = {
    name: 'clear',
    run: async (client, message) => {
        message.delete();
        if(message.member.hasPermission('MANAGE_MESSAGES')){
    
            let args = message.content.trim().split(/ +/g);
            
            if(args[1]){
                if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99){

                    let cle = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setDescription(`:broom: **Vous avez supprimé ${args[1]} message(s) !**`)               
    
                    message.channel.bulkDelete(args[1])
                    message.channel.send(cle)
                } 
                else{
                    message.channel.send(err)
                } message.delete({timeout:"50000"})
            }
            else{
                message.channel.send(nb)
            } message.delete({timeout:"50000"})
    
        }
        else{
            message.channel.send(perm)
        } 
    }
}



