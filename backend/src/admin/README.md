# Admin Panel

This directory contains the AdminJS panel for managing the music player application.

## Structure

- `admin.module.ts` - The main module for the admin panel
- `component-loader.ts` - Component loader for custom components
- `components/` - Custom components for the admin panel
  - `upload.component.tsx` - Custom upload component

## Features

- User management
- Song management with upload capabilities
- Playlist management
- Custom upload component for audio files and cover images

## Authentication

For development, the admin panel uses a simple authentication:
- Email: `admin`
- Password: `password`

In production, you should implement a more secure authentication system.

## Custom Components

The admin panel includes a custom upload component that allows users to:
- Upload audio files for songs
- Upload cover images for songs
- View existing files
- Clear selected files

## Routes

The admin panel is available at `/admin` route.