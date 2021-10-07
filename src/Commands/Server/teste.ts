import { Command } from '../../Interfaces';
import { connection }  from '../../database';

export const command: Command = {
  name: 'teste',
  aliases: ['t'],
  run: async(client, message, args) => {
    connection.query(`SELECT id FROM tiktok ORDER BY RAND() LIMIT 1`, (err, info) => {
      console.log(info)
   })
  }
}