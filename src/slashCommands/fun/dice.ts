import { SlashCommandBuilder } from "discord.js";
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("dice")
		.setDescription("Rolls a dice"),
	execute: interaction => {
		interaction.reply({
			embeds: [
				new Embed({ addTimestamp: false })
					.setDescription(`🎲 **Dice**\n ${Math.floor(Math.random() * 6) + 1}`)
			]
		});
	},
	cooldown: 10
};

export default command;
