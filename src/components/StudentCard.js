import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COMPETENCE_LEVELS, COLORS, SPACING, FONT_SIZES } from '../utils/constants';

const StudentCard = ({ student, competenceLevel, progress, onPress, style }) => {
  const competence = COMPETENCE_LEVELS[competenceLevel] || COMPETENCE_LEVELS.BE;

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Student Avatar */}
      <View style={[styles.avatar, { backgroundColor: competence.color }]}>
        <Text style={styles.initials}>{getInitials(student.name)}</Text>
      </View>

      {/* Student Info */}
      <View style={styles.studentInfo}>
        <Text style={styles.studentName} numberOfLines={2}>
          {student.name}
        </Text>
        
        {/* Competence Badge */}
        <View style={[styles.competenceBadge, { backgroundColor: competence.color }]}>
          <Text style={styles.competenceText}>{competence.code}</Text>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{progress}%</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${progress}%`,
                  backgroundColor: competence.color 
                }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Tap Indicator */}
      <View style={styles.tapIndicator}>
        <Text style={styles.tapText}>👆</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.sm,
    minWidth: 120,
    maxWidth: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  initials: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
  },
  studentInfo: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  studentName: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
    lineHeight: 16,
  },
  competenceBadge: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: 10,
    marginBottom: SPACING.xs,
    minWidth: 30,
    alignItems: 'center',
  },
  competenceText: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.small,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressText: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    minWidth: 2,
  },
  tapIndicator: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    opacity: 0.6,
  },
  tapText: {
    fontSize: 12,
  },
});

export default StudentCard;