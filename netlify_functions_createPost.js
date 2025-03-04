const fetch = require('node-fetch');
const FormData = require('form-data');

exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;

    const formData = new FormData();
    const { nickname, message, image } = JSON.parse(event.body);

    formData.append("nickname", nickname);
    formData.append("message", message);
    if (image) formData.append("image", image);

    const response = await fetch(`${SUPABASE_URL}/rest/v1/posts`, {
        method: "POST",
        headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nickname, message, image })
    });

    return {
        statusCode: response.status,
        body: JSON.stringify(await response.json())
    };
};
