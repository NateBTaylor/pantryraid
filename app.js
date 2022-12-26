const express = require('express');
// const gpt = require('./api')
const { Configuration, OpenAIApi } = require("openai")
require("dotenv").config()

const app = express();

app.use(express.static('public'));
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/', async (req, res) => {
  try {
      const response = await openai.createCompletion({
          model:"text-davinci-003",
          prompt:req.body.prompt,
          temperature:0.6,
          max_tokens:2000
      });
      res.status(200).send({
          answer: response.data.choices[0].text
      });
  } catch(error) {
      console.log("error");
      res.status(500).send({ error })
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});