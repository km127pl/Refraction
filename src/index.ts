import { Client, GatewayIntentBits, Collection } from "discord.js";;
import { SlashCommand } from "./types";
import registerCommands from "./commands";
import registerEvents from "./events";
import { config } from "dotenv";
import Keyv from "keyv";
import { readFileSync } from "fs";
import app from './statistics/server';
config();

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
const client = new Client({
	intents: [Guilds, MessageContent, GuildMessages, GuildMembers]
});

client.slashCommands = new Collection<string, SlashCommand>();
client.cooldowns = new Collection<string, number>();
// yes, i know this is bad practice, but i'm too lazy to set up a database server
// leave me alone
client.db = new Keyv('sqlite://./resources/database.sqlite');

registerCommands(client);
registerEvents(client);

client.login(process.env.DISCORD_TOKEN);

const welcomeBanner = readFileSync("./assets/welcome.svg", "utf-8");

// export static client
if (process.env.ENABLE_STATISTICS) {
	app.listen(3001, () => console.log("[!] Statistics server is running on port 3001"));
}

export default client;

export { welcomeBanner };
