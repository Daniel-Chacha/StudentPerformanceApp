import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONT_SIZES, SPACING } from "../utils/constants";

const HomeScreen = ({ navigation }) => {
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleGradeSelect = (grade) => {
    // Navigate to ClassOverviewScreen with the selected grade
    navigation.navigate('ClassOverview', { grade });
  };

  const renderGradeButton = (grade) => {
    return (
      <TouchableOpacity
        key={grade}
        style={styles.gradeButton}
        onPress={() => handleGradeSelect(grade)}
        activeOpacity={0.7}
      >
        <Text style={styles.gradeButtonText}>{grade}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      > 
        {/* Main Heading */}
        <View style={styles.headerContainer}>
          <Text style={styles.mainHeading}>CLASS PERFORMANCE OVERVIEW</Text>
        </View>

        {/* Grade Selection Section */}
        <View style={styles.selectionContainer}>
          <Text style={styles.instructionText}>Select the grade :</Text>
          
          <View style={styles.gradesGrid}>
            {grades.map(renderGradeButton)}
          </View>
        </View>
      </ScrollView> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#F5F5F5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING?.lg || 24,
    paddingVertical: SPACING?.xl || 32,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: SPACING?.xxl || 40,
    paddingVertical: SPACING?.lg || 24,
  },
  mainHeading: {
    fontSize: FONT_SIZES?.header || 28,
    fontWeight: 'bold',
    color: COLORS?.textPrimary || '#333333',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  selectionContainer: {
    flex: 1,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: FONT_SIZES?.xlarge || 18,
    color: COLORS?.textPrimary || '#333333',
    marginBottom: SPACING?.xl || 32,
    fontWeight: '600',
  },
  gradesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING?.md || 16,
    maxWidth: 300,
  },
  gradeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS?.primary || '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 2,
    borderColor: COLORS?.surface || '#FFFFFF',
    transform: [{ scale: 1 }],
  },
  gradeButtonText: {
    fontSize: FONT_SIZES?.title || 24,
    fontWeight: 'bold',
    color: COLORS?.surface || '#FFFFFF',
    textAlign: 'center',
  },
});

export default HomeScreen;