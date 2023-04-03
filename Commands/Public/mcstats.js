const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const axios = require('axios')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mcstats')
        .setDescription('Get information about a minecraft server')
        .addStringOption(option =>
            option.setName('server')
                .setDescription('Input ip')
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply()
        const { options } = interaction
        const apiUrl = 'https://api.mcsrvstat.us/2/'
        const server = options.getString('server')
        const loadingEmbed = new EmbedBuilder()
            .setDescription('**Loading server data . . .**')
        const loadingMsg = await interaction.editReply({ embeds: [loadingEmbed]})
        const loadingDots = [' .  ', ' . . ', ' . . .']
        let i = 0
        const loadingInterval = setInterval(() => {
            loadingEmbed.setDescription(`**Loading server data${loadingDots[i]}**`)
            loadingMsg.edit({ embeds: [loadingEmbed] })
            i = (i + 1) % loadingDots.length
        }, 500)
        axios.get(`${apiUrl}${server}`).then(response => {
            clearInterval(loadingInterval)
            const embed = new EmbedBuilder()
                .setTitle(response.data.motd.clean[0])
                .setDescription(`${response.data.hostname}`)
                .setColor("Green")
                .setThumbnail(`https://eu.mc-api.net/v3/server/favicon/${server}`)
                .addFields(
                    { name:"Players", value:`${response.data.players.online}/${response.data.players.max}`},
                    { name:"Version", value:response.data.version},
                    { name:"Server IP" , value:server},
                )
            interaction.editReply({ embeds: [embed] })
        }).catch(error => {
            const em = new EmbedBuilder()
                .setColor("Red")
                .setDescription("**Server offline or wrong ip**")
            interaction.editReply({embeds: [em]}).then(msg => {
                setTimeout(() => {
                    msg.delete();
                }, 1000);
            })
            console.log(error);
        })
    }
};
