import { SlashCommandBuilder } from "discord.js";
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("support")
		.setDescription("Sends an invite to the support server to the user"),
	execute: interaction => {
		// send to DMs
		interaction.user.send({
			embeds: [
				new Embed()
					.setDescription("🔗 **Support Server:**\n https://refraction.us.to/support")
			]
		}).catch(() => { // if the user has DMs disabled
			interaction.reply({
				embeds: [
					new Embed()
						.setDescription("🔗 **Support Server:**\n https://refraction.us.to/support")
				], ephemeral: true
			});
		});
	},
	cooldown: 10
};

export default command;
