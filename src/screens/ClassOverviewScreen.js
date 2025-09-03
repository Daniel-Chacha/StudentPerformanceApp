import React from 'react';
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import MasteryKeyReference from '../components/MasteryKeyReference';
import StrandCard from '../components/StrandCard'; // Adjust path as needed
import { COLORS, SPACING, FONT_SIZES } from '../utils/constants';
import { Info } from 'lucide-react-native';
import { useEffect, useState } from "react";
import Constants from "expo-constants";

const ClassOverviewScreen = ({ navigation }) => {
  const {loading, error, searchQuery, setSearchQuery, classProfile, getFilteredStudents, getStudentsByStrand, setSelectedStudent,} = useApp();
  const [strands, setStrands] = useState([]);
  const [fetching, setFetching] = useState(true);

  const getBaseURL = () => {
  const debuggerHost =
    Constants.expoGoConfig?.debuggerHost ||
    Constants.manifest2?.extra?.expoClient?.hostUri;

  if (debuggerHost) {
    const host = debuggerHost.split(":").shift(); 
    const localhost =  `http://${host}:3000`;
    // console.log("Localhost Url:", localhost)
    return localhost
  }else{
    return "http://192.168.100.101:3000";
  }
};

  useEffect(() => {
  const getStrands = async () => {
    try {
      const response = await fetch(`${getBaseURL()}/class_profile`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("DATA", data)
      setStrands(data?.strands || []);
    } catch (error) {
      console.error("Error fetching strands:", error);
    } finally {
      setFetching(false);
    }
  };

  getStrands();
}, []);

  if (fetching) {
    return <SafeAreaView style={{flex: 1, justifyContent: 'center',}}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={{textAlign:'center', marginTop: 5, fontSize:15}}>Loading ...</Text>
    </SafeAreaView>
  }

  // console.log("STRANDS;", strands)

  const handleStudentPress = (student) => {
    setSelectedStudent(student);
    navigation.navigate('StudentDetails', {
      studentId: student.id,
      studentName: student.name,
    });
  };

  const renderStrandCards = () => {
    return strands.map((strand) => {
      // const studentsInStrand = getStudentsByStrand(strand.name);
      const filteredStudents = strand.students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return (
        <StrandCard
          key={strand.strandId}
          strand={strand.strand}
          students={filteredStudents}
          progress={strand.workCovered}
          onStudentPress={handleStudentPress}
          navigation={navigation} // Pass navigation prop
        />
      );
    });
  };

  if (fetching || (loading && !classProfile)) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading class data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>⚠️ {error}</Text>
          <Text style={styles.errorSubtext}>
            Please check your connection and try again
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              {classProfile?.className || 'Class Performance Overview.'}
            </Text>
            <Text style={styles.subtitle}>
              {classProfile?.totalStudents || 0} Students
            </Text>
          </View>

          <TouchableOpacity style={styles.classInfoButton}
          onPress={() => navigation.navigate("ClassInfo")}
          >
            <Info color="#FFFFFF" size={20} style={styles.infoIcon} />
            <Text style={styles.classInfoText}>Info.</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        {/* <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search students..."
          />
        </View> */}
        {/* Mastery Key Reference */}
        <View style={styles.masteryKeyContainer}>
          <MasteryKeyReference />
        </View>
        {/* Learning Strands Display */}
        <View style={styles.strandsContainer}>
          <Text style={styles.sectionTitle}>Learning Strands</Text>
          {renderStrandCards()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
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
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  errorSubtext: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: SPACING.md,
  backgroundColor: COLORS.surface,
  borderBottomWidth: 1,
  borderBottomColor: COLORS.border,
},
title: {
  fontSize: FONT_SIZES.title,
  fontWeight: 'bold',
  color: COLORS.textPrimary,
  textAlign: 'left',   // changed
},
subtitle: {
  fontSize: FONT_SIZES.medium,
  color: COLORS.textSecondary,
  marginTop: SPACING.xs,
  textAlign: 'left',   // changed
},

  classInfoButton: {
    backgroundColor: '#1A2B43',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoIcon: {
    marginRight: 8,
  },
  classInfoText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  masteryKeyContainer: {
    marginHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  strandsContainer: {
    paddingHorizontal: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  footer: {
    height: SPACING.xl,
  },
});

export default ClassOverviewScreen;