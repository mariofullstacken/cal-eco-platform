# My Plan with this excercise

My focus will be on frontend–backend integration and overall system architecture, specifically improving code organization, separation of concerns, and consistency across the stack, while keeping the scope intentionally narrow and production-minded.

I plan to:

- Refactor a single backend domain slice to better separate routing, controllers, and business logic
- Improve the API contract and error handling for that slice
- Make the corresponding frontend integration more explicit and type-safe

I’ll avoid large rewrites or broad refactors and keep changes focused, aligned with existing conventions, and easy to review.

Note: Enabled React Router v7 future flags in `BrowserRouter` to silence console warnings (`v7_startTransition` and `v7_relativeSplatPath`).

## Refactor a single backend domain slice
