# WatchTime Pro 2.0

A responsive, browser-only YouTube growth planning website.

## Files
- `index.html` — app structure
- `styles.css` — responsive layout and design
- `app.js` — planner, daily logs, video tracker, SEO ideas, backup/restore

## Publish on GitHub Pages
Replace the existing repository files `index.html`, `styles.css`, and `app.js` with the matching files from this folder. Keep the existing `.github/workflows` folder. Commit the changes. GitHub Pages will redeploy automatically.

## Features
- Dashboard for eligible public watch-hour and subscriber targets
- Watch-time calculator based on average view duration and estimated daily long-form views
- Daily Studio reading log with changes between dates
- Video tracker with estimated hours per upload
- SEO title, description and keyword starter generator
- Local browser storage, JSON export and import
- Responsive mobile and desktop layout

## Important limitations
- This is a planning tool, not a watch-time generator. It does not create views, play videos, automate engagement, or manipulate YouTube metrics.
- Video hours are estimates (`views × average view duration ÷ 60`), not official eligible public watch hours.
- Use YouTube Studio > Earn for the actual eligible public watch-hour total.
- Data is saved in the current browser on the current device. Export backups regularly.
- Never enter a Google password into this app.
- This version does not connect to YouTube. A future official integration requires Google OAuth consent and YouTube Analytics API authorization.

## Run locally
Open `index.html` in a modern browser.
