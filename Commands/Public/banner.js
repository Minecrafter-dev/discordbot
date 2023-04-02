const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('banner')
    .setDescription('Get the banner of a user')
    .addUserOption(option =>
      option.setName('user')
      .setDescription('Select a user')
      .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply()
    const user = interaction.options.getUser('user');
    if (!user) {
        return interaction.editReply({content: 'Provide a valid user'}).then(msg => {
            setTimeout(() => {
                msg.delete();
            }, 1000);
    })}
    const bannerUrl = user.bannerURL({ size: 4096, format: 'png' });
    if (!bannerUrl) {
      return interaction.editReply({content: 'This user does not have banner'}).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 1000);
    })}
    
    const embed = new EmbedBuilder()
        .setColor("DarkGreen")
        .setTitle(`${user.tag}'s banner`)
        .setImage(bannerUrl)
    
    await interaction.editReply({embeds: [embed]})
  },
};
