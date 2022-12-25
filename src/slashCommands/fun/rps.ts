import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
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
		const choice = interaction.options.data[0].value as string; // user's choice
		const choices = ["rock", "paper", "scissors"]; // choices
		const botChoice = choices[Math.floor(Math.random() * choices.length)]; // bot's choice

		const botWins = (choice == "rock" && botChoice == "paper") || (choice == "paper" && botChoice == "scissors") || (choice == "scissors" && botChoice == "rock"); // if bot wins
		const userWins = (choice == "rock" && botChoice == "scissors") || (choice == "paper" && botChoice == "rock") || (choice == "scissors" && botChoice == "paper"); // if user wins

		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription(`🪨 **Rock Paper Scissors**\n${choice == botChoice ? "It's a tie!" : userWins ? "You win!" : botWins ? "You lose!" : "Something went wrong"}`)
					.setColor("#D14D3B")
			]
		});

	},
	cooldown: 10
};

export default command;
