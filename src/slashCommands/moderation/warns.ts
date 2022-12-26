import { SlashCommandBuilder, PermissionFlagsBits, APIEmbedField } from "discord.js"
import Embed from "../../function/Embed";
import { SlashCommand, Warn } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("warns")
		.setDescription("Shows a user's warns")
		.addUserOption(option => option.setName("user").setDescription("The user to warn").setRequired(true))
		.addIntegerOption(option => option.setName("amount").setDescription("The amount of warns to show").setRequired(false))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	execute: async interaction => {
		const user : User = interaction.options.getUser("user", true);
		const warns : Array<Warn> = await interaction.client.db.get(`warns_${interaction.guildId}_${user.id}`) || []
		const amount : number = interaction.options.get("amount")?.value as number;

		const toShow = warns.slice(0, amount || warns.length)
		const warnFields : APIEmbedField[] = [];

		for (const warn of toShow) {
			warnFields.push({
				name: `Warn ${warn.id}`,
				value: `**Reason:** ${warn.reason}\n**Points:** ${warn.points}`
			})
		}

		interaction.reply({
			embeds: [
				new Embed({	addFooter: true, interaction, addTimestamp: true })
					.setDescription(`🔨 **Warns**\n${user.tag} has ${warns.length} warns`)
					.addFields(warnFields)
			]
		})
	}
}

export default command
