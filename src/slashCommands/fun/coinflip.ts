import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("coinflip")
		.setDescription("Flips a coin"),
	execute: interaction => {
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription(`🪙 **Coinflip**\n ${Math.random() > 0.5 ? "Heads" : "Tails"}`)
					.setColor("#D14D3B")
					.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
					.setTimestamp()
			]
		});
	},
	cooldown: 10
};

export default command;
