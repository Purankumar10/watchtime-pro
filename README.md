# WatchTime Pro — YouTube Growth Planner

A responsive, static website for planning authentic YouTube channel growth.

## Run locally
1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. No build step, server, database, API key, or account is required.

For local development you can also run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Features
- Dashboard for watch-hour and subscriber goals
- Calculator using remaining hours, average view duration, and expected daily views
- Video tracker with estimated hours per upload
- Basic title, description, and keyword idea generator
- Browser-local persistence using `localStorage`
- JSON backup export
- Responsive mobile and desktop layout

## Important limitations
- This is a planning tool, not a watch-time generator.
- It does not play videos, create views, automate engagement, or connect to YouTube.
- Video tracker hours are estimates (`views × average view duration ÷ 60`), not official eligible public watch hours.
- Use the eligible public watch-hour figure shown in YouTube Studio > Earn for your actual progress.
- The app stores data only in the current browser on the current device. Clearing browser data may erase it; use Export Data for a backup.
- No Google password should ever be entered into this app.

## Monetization note
YouTube's eligibility requirements and definitions can change. Check the current YouTube Studio Earn page and official YouTube Help documentation for your channel's region and account. Public Shorts-feed watch time does not count toward the 4,000 public watch-hour route.

Official reference:
https://support.google.com/youtube/answer/72851
