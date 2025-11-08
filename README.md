# Movie Manager Client

A modern movie management application built with React, TypeScript, Vite, and Supabase.

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (for backend)

### Setup (3 steps)

1. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   Then update `.env` with your Supabase credentials:
   - `VITE_SUPABASE_URL` - Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` - Your Supabase anon key
   - `VITE_BASE_URL` - Your backend API URL (default: http://localhost:3000)

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   App runs at `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Supabase** - Backend & database
- **React Router** - Navigation
- **React Hook Form** - Form management
- **Axios** - HTTP client

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page components
├── features/      # Feature-specific modules
├── context/       # React context providers
├── lib/           # Utilities & configurations
├── types/         # TypeScript type definitions
└── assets/        # Static assets
```

## Environment Variables

Required environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BASE_URL=your_backend_api_url
```

## Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5173
npx kill-port 5173
```

**Dependencies issue?**
```bash
# Clean install
rm -rf node_modules yarn.lock
yarn install
```
