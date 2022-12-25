import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("serverinfo")
		.setDescription("Shows information about the server"),
	execute: async interaction => {
		const guild = interaction.guild;
		if (!guild) return interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription("❌ This command can only be used in a server")
					.setColor("#D14D3B")
			]
		});

		const guildOwner = await guild.members.fetch(guild.ownerId);
		const guildCreateStamp = Math.floor(guild.createdAt.getTime() / 1000);

		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.addFields([
						{ name: "📋 Name", value: guild.name, inline: true },
						{ name: "🆔 ID", value: guild.id, inline: true },
						{ name: "👑 Owner", value: guildOwner.displayName, inline: true },
						{ name: "👥 Members", value: `${guild.memberCount}`, inline: true },
						{ name: "📆 Created", value: `<t:${guildCreateStamp}:R>`, inline: true },
						{ name: "📥 Icon", value: `[Click Here](${guild.iconURL()})`, inline: true },
						{ name: "📷 Banner", value: guild.bannerURL() ? `[Click Here](${guild.bannerURL()})` : "None", inline: true },
						{ name: "🎭 System", value: guild.systemChannel ? "Yes" : "No", inline: true },
					])
					.setColor("#FFFFFF")
					.setThumbnail(guild.iconURL())
					.setFooter({ text: `Requested by ${interaction.user.username}` })
					.setTimestamp()
			]
		});
	},
	cooldown: 10
};

export default command;
