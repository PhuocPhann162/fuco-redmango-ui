const axios = require('axios');

interface ChatBotRequest {
    content: string;
}

const chatBotApi = async ({content}: ChatBotRequest): Promise<void> => {
    const options = {
        method: 'POST',
        url: 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'e486906368mshe1a17a4be58f4a7p18c8d6jsn3e2257ae96a9',
            'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
        },
        data: {
            messages: [
                {
                    role: 'user',
                    content: content
                }
            ],
            system_prompt: '',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false
        }
    };
    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export default chatBotApi;