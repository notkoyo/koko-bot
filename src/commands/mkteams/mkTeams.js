const {
  PermissionFlagsBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const ID = require("../../db/models/id");
const createTeams = require("../../utils/createTeams");

module.exports = {
  name: "mkteams",
  description: "Create random teams based on current players in waiting room.",
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

      const waitingRoom = await client.channels.fetch(waitingRoomID, { force: true });
      const atkChannel = await client.channels.fetch(attackerChannelID);
      const defChannel = await client.channels.fetch(defenderChannelID);

      if (!waitingRoom) {
        return interaction.reply({
          content: "No waiting room available.",
          ephemeral: true,
        });
      } else {
        const guild = await client.guilds.fetch(process.env.GUILD_ID);

        const members = waitingRoom.members;
        const memberList = members.map((member) => member.user);

        const { attackers, defenders } = createTeams(memberList);

        const attackersTeam = attackers.filter((atk) => atk.username);
        const defendersTeam = defenders.filter((def) => def.username);

        const yes = new ButtonBuilder()
          .setCustomId("Yes")
          .setLabel("Yes")
          .setStyle(ButtonStyle.Success);

        const no = new ButtonBuilder()
          .setCustomId("No")
          .setLabel("No")
          .setStyle(ButtonStyle.Danger);

        const row = new ActionRowBuilder().addComponents(yes, no);

        const response = await interaction.reply({
          content: `Attackers Team: ${attackersTeam} \nDefenders Team: ${defendersTeam} \nDo you want to move players now?`,
          components: [row],
          ephemeral: true,
        });

        const collectorFilter = (i) => i.user.id === interaction.user.id;

        const confirmation = await response.awaitMessageComponent({
          filter: collectorFilter,
          time: 300_000,
        });

        if (confirmation.customId === "Yes") {
          for (const attacker of attackers) {
            const player = await guild.members.fetch(attacker.id);
            await player.voice.setChannel(atkChannel);
          }

          for (const defender of defenders) {
            const player = await guild.members.fetch(defender.id);
            await player.voice.setChannel(defChannel);
          }

          await interaction.editReply({
            content: "Players moved to correct channels.",
            components: [],
            ephemeral: true,
          });
        } else if (confirmation.customId === "No") {
          await interaction.editReply({
            content: "Rerun the command when you're ready to move all players.",
            components: [],
            ephemeral: true,
          });
          return;
        }
      }
    } else {
      interaction.reply({
        content: "No lobby available.",
        ephemeral: true,
      });
    }
  },
};
