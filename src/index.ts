import { Client, GatewayIntentBits, Collection } from "discord.js";;
import { Command, SlashCommand } from "./types";
import registerCommands from "./commands";
import registerEvents from "./events";
import { config } from "dotenv";
config();

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;
const client = new Client({
	intents: [Guilds, MessageContent, GuildMessages, GuildMembers]
});

client.slashCommands = new Collection<string, SlashCommand>();
client.commands = new Collection<string, Command>();
client.cooldowns = new Collection<string, number>();

registerCommands(client);
registerEvents(client);


client.login(process.env.DISCORD_TOKEN);
