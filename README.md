# ProductHub — React Router Homework

## Run
1. Install Node.js 18+.
2. Extract this ZIP and open the folder in a terminal.
3. Run `npm install`, then `npm run dev`.
4. Open the localhost URL shown by Vite.

Build with `npm run build`; preview with `npm run preview`.

## Included
- Nested React Router routes: `/`, `/about`, `/products`, `/products/:id`, `/dashboard`, `/login`, `*`.
- RootLayout, NavBar and Outlet.
- API requests isolated in `src/services/service.js`.
- Product search, category and price filters, sorting and pagination synchronized to URL query parameters using `useSearchParams`.
- Dynamic product details with `useParams`, loading/error/missing-product handling and aborting stale requests.
- Dashboard statistics and category/rating breakdowns with an interactive category filter.
- Lazy-loaded pages using React.lazy and Suspense.
- Responsive styling and custom 404.

## API
Uses live responses from DummyJSON: `https://dummyjson.com/products`. No hardcoded product catalogue is used. Dashboard values are calculated from API data.

## Deployment
Deploy to Netlify or Vercel. SPA rewrite configuration is included so direct URLs and refreshes work. Test `/products/1` after deployment.

## Submission
Push the folder to GitHub, deploy it, and submit both repository URL and deployed application URL. The assignment asks to preserve an existing project; this package is a standalone implementation because no starter React source code was attached.
