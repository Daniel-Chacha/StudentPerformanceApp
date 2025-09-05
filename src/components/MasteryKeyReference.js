import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COMPETENCE_LEVELS, COLORS, SPACING, FONT_SIZES } from '../utils/constants';
import { useState } from 'react';

const MasteryKeyReference = () => {  
    const [showCompetencyKey, setShowCompetencyKey] = useState(false);

  const renderCompetenceLevel = (level) => {
    const competence = COMPETENCE_LEVELS[level];
    return (
      <View key={level} style={styles.competenceItem}>
        <View style={[styles.colorIndicator, { backgroundColor: competence.color }]}>
          <Text style={styles.levelCode}>{competence.code}</Text>
        </View>
        <View style={styles.levelInfo}>
          <Text style={styles.levelMeaning}>{competence.meaning}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={() => setShowCompetencyKey(!showCompetencyKey)}
        >
          {/* toggle the Competence key reference */}
          <Text style={styles.toggleButtonText}>
            {showCompetencyKey ? 'Hide' : 'Show'} Competence Key Reference
          </Text>
          <Text style={[styles.toggleArrow, showCompetencyKey && styles.toggleArrowOpen]}>
            ▼
          </Text>
        </TouchableOpacity>

        {showCompetencyKey &&(
          <View style={styles.competencesContainer}>
          {Object.keys(COMPETENCE_LEVELS).map(renderCompetenceLevel)}
        </View>
        )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 5,
  },
    // Toggle Button Styles
  toggleContainer: {
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 8,
  },
  toggleButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  toggleArrow: {
    fontSize: 25,
    color: '#6B7280',
    transform: [{ rotate: '0deg' }],
  },
  toggleArrowOpen: {
    transform: [{ rotate: '180deg' }],
  },

  competencesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "space-between",
  },
  competenceItem: {
    flexDirection: 'column',
    // alignItems: 'center', 
    marginBottom: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  colorIndicator: {
    width: 40,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  levelCode: {
    color: COLORS.surface,
    fontSize: FONT_SIZES.small,
    fontWeight: 'bold',
  },
  levelInfo: {
    flex: 1,
  },
  levelMeaning: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  levelDescription: {
    fontSize: FONT_SIZES.small,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
});

export default MasteryKeyReference;