const { PermissionFlagsBits, ChannelType, PermissionsBitField } = require("discord.js");
const ID = require("../../db/models/id");

module.exports = {
  name: "initlobby",
  description: "Initialize a customs lobby.",
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[],
  // deleted: Boolean,
  permissionsRequired: [PermissionFlagsBits.MoveMembers],
  botPermissions: [PermissionFlagsBits.Administrator],
  callback: async (client, interaction) => {
    try {
      const createdChannels = [];
      const checkChannels = await ID.find();

      if (checkChannels.length > 0) {
        interaction.reply({
          content: "There is an active lobby already.",
          ephemeral: true,
        });
      } else {
        const customsCategory = await interaction.guild.channels.create({
          name: "╰┈➤ Customs",
          type: ChannelType.GuildCategory,
          position: 3,
        });

        const spectatorsRoom = await interaction.guild.channels.create({
          name: "Waiting Room",
          type: ChannelType.GuildVoice,
          parent: customsCategory.id,
        })
  
        const waitingRoom = await interaction.guild.channels.create({
          name: "Lobby",
          type: ChannelType.GuildVoice,
          userLimit: 10,
          parent: customsCategory.id,
        });
  
        const attackersChannel = await interaction.guild.channels.create({
          name: "Attackers",
          type: ChannelType.GuildVoice,
          userLimit: 5,
          parent: customsCategory.id,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.Connect],
            },
          ],
        });
  
        const defendersChannel = await interaction.guild.channels.create({
          name: "Defenders",
          type: ChannelType.GuildVoice,
          userLimit: 5,
          parent: customsCategory.id,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.Connect],
            },
          ],
        });
  
        createdChannels.push(
          {
            name: "CustomsCategory",
            channelId: customsCategory.id,
          },
          {
            name: "SpectatorsRoom",
            channelId: spectatorsRoom.id,
          },
          {
            name: "WaitingRoom",
            channelId: waitingRoom.id,
          },
          {
            name: "AttackersChannel",
            channelId: attackersChannel.id,
          },
          {
            name: "DefendersChannel",
            channelId: defendersChannel.id,
          }
        );
  
        interaction.reply({
          content: "Customs lobby initialized.",
          ephemeral: true,
        });

        createdChannels.forEach((channel) => {
          const newID = new ID({
            name: channel.name,
            channelId: channel.channelId,
          });
  
          newID
            .save()
            .then((res) => console.log(`Saved ${res.name} to DB.`))
            .catch((err) =>
              console.error(`Could not update DB, returned ${err}`)
            );
        });
      }
    } catch (error) {
      interaction.reply({
        content: "There was an error creating a lobby.",
        ephemeral: true,
      });
      throw new Error(error);
    }
  },
};
