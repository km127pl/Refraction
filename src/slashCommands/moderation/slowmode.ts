import { SlashCommandBuilder, EmbedBuilder, TextChannel, PermissionFlagsBits } from "discord.js"
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
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription("You can only set the slowmode to up to 21600 seconds (6 hours)")
						.setColor("#D14D3B")
				]
			})
		} else if (amount < 0) {
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription("You can't set the slowmode to a negative number")
						.setColor("#D14D3B")
				]
			})
		} else {
			var textChannel = interaction.channel as TextChannel;
			textChannel.setRateLimitPerUser(amount);
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription(`Set the slowmode to **${amount} seconds**`)
						.setColor("#D14D3B")
						.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
						.setTimestamp()
				]
			})
		}
	},
	cooldown: 10
}

export default command
