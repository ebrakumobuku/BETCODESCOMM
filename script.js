document.addEventListener("DOMContentLoaded", fetchPosts);

function fetchPosts() {
    fetch('/.netlify/functions/fetchPosts')
        .then(response => response.json())
        .then(data => {
            let chatBox = document.getElementById('chat-box');
            chatBox.innerHTML = "";
            data.forEach(post => {
                let postDiv = document.createElement("div");
                postDiv.innerHTML = `<strong>${post.nickname}:</strong> ${post.message}`;
                if (post.image) {
                    let img = document.createElement("img");
                    img.src = post.image;
                    img.style.width = "100px";
                    postDiv.appendChild(img);
                }
                chatBox.appendChild(postDiv);
            });
        });
}

function submitPost() {
    let nickname = document.getElementById('nickname').value;
    let betCode = document.getElementById('betCode').value;
    let imageUpload = document.getElementById('imageUpload').files[0];

    if (!nickname.trim()) {
        alert("Nickname is required!");
        return;
    }

    let formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("message", betCode);
    if (imageUpload) formData.append("image", imageUpload);

    fetch('/.netlify/functions/createPost', {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        fetchPosts();
    });
}
