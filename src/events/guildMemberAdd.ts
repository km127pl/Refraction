import { GuildMember, TextChannel } from "discord.js";
import client, { welcomeBanner } from "..";
import { BotEvent } from "../types";
import svg2png from "svg2png";

const event : BotEvent = {
	name: "guildMemberAdd",
	once: false,
	execute: async (member: GuildMember) => {
		const message = await client.db.get(`joinMessage_${member.guild.id}`);
		const channelId = await client.db.get(`joinChannel_${member.guild.id}`);
		const banner : Buffer = Buffer.from(welcomeBanner.replace(/{USER:NAME}/g, member.user.username).replace(/{SERVER:NAME}/g, member.guild.name));

		if (message && channelId) {
			const channel = member.guild.channels.cache.get(channelId) as TextChannel;
			if (channel) {
				// channel.send(message.replace(/{{user}}/g, member.user.username));
				svg2png(banner, { width: 1920, height: 1080 }).then(buffer => {
					channel.send({
						files: [{
							attachment: buffer,
							name: "welcome.png"
						}]
					});
				});
			}
		}
	}
};

export default event;
