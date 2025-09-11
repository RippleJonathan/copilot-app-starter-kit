# {{APP_TITLE}}

A React frontend application generated from the Copilot Starter Kit.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Features

- ⚛️ React 18 with hooks
- 🚀 React Router for navigation{{#if INCLUDE_ROUTER}}{{/if}}
- 📡 Axios for API communication
- 🧪 Testing setup with Jest and React Testing Library
- 📱 Responsive design
- 🎨 CSS modules ready

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Route components
├── hooks/             # Custom React hooks
├── services/          # API and external services
├── styles/            # Global styles and themes
├── utils/             # Helper functions
└── App.js             # Main application component
```

## API Configuration

The app is configured to connect to an API at: `{{API_BASE_URL}}`

Update this in `src/config/api.js` to match your backend.

## Available Routes

- `/` - Home page
- `/about` - About page
- Add more routes in `src/App.js`

## Customization

1. **Styling**: Edit CSS files in `src/styles/`
2. **API calls**: Modify `src/services/api.js`
3. **Components**: Add new components in `src/components/`
4. **Routes**: Update routing in `src/App.js`

## Deployment

```bash
npm run build
```

This creates a `build/` folder ready for deployment to any static hosting service.

## Next Steps

1. 🎨 Customize the UI components and styling
2. 🔌 Connect to your backend API
3. 📊 Add state management (Redux, Zustand, etc.)
4. 🔐 Implement authentication flow
5. 📱 Add more pages and features