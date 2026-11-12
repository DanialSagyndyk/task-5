# ProductHub — Server Data, Caching & Firebase Authentication

React Router project extended with Firebase Authentication and TanStack Query caching.

## Run locally
1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in the Firebase web app configuration.
4. Run `npm run dev` and open the Vite URL.
5. Create a production build with `npm run build`.

## Firebase setup
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Open **Build → Authentication → Get started → Sign-in method**.
3. Enable **Email/Password** and **Google** providers.
4. In Project settings, register a Web App and copy its config values into `.env.local` using the variable names from `.env.example`.
5. In Authentication → Settings → Authorized domains, ensure `localhost` and your deployed domain are listed.
6. Restart Vite after changing environment variables. Never commit `.env.local`.

Vite exposes only variables prefixed with `VITE_` to browser code. Firebase web configuration identifies the project; configure Firebase Security Rules for any database or storage resources added later.

## Routes
- `/` — home
- `/about` — project information
- `/products` — searchable, filterable and paginated catalogue
- `/products/:id` — product details
- `/dashboard` — catalogue analytics
- `/login` — email/password and Google sign-in
- `/signup` — email registration with password confirmation
- `/profile` — protected Firebase user profile and logout

The product catalogue keeps its URL-based search, category/price filters, sorting and pagination. Unauthenticated users are redirected from `/profile` to `/login`; after successful login they return to the originally requested page.

## Authentication architecture
- `src/services/firebase.js` initializes Firebase from Vite environment variables and configures browser-local persistence.
- `src/services/authService.js` contains Firebase authentication operations.
- `src/context/AuthContext.jsx` exposes `AuthProvider` and `useAuth`, tracks sessions with `onAuthStateChanged`, and exposes loading and error state.
- `src/components/ProtectedRoute.jsx` protects private routes.

## Caching strategy
TanStack Query is configured in `src/main.jsx`. Product list queries use stable keys (`["products", "list", filters]`); product details use `["products", "detail", id]`; categories use `["products", "categories"]`.

- `staleTime: 5 minutes`: data is considered fresh for five minutes, so navigating between the catalogue and dashboard reuses cached results without an immediate request.
- `gcTime: 30 minutes`: inactive cache entries remain available for up to thirty minutes.
- `refetchOnWindowFocus: true`: stale data is revalidated when the user returns to the tab.
- Query functions receive TanStack Query's `AbortSignal`, so obsolete requests can be cancelled when a query is no longer needed. Query keys keep results for different product IDs and filters separate, preventing old responses from replacing another query's data.
- `useProductMutations` in `src/hooks/useProducts.js` exposes create, update and delete mutations. On successful writes it invalidates the `products` query-key family, causing affected cached lists and details to refresh. DummyJSON simulates write operations and does not permanently store changes.

Loading, error and empty states are displayed in the catalogue, dashboard and details page.

## Deployment
Deploy the repository to Vercel or Netlify. Add the same `VITE_FIREBASE_*` values in the hosting provider's environment-variable settings, then redeploy. Add the deployed hostname to Firebase Authentication's authorized domains. SPA rewrite configuration is included for Vercel and Netlify.

## Previous functionality retained
Nested React Router layout, lazy-loaded pages, dynamic product details, product search, filters, sorting, URL query parameters, pagination, dashboard statistics, loading/error/empty states, responsive design and custom 404 page.
