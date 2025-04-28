# Zubak Pavlo - Pixoram Test Task

## Description

ZubakPavlo-PixoTest is a test project developed for Pixoram as part of a Middle Frontend Developer assignment. It is an online product catalog application that allows users to browse products, filter them by categories and price range, sort by various criteria (price, name, rating), view product details, add items to a shopping cart, and complete a checkout process. The product data is fetched from the public [Fake Store API](https://fakestoreapi.com/).

### Core Features

- Product Listing Page:
  - Displays products in a grid or list view with a toggle to switch between views.
  - Filtering products by categories and price range.
  - Sorting products by price (low to high, high to low), name (A-Z, Z-A), and rating.
- Product Detail Page:
  - Shows complete product information (title, price, category, rating, image, etc.).
- Shopping Cart:
  - Add products to the cart.
  - Update quantities of items in the cart.
  - Remove items from the cart.
  - Clear the cart.
  - Checkout functionality (with a checkout state toggle).
- Responsive Design:
  - Supports multiple devices (mobile, tablet, desktop).
- Form Validation:
  - Validates user input during the checkout process (e.g., ensuring correct form data).
- Testing:
  - Unit tests are written for key parts of the application, specifically for Redux slices (`cartSlice`, `productsSlice`).

### Technical Requirements and Stack

The project meets the technical requirements outlined in the Pixoram test assignment:

- **Frontend**: Next.js (version 15.3.1), React (version 19.0.0), TypeScript.
- **State Management**: Redux Toolkit (version 2.7.0) with support for asynchronous operations via `createAsyncThunk`.
- **Styling**: Tailwind CSS (version 4) for responsive and efficient styling.
- **API Integration**: Uses Fake Store API to fetch product data.
- **Client-Side Routing**: Leverages Next.js built-in routing.
- **Form Validation**: `react-hook-form` (version 7.56.1) with `zod` (version 3.24.3) for form validation.
- **Testing**: Jest with React Testing Library (though there are issues with mockStore setup, slice tests are functional).
- **Other Libraries**
  - `@mui/material` (version 7.0.2) for UI components.
  - `react-spinners` (version 0.17.0) for loading indicators.
  - `react-icons` (version 5.5.0) for icons.
  - `validator` (version 13.15.0) for additional validation.
  - `husky` (version 9.1.7) and lint-staged (version 15.5.1) for automated code formatting and linting before commits.

### Project Structure

The project follows a structured organization:

- `/src/components`: React components such as `Filters`, `PageHead`, `ListItemView`, `GridItemView`.
- `/src/store`: Redux slices for state management:
  - `cartSlice.ts`: Handles cart logic (adding/removing items, updating quantities, checkout).
  - `productsSlice.ts`: Manages product logic (fetching products from API, filtering, sorting).
- `/src/utils`: Utilities and types:
  - `constants.ts`: Constants like `API_ENDPOINTS`.
  - `types.ts`: Types such as `ProductType`, `SortBy`.
- `/src/views`: Application pages (e.g., `AllProducts/Page.tsx` for the product listing page).

### API

The application fetches data from the [Fake Store API](https://fakestoreapi.com/) using asynchronous requests via `createAsyncThunk` in `productsSlice`. Key endpoints used:

- `GET /products`: Fetches all products.
- `GET /products/:id`: Fetches details of a specific product.

### Testing

- Unit tests are implemented for Redux slices (cartSlice, productsSlice), covering reducers, async actions, and selectors.
- Jest and React Testing Library are used for testing.
- There is an ongoing attempt to test components (e.g., Page), but issues with redux-mock-store configuration persist.

### Technical Decisions

- **TypeScript**: Used to improve code reliability and maintainability.
- **Redux Toolkit**: Chosen for state management to simplify asynchronous operations and reduce boilerplate code.
- **Next.js**: Selected for routing, server-side rendering, and performance optimization.
- **Tailwind CSS**: Utilized for rapid and responsive styling.
- **React Hook Form** with **Zod**: Employed for efficient form validation during checkout.

## Setup Instructions

### System Requirements

- **Git**: To clone the repository.
- **Node.js**: Version 18.18.0 or higher (specified in package.json under "engines").
- **npm**: To install dependencies and run scripts.

### Steps to Run the Project

1. Clone the Repository:

   ```
   git clone https://github.com/pasha-z25/ZubakPavlo-PixoTest.git
   cd ZubakPavlo-PixoTest
   ```

2. Install Dependencies:

   ```
   npm install
   ```

3. Set Up Environment Variables (if needed):

- Currently, no environment variables are specified in `package.json`. However, if the application requires API keys or other configurations, create a `.env` file based on `.env.example` (if available in the repository).
- Example `.env` file (if applicable):

  ```
  NEXT_PUBLIC_API_URL=https://fakestoreapi.com
  ```

- Since the Fake Store API is public and does not require keys, this step can be skipped.

4. Run the Project in Development Mode:

   ```
   npm run dev
   ```

- This command starts Next.js in development mode with Turbopack (an optimized bundler).
- The application will be available at `http://localhost:3000`.

5. Build and Run in Production Mode (Optional):
   ```
   npm run build
   npm run start
   ```

- `npm run build`: Creates an optimized production build.
- `npm run start`: Starts the production server.

6. Check Code and Formatting:

- To run the linter:
  ```
  npm run lint
  ```
- To format code with Prettier:
  ```
  npm run pretty
  ```
- To run both formatting and linting checks:
  ```
  npm run check
  ```
