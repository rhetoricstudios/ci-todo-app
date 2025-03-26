# Offline-First Todo App

A React Native todo application with offline support, optimistic updates, and persistent storage.

## Setup Instructions

Pre-requisites:

- Node and npm installed
- Expo Go (for ease of running on device)

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run start
```

3. Run on your preferred platform via USB:

- Press `a` for Android
- Press `i` for iOS

  or

- Scan the QR code in the console output from the Expo Go app

## Architecture Overview

### Core Technologies

- React Native with Expo
- Redux Toolkit Query (RTK Query) for API management
- AsyncStorage for persistent storage
- TypeScript for type safety

### Key Components

- **Store Layer**:

  - RTK Query store with persistence middleware
  - Operation queue for offline actions
  - Cached API responses

- **API Layer**:

  - RTK Query endpoints with optimistic updates
  - Offline-first data fetching strategy

- **UI Layer**:
  - Functional components with hooks
  - Navigation using React Navigation

## Challenges & Solutions

### 1. Offline Support

**Challenge**: Maintaining data consistency when offline
**Solution**:

- Implemented operation queue for offline actions
- Added persistence middleware for RTK Query cache
- Used optimistic updates for immediate UI feedback

### 2. State Management

**Challenge**: Complex state management with offline/online states
**Solution**:

- RTK Query for server state
- Redux for client state
- Middleware for state persistence

### 3. Data Synchronization

**Challenge**: Syncing offline changes when back online
**Solution**:

- Queue-based synchronization system
- Conflict resolution strategy
- Automatic retry mechanism

## Design Decisions

1. **Offline-First Approach**

   - All operations work offline by default
   - Optimistic updates for better UX
   - Persistent storage for reliability

2. **State Management**

   - RTK Query for API caching
   - Redux for global state
   - Local state for UI components

3. **TypeScript Usage**
   - Strong typing for better maintainability
   - Interface-driven development
   - Type safety across the application

## Future Improvements

1. **Enhanced Offline Support**

   - Better conflict resolution
   - Batch synchronization
   - Progress indicators for sync status

2. **Performance Optimizations**

   - Implement virtualization for large lists
   - Optimize storage usage
   - Add request debouncing

3. **Feature Additions**

   - Multi-user support
   - Data encryption
   - Collaborative editing
   - Push notifications
   - Unit test coverage
   - E2E testing with Detox

4. **UI/UX Improvements**
   - Dark mode support
   - Accessibility features
   - Animations and transitions
   - Better error handling UI
   - Loading states and skeletons
