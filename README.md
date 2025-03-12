# CodesHubNG

## Overview
CodesHubNG is a sleek, modern community website where users can:
- View featured Telegram listings (paid listings with a monthly payment wall).
- Manage their own listings (requires sign-up, email verification, and payment).
- Post free bet codes, proofs, and Telegram links in the community section.
- Receive live updates and notifications for new community posts.

## Setup Instructions

### Supabase Setup
1. Create a Supabase project and run the following SQL queries to set up your tables:
   - `listings`
   - `community_posts`
   - `notifications`
   - (Optional: create additional tables like `users`, `transactions`, and `comments` if needed.)
2. Create a storage bucket (e.g., `proof-images`) for uploading images.
3. Set up any scheduled functions or triggers as needed.

### Netlify Setup
1. Connect your GitHub repository to Netlify.
2. Set the following environment variables in Netlify:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Ensure your Netlify functions directory is set to `netlify/functions`.
4. Deploy the site.

### Payment Integration
*This version does not yet include full payment integration. Payment processing (OPay, PalmPay, and Credit Card) will be added later. Use the placeholder function in `opay_palmpay_payment.js` to integrate payment APIs.*

## Files
- `index.html` - Home page with listings feed.
- `listings.html` - Page for users to list their Telegram channels (paid).
- `community.html` - Community page for free posts.
- `styles.css` - CSS styles.
- `script.js` - Frontend logic for home page.
- `listings.js` - Frontend logic for listings page.
- `community.js` - Frontend logic for community page.
- Netlify Functions in `netlify/functions/`:
  - `fetchListings.js`
  - `createCommunityPost.js`
  - `fetchCommunityPosts.js`
- `netlify.toml` - Netlify configuration file.

## Next Steps
- Test the posting and fetching of community posts and listings.
- Integrate payment APIs for paid listings.
- Set up notification systems for expiring listings and new posts.

Happy coding!
