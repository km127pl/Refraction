import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js"
import { SlashCommand, Warn } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("warn")
		.setDescription("Warns a user")
		.addUserOption(option => option.setName("user").setDescription("The user to warn").setRequired(true))
		.addStringOption(option => option.setName("reason").setDescription("The reason for the warning").setRequired(true))
		.addIntegerOption(option => option.setName("points").setDescription("The amount of points to warn the user with").setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
	execute: async interaction => {
		const user = interaction.options.getUser("user", true)
		const reason = interaction.options.data[1].value as string
		const points = interaction.options.data[2].value as number
		const warnId = `warns_${interaction.guildId}_${user.id}_${Date.now()}`

		var warns : Array<Warn> = await interaction.client.db.get(`warns_${interaction.guildId}_${user.id}`) || []
		const warn = {
			id: warnId,
			reason: reason,
			points: points
		} as Warn
		warns.push(warn);
		await interaction.client.db.set(`warns_${interaction.guildId}_${user.id}`, warns)

		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription(`🔨 **Warned**\n${user.tag} has been warned for **${reason}** with **${points} points**`)
					.setColor("#D14D3B")
					.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
					.setTimestamp()
			]
		})
		// dm the user
		user.createDM().then(dm => {
			dm.send({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription(`🔨 **Warned**\nYou have been warned in **${interaction?.guild?.name}** for **${reason}** with **${points} points**`)
						.setColor("#D14D3B")
						.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
						.setTimestamp()
				]
			}).catch(err => { // edit the embed to say additonally that the user could not be dm'd
				interaction.editReply({
					embeds: [
						new EmbedBuilder()
							.setAuthor({ name: "Refraction" })
							.setDescription(`🔨 **Warned**\n${user.tag} has been warned for **${reason}** with **${points} points**\nAdditionally, the user could not be dm'd`)
							.setColor("#D14D3B")
							.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
							.setTimestamp()
					]
				});
			});
		});
	}
};

export default command
