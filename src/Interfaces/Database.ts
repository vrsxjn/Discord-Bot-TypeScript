import config from "./config.json";
import mysql from 'mysql';
import terminal from 'chalk';

export const connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

connection.connect(error => {
  if(error) throw error;
  console.log(terminal.cyan.bold('[BOT] ' + "Conectado a Database! ") + "DISCORD");
});