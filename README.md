# Task Manager App

A simplistic and intuitive task management application built with React Native and Expo, with the additional point based reward system and digital garden (only one plant as of now, as proof of concept).

## Features

### Task Management
- Create new tasks with title, description, priority level, and due date
- Mark tasks as complete/incomplete by clicking on the circle
- Delete tasks by swiping to the left
- Tasks are colored (green, yellow, red) based on set priority
- Sort tasks by priority or date
- Completed vs Incomplete tasks are separated

### Calendar View
- Color-coded task indicator bubbles based on priority below each date
- Add task and view tasks directly from calendar view by clicking on the date

### Profile & Rewards
- Points system for completing tasks (+1 for each task)
- Plant that "evolves" as you reach point checkmarks
- Statistics that track task completion rate and number

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- iOS Simulator or Android Emulator (optional)

### Installation

1. Clone the repository:
```bash
git clone ssh of this repository
cd task_manager_app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

4. Follow the Expo CLI instructions to run on your desired platform (iOS, Android, or Web)

## Third-Party Libraries

- **react-native-calendars**: Powers the calendar view with task indicators
- **@react-native-community/datetimepicker**: Provides date selection in task creation

## Project Structure

```
task_manager_app/
├── app/
│   ├── components/    # Reusable components
│   ├── context/       # Task context and state management
│   ├── screens/       # Main screen components
│   ├── types/         # TypeScript type definitions
│   └── _layout.tsx    # Root layout with tab navigation
├── assets/           # Images and fonts
└── package.json      # Dependencies and scripts
```

## Next Steps

Several potential improvements could enhance the app's functionality:

### Data Persistence
- Implement AsyncStorage for local data persistence
- Add a backend database (e.g., Firebase, MongoDB) for cloud storage
- Enable data sync across devices

### Authentication
- Add user authentication system
- Implement social login options

### Future Features
- Push notifications for task reminders
- Recurring tasks
- Expanded garden/reward system with multiple plants

