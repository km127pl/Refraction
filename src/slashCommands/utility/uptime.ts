import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("uptime")
		.setDescription("Shows the bot's uptime"),
	execute: interaction => {
		const uptime = process.uptime();
		const days = Math.floor(uptime / 86400);
		const hours = Math.floor(uptime / 3600) % 24;
		const minutes = Math.floor(uptime / 60) % 60;
		const seconds = Math.floor(uptime % 60);

		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription(`🕒 **Uptime:**\n ${days}d:${hours}h:${minutes}m:${seconds}s\n Since ${new Date(interaction.client.readyTimestamp).toLocaleString()}`)
					.setColor("#D14D3B")
			]
		})
	},
	cooldown: 10
}

export default command
