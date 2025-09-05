import React, { use } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProgressBar from './ProgressBar';
import { COLORS, SPACING, FONT_SIZES } from '../utils/constants';
import StrandPerformance from './StrandPerformance';
import StudentsResultsButton from '../components/buttons/StudentsResultsButton';
import { useState, useEffect } from 'react';

const StrandCard = ({ strand, students, progress, onStudentPress, navigation }) => {
  const [competenceData, setCompetence] = useState({ BE: 0, AE: 0, ME: 0, EE: 0 })

  // Function to count the number of times each competence initial occurs and return a % of each with respect to the total count
  function calculateCompetenceDistribution(students) {
    const counts = {};
    let total = students.length;

    students.forEach(student => {
      const comp = student.competence?.toUpperCase(); // normalize casing
      counts[comp] = (counts[comp] || 0) + 1;
    });

    const percentages = {};
    Object.entries(counts).forEach(([comp, count]) => {
      percentages[comp] = (count / total) * 100; // number only
    });

    return percentages;
  }


  useEffect(() =>{
    const data = calculateCompetenceDistribution(students);  //calls the function and pass the necessary data
    setCompetence(data)
    // console.log("STUDENTS:", students)
    // console.log("COMPETENCE COUNT:", data)
  },[])

// console.log("STUDENTS......:", students)
  return (
    <View style={styles.container}>
      {/* Strand Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.strandName}>{strand.toUpperCase()}</Text>
        </View>
      </View>
      {/* Work Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Work Covered</Text>
          <Text style={styles.progressValue}>{progress}%</Text>
        </View>
        <ProgressBar progress={progress} color={COLORS.primary} />
      </View>
      <View>
        <StrandPerformance data={competenceData} />
      </View>
      <View>
        <StudentsResultsButton
          navigation={navigation}
          strand={strand}
          students={students} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  strandName: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  progressContainer: {
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  progressLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  progressValue: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  studentsContainer: {
    padding: SPACING.md,
  },
  studentsHeader: {
    marginBottom: SPACING.sm,
  },
  studentsTitle: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  studentsList: {
    flexGrow: 0,
  },
  studentsListContent: {
    paddingRight: SPACING.sm,
  },
  studentCardSpacing: {
    marginLeft: SPACING.sm,
  },
  noStudentsContainer: {
    paddingVertical: SPACING.lg,
    alignItems: 'center',
  },
  noStudentsText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
});

export default StrandCard;