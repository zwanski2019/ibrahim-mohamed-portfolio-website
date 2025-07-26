# Zwanski Admin Panel

This directory contains a minimal React admin panel that connects to the existing Supabase backend.

## Development

1. Copy `.env.example` to `.env` and provide your Supabase credentials.
2. Run `npm run dev -- --config ../vite.config.ts --root .` to start the admin dev server.

The panel is designed to be deployed separately at `admin.zwanski.org` or `/admin` and does not modify the main website.
