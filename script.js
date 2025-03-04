const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById('postBtn').addEventListener('click', () => {
    document.getElementById('postFormContainer').classList.remove('hidden');
});

document.getElementById('closeForm').addEventListener('click', () => {
    document.getElementById('postFormContainer').classList.add('hidden');
});

document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nickname = document.getElementById('nickname').value;
    const betCodes = document.getElementById('betCodes').value;
    const telegramLink = document.getElementById('telegramLink').value;
    
    const { data, error } = await db.from('posts').insert([
        { nickname, betCodes, telegramLink }
    ]);

    if (error) {
        console.error("Error posting:", error.message);
    } else {
        document.getElementById('postFormContainer').classList.add('hidden');
        fetchPosts(); // Refresh posts
    }
});

async function fetchPosts() {
    const { data, error } = await db.from('posts').select("*").order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching posts:", error.message);
        return;
    }

    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = "";

    data.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `<strong>${post.nickname}</strong><br>${post.betCodes || ''}<br>${post.telegramLink ? `<a href="${post.telegramLink}" target="_blank">Telegram</a>` : ''}`;
        postsContainer.appendChild(postElement);
    });
}

// Load posts on page load
fetchPosts();
