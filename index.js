/////////////////////////////////////////////////////
// VARIABLES
/////////////////////////////////////////////////////
'use strict';
const Discord = require('discord.js');
const configs = require("./configs.json");
const fs = require('fs');
const ytdl = require("ytdl-core");
const { chmod } = require("fs");
const {prefix, token} = require("./configs.json")
const { Client, MessageEmbed } = require('discord.js');
const moment = require("moment");
const moment2 = require("moment-duration-format")
const userCreatedPolls = new Map();
const xpfile = require("./xp.json");
const client = new Discord.Client({partials: ['MESSAGE', 'REACTION']});


const { YTSearcher } = require('ytsearcher');

const searcher = new YTSearcher({
    key: "AIzaSyDZEICu8JBdPFobr1g70hk1wWPd57Egsvs",
    revealed: true
});

const queue = new Map();

client.on('ready', () => {

    console.log("Bot démarré");
    console.log("Collecte d'informations en cours... ");
  },
  () => {
    client.destroy();
    console.log("Bot détruit!");
  });

  client.on('ready', () => {
    console.log(`Bot tag: ${client.user.tag}`);
  });
  
  client.commands = new Discord.Collection();
  
  const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
  for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
  
    client.commands.set(command.name, command);
  }
  
  client.on('message', async(msg) => {
    if(msg.author.bot) return;
    if(!msg.guild) return;

    var prefix = configs.prefix;
    if(!msg.content.toLowerCase().startsWith(prefix)) return;

    var args = msg.content.split(' ');
    var cmd = args.shift().slice(prefix.length).toLowerCase();

    try {
        var file = require(`./commands/${cmd}.js`);
        file.run(client, msg, args);
    } catch(err) {
        console.warn(err);
    }
});

 


client.on('messageReactionAdd', (reaction, user) => {
  if (!reaction.message.guild || user.bot) return
  const reactionRoleElem = configs.reactionRole[reaction.message.id]
  if (!reactionRoleElem) return
  const prop = reaction.emoji.id ? 'id' : 'name'
  const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
  if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
  else reaction.users.remove(user)
})

client.on('messageReactionRemove', (reaction, user) => {
  if (!reaction.message.guild || user.bot) return
  const reactionRoleElem = configs.reactionRole[reaction.message.id]
  if (!reactionRoleElem || !reactionRoleElem.removable) return
  const prop = reaction.emoji.id ? 'id' : 'name'
  const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
  if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})
/////////////////////////////////////////////////////
// Welcome
/////////////////////////////////////////////////////

client.on('guildMemberAdd', (member) => {
  let channelID = '726125553366859838';
  if(member.guild.id != '711280980941602897') return;
  let wembed = new Discord.MessageEmbed()
  .setTitle(`:man_artist: :woman_artist: - NOUVEAU MEMBRE`)
  //.setImage('https://media.discordapp.net/attachments/336465870526218240/783027802857144330/tenor.gif')
  .setDescription(`:airplane: Bienvenue **${member.user}**\n \n:books: **Règlement** \n *Lis le salon <#711288114446073967>* \n\n :art: **Commande**\n*Pour passser commande <#712313410749988876>*`)
  .setColor("#FFB700")
  .setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
  .setFooter(`Nous sommes désormais ${member.guild.members.cache.filter(m => !m.user.bot).size} membres !`)
  .setTimestamp()
  client.channels.cache.get(channelID).send(wembed).then(messageReaction => {
    messageReaction.react("👋");
  });
});


/////////////////////////////////////////////////////
// Membres
/////////////////////////////////////////////////////
let stats = {
  serverID: '711280980941602897',
  member: "711290285208109117"
}

client.on(`guildMemberAdd`, member => {
  if(member.guild.id !== stats.serverID)return;
  client.channels.cache.get(stats.member).setName(`📌 Infos - Viturna ${member.guild.members.cache.filter(m => !m.user.bot).size} Membres`);
})

client.on(`guildMemberRemove`, member => {
  if(member.guild.id !== stats.serverID)return;
  client.channels.cache.get(stats.member).setName(`📌 Infos - Viturna ${member.guild.members.cache.filter(m => !m.user.bot).size} Membres`);
});

/////////////////////////////////////////////////////
// Status
/////////////////////////////////////////////////////

     client.on("ready", () => {

      setInterval(() => {
        const statuses = [
          "v! | Commande Fermé ",
          "v!help | Viturna ",
          "v! | Créé par WorldGhost",
        ]

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        client.user.setActivity(status, { type: "PLAYING" })
      }, 7000)
  });
   

