import { SlashCommandBuilder, TextChannel, PermissionFlagsBits } from "discord.js"
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("slowmode")
		.setDescription("Sets the slowmode of the channel")
		.addIntegerOption(option => option.setName("amount").setDescription("The amount of seconds to set the slowmode to").setRequired(true).setMaxValue(21600).setMinValue(0))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
	execute: interaction => {
		const amount = interaction.options.data[0].value as number; // amount of seconds to set the slowmode to

		if (amount > 21600) {
			interaction.reply({
				embeds: [
					new Embed({ addFooter: true, interaction, addTimestamp: true })
						.setDescription("You can only set the slowmode to up to 21600 seconds (6 hours)")
				]
			})
		} else if (amount < 0) {
			interaction.reply({
				embeds: [
					new Embed({ addFooter: true, interaction, addTimestamp: true })
						.setDescription("You can't set the slowmode to a negative number")
				]
			})
		} else {
			var textChannel = interaction.channel as TextChannel;
			textChannel.setRateLimitPerUser(amount);
			interaction.reply({
				embeds: [
					new Embed({ addFooter: true, interaction, addTimestamp: true })
						.setDescription(`Set the slowmode to **${amount} seconds**`)
				]
			})
		}
	},
	cooldown: 10
}

export default command
