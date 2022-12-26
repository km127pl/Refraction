import { ActivityType, Client } from "discord.js";
import { BotEvent } from "../types";

const event: BotEvent = {
	name: "ready",
	once: true,
	execute: async (client: Client) => {
		console.log(`[!] Logged in as ${client.user?.tag}`);

		client.user?.setPresence({
			activities: [{
				type: ActivityType.Watching,
				name: "over the server"
			}]
		});
	}
};

export default event;
