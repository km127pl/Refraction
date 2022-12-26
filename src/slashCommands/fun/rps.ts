import { SlashCommandBuilder } from "discord.js"
import Embed from "../../function/Embed";
import { SlashCommand } from "../../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("rps")
		.setDescription("Play rock paper scissors")
		.addStringOption(option => option.addChoices({
			name: "Rock",
			value: "rock"
		}, {
			name: "Paper",
			value: "paper"
		}, {
			name: "Scissors",
			value: "scissors"
		}).setName("choice").setDescription("Your choice").setRequired(true)),
	execute: interaction => {
		const choice : string = interaction.options.get("choice")?.value as string;
		const choices : Array<string> = ["rock", "paper", "scissors"]; // choices
		const botChoice : string = choices[Math.floor(Math.random() * choices.length)]; // bot's choice

		const botWins : boolean = (choice == "rock" && botChoice == "paper") || (choice == "paper" && botChoice == "scissors") || (choice == "scissors" && botChoice == "rock"); // if bot wins
		const userWins : boolean = (choice == "rock" && botChoice == "scissors") || (choice == "paper" && botChoice == "rock") || (choice == "scissors" && botChoice == "paper"); // if user wins

		interaction.reply({
			embeds: [
				new Embed()
					.setDescription(`🪨 **Rock Paper Scissors**\n${choice == botChoice ? "It's a tie!" : userWins ? "You win!" : botWins ? "You lose!" : "Something went wrong"}`)
			]
		})

	},
	cooldown: 10
}

export default command;
