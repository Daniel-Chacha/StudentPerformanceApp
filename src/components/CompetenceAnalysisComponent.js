import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Dimensions,
  TouchableOpacity 
} from "react-native";

const { width, height } = Dimensions.get('window');

// Design System
const COLORS = {
  primary: 'hsl(216.923 56% 18%)',
  primaryLight: 'hsl(216.923 56% 25%)',
  primaryDark: 'hsl(216.923 56% 12%)',
  background: '#F5F5F5',
  backgroundSecondary: '#F5FEFD',
  surface: '#334155',
  textPrimary: '#1e293b',
  textSecondary: '#334155',
  textMuted: '#475569',
  white: '#ffffff',
  shadow: 'rgba(0, 0, 0, 0.3)',
  
  // Competence level colors
  EE: 'blue', // Red for Exceeding Expectations
  ME: 'green', // Green for Meeting Expectations
  AE: 'orange', // Orange for Approaching Expectations
  BE: 'red', // Blue for Below Expectations
};

const TYPOGRAPHY = {
  title: 24,
  subtitle: 20,
  body: 16,
  caption: 14,
  small: 12,
  bold: '700',
  semibold: '600',
  medium: '500',
  regular: '400',
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};



const CompetenceAnalysisComponent = ({ data }) => {
  // Process data to count competences for each strand
  const processedData = useMemo(() => {
    const competenceTypes = ['EE', 'ME', 'AE', 'BE'];
    
    return data.map(strand => {
      const competenceCounts = competenceTypes.reduce((acc, competence) => {
        acc[competence] = strand.students.filter(student => 
          student.competence === competence
        ).length;
        return acc;
      }, {});
      
      return {
        ...strand,
        competenceCounts,
        totalStudents: strand.students.length
      };
    });
  }, [data]);

  // Get all competence types and their totals across all strands
  const competenceStats = useMemo(() => {
    const stats = {
      EE: { total: 0, label: 'Exceeding Expectations', color: COLORS.EE },
      ME: { total: 0, label: 'Meeting Expectations', color: COLORS.ME },
      AE: { total: 0, label: 'Approaching Expectations', color: COLORS.AE },
      BE: { total: 0, label: 'Below Expectations', color: COLORS.BE }
    };
    
    processedData.forEach(strand => {
      Object.keys(stats).forEach(competence => {
        stats[competence].total += strand.competenceCounts[competence] || 0;
      });
    });
    
    return stats;
  }, [processedData]);

  const renderBarChart = (competenceType) => {
    const maxValue = Math.max(...processedData.map(strand => 
      strand.competenceCounts[competenceType] || 0
    ));
    
    return (
      <View key={competenceType} style={styles.chartContainer}>
        {/* Chart Header */}
        <View style={styles.chartHeader}>
          <View style={[
            styles.competenceIndicator, 
            { backgroundColor: competenceStats[competenceType].color }
          ]} />
          <Text style={styles.chartTitle}>
            {competenceStats[competenceType].label}
          </Text>
          <Text style={styles.totalCount}>
            Total: {competenceStats[competenceType].total}
          </Text>
        </View>

        {/* Bar Chart */}
        <View style={styles.barsContainer}>
          {processedData.map((strand, index) => {
            const value = strand.competenceCounts[competenceType] || 0;
            const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
            const barHeight = (percentage / 100) * 150; // Max height 150
            
            return (
              <View key={strand.strandId} style={styles.barColumn}>
                {/* Value label on top */}
                <Text style={styles.valueLabel}>{value}</Text>
                
                {/* Bar container */}
                <View style={styles.barContainer}>
                  <View 
                    style={[
                      styles.bar,
                      {
                        height: Math.max(barHeight, 4), // Minimum height for visibility
                        backgroundColor: competenceStats[competenceType].color,
                      }
                    ]}
                  >
                    {/* Shine effect */}
                    <View style={styles.barShine} />
                  </View>
                </View>
                
                {/* Strand label */}
                <Text style={styles.strandLabel} numberOfLines={2}>
                  {strand.strand}
                </Text>
                
                {/* Work covered indicator */}
                {/* <View style={styles.workCoveredContainer}>
                  <Text style={styles.workCoveredText}>
                    {strand.workCovered}%
                  </Text>
                </View> */}
              </View>
            );
          })}
        </View>

        {/* Chart Footer with percentage breakdown */}
        <View style={styles.chartFooter}>
          <Text style={styles.footerText}>
            {((competenceStats[competenceType].total / 
               processedData.reduce((sum, strand) => sum + strand.totalStudents, 0)) * 100
            ).toFixed(1)}% of all students
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>Competence Analysis</Text>
        <Text style={styles.subtitle}>
          Student performance across all strands
        </Text>
        
        {/* Summary Stats */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>
              {processedData.length}
            </Text>
            <Text style={styles.summaryLabel}>Strands</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>
              {processedData.reduce((sum, strand) => sum + strand.totalStudents, 0)}
            </Text>
            <Text style={styles.summaryLabel}>Students</Text>
          </View>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Competence Levels:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.legendItems}>
            {Object.entries(competenceStats).map(([key, stat]) => (
              <View key={key} style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: stat.color }]} />
                <Text style={styles.legendText}>{key}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Horizontal Scrollable Charts */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={true}
        style={styles.chartsScrollView}
        contentContainerStyle={styles.chartsContent}
      >
        {Object.keys(competenceStats).map(competenceType => 
          renderBarChart(competenceType)
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.lg,
  },
  
  // Header Styles
  headerContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  
  mainTitle: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  
  subtitle: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  summaryItem: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  
  summaryNumber: {
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.primary,
    marginBottom: 2,
  },
  
  summaryLabel: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
  },
  
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.textMuted,
    opacity: 0.3,
  },
  
  // Legend Styles
  legendContainer: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  
  legendTitle: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  
  legendItems: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SPACING.xs,
  },
  
  legendText: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.medium,
    color: COLORS.textPrimary,
  },
  
  // Charts Styles
  chartsScrollView: {
    flex: 1,
  },
  
  chartsContent: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.lg,
  },
  
  chartContainer: {
    width: width * 0.85,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    marginRight: SPACING.md,
  },
  
  chartHeader: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  
  competenceIndicator: {
    width: 20,
    height: 4,
    borderRadius: 2,
    marginBottom: SPACING.xs,
  },
  
  chartTitle: {
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: TYPOGRAPHY.semibold,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  
  totalCount: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
  },
  
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    marginBottom: SPACING.md,
  },
  
  barColumn: {
    alignItems: 'center',
    width: 60,
  },
  
  valueLabel: {
    fontSize: TYPOGRAPHY.caption,
    fontWeight: TYPOGRAPHY.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  
  barContainer: {
    height: 150,
    width: 24,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  
  bar: {
    width: '100%',
    borderRadius: 12,
    minHeight: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  
  barShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
  },
  
  strandLabel: {
    fontSize: TYPOGRAPHY.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.medium,
    marginTop: SPACING.xs,
    lineHeight: 14,
  },
  
  workCoveredContainer: {
    marginTop: SPACING.xs,
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  
  workCoveredText: {
    fontSize: TYPOGRAPHY.small - 2,
    color: COLORS.textMuted,
    fontWeight: TYPOGRAPHY.medium,
  },
  
  chartFooter: {
    alignItems: 'center',
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },
  
  footerText: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
  },
});

export default CompetenceAnalysisComponent;