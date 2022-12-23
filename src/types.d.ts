/**
 * types declaration for discordjs slash commands
 * credits to MericcaN41 & davidotno, https://github.com/MericcaN41/discordjs-v14-template-ts/blob/main/src/types.d.ts
 */
import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction } from "discord.js"

export interface SlashCommand {
	command: SlashCommandBuilder | any,
	execute: (interaction: CommandInteraction) => void,
	autocomplete?: (interaction: AutocompleteInteraction) => void,
	cooldown?: number // in seconds
}

export interface Command {
	name: string,
	execute: (message: Message, args: Array<string>) => void,
	permissions: Array<PermissionResolvable>,
	aliases: Array<string>,
	cooldown?: number,
}

interface GuildOptions {
	prefix: string,
}


export type GuildOption = keyof GuildOptions
export interface BotEvent {
	name: string,
	once?: boolean | false,
	execute: (...args?) => void
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DISCORD_TOKEN: string,
			CLIENT_ID: string,
			PUBLIC_KEY: string
		}
	}
}

declare module "discord.js" {
	export interface Client {
		slashCommands: Collection<string, SlashCommand>
		commands: Collection<string, Command>,
		cooldowns: Collection<string, number>
	}
}