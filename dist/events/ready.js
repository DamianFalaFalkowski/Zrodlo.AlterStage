"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const tags_model_1 = require("../model/tags.model");
module.exports = {
    name: discord_js_1.Events.ClientReady,
    once: true,
    execute(client) {
        tags_model_1.TagsRepository.sync();
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
