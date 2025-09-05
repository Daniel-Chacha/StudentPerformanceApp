import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  StatusBar 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SPACING, TYPOGRAPHY } from '../utils/constants';
import { RADIUS } from '../utils/constants';

const { width, height } = Dimensions.get('window');

// Enhanced Design System
const COLORS = {
  primary: 'hsl(216.923 56% 18%)',
  primaryLight: 'hsl(216.923 56% 28%)',
  background: '#F5F5F5',
  backgroundSecondary: '#F5FEFD',
  surface: '#334155',
  surfaceLight: '#475569',
  textPrimary: '#1e293b',
  textSecondary: '#334155',
  textMuted: '#475569',
  white: '#ffffff',
  shadow: 'rgba(0, 0, 0, 0.3)',
  overlay: 'rgba(0, 0, 0, 0.1)',
};


const HomeScreen = ({ navigation }) => {
  const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleGradeSelect = (grade) => {
    navigation.navigate('ClassOverview', { grade });
  };

  const renderGradeButton = (grade, index) => {
    return (
      <TouchableOpacity
        key={grade}
        style={styles.gradeButton}
        onPress={() => handleGradeSelect(grade)}
        activeOpacity={0.8}
      >
        <View style={styles.gradeButtonInner}>
          <View style={styles.gradeButtonBackground} />
          <Text style={styles.gradeButtonText}>{grade}</Text>
          <View style={styles.gradeButtonGlow} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderFloatingShape = (shapeStyle, key) => (
    <View key={key} style={[styles.floatingShape, shapeStyle]} />
  );

  return (
    <>
      <View style={styles.container}>
        {/* Background with gradient simulation */}
        <View style={styles.backgroundGradient}>
          {/* Floating decorative elements */}
          {renderFloatingShape(styles.shape1, 'shape1')}
          {renderFloatingShape(styles.shape2, 'shape2')}
          {renderFloatingShape(styles.shape3, 'shape3')}
          {renderFloatingShape(styles.shape4, 'shape4')}
        </View>

        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            bounces={true}
          >
            {/* Header Section */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>EduTrack Pro</Text>
              <Text style={styles.headerSubtitle}>Advanced Analytics Platform</Text>
            </View>

            {/* Grade Selection Section */}
            <View style={styles.selectionContainer}>
              <View style={styles.instructionContainer}>
                <View style={styles.titleDecoration}>
                  <View style={styles.titleLine} />
                  <Text style={styles.instructionText}>CLASS PERFORMANCE</Text>
                  <View style={styles.titleLine} />
                </View>
                <Text style={styles.instructionSubtext}>
                  Select a grade level to view detailed performance analytics
                </Text>
              </View>

              <View style={styles.gradesGrid}>
                {grades.map((grade, index) => renderGradeButton(grade, index))}
              </View>
            </View>
          </ScrollView>

          {/* Enhanced Footer */}
          <View style={styles.footer}>
            <View style={styles.footerGradient}>
              <View style={styles.footerContent}>
                {/* Stats Section */}
                <View style={styles.footerStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>9</Text>
                    <Text style={styles.statLabel}>Grades</Text>
                  </View>
                  
                  <View style={styles.statDivider} />
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>24/7</Text>
                    <Text style={styles.statLabel}>Access</Text>
                  </View>
                  
                  <View style={styles.statDivider} />
                  
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>∞</Text>
                    <Text style={styles.statLabel}>Insights</Text>
                  </View>
                </View>
                
                {/* Copyright */}
                <Text style={styles.footerCopyright}>
                  © 2024 EduTrack Pro. Empowering education through data.
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: COLORS.background,
  },
  
  // Background and floating elements
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.background,
    overflow: 'hidden',
  },
  
  floatingShape: {
    position: 'absolute',
    opacity: 0.06,
  },
  
  shape1: {
    top: 100,
    left: -50,
    width: 200,
    height: 200,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.xl,
    transform: [{ rotate: '45deg' }],
  },
  
  shape2: {
    top: 300,
    right: -80,
    width: 150,
    height: 150,
    backgroundColor: COLORS.primary,
    borderRadius: 75,
  },
  
  shape3: {
    bottom: 200,
    left: width / 2 - 50,
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    transform: [{ rotate: '30deg' }],
  },
  
  shape4: {
    bottom: 400,
    right: 50,
    width: 120,
    height: 120,
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.lg,
    transform: [{ rotate: '-15deg' }],
  },

  safeArea: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
  
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
  },
  
  // Header Styles
  header: {   
    alignItems: 'center',
    marginBottom: SPACING.lg,
    // paddingTop: SPACING.md,
  },
  
  headerTitle: {
    fontSize: TYPOGRAPHY.hero,
    fontWeight: TYPOGRAPHY.black,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
    // marginBottom: SPACING.xs,
  },
  
  headerSubtitle: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
    letterSpacing: 1,
  },

  // Selection Section
  selectionContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: SPACING.xl,
  },
  
  instructionContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
    width: '100%',
  },
  
  titleDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: SPACING.lg,
    width: '100%',
  },
  
  titleLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.primary,
    opacity: 0.3,
  },
  
  instructionText: {
    fontSize: TYPOGRAPHY.title,
    color: COLORS.textPrimary,
    fontWeight: TYPOGRAPHY.bold,
    marginHorizontal: SPACING.md,
    textAlign: 'center',
    letterSpacing: 1,
  },
  
  instructionSubtext: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.regular,
    maxWidth: width * 0.8,
    lineHeight: 22,
    paddingHorizontal: SPACING.md,
  }, 
  
  gradesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.lg,
    maxWidth: 350,
  },
  
  gradeButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 15,
  },
  
  gradeButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: COLORS.primary,
  },
  
  gradeButtonBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primary,
    opacity: 0.9,
  },
  
  gradeButtonText: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: TYPOGRAPHY.black,
    color: COLORS.white,
    textAlign: 'center',
    zIndex: 2,
  },
  
  gradeButtonGlow: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    borderRadius: 30,
    backgroundColor: COLORS.white,
    opacity: 0.15,
    top: '20%',
    left: '20%',
  },

  // Footer Styles
  footer: {
    marginTop: 'auto',
  },
  
  footerGradient: {
    backgroundColor: COLORS.backgroundSecondary,
    borderTopLeftRadius: RADIUS.xxl,
    borderTopRightRadius: RADIUS.xxl,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 15,
    paddingTop: SPACING.md,
  },
  
  footerContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  
  footerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  
  statItem: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  
  statNumber: {
    fontSize: TYPOGRAPHY.subtitle,
    fontWeight: TYPOGRAPHY.black,
    color: COLORS.primary,
    marginBottom: 2,
  },
  
  statLabel: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: TYPOGRAPHY.medium,
  },
  
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.textMuted,
    opacity: 0.4,
  },
  
  footerCopyright: {
    fontSize: TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: TYPOGRAPHY.regular,
    opacity: 0.8,
    lineHeight: 18,
  },
});

export default HomeScreen;