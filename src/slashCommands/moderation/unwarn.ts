import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js"
import { SlashCommand, Warn } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("unwarn")
		.setDescription("Unwarns a user")
		.addUserOption(option => option.setName("user").setDescription("The user to warn").setRequired(true))
		.addStringOption(option => option.setName("id").setDescription("The id of the warn to remove").setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	execute: async interaction => {
		const user = interaction.options.getUser("user", true)
		const id = interaction.options.data[1].value as string;

		var warns : Array<Warn> = await interaction.client.db.get(`warns_${interaction.guildId}_${user.id}`) || []
		warns = warns.filter(warn => warn.id !== id)
		await interaction.client.db.set(`warns_${interaction.guildId}_${user.id}`, warns)

		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription(`🔨 **Unwarned**\n${user.tag} has been unwarned`)
					.setColor("#D14D3B")
					.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
					.setTimestamp()
			]
		})
	}
}

export default command
