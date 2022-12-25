import { Client } from "discord.js";
import { BotEvent } from "../types";

const event : BotEvent = {
	name: "ready",
	once: true,
	execute: async (client : Client) => {
		console.log(`[!] Logged in as ${client.user?.tag}`);
	}
};

export default event;
