document.getElementById("listing-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const channelName = document.getElementById("channel-name").value;
    const channelLink = document.getElementById("channel-link").value;

    const response = await fetch("/.netlify/functions/processPayment", {
        method: "POST",
        body: JSON.stringify({ email, password, channelName, channelLink }),
    });

    const data = await response.json();
    window.location.href = data.payment_url;
});
