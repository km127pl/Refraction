import { SlashCommandBuilder } from "discord.js"
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Shows the bot's ping"),
	execute: interaction => {
		interaction.reply({
			embeds: [
				new Embed()
					.setDescription(`🏓 **Pong!**\n 📡 Ping: ${interaction.client.ws.ping}`)
			]
		})
	},
	cooldown: 10
}

export default command
