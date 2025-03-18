const nodemailer = require("nodemailer");
const { createClient } = require("@supabase/supabase-js");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { channel_name } = JSON.parse(event.body);
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

    // Insert payment request into Supabase
    const { error } = await supabase.from("listings").insert([{ channel_name, payment_status: "Pending" }]);

    if (error) {
        return { statusCode: 500, body: JSON.stringify(error) };
    }

    // Email Notification Setup
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Payment Notification",
        text: `A user clicked "Paid" for: ${channel_name}. Verify and confirm in Supabase.`
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: "Success" };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify(err) };
    }
};
