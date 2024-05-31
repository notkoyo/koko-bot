require("dotenv").config();
const {Client, GatewayIntentBits} = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
const mongoose = require("mongoose");

const {TOKEN, MONGODB_URI} = process.env;
const {Guilds, GuildMembers, GuildMessages, MessageContent, GuildVoiceStates} = GatewayIntentBits;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages, MessageContent, GuildVoiceStates],
});

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Pinged the DB. Successfully connected!");

    eventHandler(client);
  } catch (e) {
    console.error("Could not connect to DB.", e);
  }
})();

client.login(TOKEN);