import { Event, Command } from '../Interfaces';
import { CachedManager, CommandInteractionOptionResolver, Message } from 'discord.js';
const cooldown = new Set();
const emoji = require("../emoji.json");
const tempslow = 3;


export const event: Event = {
  name: 'message',
  run: (client, message: Message) => {
    if(
      message.author.bot || !message.guild || !message.content.startsWith(client.config.prefix)
    )return;
    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    
    const cmd =
      client.commands.get(command) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if(cooldown.has(message.author.id)) {
      message.delete();
      message.channel
      .send(
        "> " +
          emoji.relogio + 
          " | " + message.author +
           "Aguarde **" +
           tempslow +
           "s** para usar outro comando novamente"
      )
      .then(msg => {
        setTimeout(() => msg.delete(), 10000)
      });
    
    }else {
      if(cmd) {
        try {
          if(!cmd)return;
          cmd.run(client, message, args);
        } catch (error) {
          console.log(error);
          message.channel.send(
            "> " +
              emoji.negativo +
              " | " +
              message.author +
              " Ocorreu um erro ao tentar executar o comando!"
          );
        }
      }else {
          message.channel.send(
            "> " +
              emoji.negativo +
              " | " +
              message.author +
              " Esse comando não existe, verifique a ortografia e tente novamente"
          );
      }
      cooldown.add(message.author.id);
      setTimeout(() => {
      cooldown.delete(message.author.id);
      }, tempslow * 1000);
    }
    
  }
}