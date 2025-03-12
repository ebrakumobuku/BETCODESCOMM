document.addEventListener("DOMContentLoaded", () => {
  loadListings();
});

async function loadListings() {
  try {
    const response = await fetch("/.netlify/functions/fetchListings");
    const listings = await response.json();
    const container = document.getElementById("listingsFeed");
    container.innerHTML = "";
    listings.forEach(listing => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${listing.channel_name}</h3>
                       <p><a href="${listing.channel_link}" target="_blank">Join Channel</a></p>`;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading listings:", error);
  }
}
