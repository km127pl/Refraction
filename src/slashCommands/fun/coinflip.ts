import { SlashCommandBuilder } from "discord.js"
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("coinflip")
		.setDescription("Flips a coin"),
	execute: interaction => {
		interaction.reply({
			embeds: [
				new Embed({ addFooter: true, interaction, addTimestamp: true })
					.setDescription(`:coin: **Coinflip**\n ${Math.random() > 0.5 ? "Heads" : "Tails"}`)
			]
		})
	},
	cooldown: 10
}

export default command
