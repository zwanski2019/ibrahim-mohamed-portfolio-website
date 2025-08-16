# 🧰 Tools Offered by Zwanski Tech

You are an expert full-stack developer. Build a **React + TailwindCSS** application for the Zwanski Tech Tools page.

## Purpose
Provide developers, students and security learners with quick access to high-quality API resources grouped into categories.

### Categories
- **Public APIs** for general development
- **CTF & Security APIs** for safe hacking practice
- *Future categories:* AI APIs, Developer Tools, Data Science APIs, and more

The goal is to help beginners through experts find, learn and use these APIs safely.

## Data & Categories
- Store data for each category in its own JSON file inside `/data`.
- Add a `categories.json` config so new categories only require a JSON file and an entry in this config.

Each API entry should contain:
```json
{
  "name": "API Name",
  "description": "Short description",
  "auth": "No Auth | API Key | OAuth",
  "https": true,
  "category": "Subcategory name",
  "link": "https://docs-link.com",
  "tags": ["tag1", "tag2"]
}
```

## UI Layout
- Tabs or sidebar to switch between categories
- Search bar and filter controls (subcategory, auth type, HTTPS toggle)
- API cards with name, description, auth badge, HTTPS badge and category tag
- Buttons for **View Docs** and **Copy Link**
- Responsive design with TailwindCSS

## Special Handling for CTF/Security APIs
- Display a warning badge: *"For educational use only — do not attack real systems."*
- Provide links to setup instructions or Zwanski Tech Academy lessons if available

## Bonus Ideas
- Featured APIs of the week
- Save favorites in localStorage
- Dark mode toggle with TailwindCSS
- Offline mode with Service Workers

These guidelines will help build a beautiful, developer-friendly hub for discovering APIs while ensuring safe, ethical use.

