import { SlashCommandBuilder } from "discord.js";
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Sends an invite of the bot to the user"),
	execute: interaction => {
		// send to DMs
		interaction.user.send({
			embeds: [
				new Embed()
					.setDescription("🔗 **Invite:**\n https://refraction.us.to/add")
			]
		}).catch(() => { // if the user has DMs disabled
			interaction.reply({
				embeds: [
					new Embed()
						.setDescription(`🔗 **Invite:**\n https://refraction.us.to/add`)
				], ephemeral: true
			});
		});
	},
	cooldown: 10
};

export default command;
