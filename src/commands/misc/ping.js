const { PermissionFlagsBits, ChannelType } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Ping the bot to check active/inactive state.",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  callback: (client, interaction) => {
    if (interaction) {
      interaction.reply(`Bot is online and returned a ping of ${client.ws.ping}ms.`)
    } else {
      throw new Error("Bot is offline.")
    }
  },
};