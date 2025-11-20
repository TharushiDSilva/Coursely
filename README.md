# Coursely - React Native Course App

A mobile application for browsing and managing courses built with React Native, Expo, and Redux Toolkit.

## Features

- 🔐 User Authentication (Login/Register)
- 📚 Browse Courses from API
- ❤️ Favorite Courses (persisted to AsyncStorage)
- 👤 User Profile with Dark Mode Toggle
- 🎨 Polished UI with Custom Theme
- 🧭 React Navigation (Stack & Tab Navigation)

## Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Redux Toolkit** - State management
- **React Navigation** - Navigation library
- **Formik & Yup** - Form handling and validation
- **Axios** - HTTP client
- **AsyncStorage** - Local storage
- **Feather Icons** - Icon library

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app on your mobile device (or Android/iOS simulator)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coursely
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Expo development server**
   ```bash
   npx expo start
   ```

4. **Run on your device**
   - Scan the QR code with Expo Go app (Android)
   - Scan with Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## Project Structure

```
coursely/
├── src/
│   ├── api/
│   │   └── coursesApi.js          # API functions for fetching courses
│   ├── components/
│   │   ├── CourseCard.js          # Course card component
│   │   └── Header.js              # Header with username display
│   ├── navigation/
│   │   ├── AppNavigator.js        # Main navigator (auth check)
│   │   ├── AuthStack.js           # Login/Register stack
│   │   ├── HomeStack.js           # Home/Details stack
│   │   └── MainTabs.js            # Bottom tab navigator
│   ├── redux/
│   │   ├── store.js               # Redux store configuration
│   │   ├── authSlice.js           # Authentication state
│   │   ├── courseSlice.js         # Course state
│   │   └── favoriteSlice.js       # Favorites state with persistence
│   ├── screens/
│   │   ├── Auth/
│   │   │   ├── LoginScreen.js     # Login screen with Formik
│   │   │   └── RegisterScreen.js  # Registration screen
│   │   ├── HomeScreen.js          # Course listing
│   │   ├── DetailsScreen.js       # Course details
│   │   ├── FavoritesScreen.js     # Favorite courses
│   │   └── ProfileScreen.js       # User profile & settings
│   ├── utils/
│   │   ├── storage.js             # AsyncStorage helpers
│   │   └── theme.js               # Design system (colors, spacing, typography)
│   └── App.js                     # Root component
└── package.json
```

## Usage Flow

### 1. Authentication Flow

**Login:**
1. Launch the app
2. You'll see the Login screen (AuthStack)
3. Enter email and password
4. Validation errors appear if input is invalid
5. Click "Login" button
6. On success, redirects to Home screen (MainTabs)

**Register:**
1. From Login screen, click "Don't have an account? Register"
2. Fill in registration details
3. Submit to create account
4. Returns to Login screen

### 2. Browse Courses

1. After login, you're on the Home tab
2. Header shows your username (extracted from email)
3. Scroll through course cards
4. Each card displays:
   - Course thumbnail
   - Title
   - Description
   - Category badge
   - Star rating
   - Heart icon for favorites

### 3. Favorites

1. Tap heart icon on any course card to add to favorites
2. Navigate to "Favorites" tab
3. View all favorited courses
4. Favorites persist in AsyncStorage (survive app restart)
5. Tap heart again to remove from favorites

### 4. Course Details

1. Tap on any course card
2. Navigate to Details screen
3. View full course information

### 5. Profile & Settings

1. Navigate to "Profile" tab
2. View your user information
3. Toggle Dark Mode (persisted to AsyncStorage)
4. Click "Logout" to return to Login screen

## Screenshots Checklist

- [ ] Login Screen
- [ ] Register Screen
- [ ] Home Screen with Course Cards
- [ ] Course Details Screen
- [ ] Favorites Screen
- [ ] Profile Screen
- [ ] Dark Mode Toggle
- [ ] Navigation Tabs
- [ ] Form Validation Errors
- [ ] Loading States

## API

The app fetches course data from:
```
https://dummyjson.com/products?limit=30
```

Products are mapped to course objects with:
- id
- title
- description
- image (thumbnail)
- rating
- category

## State Management

### Redux Slices

1. **authSlice** - User authentication state
   - `isLoggedIn`
   - `user` object
   - `loginUser` asyncThunk
   - `logoutUser` action

2. **courseSlice** - Course data
   - `courses` array
   - `loading` state
   - `fetchCourses` asyncThunk

3. **favoriteSlice** - Favorite courses
   - `items` array
   - `addFavorite` action
   - `removeFavorite` action
   - `loadFavoritesFromStorage` asyncThunk

## Persistence

Data persisted to AsyncStorage:
- Favorites list (`@coursely_favorites`)
- Dark mode preference (`@coursely_dark_mode`)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Start with cache clear
npx expo start -c

# Run on Android
npx expo start --android

# Run on iOS
npx expo start --ios

# Run on web
npx expo start --web
```

## Troubleshooting

**Metro bundler issues:**
```bash
npx expo start -c
```

**Package conflicts:**
```bash
rm -rf node_modules
npm install
```

**AsyncStorage not working:**
Make sure `@react-native-async-storage/async-storage` is installed:
```bash
npx expo install @react-native-async-storage/async-storage
```

## Dependencies

Key packages:
- `expo`
- `react-native`
- `@reduxjs/toolkit`
- `react-redux`
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `formik`
- `yup`
- `axios`
- `@react-native-async-storage/async-storage`
- `@expo/vector-icons`

## Future Enhancements

- [ ] Search functionality
- [ ] Filter by category
- [ ] User registration backend integration
- [ ] Course progress tracking
- [ ] Push notifications
- [ ] Social sharing
- [ ] Reviews and ratings
- [ ] Payment integration

## License

MIT

## Author

Created for Mobile App Development Course
