import { SlashCommandBuilder, PermissionFlagsBits, ChannelType, TextChannel } from "discord.js";
import Embed from "../../function/Embed";
import { deleteAllBackups, loadBackup, saveBackup } from "../../function/ServerBackup";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("backup")
		.setDescription("Create/Load a backup on the server")
		.addSubcommand(subcommand => subcommand.setName("load").setDescription("Load a backup").addStringOption(option => option.setName("id").setDescription("The id of the backup").setRequired(true)))
		.addSubcommand(subcommand => subcommand.setName("save").setDescription("Create a backup"))
		.addSubcommand(subcommand => subcommand.setName("list").setDescription("List all backups"))
		.addSubcommand(subcommand => subcommand.setName("delete").setDescription("Delete a backup").addStringOption(option => option.setName("id").setDescription("The id of the backup").setRequired(true)))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	execute: async interaction => {
		const subcommand = interaction.options.data[0].name;
		const id = interaction.options.get("id")?.value as string;
		if (interaction.guildId == null) {
			throw new Error("Guild does not have an ID, how did this happen?");
		}
		if (subcommand == "load") {
			interaction.deferReply();
			await loadBackup(id, interaction.guildId, interaction.client);
			// get the first channel
			const channel = interaction?.guild?.channels.cache.filter(channel => channel.type == ChannelType.GuildText).first();
			if (channel != null) {
				(channel as TextChannel).send({
					embeds: [
						new Embed({ addTimestamp: true, interaction, addFooter: true })
							.setDescription("Backup loaded")
					]
				});
			}

		} else if (subcommand == "save") {
			const backup = await saveBackup(interaction.guildId, interaction.client);
			interaction.reply({
				embeds: [
					new Embed({ addTimestamp: true, interaction, addFooter: true })
						.setDescription(`Backup created, use </backup load:1056986534693318666> with the id\n \`${backup.id}\` to load it!`)
				]
			});
		} else if (subcommand == "list") {
			const backups = await interaction.client.db.get(`backups_${interaction.guildId}`);
			if (backups == null || backups.length == 0 || backups.length == undefined || backups == undefined) {
				interaction.reply({
					embeds: [
						new Embed({ addTimestamp: true, interaction, addFooter: true })
							.setDescription("No backups were found")
					]
				});
				return;
			}
			interaction.reply({
				embeds: [
					new Embed({ addTimestamp: true, interaction, addFooter: true })
						.setDescription(`Backups for **${interaction.guild?.name}** \n • ${backups.join("\n • ")}`)
				]
			});
		} else if (subcommand == "delete") {
			// check if the backup exists and this guild is the owner


			if (id.toLowerCase() == "all") {
				await deleteAllBackups(interaction.guildId, interaction.client);
				interaction.reply({
					embeds: [
						new Embed({ addTimestamp: true, interaction, addFooter: true })
							.setDescription("All backups were deleted")
					]
				});
				return;
			}

			const backups = await interaction.client.db.get(`backups_${interaction.guildId}`);
			if (backups == null || backups.length == 0 || backups.length == undefined || backups == undefined) {
				interaction.reply({
					embeds: [
						new Embed({ addTimestamp: true, interaction, addFooter: true })
							.setDescription("No backups were found")
					]
				});
				return;
			}
			if (!backups.includes(id)) {
				interaction.reply({
					embeds: [
						new Embed({ addTimestamp: true, interaction, addFooter: true })
							.setDescription("This backup does not exist")
					]
				});
				return;
			}
			await interaction.client.db.delete(`backup_${id}`);
			await interaction.client.db.set(`backups_${interaction.guildId}`, backups.filter((backup: string) => backup != id));
			interaction.reply({
				embeds: [
					new Embed({ addTimestamp: true, interaction, addFooter: true })
						.setDescription(`Backup \`${id}\` deleted`)
				]
			});
		}
	}
};

export default command;
