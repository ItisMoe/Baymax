const axios = require('axios');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: 'sk-proj-PyTednLXhw4rpe5TSUJiT3BlbkFJ64arPjQ5EcJvALnGFe1E',
});

const getPrompt = async (requestData) => {
  try {
    const response = await axios.post('http://10.21.128.63:5000', requestData);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return "Something wrong happened";
  }
};

const getResponseOpenAI = async (req, res) => {
  try {
    const prompt = await getPrompt(req.body);
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant designed to output JSON." },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    });

    const responseObjectString = completion.choices[0].message.content;
    const responseObject = JSON.parse(responseObjectString); // Parsing the JSON string
    res.status(200).json(responseObject);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getResponseOpenAI };
