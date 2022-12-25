import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("userinfo")
		.setDescription("Shows information about a user")
		.addUserOption(option => option.setName("user").setDescription("The user to get information about")),
	execute: interaction => {
		const user = interaction.options.getUser("user") || interaction.user;
		const userCreated = interaction?.guild?.members?.cache?.get(user.id)?.joinedTimestamp || user.createdTimestamp;
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.addFields([
						{ name: "👤 Username", value: `${user.username}#${user.discriminator}`, inline: true },
						{ name: "🆔 ID", value: user.id, inline: true },
						{ name: "📆 Created", value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`, inline: true },
						{ name: "📆 Joined", value: `<t:${(Math.floor(userCreated / 1000))}:R>`, inline: true },
						{ name: "📥 Avatar", value: `[Click Here](${user.avatarURL()})`, inline: true },
						{ name: "🎮 Bot", value: user.bot ? "Yes" : "No", inline: true },
						{ name: "📷 Banner", value: user.bannerURL() ? `[Click Here](${user.bannerURL()})` : "None", inline: true },
						{ name: "🎭 System", value: user.system ? "Yes" : "No", inline: true },
					])
					.setColor(user.accentColor || "#FFFFFF")
					.setThumbnail(user.avatarURL())
					.setFooter({ text: `Requested by ${interaction.user.username}` })
					.setTimestamp()
			]
		});
	},
	cooldown: 10
};

export default command;
