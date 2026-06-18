# Nexus Request Tracker

A request tracking web app built for the PhotoMed Software Engineering Attachment assessment. Users can submit a request — a bug, feature idea, piece of feedback, partnership inquiry, or something else — and the team can view, search, filter, and manage the status of every request that comes in.

## Project info

- **Full name:** Cherop Becky Kiptanui
- **Email:** cheropbecky348@gmail.com
- **Live URL:** https://nexus-livid-eta.vercel.app/
- **GitHub repo:** https://github.com/cheropbecky/Nexus.git
- **Tech stack:** React (Vite), Tailwind CSS, React Router, lucide-react

## What this project does

Nexus lets anyone submit a request through a form (name, email, product/company, request type, priority, and a message). Once submitted, the request appears in a list where it can be searched, filtered, have its status changed, edited, or deleted. There's also an admin view for managing requests in bulk, and a dashboard that summarizes everything at a glance.

## Tech used

| Tool | Why |
|---|---|
| React + Vite | Fast dev server, component structure that matches how I think about UI |
| Tailwind CSS | Utility classes kept styling consistent across four pages without writing a separate stylesheet for each |
| React Router | Client-side routing between Dashboard, Requests, Admin, and Settings |
| lucide-react | Icon set used throughout the sidebar, buttons, and status indicators |
| localStorage | Stores all requests in the browser so they survive a page refresh, no backend needed for this version |

## Pages

- **Dashboard** — summary stats (total requests, open requests, resolved count, resolution rate), a breakdown of requests by type, a donut chart of requests by status, and a preview of the four most recent requests.
- **Requests** — the main management view. Search by name or email, and filter by product, request type, or status (three working filters, more than the one required). Each request's status can be changed, or the request can be edited or deleted from a dropdown menu.
- **Admin** — a table view of every request with checkboxes for bulk delete, CSV export (either all requests or just the selected rows), and pagination.
- **Settings** — profile info, notification toggles, and a team management table. This page uses static placeholder data since there's no authentication system in this version.

## How to run it locally

```bash
git clone https://github.com/cheropbecky/Nexus.git
cd nexus
npm install
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`) — open that in your browser.

To build a production version:
```bash
npm run build
npm run preview
```

No environment variables, API keys, or database setup are needed. Everything runs in the browser.

## What I completed

- Submit request form collecting name, email, product/company, request type, priority, and message, with inline validation (required fields, email format check, minimum message length)
- Requests persist in localStorage and survive a page refresh, satisfying the basic storage requirement
- Status workflow: New → In Review → Resolved / Rejected, changeable from a dropdown on each request card
- Search by name or email, plus three filter dropdowns (product, request type, status) — the task asked for one working filter, this has three
- Edit and delete actions on individual requests, with a confirmation prompt before deleting
- Bulk select, bulk delete, and CSV export on the Admin page, plus pagination
- Summary statistics and two charts (bar breakdown by type, donut by status) on the Dashboard, both built with plain SVG so there's no extra charting library to explain
- Fully responsive layout: a fixed sidebar and top navbar on desktop, collapsing to a bottom tab bar and a floating "add request" button on mobile

## What I did not complete

- No real authentication. The "Alex Rivera" profile and the team members list on the Settings page are static placeholder data, not wired to an actual login system. I focused my time on the core request-tracking flow first, since that's what the assessment is actually evaluating.
- No backend or database. All data lives in the browser's localStorage, so it's specific to whatever device and browser the form was submitted on. I looked into wiring this up to Supabase, but decided against it for this submission so I could keep the basic requirements solid and well-tested rather than risk an unfinished backend integration close to the deadline.
- Search only checks name and email, not the request message body. I considered adding this but didn't want to slow down the search input on larger lists without first adding debouncing, and ran out of time to do both properly.

## Challenges faced

The trickiest part was deciding how much to build before stopping. Once I had the Requests page working, it was tempting to keep adding more (auth, a real backend, drag-and-drop on a kanban view) instead of making sure the basics were genuinely solid. I pulled back and focused on making the required form, list, filter, and status-change flow work cleanly, then used the time left over for the optional pieces that felt highest-value: search, multiple filters, a dashboard, and an admin bulk-action view.

Getting the responsive layout right also took a few passes — the sidebar needed to fully disappear on mobile rather than just shrink, and the floating "add request" button needed enough bottom spacing to not collide with the bottom tab bar.

## What I'd improve with more time

- Move from localStorage to a real database (Supabase is what I'd reach for, since I've used it on other projects) so requests sync across devices instead of being stuck to one browser.
- Add real authentication so the Admin page is actually gated behind a login, instead of being open to anyone who finds the URL.
- Extend search to cover the request message text, with debouncing so it stays fast as the list grows.
- Replace the plain `window.confirm()` dialogs for delete actions with a proper modal that matches the rest of the design.
- Add toast notifications for actions like "request submitted" or "status updated" instead of the current inline confirmation state.

## AI tool use

I used Claude to help generate and structure the React components based on a Stitch design I built first, and to debug a few Tailwind layout issues on the responsive breakpoints. I reviewed all the generated code, adjusted the data flow to match how I wanted localStorage to behave (the `utils/data.js` functions and seed data), and tested every page and interaction manually before considering it done.
