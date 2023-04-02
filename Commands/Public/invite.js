const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Client,
    EmbedBuilder,
  } = require("discord.js");
  const link = "[INVITE ME](https://discord.com/api/oauth2/authorize?client_id=1087008389692915754&permissions=8&scope=bot)";
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("invite")
      .setDescription("Sends a invite link to the channel of this bot."),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
      await interaction.deferReply()  
      const invite = new EmbedBuilder()
        .setAuthor({ name: "My invite Link" })
        .setDescription(`${link}`)
        .setColor("Blue");
  
      interaction.editReply({ embeds: [invite], ephemeral: false });
    },
  };