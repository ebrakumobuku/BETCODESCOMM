document.addEventListener("DOMContentLoaded", () => {
  loadCommunityPosts();
});

document.getElementById("communityForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nickname = document.getElementById("communityNickname").value.trim();
  const message = document.getElementById("communityMessage").value.trim();
  // Skipping image upload for simplicity.
  if (!nickname || !message) {
    alert("Nickname and message are required.");
    return;
  }
  const postData = { nickname, message };

  try {
    const res = await fetch("/.netlify/functions/createCommunityPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData)
    });
    if (res.ok) {
      document.getElementById("communityForm").reset();
      loadCommunityPosts();
    } else {
      alert("Error posting message.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

async function loadCommunityPosts() {
  try {
    const res = await fetch("/.netlify/functions/fetchCommunityPosts");
    const posts = await res.json();
    const container = document.getElementById("feedContainer");
    container.innerHTML = "";
    posts.forEach(post => {
      const div = document.createElement("div");
      div.classList.add("post");
      div.innerHTML = `<strong>${post.nickname}</strong>: ${post.message}<br>
                       <small>${new Date(post.created_at).toLocaleString()}</small>`;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading community posts:", error);
  }
}
