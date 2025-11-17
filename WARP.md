# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project layout

- `Backend/`: Node.js + Express REST API using MongoDB (Mongoose), Firebase Admin (FCM), Cloudinary, and PayU-style payments.
- `Frontend/`: React SPA built with Vite, React Router v7, Tailwind, and Zustand for client-side state.

The app models three main roles:
- **Client** – books logistics trips and pays for them.
- **Worker** – owns vehicles, accepts/executes trips, earns per trip.
- **Admin** – oversees trips, users, vehicles, and earnings.

---

## Common development commands

> All commands below assume a recent Node LTS (Node 18+, ideally Node 20) and are run from the indicated subdirectory.

### Install dependencies

- Backend:
  - `cd Backend`
  - `npm install`
- Frontend:
  - `cd Frontend`
  - `npm install`

### Backend: run the API

From `Backend/`:

- Start the server (no build step):
  - `node index.js`
- Optional: start with auto-reload using `node-dev` (already a dependency):
  - `npx node-dev index.js`

The server listens on `process.env.PORT` or `3000` by default.

### Frontend: dev, build, lint

From `Frontend/`:

- Start dev server (Vite, defaults to port 5173):
  - `npm run dev`
- Build for production:
  - `npm run build`
- Preview the production build locally:
  - `npm run preview`
- Lint the frontend codebase (ESLint flat config):
  - `npm run lint`

### Tests

There is currently **no automated test runner or test scripts** configured in either `Backend/` or `Frontend/`, so there is no standard command to run a single test.

---

## Backend architecture (`Backend/`)

### Entry point and HTTP surface

- `index.js` is the main entry point:
  - Sets up Express with JSON/body parsing and CORS.
  - Connects to MongoDB via `require("./Database/dbconnection")`.
  - Mounts routers:
    - `app.use("/api/payu/Client", clientPayRoute)` – initiates PayU payment requests.
    - `app.use("/api/payu/payment", paymentRoute)` – receives PayU callbacks.
    - `app.use("/", routes)` – main API surface for all Client/Worker/Admin and upload functionality.

- `Routes/route.js` is the central router that delegates to more focused route modules:
  - **Client APIs** (under `/Client/...`): auth, trip booking, profile, and trip history.
  - **Admin APIs** (under `/Admin/...`): list/delete users, workers, and vehicles; accept trips; manage admin profile.
  - **Worker APIs** (under `/Worker/...`): auth, profile, FCM token updates, worker trip flow, and vehicle management.
  - **Vehicle APIs**: generic CRUD-like operations for vehicles, partly reused from worker routes.
  - **Upload APIs**: profile image and document uploads using `multer`.

### Data layer and models

All data is stored in MongoDB via Mongoose models under `Models/`:

- `ClientSchema.js` (`Client`):
  - Basic identity (name, mobile, gender, DOB, email, password), nested address, profile picture, bio, join date.
- `WorkerSchema.js` (`Worker`):
  - Worker identity, contact info, hashed password, FCM token, address/city, avatar, status, earnings, and list of associated `Trip` IDs.
- `VechialSchema.js` (`Vehicle`):
  - Vehicle identification (name, company, type, number, model year), licensing/documents, status, owner reference (`ownerId` -> `Worker`), and earnings.
- `TripSchema.js` (`Trip`):
  - Core trip attributes: pickup/drop addresses, date, vehicle type, optional `vehicleId`, computed `pricing` object, trip `status` lifecycle, worker count, `clientId`, array of assigned `workers`, timestamps like `acceptedAt`, `isPaid`, `timeSlot`, and `commission`.

These schemas are the backbone of the domain: a `Client` creates a `Trip`, which references a `Vehicle` and is serviced by one or more `Worker` records; earnings and commissions are tracked at the `Trip`, `Worker`, and `Vehicle` level.

### Database and environment configuration

- `Database/dbconnection.js`:
  - Loads environment via `dotenv`.
  - Connects to `process.env.MONGO_URI` and logs connection status.

