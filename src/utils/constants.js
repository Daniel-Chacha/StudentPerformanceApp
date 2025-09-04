// Competence Level System (Mastery Keys)
export const COMPETENCE_LEVELS = {
  BE: {
    code: 'BE',
    meaning: 'Below Expectation',
    color: '#FF4444',
    description: 'Needs significant support',
  },
  AE: {
    code: 'AE',
    meaning: 'Approaching Expectation',
    color: '#FFB347',
    description: 'Developing with some support needed',
  },
  ME: {
    code: 'ME',
    meaning: 'Meeting Expectation',
    color: '#4CAF50',
    description: 'Consistently meets standards',
  },
  EE: {
    code: 'EE',
    meaning: 'Exceeding Expectation',
    color: '#2196F3',
    description: 'Advanced mastery achieved',
  },
};

// Learning Strands (Subject Areas)
// export const LEARNING_STRANDS = [
//   {
//     name: 'Letter Identification',
//     description: 'Recognizing and identifying letters',
//     icon: '🔤',
//   },
//   {
//     name: 'Letter Naming',
//     description: 'Correctly naming letters when shown',
//     icon: '📝',
//   },
//   {
//     name: 'Letter Formation',
//     description: 'Proper handwriting and letter construction',
//     icon: '✍️',
//   },
//   {
//     name: 'Phonemic Awareness',
//     description: 'Understanding letter sounds and phonics',
//     icon: '🔊',
//   },
// ];

// App Theme Colors
export const COLORS = {
  mainPrimary: '#1A2B43',
  primary: '#2196F3',
  secondary: '#0c0808ff',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  textPrimary: '#333333',
  textSecondary: '#666666',
  border: '#E0E0E0',
  success: '#4CAF50',
  warning: '#FFB347',
  error: '#FF4444',
};

// Typography
export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
  light: 'System',
};

export const FONT_SIZES = {
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 18,
  xxlarge: 20,
  title: 24,
  header: 28,
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

// Screen dimensions helpers
export const SCREEN_BREAKPOINTS = {
  small: 320,
  medium: 768,
  large: 1024,
};

// Animation durations
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

// API Configuration
export const API_CONFIG = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
};