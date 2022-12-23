import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Shows the bot's ping"),
	execute: interaction => {
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription(`🏓 **Pong!**\n 📡 Ping: ${interaction.client.ws.ping}`)
					.setColor("#D14D3B")
			]
		})
	},
	cooldown: 10
}

export default command
