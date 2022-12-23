import { SlashCommandBuilder, EmbedBuilder, TextChannel, PermissionFlagsBits } from "discord.js"
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("Clears messages")
		.addIntegerOption(option => option.setName("amount").setDescription("The amount of messages to clear").setRequired(true).setMaxValue(100).setMinValue(1))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	execute: interaction => {
		const amount = interaction.options.data[0].value as number; // amount of messages to clear

		if (amount > 100) {
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription("You can only clear up to 100 messages at a time")
						.setColor("#D14D3B")
				]
			})
		} else if (amount < 1) {
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription("You must clear at least 1 message")
						.setColor("#D14D3B")
				]
			})
		} else {
			var textChannel = interaction.channel as TextChannel;
			textChannel.bulkDelete(amount + 1);
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription(`Cleared ${amount} messages`)
						.setColor("#D14D3B")
				]
			})
		}
	},
	cooldown: 10
}

export default command
