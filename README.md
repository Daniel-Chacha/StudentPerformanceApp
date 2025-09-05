# Student Performance Tracker

A React Native mobile application built with Expo that allows teachers to view student performance across different learning strands with competence level tracking.

## 🎯 Features

- **Class Performance Overview**: View all students' performance organized by learning strands
- **Competence Level System**: Four-level mastery key (BE, AE, ME, EE) with color-coded indicators
- **Progress Tracking**: Visual progress bars showing work completion percentages
- **Search Functionality**: Filter students by name across all strands
- **Responsive Design**: Optimized for mobile devices with smooth navigation

## 🏗 Architecture

### Competence Level System (Mastery Keys)
- **BE (Below Expectation)** - Red - Needs significant support
- **AE (Approaching Expectation)** - Yellow - Developing with some support needed  
- **ME (Meeting Expectation)** - Green - Consistently meets standards
- **EE (Exceeding Expectation)** - Blue - Advanced mastery achieved

### Learning Strands
1. **Letter Identification** - Recognizing and identifying letters
2. **Letter Naming** - Correctly naming letters when shown
3. **Letter Formation** - Proper handwriting and letter construction
4. **Phonemic Awareness** - Understanding letter sounds and phonics

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo app on an android phone
- iOS Simulator / Android Emulator or physical device

### Installation
##BACKEND
1. Start the backend as per the instruction provided in https://github.com/Nyansapo-AI/fullstack-dev-takehome/tree/main.
2. After this, follow the instructions below to run the frontend. The frontend is configured to automatically detect the host url of the computer running the application hence no need to tweak the frontend code.

1. **Clone the repository**
```bash
git clone https://github.com/Daniel-Chacha/StudentPerformanceApp.git
cd StudentPerformanceApp
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Install Expo CLI globally** (if not already installed)
```bash
npm install -g expo-cli
# or
npm install -g @expo/cli
```

### Running the App

1. **Start the development server**
```bash
npm start
# or
expo start
```

2.**Run on physical device**
   - Install Expo Go app from App Store/Google Play
   - Scan the QR code displayed in terminal/browser


3.  **Run on specific platforms**
```bash
# iOS Simulator
npm run ios
# or
expo start --ios

# Android Emulator
npm run android
# or
expo start --android

```
## 🏛 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── MasteryKeyReference.js    # Competence level reference panel
│   ├── StrandCard.js             # Learning strand display
│   ├── StudentCard.js            # Individual student card
│   ├── ProgressBar.js            # Progress visualization
│   └── ClassInfo.js          #Show class details
│   └── CompetenceAnalysisComponent.js          #Compare performance of strands
│   └── StrandPerformance.js          #Show students performances in a given strand
│   └── StudentResults.js          #Show student results with capabilities to sort and filter 
│   └── buttons/          
           └── StudentResultsButton.js          #Reusable button  
├── screens/             # Main application screens
│   ├── ClassOverviewScreen.js    # Class performance overview
│   └── HomeScreen.js   # Homepage
├── utils/               # Utilities and constants
│   └── constants.js              # App constants and theme
└── styles/              # Global styles (if needed)
    └── globalStyles.js
```

## 🎨 Design Decisions


### Navigation
- **React Navigation v6**: Stack navigator for smooth transitions
- **Deep Linking**: Support for navigation with parameters
- **Header Customization**: Branded headers with student names

### UI/UX Design
- **Material Design Principles**: Modern mobile interface patterns
- **Color-Coded System**: Intuitive competence level identification
- **Progressive Disclosure**: Overview → Detail information architecture
- **Responsive Layout**: Adapts to different screen sizes

### Performance Optimizations
- **Lazy Loading**: Components render as needed
- **Optimized Lists**: Efficient rendering of student lists
- **Smooth Animations**: 60fps progress bar animations

## 🔧 Technical Stack

### Core Technologies
- **React Native**: Cross-platform mobile framework
- **Expo SDK**: Development and deployment platform
- **React Navigation**: Navigation library

### Development Tools
- **Babel**: JavaScript transpiler
- **Metro**: React Native bundler
- **Expo CLI**: Development toolchain

## 🌐 API Integration

### Endpoints
- `GET /class_profile`: Fetch class overview data
- `GET /students`: Fetch detailed student information

### Mock Data
The app includes comprehensive mock data for cases where actual data isn't available currently
- Sample class with 5 students
-Includes student metadata such as name, student id, age and gender.

### Error Handling
- Harmonious display of error message inacse data isn't available.

## 🧪 Testing Strategy

### Manual Testing Checklist
- [ ] App launches successfully
- [ ] Home page displays successfully, allowing the user to select the grade.
- [ ] Class overview displays all strands
- [ ] Class Info. functionality works
- [ ] Navigation to strand results works
- [ ] Progress bars display correctly
- [ ] Competence level colors match design

### Device Testing
- [ ] iOS Simulator
- [ ] Android Emulator  
- [ ] Physical iOS device
- [ ] Physical Android device


## 🚨 Known Issues & Limitations

1. **API Integration**: Incase of an error in the backend(json server), expo will display an error warning but the app won't crash. Charts and graphs won't be rendered. Please ensure the backend is running before running the app.
2. **Offline Support**: No offline data caching implemented
3. **Push Notifications**: Not implemented in current version
4. **Data Persistence**: No local database storage

## 🔮 Future Enhancements

### Short Term
- [ ] Connect to actual backend API
- [ ] Add pull-to-refresh functionality
- [ ] Implement loading skeletons
- [ ] Add unit tests

### Long Term
- [ ] Offline data synchronization
- [ ] Export functionality (PDF reports)
- [ ] Push notifications for progress updates
- [ ] Advanced filtering and sorting options
- [ ] Teacher authentication system
- [ ] Actual Multi-class support

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🙋‍♂️ Support

For questions or support:
- contact danmwita355@gmail.com 



**Happy Hunting**