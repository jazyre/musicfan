# Desktop Client for Music Player

This is the desktop client for the Music Player application, built with Electron, React, and TypeScript.

## Features

- Play music files from the backend server
- View playlists and songs
- Control playback (play, pause, volume control)
- Modern UI with responsive design
- Error handling and loading states

## Tech Stack

- **Electron** - Cross-platform desktop application framework
- **React** - UI library for building the interface
- **TypeScript** - Typed superset of JavaScript
- **Zustand** - Small, fast state management solution
- **Vite** - Fast build tool and development server

## Project Structure

```
desktop-client/
├── src/
│   ├── main/              # Main process (Electron)
│   ├── preload/            # Preload scripts
│   └── renderer/          # Renderer process (React app)
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── services/   # API service layer
│       │   ├── utils/      # Utility functions
│       │   └── store/      # Zustand store
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the desktop client directory:
   ```bash
   cd desktop-client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server with hot reloading.

### Building

To build the application for production:

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

### Running the Desktop App

To start the Electron app in development mode:

```bash
npm start
```

## Architecture

### Main Process

The main process is responsible for:
- Creating and managing browser windows
- Handling system events
- Managing the application lifecycle

### Renderer Process

The renderer process runs the React application and is responsible for:
- User interface
- State management with Zustand
- Communication with the backend API

### State Management

We use Zustand for state management, which provides:
- Simple, minimalistic API
- No boilerplate code
- Easy to use with React hooks

### API Communication

The client communicates with the backend server through a service layer that:
- Handles HTTP requests
- Manages error handling with retry logic
- Provides a clean interface for components

### Error Handling

The application includes comprehensive error handling:
- Component-level error boundaries
- API request retry logic with exponential backoff
- User-friendly error messages
- Recovery options for users

### Loading States

The application provides visual feedback during loading:
- Spinner animations for async operations
- Progress indicators
- Disabled UI elements during loading

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.