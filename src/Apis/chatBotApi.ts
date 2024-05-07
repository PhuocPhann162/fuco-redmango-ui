
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
// Access your API key (see "Set up your API key" above)
interface Props {
 message: string ;
    }


    
    const MODEL_NAME = "gemini-1.5-pro-latest";
    const API_KEY = "AIzaSyCzbnNDDBBRuy90h7-jFt0t4k61ujlvboc";

async function chatBotApi(message :Props) {
  // For text-only input, use the gemini-pro model
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const parts = [
    {text: "bạn có thể giúp gì cho tôi"},
    {text: "Có thể giúp bạn đặt hàng món ăn online."},
    {text: "bạn là gì"},
    {text: "tôi là RedMango chatbot."},
    {text: "RedMango là gì"},
    {text: "RedMango là một nhà hàng phục vụ các món ăn châu Âu trực tuyến. Thực đơn của họ bao gồm nhiều lựa chọn món tráng miệng, món chính và các món ăn ngon khác. Dù bạn đang thèm một bữa ăn thịnh soạn hay một món ngọt ngào nào đó, RedMango đều có thứ dành cho bạn."},
    {text: "bạn biết gì về RedMango"},
    {text: " "},
  ];

  const result = await model.generateContent({
    contents: [{ role: "user", parts }],
    generationConfig,
    safetySettings,
  });
  // const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  // const prompt = message.message;

  // const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

export default chatBotApi;