/////////////////////////////////////////////////////
// MUSIQUE
/////////////////////////////////////////////////////
client.on("message", async(message) => {
  const prefix = 'v!';

  const serverQueue = queue.get(message.guild.id);

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase();

  switch(command){
      case 'play':
          execute(message, serverQueue);
          break;
      case 'stop':
          stop(message, serverQueue);
          break;
      case 'skip':
          skip(message, serverQueue);
          break;
      case 'pause':
          pause(serverQueue);
          break;
      case 'resume':
          resume(serverQueue);
          break;
      case 'loop':
          Loop(args, serverQueue);
          break;
      case 'queue':
          Queue(serverQueue);
          break;
      }

  async function execute(message, serverQueue){
      let vc = message.member.voice.channel;
      if(!vc){
          return message.channel.send("Please join a voice chat first");
      }else{
          let result = await searcher.search(args.join(" "), { type: "video" }) 
          const songInfo = await ytdl.getInfo(result.first.url)

          let song = {
              title: songInfo.videoDetails.title,
              url: songInfo.videoDetails.video_url
          };

          if(!serverQueue){
              const queueConstructor = {
                  txtChannel: message.channel,
                  vChannel: vc,
                  connection: null,
                  songs: [],
                  volume: 10,
                  playing: true,
                  loopone: false,
                  loopall: false
              };
              queue.set(message.guild.id, queueConstructor);

              queueConstructor.songs.push(song);

              try{
                  let connection = await vc.join();
                  queueConstructor.connection = connection;
                  play(message.guild, queueConstructor.songs[0]);
              }catch (err){
                  console.error(err);
                  queue.delete(message.guild.id);
                  return message.channel.send(`Unable to join the voice chat ${err}`)
              }
          }else{
              serverQueue.songs.push(song);
              return message.channel.send(`The song has been added ${song.url}`);
          }
      }
  }
  function play(guild, song){
      const serverQueue = queue.get(guild.id);
      if(!song){
          serverQueue.vChannel.leave();
          queue.delete(guild.id);
          return;
      }
      const dispatcher = serverQueue.connection
          .play(ytdl(song.url))
          .on('finish', () =>{
              if(serverQueue.loopone){  
                  play(guild, serverQueue.songs[0]);
              }
              else if(serverQueue.loopall){
                  serverQueue.songs.push(serverQueue.songs[0])
                  serverQueue.songs.shift()
              }else{
                  serverQueue.songs.shift()
              }
              play(guild, serverQueue.songs[0]);
          })
          serverQueue.txtChannel.send(`Now playing ${serverQueue.songs[0].url}`)
  }
  function stop (message, serverQueue){
      if(!message.member.voice.channel)
          return message.channel.send("You need to join the voice chat first!")
      serverQueue.songs = [];
      serverQueue.connection.dispatcher.end();
  }
  function skip (message, serverQueue){
      if(!message.member.voice.channel)
          return message.channel.send("You need to join the voice chat first");
      if(!serverQueue)
          return message.channel.send("There is nothing to skip!");
      serverQueue.connection.dispatcher.end();
  }
  function pause(serverQueue){
      if(!serverQueue.connection)
          return message.channel.send("There is no music currently playing!");
      if(!message.member.voice.channel)
          return message.channel.send("You are not in the voice channel!")
      if(serverQueue.connection.dispatcher.paused)
          return message.channel.send("The song is already paused");
      serverQueue.connection.dispatcher.pause();
      message.channel.send("The song has been paused!");
  }
  function resume(serverQueue){
      if(!serverQueue.connection)
          return message.channel.send("There is no music currently playing!");
      if(!message.member.voice.channel)
          return message.channel.send("You are not in the voice channel!")
      if(serverQueue.connection.dispatcher.resumed)
          return message.channel.send("The song is already playing!");
      serverQueue.connection.dispatcher.resume();
      message.channel.send("The song has been resumed!");
  }
  function Loop(args, serverQueue){
      if(!serverQueue.connection)
          return message.channel.send("There is no music currently playing!");
      if(!message.member.voice.channel)
          return message.channel.send("You are not in the voice channel!")

      switch(args[0].toLowerCase()){
         case 'all':
             serverQueue.loopall = !serverQueue.loopall;
             serverQueue.loopone = false;

             if(serverQueue.loopall === true)
                 message.channel.send("Loop all has been turned on!");
             else
                  message.channel.send("Loop all has been truned off!");

             break;
          case 'one':
              serverQueue.loopone = !serverQueue.loopone;
              serverQueue.loopall = false;

              if(serverQueue.loopone === true)
                  message.channel.send("Loop one has been turned on!");
              else
                  message.channel.send("Loop one has been truned off!");
              break;
          case 'off':
                  serverQueue.loopall = false;
                  serverQueue.loopone = false;

                  message.channel.send("Loop has been turned off!");
              break;
          default:
              message.channel.send("Please specify what loop you want. !loop <one/all/off>"); 
      }
  }
  function Queue(serverQueue){
      if(!serverQueue.connection)
          return message.channel.send("There is no music currently playing!");
      if(!message.member.voice.channel)
          return message.channel.send("You are not in the voice channel!")

      let nowPlaying = serverQueue.songs[0];
      let qMsg =  `Now playing: ${nowPlaying.title}\n--------------------------\n`

      for(var i = 1; i < serverQueue.songs.length; i++){
          qMsg += `${i}. ${serverQueue.songs[i].title}\n`
      }

      message.channel.send('```' + qMsg + 'Requested by: ' + message.author.username + '```');
  }
});
/////////////////////////////////////////////////////
// COMMANDES
/////////////////////////////////////////////////////

