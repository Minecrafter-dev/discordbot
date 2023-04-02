const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});





const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");
const {handleLogs} = require("./Handlers/handleLogs");

const errorHandler = require("./Handlers/errorHandler");
client.on("error", errorHandler.bind(null, client));

const Logs = require('discord-logs')

Logs(client, {
    debug: true
})


client.config = require("./config.json");
client.events = new Collection();
client.subCommands = new Collection(); //SubCommand handler
client.commands = new Collection();

client.login(client.config.token).then(() => {
    handleLogs(client);
    loadEvents(client);
    loadCommands(client);
});