import { SlashCommandBuilder, TextChannel, PermissionFlagsBits } from "discord.js";
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("Clears messages")
		.addIntegerOption(option => option.setName("amount").setDescription("The amount of messages to clear").setRequired(true).setMaxValue(100).setMinValue(1))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	execute: async interaction => {
		const amount : number = interaction.options.get("amount")?.value as number;

		if (amount > 100) {
			interaction.reply({
				embeds: [
					new Embed().setDescription("You can only clear up to 100 messages at a time")
				]
			});
		} else if (amount < 1) {
			interaction.reply({
				embeds: [
					new Embed().setDescription("You must clear at least 1 message")
				]
			});
		} else {
			const textChannel = interaction.channel as TextChannel;
			await textChannel.bulkDelete(amount);
			interaction.reply({
				embeds: [
					new Embed({
						addFooter: true,
						interaction,
						addTimestamp: true
					}).setDescription(`Cleared ${amount} messages`)
				]
			});
		}
	},
	cooldown: 10
};

export default command;
