# Music Player Application

A modern music player application with desktop client and backend server.

## Features

- Play music files with playback controls
- Organize songs into playlists
- Modern desktop client built with Electron and React
- RESTful API backend built with NestJS
- PostgreSQL database for data storage
- Admin panel for content management

## Architecture

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **API**: RESTful API
- **Authentication**: JWT-based authentication
- **Admin Panel**: AdminJS for content management

### Desktop Client (Electron)
- **Framework**: Electron with React and TypeScript
- **State Management**: Zustand
- **Build Tool**: Vite
- **UI**: Custom CSS with responsive design

## Project Structure

```
music-player/
├── backend/               # NestJS backend server
│   ├── src/
│   │   ├── songs/         # Songs module
│   │   ├── playlists/     # Playlists module
│   │   ├── users/         # Users module
│   │   ├── admin/         # Admin panel
│   │   └── main.ts        # Application entry point
│   ├── package.json
│   └── docker-compose.yml # Docker configuration
├── desktop-client/        # Electron desktop client
│   ├── src/
│   │   ├── main/          # Main process
│   │   ├── preload/       # Preload scripts
│   │   └── renderer/      # Renderer process (React app)
│   ├── package.json
│   └── README.md          # Desktop client documentation
├── docker-compose.yml     # Docker Compose configuration
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for backend)
- PostgreSQL (if not using Docker)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the backend directory with the following:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=music_db
   ENABLE_ADMIN=1
   ADMIN_NOAUTH=1
   ```

4. Start the backend server:
   ```bash
   npm run start:dev
   ```

   Or using Docker:
   ```bash
   docker-compose up
   ```

### Desktop Client Setup

1. Navigate to the desktop client directory:
   ```bash
   cd desktop-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. In a separate terminal, start the Electron app:
   ```bash
   npm start
   ```

## Admin Panel

The application includes an AdminJS panel for content management. To access the admin panel:

1. Start the backend server (as described above)
2. Navigate to `http://localhost:3000/admin` in your browser
3. For development, authentication is disabled (ADMIN_NOAUTH=1)
4. In production, you would need to set up proper authentication

### Admin Panel Features

- Manage songs (upload audio files and cover images)
- Manage playlists
- Manage users
- Upload files with custom upload component

## Development

### Backend Development

The backend is built with NestJS and follows the modular architecture pattern:

- **Modules**: Each feature (songs, playlists, users) has its own module
- **Controllers**: Handle HTTP requests
- **Services**: Contain business logic
- **Entities**: Database models

### Desktop Client Development

The desktop client uses React with TypeScript:

- **Components**: Reusable UI components
- **Services**: API communication layer
- **Store**: Application state management with Zustand
- **Utils**: Utility functions

## API Endpoints

### Songs
- `GET /songs` - Get all songs
- `GET /songs/:id` - Get a specific song

### Playlists
- `GET /playlists` - Get all playlists
- `GET /playlists/:id` - Get a specific playlist

## Deployment

### Backend Deployment

1. Build the backend:
   ```bash
   cd backend
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start:prod
   ```

### Desktop Client Deployment

1. Build the desktop client:
   ```bash
   cd desktop-client
   npm run build
   ```

2. Package the application:
   ```bash
   npm run dist
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.