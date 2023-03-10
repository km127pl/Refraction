import { SlashCommandBuilder } from "discord.js";
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("serverinfo")
		.setDescription("Shows information about the server"),
	execute: async interaction => {
		const guild = interaction.guild;
		if (!guild) return interaction.reply({
			embeds: [
				new Embed()
					.setDescription("❌ This command can only be used in a server")
			]
		});

		const guildOwner = await guild.members.fetch(guild.ownerId);
		const guildCreateStamp = Math.floor(guild.createdAt.getTime() / 1000);

		interaction.reply({
			embeds: [
				new Embed()
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
			]
		});
	},
	cooldown: 10
};

export default command;
