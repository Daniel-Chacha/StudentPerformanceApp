import axios from 'axios';

// Base API configuration
const API_BASE_URL = 'https://your-api-base-url.com'; // Replace with actual API URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'An error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export const apiService = {
  // Get class profile data
  getClassProfile: async () => {
    try {
      const response = await apiClient.get('/class_profile');
      return response;
    } catch (error) {
      // Fallback mock data for development/testing
      console.warn('API not available, using mock data:', error.message);
      return getMockClassProfile();
    }
  },

  // Get students data
  getStudents: async () => {
    try {
      const response = await apiClient.get('/students');
      return response;
    } catch (error) {
      // Fallback mock data for development/testing
      console.warn('API not available, using mock data:', error.message);
      return getMockStudents();
    }
  },
};

// Mock data for development and testing
const getMockClassProfile = () => ({
  className: 'Grade 1A',
  totalStudents: 25,
  strands: [
    {
      name: 'Letter Identification',
      progress: 70,
      description: 'Recognizing and identifying letters',
    },
    {
      name: 'Letter Naming',
      progress: 85,
      description: 'Correctly naming letters when shown',
    },
    {
      name: 'Letter Formation',
      progress: 65,
      description: 'Proper handwriting and letter construction',
    },
    {
      name: 'Phonemic Awareness',
      progress: 78,
      description: 'Understanding letter sounds and phonics',
    },
  ],
});

const getMockStudents = () => [
  {
    id: 1,
    name: 'Alice Johnson',
    strands: {
      'Letter Identification': { level: 'ME', progress: 85 },
      'Letter Naming': { level: 'EE', progress: 92 },
      'Letter Formation': { level: 'AE', progress: 68 },
      'Phonemic Awareness': { level: 'ME', progress: 80 },
    },
  },
  {
    id: 2,
    name: 'Bob Smith',
    strands: {
      'Letter Identification': { level: 'AE', progress: 65 },
      'Letter Naming': { level: 'ME', progress: 78 },
      'Letter Formation': { level: 'BE', progress: 45 },
      'Phonemic Awareness': { level: 'AE', progress: 62 },
    },
  },
  {
    id: 3,
    name: 'Carol Davis',
    strands: {
      'Letter Identification': { level: 'EE', progress: 95 },
      'Letter Naming': { level: 'EE', progress: 98 },
      'Letter Formation': { level: 'ME', progress: 82 },
      'Phonemic Awareness': { level: 'EE', progress: 90 },
    },
  },
  {
    id: 4,
    name: 'David Wilson',
    strands: {
      'Letter Identification': { level: 'BE', progress: 40 },
      'Letter Naming': { level: 'BE', progress: 35 },
      'Letter Formation': { level: 'BE', progress: 30 },
      'Phonemic Awareness': { level: 'AE', progress: 55 },
    },
  },
  {
    id: 5,
    name: 'Emma Brown',
    strands: {
      'Letter Identification': { level: 'ME', progress: 88 },
      'Letter Naming': { level: 'ME', progress: 85 },
      'Letter Formation': { level: 'AE', progress: 70 },
      'Phonemic Awareness': { level: 'ME', progress: 83 },
    },
  },
  {
    id: 6,
    name: 'Frank Miller',
    strands: {
      'Letter Identification': { level: 'AE', progress: 72 },
      'Letter Naming': { level: 'AE', progress: 68 },
      'Letter Formation': { level: 'ME', progress: 80 },
      'Phonemic Awareness': { level: 'AE', progress: 65 },
    },
  },
];

export default apiService;