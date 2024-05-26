require("dotenv").config();
const { PermissionFlagsBits } = require("discord.js");
const ID = require("../../db/models/id");

const { GUILD_ID } = process.env;

module.exports = {
  name: "movetowait",
  description:
    "Move all current players from team voice channels back to the waiting room.",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,
  permissionsRequired: [PermissionFlagsBits.Administrator],
  botPermissions: [PermissionFlagsBits.Administrator],
  callback: async (client, interaction) => {
    const allChannels = await ID.find();

    if (allChannels.length > 0) {
      const waitingRoomID = allChannels
        .filter((channel) => channel.name === "WaitingRoom")
        .map((wr) => wr.channelId);

      const attackerChannelID = allChannels
        .filter((channel) => channel.name === "AttackersChannel")
        .map((ac) => ac.channelId);

      const defenderChannelID = allChannels
        .filter((channel) => channel.name === "DefendersChannel")
        .map((dc) => dc.channelId);

      const waitingRoom = await client.channels.fetch(waitingRoomID, {
        force: true,
      });
      const atkChannel = await client.channels.fetch(attackerChannelID, {
        force: true,
      });
      const defChannel = await client.channels.fetch(defenderChannelID, {
        force: true,
      });

      if (!waitingRoom) {
        return interaction.reply({
          content: "No waiting room available.",
          ephemeral: true,
        });
      } else {
        const guild = await client.guilds.fetch(GUILD_ID);

        const atkMembers = await atkChannel.members.map(
          (member) => member.user
        );
        const defMembers = await defChannel.members.map(
          (member) => member.user
        );

        for (const attacker of atkMembers) {
          const player = await guild.members.fetch(attacker.id);
          await player.voice.setChannel(waitingRoom);
        }
        
        for (const defender of defMembers) {
          const player = await guild.members.fetch(defender.id);
          await player.voice.setChannel(waitingRoom);
        }

        await waitingRoom.permissionOverwrites.create(waitingRoom.guild.roles.everyone, { Connect: true });

        await interaction.reply({
          content: "All players moved back to the waiting room.",
          ephemeral: true,
        });
      }
    } else {
      interaction.reply({
        content: "No lobby available.",
        ephemeral: true,
      });
    }
  },
};
