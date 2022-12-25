import { randomUUID } from "crypto";
import { CategoryChannel, Client, GuildBasedChannel, Snowflake, TextChannel, VoiceChannel } from "discord.js";
import { Backup, BackupCategoryChannel, BackupInfo, BackupTextChannel, BackupVoiceChannel } from "../types";

/**
 * Load a backup for a server
 * @param backupId the id of the backup
 * @param serverId the id of the server
 * @returns if the rollback was successful
 */
const loadBackup = async (backupId : string, serverId: Snowflake, client : Client) : Promise<boolean> => {
	console.log("Loading backup");
	return false;
};

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
			backup.channels.text.push(result.value as BackupTextChannel);
		} else if (result.value instanceof VoiceChannel) {
			backup.channels.voice.push(result.value as BackupVoiceChannel);
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
const getBackup = async (backupId : string, serverId: Snowflake, client : Client) : Promise<BackupInfo> => {
	return (await client.db.get(`backup_${serverId}_${backupId}`));
};


export { saveBackup, loadBackup, getBackup };