client.on('message', message => {
  if(message.content.startsWith("v!insta")){
 
    let embed = new Discord.MessageEmbed()
    .setTitle("Instragram")
    .setThumbnail ("https://cdn.discordapp.com/attachments/769868470945841172/773576813480771604/Instagram.png")
    .setColor("GREEN")
    .addField("Retrouve mes créations ici ! ","https://www.instagram.com/thomasriq_graphic/")
    message.channel.send(embed)
  }
});

client.on('message', message => {
  if(message.content.startsWith("v!mail")){
 
    let embed = new Discord.MessageEmbed()
    .setTitle("Mail")
    .setThumbnail ("https://cdn.discordapp.com/attachments/769868470945841172/773584455200931860/email_PNG11.png")
    .setColor("RED")
    .addField("Pour me contacter !","thomasriqpro@gmail.com")
    message.channel.send(embed)
  }
});

client.on('message', message => {
  if(message.content.startsWith("v!twitter")){
 
    let embed = new Discord.MessageEmbed()
    .setTitle("Twitter")
    .setThumbnail ("https://cdn.discordapp.com/attachments/769868470945841172/773576815688155156/twitter.png")
    .setColor("BLUE")
    .addField("Retrouve moi sur Twitter !","https://twitter.com/thomasgraphic")
    message.channel.send(embed)
  }
});

/////////////////////////////////////////////////////
// XP
/////////////////////////////////////////////////////

client.on('message', (message) => {
  if(message.author.bot) return;
  var addXP = Math.floor(Math.random() * 6) + 2;

  if(!xpfile[message.author.id]){
      xpfile[message.author.id] = {
        xp: 0,
        level: 1,
        reqxp: 200
      }

      fs.writeFile("./xp.json",JSON.stringify(xpfile),function(err){
           if(err) console.log(err)
      })
  } 

  xpfile[message.author.id].xp += addXP
  if(xpfile[message.author.id].xp > xpfile[message.author.id].reqxp){
       xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp
       xpfile[message.author.id].reqxp *= 1.30
       xpfile[message.author.id].reqxp  = Math.floor(xpfile[message.author.id].reqxp)
       xpfile[message.author.id].level += 1

       message.reply(`**Niveau ${xpfile[message.author.id].level} atteint !** `).then(
         msg=>msg.delete({timeout:"50000"})

       ) 
  } 
  if(message.content.startsWith(`${prefix}level`)){
    let user = message.mentions.users.first() || message.author

    if(user.bot) return message.reply("Les robots n'ont pas d'XP !")

    let embed = new Discord.MessageEmbed()
    .setTitle("Carte Level")
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
    .setColor("ORANGE")
    .addField("Level: ",xpfile[user.id].level)
    .addField("XP: ", xpfile[user.id].xp)
    .addField("XP à atteindre pour le niveau supérieur: ",xpfile[user.id].reqxp)
    message.channel.send(embed)
  } else{

    if (xpfile[message.author.id].level === 15){
    
     const role = message.guild.roles.cache.find(r => r.name === '🌍 • Membre Actif');
     if (!message.member.roles.cache.has(role)) {
      message.member.roles.add(role);
    
  }
  } else{
  
  if (xpfile[message.author.id].level === 30){
  
   const role2 = message.guild.roles.cache.find(r => r.name === '🌍 • Membre Actif ++');
   if (!message.member.roles.cache.has(role2)) {
    message.member.roles.add(role2);
  
   }
  } else{
  
    if (xpfile[message.author.id].level === 50){
    
     const role3 = message.guild.roles.cache.find(r => r.name === '🌍 • Membre Ultra Actif');
     if (!message.member.roles.cache.has(role3)) {
      message.member.roles.add(role3);
};
} 
}}}}); 

