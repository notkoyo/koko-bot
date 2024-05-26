require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');
const mongoose = require('mongoose');

const { TOKEN, MONGODB_URI } = process.env;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Pinged the DB. Successfully connected!");
    
    eventHandler(client);
  } catch (error) {
    console.error("Could not connect to DB.");
  }
})();

client.login(TOKEN);