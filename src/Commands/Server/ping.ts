import { Command } from '../../Interfaces';
import { connection }  from '../../database';

export const command: Command = {
  name: 'ping',
  aliases: ['p'],
  run: async(client, message, args) => {
    connection.query('SHOW TABLES', (error, resultado) => {
      console.log(resultado)
    })
    message.channel.send(`${client.ws.ping} ping!`);
  }
}