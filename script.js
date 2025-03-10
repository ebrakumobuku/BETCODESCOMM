document.getElementById('postButton').addEventListener('click', () => {
    document.getElementById('postModal').style.display = 'block';
});

document.getElementById('submitPost').addEventListener('click', async () => {
    const nickname = document.getElementById('nickname').value;
    const betCode = document.getElementById('betCode').value;

    if (!nickname || !betCode) {
        alert("Nickname and bet code are required!");
        return;
    }

    const response = await fetch('/.netlify/functions/createPost', {
        method: 'POST',
        body: JSON.stringify({ nickname, betCode }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        location.reload();
    } else {
        alert("Failed to post.");
    }
});
