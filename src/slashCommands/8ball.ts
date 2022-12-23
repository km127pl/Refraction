import { SlashCommandBuilder, EmbedBuilder } from "discord.js"
import { SlashCommand } from "../types";

const command: SlashCommand = {
	command: new SlashCommandBuilder()
		.setName("8ball")
		.setDescription("Ask the magic 8ball a question")
		.addStringOption(option => option.setName("question").setDescription("The question you want to ask the magic 8ball").setRequired(true)),
	execute: interaction => {
		// 8ball responses
		const responses = [
			"It is certain.",
			"It is decidedly so.",
			"Without a doubt.",
			"Yes, definitely.",
			"You may rely on it.",
			"As I see it, yes.",
			"Most likely.",
			"Outlook good.",
			"Yes.",
			"Signs point to yes.",
			"Reply hazy, try again.",
			"Ask again later.",
			"Better not tell you now.",
			"Cannot predict now.",
			"Concentrate and ask again.",
			"Don't count on it.",
			"My reply is no.",
			"My sources say no.",
			"Outlook not so good.",
			"Very doubtful."
		]

		// send a "thinking" message
		interaction.reply({
			embeds: [
				new EmbedBuilder()
					.setAuthor({ name: "Refraction" })
					.setDescription("🤔 Thinking...")
					.setColor("#D14D3B")
					.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
			]
		})

		// get a random response
		const response = responses[Math.floor(Math.random() * responses.length)]

		// edit the "thinking" message to the response after 2 seconds
		setTimeout(() => {
			interaction.editReply({
				embeds: [
					new EmbedBuilder()
						.setAuthor({ name: "Refraction" })
						.setDescription(`🎱 ${response}`)
						.setColor("#D14D6B")
						.setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ size: 4096 }) })
						.setTimestamp()
				]
			})
		}, 2000)
	},
	cooldown: 10
}

export default command
