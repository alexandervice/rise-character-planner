const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.CHAT_GPT_API_KEY;


const configuration = new Configuration({
    organization: "org-7SIWOUnZ18FQbvUshQPa3SG6",
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

module.exports = {
  chatCompletion: async (req, res) => {
    try {
      const { prompt } = message;
      console.log(prompt)
      
      const answer = await openapi.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 3000
      });

      const text = answer.data.choices[0].text;

      res.status(200).json({ text });
    } catch (err) {
      console.log("bad")
      res.status(500).json({
        message: err.message
      });
    }
  }
}