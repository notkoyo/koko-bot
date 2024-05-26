const { PermissionFlagsBits } = require("discord.js");
const ID = require("../../db/models/id");

module.exports = {
  name: "testperms",
  description: "---",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  deleted: true,
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  callback: async (client, interaction) => {
    const allChannels = await ID.find();

    const waitingRoomID = allChannels
        .filter((channel) => channel.name === "WaitingRoom")
        .map((wr) => wr.channelId);

    const waitingRoom = await client.channels.fetch(waitingRoomID, {
      force: true,
    });

    interaction.reply({
      content: "yes",
      ephemeral: true,
    })
  }
}