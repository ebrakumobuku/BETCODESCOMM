fetch("/.netlify/functions/fetchListings")
    .then(response => response.json())
    .then(data => {
        document.getElementById("listings-container").innerHTML = data
            .map(listing => `<div><h3>${listing.channel_name}</h3><a href="${listing.channel_link}">Join</a></div>`)
            .join("");
    });
