import { PartialGuildMember, TextChannel } from "discord.js";
import client from "..";
import { BotEvent } from "../types";

const event : BotEvent = {
	name: "guildMemberRemove",
	once: false,
	execute: async (member : PartialGuildMember) => {
		const message = await client.db.get(`joinMessage_${member.guild.id}`);
		const channelId = await client.db.get(`joinChannel_${member.guild.id}`);

		if (message && channelId) {
			const channel = member.guild.channels.cache.get(channelId) as TextChannel;
			if (channel) {
				channel.send(message.replace(/{{user}}/g, member.toString()));
			}
		}
	}
};

export default event;
