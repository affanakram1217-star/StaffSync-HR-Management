# StaffSync — Modern HR Management (MERN)

A full-stack starter for a human resources workspace built with **MongoDB, Express, React, and Node.js**. It includes a polished responsive dashboard, authentication, employee directory, attendance check-in/out, leave workflows, and HR announcements.

## Features

- **Authentication:** JWT login, employee registration, bcrypt password hashing, protected API routes.
- **Role-based access:** HR, manager, and employee permissions enforced on the API.
- **People directory:** HR can add and deactivate employees; managers see their department; employees can access their own workspace.
- **Attendance:** daily check-in/check-out, attendance history, and HR/manager manual attendance entries.
- **Time off:** create leave requests, filter by status, and approve/reject requests with department checks for managers.
- **Announcements:** HR can publish role-targeted messages; team members can view announcements.
- **Dashboard:** overview cards, attendance chart, recent requests, announcements, quick actions.
- **Responsive UI:** desktop sidebar, mobile navigation, modal forms, status states, and empty states.
- **API hardening basics:** Helmet, CORS allow-list, request rate limiting on auth, request-size limit, validation, and centralized error handling.

## Prerequisites

- Node.js 20+ (Node.js 22 LTS recommended)
- npm
- MongoDB Community running locally, or a MongoDB Atlas connection string

## Run locally

1. Open a terminal in the project root (`staffsync`).
2. Install dependencies:

   ```bash
   npm install
   npm run install:all
   ```

3. Create the server environment file:

   ```bash
   cp server/.env.example server/.env
   ```

   On Windows PowerShell use:

   ```powershell
   Copy-Item server/.env.example server/.env
   ```

4. Edit `server/.env`. Set `MONGODB_URI` and replace `JWT_SECRET` with a long random secret. Example local config:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/staffsync
   JWT_SECRET=replace_with_a_long_random_secret
   CLIENT_URL=http://localhost:5173
   ```

5. Start the API and frontend together:

   ```bash
   npm run dev
   ```

6. Open **http://localhost:5173** and create an account. Public self-registration always creates an `employee` account.

API health check: `http://localhost:5000/api/health`

## Create the first HR account

For a development workspace, register an account from the UI, then promote that user in MongoDB. With `mongosh`:

```javascript
use staffsync
db.users.updateOne({ email: "your-email@example.com" }, { $set: { role: "hr" } })
```

Sign out and sign back in to refresh the user role in the JWT-backed client state. **Do not expose a public role-promotion route.** For a production app, implement a one-time owner bootstrap command or a controlled admin provisioning process.

## Useful scripts

From the root:

- `npm run dev` — frontend and backend development servers
- `npm run build` — build the React frontend
- `npm start` — start the API server (requires MongoDB and `server/.env`)

## API routes

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register an employee |
| POST | `/api/auth/login` | Public | Log in |
| GET | `/api/auth/me` | Signed in | Current profile |
| GET / POST / PATCH | `/api/users` | HR / manager (see route) | Directory and employee administration |
| GET / POST | `/api/leaves` | Signed in | List and submit leave requests |
| PATCH | `/api/leaves/:id/review` | HR / manager | Approve or reject a pending request |
| GET | `/api/attendance` | Signed in | View attendance records within access scope |
| POST | `/api/attendance/check-in` | Signed in | Check in for today |
| PATCH | `/api/attendance/check-out` | Signed in | Check out for today |
| POST | `/api/attendance/manual` | HR / manager | Add/update a manual attendance entry |
| GET | `/api/announcements` | Signed in | View announcements for the user's role |
| POST / DELETE | `/api/announcements` | HR | Publish/delete announcements |

## Project structure

```text
staffsync/
├── client/
│   ├── index.html
│   └── src/
│       ├── api.js
│       ├── App.jsx
│       ├── main.jsx
│       └── styles.css
├── server/
│   ├── .env.example
│   └── src/
│       ├── config/db.js
│       ├── middleware/auth.js
│       ├── models/ (User, Leave, Attendance, Announcement)
│       ├── routes/ (auth, users, leaves, attendance, announcements)
│       └── index.js
├── .gitignore
└── package.json
```

## Before production

This is a functional starter, not a fully audited HR product. Before deploying, add automated tests, password reset and email verification, audit logs, CSRF strategy if moving to cookie auth, stricter field-level validation, pagination, timezone/business-calendar rules, leave-balance policies, privacy/retention controls, and secure owner provisioning. Configure HTTPS, production CORS, monitoring, database backups, and secret management. Never commit `.env` or real employee data.
