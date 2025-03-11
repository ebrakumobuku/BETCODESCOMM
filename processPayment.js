exports.handler = async (event) => {
    const { email, password, channelName, channelLink } = JSON.parse(event.body);

    const paymentUrl = "https://pay.opaycheckout.com"; // Replace with actual API URL
    const redirectUrl = `https://yourwebsite.com/payment-success`;

    return {
        statusCode: 200,
        body: JSON.stringify({ payment_url: paymentUrl }),
    };
};
