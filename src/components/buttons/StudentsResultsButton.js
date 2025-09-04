import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const StudentsResultsButton = ({ navigation, strand, students }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        navigation.navigate('StudentResults', {
          subjectName: strand,
          students: (students || []).map((s) => ({
            id: s.studentId,   // use studentId as key
            name: s.name,
            competence: s.competence,
          })),
        })
      }
    >
      <Text style={styles.buttonText}>Strand Results</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'hsl(216.923 56% 18%)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default StudentsResultsButton;
