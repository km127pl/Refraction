import { randomUUID } from "crypto";
import { CategoryChannel, Client, GuildBasedChannel, Snowflake, TextChannel, VoiceChannel } from "discord.js";
import { Backup, BackupCategoryChannel, BackupTextChannel, BackupVoiceChannel } from "../types";

/**
 * Save a backup for a server
 * @param serverId the id of the server
 * @returns backup data
 */
const saveBackup = async (serverId: Snowflake, client : Client) : Promise<Backup> => {
	const channels : IterableIterator<GuildBasedChannel> = (await client.guilds.fetch(serverId)).channels.cache.values();
	const backup : Backup = {
		id: randomUUID(),
		timestamp: Date.now(),
		channels: {
			text: [],
			voice: [],
			category: []
		}
	};

	let result = channels.next();
	while (!result.done) {
		if (result.value instanceof TextChannel) {
			const parentCategoryName = result.value.parent ? result.value.parent.name : undefined;
			backup.channels.text.push({
				name: result.value.name,
				type: result.value.type,
				permissionOverwrites: result.value.permissionOverwrites,
				id: result.value.id,
				topic: result.value.topic,
				rateLimitPerUser: result.value.rateLimitPerUser,
				parent: result.value.parent,
				parentCategoryName
			} as BackupTextChannel);
		} else if (result.value instanceof VoiceChannel) {
			const parentCategoryName = result.value.parent ? result.value.parent.name : undefined;
			backup.channels.voice.push({
				name: result.value.name,
				type: result.value.type,
				permissionOverwrites: result.value.permissionOverwrites,
				id: result.value.id,
				parentCategoryName
			} as BackupVoiceChannel);
		} else if (result.value instanceof CategoryChannel) {
			backup.channels.category.push(result.value as BackupCategoryChannel);
		}
		result = channels.next();
	}

	await client.db.set(`backup_${serverId}_${backup.id}`, backup);
	await client.db.set(`backups_${serverId}`, (await client.db.get(`backups_${serverId}`) || []).concat(backup.id));

	return backup;
};

/**
 * Load a backup for a server
 * @param backupId the id of the backup
 * @param serverId the id of the server
 * @returns if the rollback was successful
 */
const getBackup = async (backupId : string, serverId: Snowflake, client : Client) : Promise<Backup> => {
	return (await client.db.get(`backup_${serverId}_${backupId}`));
};

/**
 * Load a backup for a server
 * @param backupId the id of the backup
 * @param serverId the id of the server
 * @returns if the rollback was successful
 */
const loadBackup = async (backupId : string, serverId: Snowflake, client : Client) : Promise<boolean> => {
	const backup : Backup = await getBackup(backupId, serverId, client);
	if (backup) {
		const guild = await client.guilds.fetch(serverId);
		const channels = guild.channels.cache;
		const backupChannels = backup.channels;

		// Delete all channels
		for (const channel of channels.values()) {
			await channel.delete(); // This will take a while
		}

		// Create all channels
		const categories : CategoryChannel[] = [];
		for (const channel of backupChannels.category) {
			const category = await guild.channels.create({
				name: channel.name,
				type: channel.type,
			}) as CategoryChannel;
			categories.push(category);
		}

		for (const channel of backupChannels.text) {
			await guild.channels.create({
				name: channel.name,
				type: channel.type,
				rateLimitPerUser: channel.rateLimitPerUser,
				parent: categories.find((category) => category.name === channel.parentCategoryName),
			});
		}

		for (const channel of backupChannels.voice) {
			await guild.channels.create({
				name: channel.name,
				type: channel.type,
				parent: categories.find((category) => category.name === channel.parentCategoryName),
			});
		}

		return true;
	}

	return false;
};

/**
 * Delete a backup for a server
 * @param backupId the id of the backup
 * @param serverId the id of the server
 * @returns if the deletion was successful
 */
const deleteBackup = async (backupId : string, serverId: Snowflake, client : Client) : Promise<boolean> => {
	const backup : Backup = await getBackup(backupId, serverId, client);
	if (backup) {
		await client.db.delete(`backup_${serverId}_${backupId}`);
		await client.db.set(`backups_${serverId}`, (await client.db.get(`backups_${serverId}`) || []).filter((id : string) => id !== backupId));
		return true;
	}

	return false;
};

/**
 * Check if a backup exists
 * @param backupId the id of the backup
 * @param serverId the id of the server
 * @returns if the backup exists
 */
const backupExists = async (backupId : string, serverId: Snowflake, client : Client) : Promise<boolean> => {
	return (await client.db.get(`backup_${serverId}_${backupId}`)) !== undefined;
};

/**
 * Delete all backups for a server
 * @param serverId the id of the server
 */
const deleteAllBackups = async (serverId: Snowflake, client : Client) : Promise<void> => {
	const backups = await client.db.get(`backups_${serverId}`) || [];
	for (const backup of backups) {
		await deleteBackup(backup, serverId, client);
	}
};



export { saveBackup, loadBackup, getBackup, deleteBackup, backupExists, deleteAllBackups };
