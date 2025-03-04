document.getElementById("postButton").addEventListener("click", async () => {
    const nickname = document.getElementById("nickname").value.trim();
    const message = document.getElementById("message").value.trim();
    
    if (!nickname || !message) {
        alert("Nickname and message are required!");
        return;
    }

    const postData = { nickname, message, timestamp: new Date().toISOString() };

    const response = await fetch("/.netlify/functions/postMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        document.getElementById("message").value = "";
        loadFeed();
    } else {
        alert("Failed to post message.");
    }
});

async function loadFeed() {
    const response = await fetch("/.netlify/functions/getMessages");
    const messages = await response.json();
    const feed = document.getElementById("feed");

    feed.innerHTML = "";
    messages.forEach(msg => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${msg.nickname}:</strong> ${msg.message} <br><small>${new Date(msg.timestamp).toLocaleString()}</small>`;
        feed.appendChild(div);
    });
}

loadFeed();
