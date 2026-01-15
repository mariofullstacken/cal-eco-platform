# My Plan for This Exercise

My focus is frontend–backend integration and overall system architecture. I am aiming to improve code organization, separation of concerns, and consistency across the stack while keeping scope narrow and production-minded.

I plan to:

- Refactor a single backend domain slice to better separate routing, controllers, and business logic
- Improve the API contract and error handling for that slice
- Make the corresponding frontend integration more explicit and type-safe

I will avoid large rewrites or broad refactors and keep changes focused, aligned with existing conventions, and easy to review.

Note: React Router v7 future flags are enabled in `BrowserRouter` to silence console warnings (`v7_startTransition` and `v7_relativeSplatPath`).

## Plan Results

I focused on the users slice because the frontend calls `/users/me`, `/users/exists/username/:username`, and `/users/google`, while the backend only exposes `/api/v1/users/me`. This is a contained, high-signal area to align routes, contracts, and error handling without broad changes.

Brief update: I aligned the users API contract across backend and frontend, added a service layer and typed client, stabilized auth flows for the demo (wallet-signature login/registration with a dev fallback), added a basic logout, and fixed route prefixes.
