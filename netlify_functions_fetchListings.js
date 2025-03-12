const fetch = require("node-fetch");

exports.handler = async () => {
  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/listings?select=*`, {
      method: "GET",
      headers: {
        "apikey": process.env.SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY}`
      }
    });
    const listings = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(listings)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
