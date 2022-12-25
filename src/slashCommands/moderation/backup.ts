import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { loadBackup, saveBackup } from "../../function/ServerBackup";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("backup")
		.setDescription("Create/Load a backup on the server")
		.addSubcommand(subcommand => subcommand.setName("load").setDescription("Load a backup").addStringOption(option => option.setName("id").setDescription("The id of the backup").setRequired(true)))
		.addSubcommand(subcommand => subcommand.setName("save").setDescription("Create a backup"))
		.addSubcommand(subcommand => subcommand.setName("list").setDescription("List all backups"))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	execute: async interaction => {
		const subcommand = interaction.options.data[0].name;
		const id = interaction.options.get("id")?.value as string;
		if (subcommand == "load") {
			if (interaction.guildId == null) {
				// wtf
				return;
			}
			await loadBackup(id, interaction.guildId, interaction.client);
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription("Backup loaded")
						.setColor("#D14D3B")
				]
			});
		} else if (subcommand == "save") {
			if (interaction.guildId == null) {
				// wtf
				return;
			}
			const backup = await saveBackup(interaction.guildId, interaction.client);
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription("Backup created, use `/backup load " + backup.id + "` to load it")
						.setColor("#D14D3B")
				]
			});
		} else if (subcommand == "list") {
			if (interaction.guildId == null) {
				// wtf
				return;
			}
			const backups = await interaction.client.db.get(`backups_${interaction.guildId}`);
			if (backups == null || backups.length == 0 || backups.length == undefined || backups == undefined) {
				interaction.reply({
					embeds: [
						new EmbedBuilder()
							.setAuthor({ name: "Refraction" })
							.setDescription("No backups found")
							.setColor("#D14D3B")
					]
				});
				return;
			}
			interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription("Backups: " + backups)
						.setColor("#D14D3B")
				]
			});
		}
	}
};

export default command;
