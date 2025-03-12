# HackMyHealth

A comprehensive health tracking and analytics mobile application that helps users monitor key biomarkers, nutrition, sleep, and physical activity to provide personalized health insights.

## Features

### MVP Foundation (Current Phase)
- User authentication with Supabase
- Basic food tracking (manual entry)
- Health metrics tracking
- Simple analytics dashboard

### Coming Soon
- Image recognition for food tracking
- Blood test management
- Health device integration
- Advanced health analytics

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn
- Expo CLI
- Supabase project

### Installation

1. Clone the repository
   ```
   git clone https://github.com/Dawid930/hackmyhealth.git
   cd hackmyhealth
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your Supabase credentials
   ```
   EXPO_PUBLIC_SUPABASE_URL=your-supabase-url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Set up the database
   - Go to your Supabase project
   - Open the SQL Editor
   - Run the SQL commands in `database_setup.sql`

5. Start the development server
   ```
   npx expo start
   ```

## Database Schema

The application uses the following tables:
- `profiles`: Stores user profile information
- `food_entries`: Tracks food consumption data
- `health_metrics`: Records various health measurements

## Tech Stack

- **Frontend:** React Native with TypeScript, Expo
- **State Management:** React Context and hooks
- **Backend:** Supabase (Authentication, PostgreSQL Database)

## License

This project is licensed under the MIT License - see the LICENSE file for details. 