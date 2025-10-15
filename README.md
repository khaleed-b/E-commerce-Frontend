# Ecommerce Frontend

A modern, scalable ecommerce frontend built with **React**, **TypeScript**, and **Vite**.  
This project is designed to work seamlessly with a FastAPI backend, providing a robust full-stack solution.

## Features

- **Authentication:** Secure login/register flows with context-based state management.
- **Product Catalog:** Dynamic product listing and detail pages, powered by API integration.
- **Shopping Cart:** Persistent cart with add/remove/update functionality.
- **User Dashboard:** Profile management and order history.
- **Admin Panel:** Product and user management for administrators.
- **Responsive Design:** Mobile-first UI with reusable components.
- **Loading States:** Smooth UX with loading spinners and error handling.
- **Theme Support:** Light/dark mode toggle via context.

## Tech Stack

- **React** (with hooks and context)
- **TypeScript** (type safety across the app)
- **Vite** (fast development/build tooling)
- **Tailwind CSS** (utility-first styling)
- **React Router** (client-side routing)
- **Axios/Fetch** (API communication)
- **Jest/React Testing Library** (unit testing)

## Project Structure

```
src/
  assets/         # Static assets (images, icons)
  components/     # Reusable UI components (Header, Footer, ProductCard, etc.)
  contexts/       # Global state providers (Auth, Cart, Theme)
  hooks/          # Custom React hooks (useApi)
  pages/          # Route-based pages (Home, Products, Cart, AdminPanel, etc.)
  services/       # API logic and endpoints
  types/          # TypeScript type definitions
  utils/          # Utility functions
  AppRoutes.tsx   # Route definitions
  main.tsx        # App entry point
public/           # Static files
index.html        # Root HTML file
```

## Backend Integration

This frontend is designed to connect to a [FastAPI ecommerce backend](https://github.com/khaleedo/FastAPI-E-commerce-API).  
API endpoints are managed in `src/services/apiEndpoints.ts` and consumed via custom hooks and context providers.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure API base URL:**  
   Update `src/services/api.ts` with your FastAPI backend URL.

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Testing

Run unit tests with:
```bash
npm test
```

## Contributing

Pull requests and issues are welcome!  
Please follow conventional commit messages and code style guidelines.

## License

MIT

---

**Impress recruiters:**  
- Clean architecture  
- Modular, maintainable code  
- Professional documentation  
- Full-stack integration
