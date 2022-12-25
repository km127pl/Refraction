import { SlashCommandBuilder, EmbedBuilder, TextChannel, PermissionFlagsBits } from "discord.js";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("settings")
		.setDescription("Change the settings for the server")
		.addSubcommand(subcommand => subcommand.setName("join").setDescription("Change the join message").addStringOption(option => option.setName("message").setDescription("The message to send when a user joins").setRequired(true)).addChannelOption(option => option.setName("channel").setDescription("The channel to send the join message in").setRequired(true)))
		.addSubcommand(subcommand => subcommand.setName("leave").setDescription("Change the leave message").addStringOption(option => option.setName("message").setDescription("The message to send when a user leaves").setRequired(true)).addChannelOption(option => option.setName("channel").setDescription("The channel to send the leave message in").setRequired(true)))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
	execute: interaction => {
		const subcommand = interaction.options.data[0].name;
		const message = interaction.options.get("message")?.value as string;
		const channel = interaction.options.get("channel")?.channel as TextChannel;

		if (subcommand === "join") {
			// change join message
			interaction.client.db.set(`joinMessage_${interaction.guildId}`, message);
			interaction.client.db.set(`joinChannel_${interaction.guildId}`, channel.id);
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription(`Set join message to \`${message}\``)
						.setTimestamp()
						.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 512 }) })
						.setColor("#D14D3B")
				]
			});
		} else if (subcommand === "leave") {
			// change leave message
			interaction.client.db.set(`leaveMessage_${interaction.guildId}`, message);
			interaction.client.db.set(`leaveChannel_${interaction.guildId}`, channel.id);
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription(`Set leave message to \`${message}\``)
						.setTimestamp()
						.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 512 }) })
						.setColor("#D14D3B")
				]
			});
		}

	}
};

export default command;
