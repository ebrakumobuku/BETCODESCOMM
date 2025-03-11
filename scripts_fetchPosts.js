async function loadPosts() {
    try {
        const response = await fetch('/.netlify/functions/fetchPosts');
        const data = await response.json();
        const postContainer = document.getElementById('postContainer');
        postContainer.innerHTML = '';

        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <p><strong>${post.nickname}:</strong> ${post.betCode}</p>
                ${post.betImage ? `<img src="${post.betImage}" width="100%">` : ''}
                <p><small>${new Date(post.timestamp).toLocaleString()}</small></p>
            `;
            postContainer.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

setInterval(loadPosts, 5000); // Refresh every 5 seconds
loadPosts();
