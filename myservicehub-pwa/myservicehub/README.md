# MyServiceHub — MVP

**UAE Equipment Service Coordination Platform**

> Connecting Customers with Trusted Technicians

---

## Tech Stack

- **Frontend:** React 18 + React Router v6
- **Styling:** Tailwind CSS v3
- **Build:** Vite
- **Hosting:** Vercel (configured)
- **Backend (ready):** Supabase (swap in when ready)

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx             # Top navigation bar
│   ├── Badge.jsx              # Status & urgency badges
│   └── RequestDetailPanel.jsx # Admin slide-in detail panel
├── pages/
│   ├── Landing.jsx            # Landing page (hero, how it works, equipment, etc.)
│   ├── RequestService.jsx     # Customer service request form
│   ├── JoinTechnician.jsx     # Technician registration form
│   └── AdminDashboard.jsx     # Admin dashboard + technician management
├── data/
│   └── mockData.js            # All mock data — replace with Supabase queries
├── lib/
│   └── AppContext.jsx         # Global state (React Context)
├── App.jsx                    # Routes
├── main.jsx                   # Entry point
└── index.css                  # Tailwind + component styles
```

---

## Supabase Integration Guide

When you're ready to connect a real database, replace the mock data and context functions in `src/lib/AppContext.jsx` and `src/data/mockData.js`.

### 1. Create a Supabase project

Go to https://supabase.com and create a new project.

### 2. Install Supabase client

```bash
npm install @supabase/supabase-js
```

### 3. Create a Supabase client file

Create `src/lib/supabase.js`:

```js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
```

Create a `.env` file in the project root:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Supabase table schemas

**service_requests**
```sql
create table service_requests (
  id text primary key,
  customer_name text not null,
  company text,
  mobile text not null,
  email text,
  customer_type text,
  category text,
  equipment text,
  brand text,
  model text,
  serial text,
  problem text,
  description text,
  address text,
  emirate text,
  office_timing text,
  preferred_date date,
  preferred_time time,
  urgency text default 'Normal',
  status text default 'New',
  assigned_tech text,
  notes text,
  created_at timestamptz default now()
);
```

**technicians**
```sql
create table technicians (
  id text primary key,
  name text not null,
  mobile text not null,
  email text not null,
  expertise text[],
  emirates text[],
  brands text,
  experience text,
  type text,
  availability text,
  notes text,
  status text default 'Pending',
  joined_at date default now()
);
```

### 5. Replace AppContext functions

Example — replace `addRequest` in `AppContext.jsx`:

```js
async function addRequest(req) {
  const newId = `MSH-${Date.now()}`
  const { data, error } = await supabase
    .from('service_requests')
    .insert([{ id: newId, ...req, status: 'New' }])
    .select()
  if (!error) setRequests(prev => [data[0], ...prev])
  return newId
}
```

---

## Deploying to Vercel

1. Push this project to a GitHub repository
2. Go to https://vercel.com and import the repository
3. Vercel auto-detects Vite — no config needed
4. Add environment variables in Vercel dashboard if using Supabase
5. Deploy

The `vercel.json` file handles SPA routing (all paths → index.html).

---

## Next Phase (Phase 2 Ideas)

- Supabase Auth for admin login
- File uploads (photos/videos/CVs) via Supabase Storage
- Google Maps API integration for location picker
- Email/WhatsApp notifications on request assignment
- Technician ratings
- AMC management module
- Full Arabic UI

---

## Contact

support@myservicehub.com
