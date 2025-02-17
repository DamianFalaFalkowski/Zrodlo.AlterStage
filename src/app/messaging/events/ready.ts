import { Client, Events } from "discord.js";
import { TagsRepository } from "../../../model/tags.model";

// Informuje o tym, ze klient jest polaczony z api i gotowy.
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: Client<true>) {
		TagsRepository.sync();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};