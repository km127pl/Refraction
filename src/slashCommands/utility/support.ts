import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("support")
		.setDescription("Sends an invite to the support server to the user"),
	execute: interaction => {
		// send to DMs
		interaction.user.send({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription("🔗 **Support Server:**\n https://refraction.us.to/support")
					.setColor("#D14D3B")
			]
		}).catch(() => { // if the user has DMs disabled
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription("🔗 **Support Server:**\n https://refraction.us.to/support")
						.setColor("#D14D3B")
				], ephemeral: true
			});
		});
	},
	cooldown: 10
};

export default command;
