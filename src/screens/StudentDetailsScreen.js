import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';
import { 
  COLORS, 
  SPACING, 
  FONT_SIZES, 
  LEARNING_STRANDS, 
  COMPETENCE_LEVELS 
} from '../utils/constants';

const StudentDetailsScreen = ({ route, navigation }) => {
  const { studentId, studentName } = route.params;
  const { selectedStudent, students } = useApp();

  // Get student data - either from selectedStudent or find by ID
  const student = selectedStudent || students.find(s => s.id === studentId);

  if (!student) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Student not found</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleDownload = () => {
    Alert.alert(
      'Download Report',
      `Would you like to download ${student.name}'s performance report?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Download',
          onPress: () => {
            // In a real app, this would trigger the download
            Alert.alert('Success', 'Report downloaded successfully!');
          },
        },
      ]
    );
  };

  const getCompetenceInfo = (level) => {
    return COMPETENCE_LEVELS[level] || COMPETENCE_LEVELS.BE;
  };

  const getOverallPerformance = () => {
    const strands = Object.values(student.strands || {});
    if (strands.length === 0) return { averageProgress: 0, dominantLevel: 'BE' };

    const totalProgress = strands.reduce((sum, strand) => sum + (strand.progress || 0), 0);
    const averageProgress = Math.round(totalProgress / strands.length);

    // Find most common competence level
    const levelCounts = {};
    strands.forEach(strand => {
      const level = strand.level || 'BE';
      levelCounts[level] = (levelCounts[level] || 0) + 1;
    });

    const dominantLevel = Object.keys(levelCounts).reduce((a, b) =>
      levelCounts[a] > levelCounts[b] ? a : b
    );

    return { averageProgress, dominantLevel };
  };

  const { averageProgress, dominantLevel } = getOverallPerformance();
  const dominantCompetence = getCompetenceInfo(dominantLevel);

  const renderStrandPerformance = (strandName, strandData) => {
    const competence = getCompetenceInfo(strandData.level);
    const progress = strandData.progress || 0;

    return (
      <View key={strandName} style={styles.strandSection}>
        <View style={styles.strandHeader}>
          <Text style={styles.strandName}>{strandName}</Text>
          <View style={[styles.competenceBadge, { backgroundColor: competence.color }]}>
            <Text style={styles.competenceCode}>{competence.code}</Text>
          </View>
        </View>
        
        <Text style={styles.competenceDescription}>
          {competence.meaning} - {competence.description}
        </Text>
        
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Work Progress</Text>
            <Text style={styles.progressValue}>{progress}%</Text>
          </View>
          <ProgressBar progress={progress} color={competence.color} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Student Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{student.name}</Text>
            <View style={styles.overallStats}>
              <Text style={styles.overallProgress}>
                Overall Progress: {averageProgress}%
              </Text>
              <View style={[styles.overallBadge, { backgroundColor: dominantCompetence.color }]}>
                <Text style={styles.overallBadgeText}>
                  Primarily {dominantCompetence.code}
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={handleDownload}
          >
            <Text style={styles.downloadButtonText}>📥 Download</Text>
          </TouchableOpacity>
        </View>

        {/* Detailed Strand Performance Sections */}
        <View style={styles.performanceContainer}>
          <Text style={styles.sectionTitle}>Detailed Performance by Strand</Text>
          
          {LEARNING_STRANDS.map(strand => {
            const strandData = student.strands?.[strand.name];
            if (!strandData) {
              return (
                <View key={strand.name} style={styles.strandSection}>
                  <Text style={styles.strandName}>{strand.name}</Text>
                  <Text style={styles.noDataText}>No data available</Text>
                </View>
              );
            }
            return renderStrandPerformance(strand.name, strandData);
          })}
        </View>

        {/* Performance Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.sectionTitle}>Performance Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Average Progress:</Text>
              <Text style={styles.summaryValue}>{averageProgress}%</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Dominant Level:</Text>
              <View style={[styles.summaryBadge, { backgroundColor: dominantCompetence.color }]}>
                <Text style={styles.summaryBadgeText}>
                  {dominantCompetence.code} - {dominantCompetence.meaning}
                </Text>
              </View>
            </View>
            <Text style={styles.summaryDescription}>
              {dominantCompetence.description}
            </Text>
          </View>
        </View>

        {/* Footer spacing */}
        <View style={styles.footer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  errorText: {
    fontSize: FONT_SIZES.large,
    color: COLORS.error,
    marginBottom: SPACING.md,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  backButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
  },
  profileHeader: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  overallStats: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  overallProgress: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginRight: SPACING.sm,
  },
  overallBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  overallBadgeText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.small,
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    marginLeft: SPACING.sm,
  },
  downloadButtonText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
  },
  performanceContainer: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  strandSection: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  strandHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  strandName: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    flex: 1,
  },
  competenceBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    minWidth: 40,
    alignItems: 'center',
  },
  competenceCode: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.small,
    fontWeight: 'bold',
  },
  competenceDescription: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    fontStyle: 'italic',
  },
  progressSection: {
    marginTop: SPACING.sm,
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
  noDataText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },
  summaryContainer: {
    padding: SPACING.md,
    paddingTop: 0,
  },
  summaryCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  summaryLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  summaryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 8,
    flex: 1,
    marginLeft: SPACING.sm,
    alignItems: 'center',
  },
  summaryBadgeText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.small,
    fontWeight: 'bold',
  },
  summaryDescription: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  footer: {
    height: SPACING.xl,
  },
});

export default StudentDetailsScreen;