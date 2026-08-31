# TripVault — Week 4 Ready Project

## Open in VS Code

Extract this ZIP and open the `tripvault-codgen` folder in Visual Studio Code.

## Backend

```powershell
cd server
npm install
npm run dev
```

Create `server/.env` with your existing MongoDB, JWT, and Cloudinary values.

## Frontend

Open a second terminal:

```powershell
cd client
npm install
npm run dev
```

## Important

Do not commit `server/.env`. The repository `.gitignore` already excludes it.

## Week 4 included

- Responsive desktop/tablet/mobile UI
- Mobile navigation
- Improved dashboard cards and trip cards
- Improved forms and travel-journal visual design
- Toast success/error feedback
- Loading and empty states
- Retry states for failed requests
- Trip date validation
- Photo type/size validation
- Maximum 10-photo selection
- Duplicate-save prevention
