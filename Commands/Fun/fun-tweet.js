const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("tweet")
    .setDescription("Post a real tweet")
    .addStringOption((option) =>
      option
        .setName("tweet")
        .setDescription("Enter your tweet")
        .setRequired(true)
    ),
  async execute(interaction) {
    let tweet = interaction.options.getString("tweet");
    let avatarUrl = interaction.user.avatarURL({ extension: "jpg" });
    let canvas = `https://some-random-api.ml/canvas/tweet?avatar=${avatarUrl}&displayname=${
      interaction.user.username
    }&username=${interaction.user.username}&comment=${encodeURIComponent(
      tweet
    )}`;

    const embed = new discord.EmbedBuilder()
      .setTitle("Fake Tweet!")
      .setImage(canvas)
      .setTimestamp()
      .setColor("Random");

    await interaction.reply({ embeds: [embed] });
  },
};