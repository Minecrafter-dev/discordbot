const {
    SlashCommandBuilder,
    EmbedBuilder,
  } = require("discord.js");
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("ask-gpt")
      .setDescription("Ask Gpt 3.0 some questions")
      .addStringOption((options) =>
        options.setName("query").setDescription("Give a query").setRequired(true)
      ),
    /**
     *
     * @param { ChatInputCommandInteraction } interaction
     * @param { Client } client
     */
    async execute(interaction, client) {
      await interaction.deferReply();
      const { user, options } = interaction;
      const query =
        (await options.getString("query")) || "How are you? - Not provided";
      const { Configuration, OpenAIApi } = require("openai");
      org = ""
      key = "YOUR OPENAI TOKEN"
      const configuration = new Configuration({
        organization: org,
        apiKey: key,
      });
      const openai = new OpenAIApi(configuration);
  
      const gptResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Hey give me a response for this: ${query}`,
        temperature: 0.5,
        max_tokens: 200,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
      });
      if (gptResponse === undefined || gptResponse === null) {
        interaction.editReply({
          content: "I didn't understand!, can you run the command again?",
          ephemeral: true,
        });
        return;
      } else {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `${user.tag}`,
            iconURL: user.displayAvatarURL({ dynamic: true }),
          })
          .setTitle(`Query: \`${query}\``)
          .setDescription(
            "**AskGpt:\n** ```" + gptResponse.data.choices[0].text + "```"
          )
          .setColor("Random");
        interaction.editReply({ embeds: [embed], ephemeral: true });
      }
    },
  };
  