/////////////////////////////////////////////////////
// Juges
/////////////////////////////////////////////////////

let ticket = new Map()

client.on('message', async message => {
  const ticketChannel = message.guild.channels.cache.find(c => c.name.toLowerCase() === `${message.author.username}-niveau`.toLowerCase())
  if(message.content.startsWith(`!niveau`)) {
    if(ticketChannel || ticket.get(message.author.id) === true) return message.channel.send("<:engrenage:794943245674348594> Vous avez déjà un ticket ouvert")
    const ticketCreated = await message.guild.channels.create(`${message.author.username}-niveau`, {
      type: 'text',
      permissionOverwrites:  [
        {
          allow: 'VIEW_CHANNEL',
          id: message.author.id,
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '779662240198033438', 
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '726349788315910206', 
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '711527288243748904', 
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '711527562488053771', 
        },
        {
          deny: 'VIEW_CHANNEL',
          id: message.guild.id

        }
      ]
    })
    ticket.set(message.author.id, true)
    ticketCreated.send(`:art: **Envoyez vos créations ici** | :scales: **Attendez qu'un juge vous ajoute votre rôle**  | :key: **Seul les juges peuvent fermer le ticket !** ${message.author.toString()}`)
    message.channel.send("🧾 Votre ticket est créé")
  } else if (message.content.startsWith(`!closeniveau`)) {
    if(!message.channel.name.includes('-niveau')) return message.channel.send("<:engrenage:794943245674348594> Ce message doit être envoyé dans votre ticket ouvert ou vous n'avez pas de ticket ouvert")
    message.channel.delete()
    ticket.set(message.author.id, false)

  }
});

/////////////////////////////////////////////////////
// ticket
/////////////////////////////////////////////////////


client.on('message', async message => {
  const ticketChannel = message.guild.channels.cache.find(c => c.name.toLowerCase() === `${message.author.username}-cmdfree`.toLowerCase())
  if(message.content.startsWith(`!cmdfree`)) {
    const clienttr = message.guild.roles.cache.find(r => r.name === '🧾 • Client(e)');
    if (!message.member.roles.cache.has(clienttr)) {
     message.member.roles.add(clienttr);
    }
    if(ticketChannel || ticket.get(message.author.id) === true) return message.channel.send("<:engrenage:794943245674348594> Vous avez déjà un ticket ouvert")
    const ticketCreated = await message.guild.channels.create(`${message.author.username}-cmdfree`, {
      type: 'text',
      permissionOverwrites:  [
        {
          allow: 'VIEW_CHANNEL',
          id: message.author.id
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '726349788315910206', 
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '711527288243748904', 
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '711527562488053771', 
        },
        {
          deny: 'VIEW_CHANNEL',
          id: message.guild.id

        }
      ]
    })
    ticket.set(message.author.id, true)
    ticketCreated.send(`:art:  **Détaillez votre commande !** | :tools: *Une réponse sera donné dès que possible !*  | :key: **Seul le staff peut fermer le ticket !** ${message.author.toString()}`)
    message.channel.send("🧾 **Votre ticket est créé !**")
  } else if (message.content.startsWith(`!closecmdfree`)) {
    if(!message.channel.name.includes('-cmdfree')) return message.channel.send("<:engrenage:794943245674348594> Ce message doit être envoyé dans votre ticket ouvert ou vous n'avez pas de ticket ouvert")
    message.channel.delete()
    ticket.set(message.author.id, false)

  }
});

