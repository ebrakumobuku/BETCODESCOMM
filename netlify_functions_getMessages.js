const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

exports.handler = async () => {
    const { data, error } = await supabase.from("messages").select("*").order("timestamp", { ascending: false });

    if (error) return { statusCode: 500, body: JSON.stringify(error) };

    return { statusCode: 200, body: JSON.stringify(data) };
};
