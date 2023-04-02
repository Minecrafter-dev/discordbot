const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('This command will send a meme!'),
    async execute (interaction) {
        await interaction.deferReply()
        async function meme() {
            await fetch(`https://www.reddit.com/r/memes/random/.json`)
            .then(async r => {

                let meme = await r.json();

                let title = meme[0].data.children[0].data.title;
                let image = meme[0].data.children[0].data.url;
                let author = meme[0].data.children[0].data.author;

                const embed = new EmbedBuilder()
                .setColor("Blurple")
                .setTitle(`${title}`)
                .setImage(`${image}`)
                .setURL(`${image}`)
                .setFooter({ text: author })

                await interaction.editReply({ embeds: [embed] });
            })
        }

        meme();
    }
}