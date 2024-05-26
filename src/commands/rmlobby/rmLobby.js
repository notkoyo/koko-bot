const { PermissionFlagsBits } = require("discord.js");
const ID = require("../../db/models/id");

module.exports = {
  name: "rmlobby",
  description: "Remove a customs lobby.",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  callback: async (client, interaction) => {
    const allChannels = await ID.find();

    if (allChannels.length > 0) {
      const vcID = allChannels
        .filter(
          (channel) =>
            channel.name.includes("Channel") || channel.name.includes("Room")
        )
        .map((channel) => channel.channelId);
      const categoryID = allChannels
        .filter(
          (channel) => channel.name === "CustomsCategory" && channel.channelId
        )
        .map((channel) => channel.channelId);

      for (const id of vcID) {
        await interaction.guild.channels.delete(
          await interaction.guild.channels.fetch(id)
        );
      }
      await interaction.guild.channels.delete(
        await interaction.guild.channels.fetch(categoryID)
      );

      await ID.collection.drop();

      interaction.reply({
        content: "Successfully deleted customs lobby.",
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: "No lobby available.",
        ephemeral: true,
      });
    }
  },
};
