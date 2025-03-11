document.getElementById('postBetForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const nickname = document.getElementById('nickname').value;
    const betCode = document.getElementById('betCode').value;
    const betImage = document.getElementById('betImage').files[0];

    if (!nickname || !betCode) {
        alert("Nickname and bet code are required.");
        return;
    }

    const formData = new FormData();
    formData.append('nickname', nickname);
    formData.append('betCode', betCode);
    if (betImage) {
        formData.append('betImage', betImage);
    }

    try {
        const response = await fetch('/.netlify/functions/createPost', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert("Post submitted successfully!");
            location.reload();
        } else {
            alert("Error submitting post.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
