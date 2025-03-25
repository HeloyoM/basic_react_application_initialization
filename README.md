README.txt

Usage:

1.  **Save the script:** Save the JavaScript code as `generate-react-app.js`.
2.  **Run the script:** Execute the script using Node.js: `node generate-react-app.js <app-name> <database-type>`.
    * `<app-name>`: The name of the new React application.
    * `<database-type>`: Either "mysql" or "mongodb" (optional, defaults to none).

Example:

```bash
node generate-react-app.js
```

Project: React Application Generator Script

Description:
This script (generate-react-app.js) streamlines the creation of a new React application with TypeScript, pre-configured with essential features and libraries. It automates directory setup, component modification, hook creation, server scaffolding, and library installation, significantly reducing boilerplate code and setup time.

Features:

1.  **React with TypeScript:** Initializes a new React application using the TypeScript template.
2.  **Directory Structure:** Creates a standardized directory structure, including:
    * `src/components`: For reusable UI components.
    * `src/hooks`: For custom React hooks.
    * `src/services`: For API interaction and data fetching.
    * `src/utils`: For utility functions.
    * `server`: For backend server files.
3.  **App.tsx and App.css Modification:** Customizes the initial `App.tsx` and `App.css` files with a basic layout and styling.
4.  **Custom Hooks:** Generates commonly used hooks, such as a responsive hook.
5.  **Server Setup:** Creates a basic server file (`server/index.js`) with infrastructure for MySQL or MongoDB database connections.
6.  **Library Installation:** Installs a curated set of essential libraries:
    * `axios`: For making HTTP requests.
    * `@mui/material` and `@mui/icons-material`: For Material UI components and icons.
    * `framer-motion`: For animations.
    * `cors`: For Cross-Origin Resource Sharing.
    * `dotenv`: For managing environment variables.
    * Database drivers (e.g., `mysql2` or `mongoose`).
