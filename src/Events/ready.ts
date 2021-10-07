import { Event } from '../Interfaces';

export const event: Event = {
  name: 'ready',
  run: async (client) => {
    console.log(`
    ${client.guilds.cache.size} servidores | ${client.user.tag} online`
    )
    setInterval(() => {
      let random_Avatar = [
        "a",
        "a",
        "a",
        "a",
      ];
      client.user.setAvatar(
        random_Avatar[Math.floor(Math.random() * random_Avatar.length)],
      );

    }, 30 * 600000);
    setInterval(() => {
      const Servidor = "";
      const promises = [
        client.shard.broadcastEval("this.users.size"),
        client.shard.broadcastEval("this.guilds.size")
      ];

      Promise.all(promises).then(async results => {
        const membrosTotal = results[0].reduce((a, b) => a + b, 0);
        const servidorTotal = results[1].reduce((a,b) => a + b, 0);

        client.user.setActivity(require("currency-formatter").format(membrosTotal, { code: "de-De", precision: 0} + "Usuarios"));
        client.guilds.cache         
          .get(Servidor)
          .channels.cache.get("")
          .setName(require("currency-formatter").format(membrosTotal, { code: "de-DE", precision: 0}) + " Usuários");
         client.guilds.cache
          .get(Servidor)
           .channels.cache.get("798025860954325023")
            .setName(require("currency-formatter").format(servidorTotal, { code: "de-DE", precision: 0}) + " Servidores");

      })
    }, 5 * 600000);

  }
}