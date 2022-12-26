import { Guild } from "discord.js";
import client from "..";
import { deleteAllBackups } from "../function/ServerBackup";
import { BotEvent } from "../types";

const event : BotEvent = {
	name: "guildDelete",
	once: false,
	execute: async(guild : Guild) => {
		await deleteAllBackups(guild.id, client);
	}
};

export default event;
