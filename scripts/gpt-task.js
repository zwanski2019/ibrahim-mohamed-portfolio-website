// scripts/gpt-task.js
const { Configuration, OpenAIApi } = require("openai");

const run = async () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "user", content: "Write a motivational blog post intro for Zwanski Tech." }
    ]
  });

  console.log("Response from GPT:", response.data.choices[0].message.content);
};

run();
