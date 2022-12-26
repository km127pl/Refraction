import { EmbedBuilder } from "discord.js";
import { EmbedOptions } from "../types";

export class Embed extends EmbedBuilder {
	public constructor(opts?: EmbedOptions) {
		super();

		if (opts?.addTimestamp) {
			this.setTimestamp(opts.timestamp || new Date());
		}

		if (opts?.addFooter && opts?.interaction) {
			this.setFooter({ text: `Requested by ${opts.interaction.user.username}` })
		}

		this.setColor(opts?.color || process.env.ACCENT_COLOR || "#ffffff");
		this.setAuthor({
			name: process.env.NAME || "Change me in .env"
		});
	}
}

export default Embed;

