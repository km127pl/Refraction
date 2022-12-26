import { SlashCommandBuilder, TextChannel, PermissionFlagsBits } from "discord.js";
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("settings")
		.setDescription("Change the settings for the server")
		.addSubcommand(subcommand => subcommand.setName("join").setDescription("Change the join message").addStringOption(option => option.setName("message").setDescription("The message to send when a user joins").setRequired(true)).addChannelOption(option => option.setName("channel").setDescription("The channel to send the join message in").setRequired(true)))
		.addSubcommand(subcommand => subcommand.setName("leave").setDescription("Change the leave message").addStringOption(option => option.setName("message").setDescription("The message to send when a user leaves").setRequired(true)).addChannelOption(option => option.setName("channel").setDescription("The channel to send the leave message in").setRequired(true)))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	execute: interaction => {
		const subcommand : string = interaction.options.data[0].name; // there is no better way of getting the subcommand name
		const message : string = interaction.options.get("message")?.value as string;
		const channel : TextChannel = interaction.options.get("channel")?.channel as TextChannel;

		if (subcommand === "join") {
			// change join message
			interaction.client.db.set(`joinMessage_${interaction.guildId}`, message);
			interaction.client.db.set(`joinChannel_${interaction.guildId}`, channel.id);
			interaction.reply({
				embeds: [
					new Embed({ addFooter: true, interaction, addTimestamp: true })
						.setDescription(`Set join message to \`${message}\``)
				]
			});
		} else if (subcommand === "leave") {
			// change leave message
			interaction.client.db.set(`leaveMessage_${interaction.guildId}`, message);
			interaction.client.db.set(`leaveChannel_${interaction.guildId}`, channel.id);
			interaction.reply({
				embeds: [
					new Embed({ addFooter: true, interaction, addTimestamp: true })
						.setDescription(`Set leave message to \`${message}\``)
				]
			});
		}

	}
};

export default command;
