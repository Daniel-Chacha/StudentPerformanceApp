import React, { createContext, useContext, useEffect } from 'react';
import { create } from 'zustand';
import { apiService } from '../services/apiService';

// Zustand store for state management
const useAppStore = create((set, get) => ({
  // State
  classProfile: null,
  students: [],
  loading: false,
  error: null,
  searchQuery: '',
  selectedStudent: null,

  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedStudent: (student) => set({ selectedStudent: student }),

  // Fetch class profile data
  fetchClassProfile: async () => {
    try {
      set({ loading: true, error: null });
      const data = await apiService.getClassProfile();
      set({ classProfile: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch students data
  fetchStudents: async () => {
    try {
      set({ loading: true, error: null });
      const data = await apiService.getStudents();
      set({ students: data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Get filtered students based on search query
  getFilteredStudents: () => {
    const { students, searchQuery } = get();
    if (!searchQuery) return students;
    
    return students.filter(student =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  },

  // Get students by strand
  getStudentsByStrand: (strandName) => {
    const { students } = get();
    return students.filter(student =>
      student.strands && student.strands[strandName]
    );
  },

  // Initialize app data
  initializeApp: async () => {
    const { fetchClassProfile, fetchStudents } = get();
    await Promise.all([fetchClassProfile(), fetchStudents()]);
  },
}));

// React Context for providing the store
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const store = useAppStore();

  useEffect(() => {
    store.initializeApp();
  }, []);

  return (
    <AppContext.Provider value={store}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};