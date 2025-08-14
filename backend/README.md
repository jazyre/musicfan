# Backend for Music Player Application

This is the backend server for the Music Player application, built with NestJS.

## Features

- RESTful API for songs and playlists
- PostgreSQL database with TypeORM
- Admin panel for content management
- File upload functionality
- User authentication

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **API**: RESTful API
- **Authentication**: JWT-based authentication
- **Admin Panel**: AdminJS for content management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file with the following:
   ```
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_NAME=music_db
   ENABLE_ADMIN=1
   ADMIN_NOAUTH=1
   ```

### Development

To start the development server:

```bash
npm run start:dev
```

The server will be available at `http://localhost:3000`

### Production

To build and start the production server:

```bash
npm run build
npm run start:prod
```

## API Endpoints

### Songs
- `GET /songs` - Get all songs
- `GET /songs/:id` - Get a specific song

### Playlists
- `GET /playlists` - Get all playlists
- `GET /playlists/:id` - Get a specific playlist

## Admin Panel

The admin panel is available at `http://localhost:3000/admin`

For development, authentication is disabled (ADMIN_NOAUTH=1)
In production, you would need to set up proper authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.