import { Events } from "discord.js";
import { sequelizeContext } from '../run-discord-app';
import { TagsRepository } from "../model/tags.model";

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client: any) {
		TagsRepository.sync();
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};