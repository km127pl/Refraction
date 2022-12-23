import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("dice")
		.setDescription("Rolls a dice"),
	execute: interaction => {
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription(`🎲 **Dice**\n ${Math.floor(Math.random() * 6) + 1}`)
					.setColor("#D14D3B")
					.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
					.setTimestamp()
			]
		})
	},
	cooldown: 10
}

export default command
