import { Client, GatewayIntentBits, Collection } from "discord.js";;
import { Command, SlashCommand } from "./types";
import registerCommands from "./commands";
import registerEvents from "./events";
import { config } from "dotenv";
import Keyv from "keyv";
config();

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
const client = new Client({
	intents: [Guilds, MessageContent, GuildMessages, GuildMembers]
});

client.slashCommands = new Collection<string, SlashCommand>();
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();
client.db = new Keyv('sqlite://./resources/database.sqlite');

registerCommands(client);
registerEvents(client);


client.login(process.env.DISCORD_TOKEN);