- `Database/firebase.js` and `sendNoti.js`:
  - `Database/firebase.js` expects a base64-encoded service account JSON in `FIREBASE_SERVICE_ACCOUNT_BASE64`.
    - It decodes this env var, parses the JSON, and uses it to initialize `firebase-admin`.
  - `sendNoti.js` defines `sendFCMNotification(token, title, body, data?)`:
    - Wraps `admin.messaging().send(...)`, logs request/response, and normalizes the result into `{ success, code?, response?, message? }`.
  - `Routes/Client/Trip/Book.js` uses `sendFCMNotification` to push notifications to vehicle owners when new trips are created.

- **Cloudinary** configuration for uploads (set per request):
  - `Routes/Upload/Profile.js` and `Routes/Upload/Document.js` both expect:
    - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` in the environment.
  - They upload user avatars/documents to Cloudinary and then delete the local temp files.

- **PayU payment configuration**:
  - `Routes/Client/clientPayRoute.js` currently uses hard-coded merchant key/salt to generate PayU payment hashes for initiating payments.
  - `Routes/Client/paymentRoute.js` uses `process.env.MERCHANT_KEY` and `process.env.MERCHANT_SALT` to validate PayU callbacks and update trip/admin/worker earnings.
  - When working on payment flows, note the split between the hard-coded client payment route and the env-driven callback route.

### Worker trip lifecycle and vehicle management

- `Routes/Worker/WorkerTripRoutes.js` encapsulates the worker-facing trip lifecycle:
  - Fetch pending trips assigned to a worker (`/Pending/:id`).
  - Accept a trip and assign a vehicle (`/Accept`).
  - Start a trip (`/Start/:id`) – marks trip as `InProgress` and sets vehicle status to `In Use`.
  - Complete a trip (`/Complete/:id`) – marks trip as `Completed`.
  - Decline a trip (`/Decline`) – removes worker from the trip’s `workers` array.
  - Fetch all trips for a worker (`/GetAll/:id`).

- `Routes/Worker/Vehicle/vehicleRoutes.js` handles vehicle CRUD and status changes for workers:
  - `createVehicle` validates and normalizes vehicle data, optionally uploads `drivingLicense` and `vehicleDocument` to Cloudinary (using `multer.fields` in the router), and saves a new `Vehicle`.
  - `getVehicles`, `getVehicle` – fetches single or multiple vehicles (often by `ownerId`).
  - `updateVehicle`, `updateVehicleStatus` – generic updates and status-only updates.
  - `getActiveVehicles` – fetches active vehicles for a given owner and vehicle type, used when assigning trips.
  - `deleteVehicle` – removes vehicles, used by admin/worker flows.

### Client-facing trip booking and payments

- `Routes/Client/Trip/Book.js`:
  - Accepts a booking payload with `clientId`, addresses, date, vehicle type, optional `vehicleId`, worker count, notes, time slot, and `pricing`.
  - Persists a `Trip` with `vehicleAssigned` true/false depending on whether a specific vehicle was chosen.
  - Finds candidate `Vehicle` records by type/availability, picks a subset of owners (workers), attaches them to the trip, and updates their `trips` arrays.
  - Sends FCM notifications to assigned workers; handles invalid tokens by unsetting `fcmToken` when the backend indicates the registration token is not registered.

- `Routes/Client/Profile.js`:
  - Provides `getClientProfile` and `updatedClientProfile` for client profile retrieval and updates (used by the frontend client dashboard/profile pages).

- `Routes/Client/clientPayRoute.js` and `Routes/Client/paymentRoute.js`:
  - `clientPayRoute` prepares the PayU payment payload and hash and returns it to the client.
  - `paymentRoute` handles PayU success/failure callbacks, validates the hash, updates `Trip` status/economic fields, updates admin and worker earnings, resets vehicle status, and redirects to the frontend with appropriate query params.

### Admin and upload flows

- Admin APIs under `Routes/Admin/`:
  - `Trips/`, `User/`, `Worker/`, `Vehicle/` route files expose operations to list trips/users/workers/vehicles, accept trips, and delete users/workers.
  - `adminProfile.js` exposes admin profile get/update endpoints.

- Upload APIs under `Routes/Upload/`:
  - `Profile.js`:
    - Route: `/profile/upload/:type/:id` (mounted in `Routes/route.js`).
    - Uploads a single avatar/profile image to Cloudinary and updates either a `Worker` or `Client` record based on `type`.
  - `Document.js`:
    - Route: `/upload/document` with optional `?folder=...` query.
    - Uploads any file to Cloudinary and returns `secure_url` and `public_id`.

### Backend environment summary

When running or modifying the backend, expect the following env vars to be needed (derived from code references):

- `MONGO_URI` – MongoDB connection string.
- `PORT` – optional, defaults to `3000` if not set.
- `FIREBASE_SERVICE_ACCOUNT_BASE64` – base64-encoded Firebase service account JSON for `firebase-admin`.
- `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` – Cloudinary credentials for uploads.
- `MERCHANT_KEY`, `MERCHANT_SALT` – PayU credentials used in `paymentRoute.js` for server-side hash validation.

If you introduce new functionality that depends on configuration, prefer adding new env vars and centralizing them instead of further hardcoding secrets or URLs into route modules.

---

## Frontend architecture (`Frontend/`)

### Tooling and build

- Vite-based React app (`vite.config.js`):
  - Uses `@vitejs/plugin-react` and Tailwind via `@tailwindcss/vite`.
  - `server.fs.strict` is disabled, which allows imports outside the project root if needed.
- ESLint flat config (`eslint.config.js`):
  - Based on `@eslint/js` recommended rules, with `react-hooks` and `react-refresh` plugins.
  - Targets `**/*.{js,jsx}` and ignores `dist/`.

### App entry and routing

- `src/main.jsx`:
  - Boots the React app, imports global styles, and wraps `App` in `BrowserRouter` from React Router v7.
  - Integrates Firebase Cloud Messaging (FCM):
    - Imports `messaging` from `./firebase-config.js` (this module currently needs to export a configured `messaging` instance for this to work).
    - Requests browser notification permission and service worker readiness, then calls `getToken` with a VAPID key and the active service worker registration to obtain an FCM token.
    - Stores the FCM token in local component state and passes it into `<App fcmToken={fcmToken} />` (future work can wire this token to the backend via worker/client APIs).
    - Registers a foreground message handler with `onMessage` that displays browser `Notification`s when push messages arrive while the app is open.

- `src/App.jsx`:
  - Central route configuration using `<Routes>` and `<Route>`:
    - Public routes:
      - `/` – `LandingPage` (marketing/landing content).
      - `/Client/Auth` – client login.
      - `/Worker/Auth` – worker login.
      - `/ContectUs`, `/AboutUs` – landing subpages.
    - Client routes under `/Client` (guarded by `localStorage.getItem("clientIsLogin")`):
      - `ClientLayout` is the parent layout.
      - Child routes: `Dashboard`, `History`, `BookTrip`, `Profile`, `Map`, `Payment/Success`.
    - Admin routes under `/Admin` (guarded by `adminIsLogin`):
      - `AdminLayout` parent.
      - Child routes: dashboard, trips, workers, users, vehicles.
    - Worker routes under `/Worker` (guarded by `workerIsLogin`):
      - `WorkerLayout` parent.
      - Child routes: dashboard, trips, profile, vehicle.
    - Worker onboarding under `/Worker/SetupProfile`:
      - `WorkerSetup` layout with nested steps (`FirstSetup`–`FifthSetup`).
  - On initial mount, checks the URL for a `redirect` query parameter and navigates to `/${redirect}` if present — this is used by external flows (e.g., payments) to deep-link into the app.

The routing structure mirrors the backend’s separation of concerns: `/Client`, `/Worker`, and `/Admin` map to client, worker, and admin flows respectively.

### State management and core client logic

State is managed with Zustand stores in `src/store/`.

- `useTripStore.jsx`:
  - Holds the in-progress trip booking state: client ID, addresses, date/time slot, vehicle type, worker requirements, notes, distance, rate, pricing, selected vehicle, loading status, and errors.
  - Provides setter methods for each field and derives `pricing` via `calculatePricing(distance, vehicleType, numWorkers)` imported from `src/utils/pricing.js`.
  - Exposes an async `fetchAllTrips` method which is intended to call a `tripAPI.getAllTrips()` helper (not defined in this file) and populate `allTrips`.
  - Uses `persist` middleware to save key booking fields to storage so that partial progress survives reloads.

- `src/utils/pricing.js`:
  - Contains the pricing model for trips: vehicle-type-specific per-unit rates and a `calculatePricing` helper that returns a structured pricing breakdown (`base`, `vehicle`, `workers`, `total`).
  - This is the single place where client-side pricing logic resides; any changes to the fare structure should be centralized here so both UI and backend remain consistent.

- `useVehicleStore.jsx`:
  - Manages vehicle registration fields for workers (type/owner/name/model/company/number/license/documents/ownerId).
  - Provides setters for each field and a `fetchVehicleDetails` stub that calls `/api/vehicle` (currently using a hard-coded relative URL).
  - Persists vehicle data to `localStorage` via `zustand/middleware`.

- `useSendWorkerNotification.jsx`:
  - Stores worker-side notification state: selected `tripId` and a small fixed-size list of notifications.
  - Provides helpers to add, mark as seen, mark all seen, and clear notifications, persisted under the `worker-notification-storage` key.
  - Intended to integrate with messages from `firebase-messaging-sw.js` or other notification sources.

### Components and pages

- `src/Pages/` contains route-level components grouped by role:
  - `Pages/Client/` – dashboard/history/profile/map/trip booking layout and pages.
  - `Pages/Worker/` – dashboard, trips, profile, vehicle management, and setup wizard layout.
  - `Pages/Admin/` – admin dashboard, trips, users, workers, vehicles views.
  - Landing-related pages (`LandingPage`, `LandingContentPage`, `LandningAboutPage`).

- `src/Component/` holds reusable pieces used by pages:
  - `Component/Client/` – dashboard hero, trip list/history, map, header, profile UI, payment success screen, etc.
  - `Component/Worker/SetupProfile/` – multi-step onboarding UI.
  - `Component/Landing/` – sections used on the marketing landing page (features, footer, etc.).

The pattern is: **route-level containers in `Pages/`** orchestrate layout, routing, and data fetching, while **presentational and smaller composable pieces live under `Component/`**.

### Firebase Cloud Messaging (frontend)

Push notifications for workers/clients are handled via Firebase both in the service worker and the React app:

- `public/firebase-messaging-sw.js`:
  - Uses the Firebase compat scripts with a concrete Firebase config to initialize messaging.
  - Listens for `push` events, shows a notification via `self.registration.showNotification`, and broadcasts notification data (including `tripId`) to all open client windows via `clients.matchAll(...).postMessage(...)`.

- `public/firebase.js`:
  - Uses the modular Firebase SDK to initialize the same Firebase project and exposes:
    - `requestFCMToken()` – obtains an FCM token using a VAPID key and the active service worker.
    - `listenForMessages(callback)` – attaches a foreground `onMessage` handler and forwards payloads to a custom callback.

- `src/main.jsx` currently imports `messaging` from `./firebase-config.js` (which is empty at present) and manually wires `Notification.requestPermission` and `getToken(messaging, { vapidKey, serviceWorkerRegistration })`.

When working on push notifications, be aware that:
- There is a split between the `public/`-level Firebase setup and the `src/`-level setup.
- The backend FCM integration (`sendNoti.js`) and frontend messaging must stay aligned on token handling and message payload shapes (e.g., including `tripId` in `data`).

---

## How to extend or debug this codebase effectively

- When adding new API endpoints, follow the existing pattern:
  - Define Mongoose schema changes or new models under `Backend/Models/`.
  - Create role-specific route modules under `Backend/Routes/{Client,Worker,Admin,Upload}/` and mount them in `Backend/Routes/route.js`.
- For frontend changes tied to new backend endpoints:
  - Add or update route-level pages under `Frontend/src/Pages/` and wire them via `App.jsx`.
  - Centralize role-specific state in `Frontend/src/store/` (consider extending existing stores rather than scattering state through components).
- For pricing or trip lifecycle changes, check both:
  - Backend `TripSchema` and associated routes (especially booking, worker trip routes, and payment handling).
  - Frontend `src/utils/pricing.js` and `useTripStore.jsx`.
