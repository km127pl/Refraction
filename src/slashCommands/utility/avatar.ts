import { SlashCommandBuilder } from "discord.js"
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("avatar")
		.setDescription("Gets the avatar of a user")
		.addUserOption(option => option.setName("user").setDescription("The user to get the avatar of")),
	execute: interaction => {
		const user = interaction.options.getUser("user") || interaction.user
		interaction.reply({
			embeds: [
				new Embed({ addTimestamp: true, interaction })
					.setDescription(`🖼️ **Avatar of ${user.tag}**\n [Click Here](${user.displayAvatarURL({ size: 4096 })})`)
					.setColor(user.accentColor || process.env.ACCENT_COLOR)
					.setImage(user.displayAvatarURL({ size: 512 }))
					.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
			]
		})
	},
	cooldown: 10
}

export default command
