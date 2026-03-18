# Parent Ride (Frontend)

## Setup

```bash
cd frontend
npm install
```

## Configure API base URL

Create `frontend/.env` (or copy from `.env.example`):

```bash
VITE_API_BASE_URL=http://localhost:5000
```

## Run

```bash
npm run dev
```

## Backend endpoints used

- `POST /api/v1/users/register`
- `POST /api/v1/users/login`
- `GET /api/v1/users/get-current-user` (requires `Authorization: Bearer <token>`)

