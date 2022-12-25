/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { REST } from "@discordjs/rest";
import { readdirSync, statSync } from "fs";
import { join } from "path";
import { SlashCommand } from "./types";

export default function registerCommands(client : Client) {
	const register = async (file : string) => {
		if (!file.endsWith(".js")) return;
		console.log(`[!] Loading ${file}...`);
		const command: SlashCommand = require(file).default;
		slashCommands.push(command.command);
		client.slashCommands.set(command.command.name, command);
	};

	const slashCommands : SlashCommandBuilder[] = [];

	const slashCommandsDir = join(__dirname,"./slashCommands");
	// let commandsDir = join(__dirname,"./commands")

	readdirSync(slashCommandsDir).forEach(file => {
		// if is a directory
		if (statSync(`${slashCommandsDir}/${file}`).isDirectory()) {
			readdirSync(`${slashCommandsDir}/${file}`).forEach(f => register(`${slashCommandsDir}/${file}/${f}`));
		} else {
			register(`${slashCommandsDir}/${file}`);
		}
	});

	const rest = new REST({version: "10"}).setToken(process.env.DISCORD_TOKEN);

	rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
		body: slashCommands.map(command => command.toJSON())
	})
		.then((data : any) => {
			console.log(`[!] Successfully loaded ${data.length} slash command(s)`);
		}).catch(e => {
			console.log(e);
		});
}
