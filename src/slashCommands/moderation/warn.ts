import { SlashCommandBuilder, PermissionFlagsBits, User } from "discord.js";
import Embed from "../../function/Embed";
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
		const user : User = interaction.options.getUser("user", true);
		const reason : string = interaction.options.get("reason")?.value as string;
		const points : number = interaction.options.get("points")?.value as number;
		const warnId  = `warns_${interaction.guildId}_${user.id}_${Date.now()}`;

		const warns : Array<Warn> = await interaction.client.db.get(`warns_${interaction.guildId}_${user.id}`) || [];
		const warn = {
			id: warnId,
			reason: reason,
			points: points
		} as Warn;
		warns.push(warn);
		await interaction.client.db.set(`warns_${interaction.guildId}_${user.id}`, warns);

		interaction.reply({
			embeds: [
				new Embed({ addFooter: true, interaction, addTimestamp: true })
					.setDescription(`🔨 **Warned**\n${user.tag} has been warned for **${reason}** with **${points} points**`)
			]
		});
		// dm the user
		user.createDM().then(dm => {
			dm.send({
				embeds: [
					new Embed({ addFooter: true, interaction, addTimestamp: true })
						.setDescription(`🔨 **Warned**\nYou have been warned in **${interaction?.guild?.name}** for **${reason}** with **${points} points**`)
				]
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			}).catch(_err => { // edit the embed to say additonally that the user could not be dm'd
				interaction.editReply({
					embeds: [
						new Embed({ addFooter: true, interaction, addTimestamp: true })
							.setDescription(`🔨 **Warned**\n${user.tag} has been warned for **${reason}** with **${points} points**\nAdditionally, the user could not be dm'd`)
					]
				});
			});
		});
	}
};

export default command;