client.on('message', async message => {
  const ticketChannel = message.guild.channels.cache.find(c => c.name.toLowerCase() === `${message.author.username}-ticket`.toLowerCase())
  if(message.content.startsWith(`!ticketrc`)) {
    if(ticketChannel || ticket.get(message.author.id) === true) return message.channel.send("Vous avez déjà un ticket ouvert")
    const ticketCreated = await message.guild.channels.create(`${message.author.username}-rc`, {
      type: 'text',
      permissionOverwrites:  [
        {
          allow: 'VIEW_CHANNEL',
          id: message.author.id
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '726349788315910206', 
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '711527288243748904', 
        },
        {
          allow: 'VIEW_CHANNEL',
          id: '711527562488053771', 
        },
        {
          deny: 'VIEW_CHANNEL',
          id: message.guild.id

        }
      ]
    })
    ticket.set(message.author.id, true)
    ticketCreated.send(":scroll:   **Présentez vous ici afin d'être \<@&711527288243748904> ou \<@&717022054301302926>  !** | :tools: *Une réponse sera donné dès que possible !*  | :key: **Seul le staff peut fermer le ticket !**")
    message.channel.send("Votre ticket est créé")
  } else if (message.content.startsWith(`!closerc`)) {
    if(!message.channel.name.includes('-rc')) return message.channel.send("Ce message doit être envoyé dans votre ticket ouvert ou vous n'avez pas de ticket ouvert")
    message.channel.delete()
    ticket.set(message.author.id, false)

  }
});

client.on('message', async message => {
    const ticketChannel = message.guild.channels.cache.find(c => c.name.toLowerCase() === `${message.author.username}-cmdpremium`.toLowerCase())
    if(message.content.startsWith(`!cmdpremium`)) { 
        const clienttr = message.guild.roles.cache.find(r => r.name === '🌟 • Client(e) Premium');
    if (!message.member.roles.cache.has(clienttr)) {
     message.member.roles.add(clienttr);
    }
      if(ticketChannel || ticket.get(message.author.id) === true) return message.channel.send("<:engrenage:794943245674348594> Vous avez déjà un ticket ouvert")
      const ticketCreated = await message.guild.channels.create(`${message.author.username}-cmdpremium`, {
        type: 'text',
        permissionOverwrites:  [
          {
            allow: 'VIEW_CHANNEL',
            id: message.author.id
          },
          {
            allow: 'VIEW_CHANNEL',
            id: '726349788315910206', 
          },
          {
            allow: 'VIEW_CHANNEL',
            id: '711527288243748904', 
          },
          {
            allow: 'VIEW_CHANNEL',
            id: '711527562488053771', 
          },
          {
            deny: 'VIEW_CHANNEL',
            id: message.guild.id
  
          }
        ]
      })
      ticket.set(message.author.id, true)
      ticketCreated.send(`:art:  **Détaillez votre commande !** | :tools: *Une réponse sera donné dès que possible !*  | :key: **Seul le staff peut fermer le ticket !** ${message.author.toString()}`)
      message.channel.send("🧾 **Votre ticket est créé !**")
    } else if (message.content.startsWith(`!closecmdpremium`)) {
      if(!message.channel.name.includes('-cmdpremium')) return message.channel.send("<:engrenage:794943245674348594> Ce message doit être envoyé dans votre ticket ouvert ou vous n'avez pas de ticket ouvert")
      message.channel.delete()
      ticket.set(message.author.id, false)
  
    }
  });

/////////////////////////////////////////////////////
// LOGS
/////////////////////////////////////////////////////

client.on('messageDelete', message => {
  if(!message.partial) {
      const channel = client.channels.cache.get('711533464079433739');
      if(channel) {
          const embed = new MessageEmbed()
              .setTitle('Message Supprimé')
              .addField('Auteur', `${message.author.tag} (${message.author.id})`, true)
              .addField('Channel', `${message.channel.name} (${message.channel.id})`, true)
              .setDescription(message.content)
              .setTimestamp();
          channel.send(embed);
      }
  }
});

/////////////////////////////////////////////////////
// Support
/////////////////////////////////////////////////////

client.on("message", async message => {
  
  if (message.author.bot) return;

  if(message.channel.type === "dm"){
    console.log(message)
    return client.channels.cache.get('769866118063456287').send("**Nouveau Message du support !** \n ```" + message.content + "```\n\r **Message de :** @" + message.author.username+ "#" +message.author.discriminator + " **id :**" + message.author.id + "\n **━━━━━━━━━** *Pour répondre v!dm <id> <message>*")
  };
});

/////////////////////////////////////////
///// Démarrage
////////////////////////////////////////
client.login(configs.token)

