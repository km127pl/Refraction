import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("uptime")
		.setDescription("Shows the bot's uptime"),
	execute: interaction => {
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription(`🕒 **Uptime:**\n ${process.uptime()}`)
					.setColor("#D14D3B")
			]
		})
	},
	cooldown: 10
}

export default command
