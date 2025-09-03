import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Svg, { Path, Text as SvgText, Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context'; 

const COLORS = {
  primary: 'green', // Green for boys
  secondary: 'red', // Blue for girls
  background: '#F5F5F5',
  surface: '#FFFFFF',
  textPrimary: '#212121',
  textSecondary: '#757575',
  border: '#E0E0E0',
  error: '#F44336',
  warning: '#FF9800',
  success: '#4CAF50',
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const FONT_SIZES = {
  small: 12,
  medium: 14,
  large: 16,
  xlarge: 20,
  title: 24,
};

const dummyData = {
  className: 'Grade 1',
  boys: 15,
  girls: 12,
  teacher: {
    email: 'teacher@example.com',
    phone: '+254 700 000 111',
  },
  healthConditions: [
    { name: 'John Doe', studentId: 'ST001', condition: 'Asthma' },
    { name: 'Jane Smith', studentId: 'ST002', condition: 'Diabetes' },
  ],
  disabilities: [
    { name: 'Alice Johnson', studentId: 'ST003', condition: 'Dyslexia' },
  ],
  students: [
    { id: '1', name: 'John Doe', studentId: 'ST001', age: 6, gender: 'M' },
    { id: '2', name: 'Jane Smith', studentId: 'ST002', age: 7, gender: 'F' },
    { id: '3', name: 'Alice Johnson', studentId: 'ST003', age: 6, gender: 'F' },
    { id: '4', name: 'Bob Brown', studentId: 'ST004', age: 7, gender: 'M' },
    { id: '5', name: 'Charlie Davis', studentId: 'ST005', age: 6, gender: 'M' },
  ],
  averagePerformance: 85,
  attendanceRate: 95,
};

const ClassInfo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState([]);

  const totalStudents = dummyData.boys + dummyData.girls;

  const segments = [
    { label: 'Boys', value: dummyData.boys, color: COLORS.primary },
    { label: 'Girls', value: dummyData.girls, color: COLORS.secondary },
  ];

  const pieTotal = segments.reduce((sum, seg) => sum + seg.value, 0) || 1;
  let startAngle = 0;
  const pieData = segments.map((seg) => {
    const percentage = (seg.value / pieTotal) * 100;
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    const data = { ...seg, startAngle, endAngle, percentage };
    startAngle = endAngle;
    return data;
  });

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', x, y,
      'Z',
    ].join(' ');
  };

  const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;

  const textPosition = (d, radiusOffset = 30) => polarToCartesian(50, 50, radiusOffset, midAngle(d));

  const showModal = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setModalVisible(true);
  };

  const renderModalItem = ({ item }) => (
    <View style={styles.modalItem}>
      <Text style={styles.modalText}>{item.name} (ID: {item.studentId}) - {item.condition}</Text>
    </View>
  );

  const renderStudentItem = ({ item, index }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{index + 1}</Text>
      <View style={[styles.tableCell, styles.nameCell]}>
        <Text>{item.name}</Text>
        <Text style={styles.idText}>(ID: {item.studentId})</Text>
      </View>
      <Text style={styles.tableCell}>{item.age}</Text>
      <Text style={styles.tableCell}>{item.gender}</Text>
    </View>
  );

  const renderListItem = ({ item }) => {
    switch (item.type) {
      case 'heading':
        return <Text style={styles.heading}>{dummyData.className}</Text>;
      case 'gender':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gender Distribution</Text>
<View style={styles.pieContainer}>
  <Svg height="200" width="200" viewBox="0 0 100 100">
    {pieData.map((segment) => (
      segment.value > 0 && (
        <Path
          key={segment.label}
          d={describeArc(50, 50, 45, segment.startAngle, segment.endAngle)}
          fill={segment.color}
        />
      )
    ))}
    
    {/* Add a circle in the center to create the hollow effect */}
    <Circle
      cx="50"
      cy="50"
      r="20" // Adjust the radius to control the size of the hollow center
      fill={COLORS.background} // Match the background color
    />

    {/* Labels inside slices */}
    {pieData.map((segment) => {
      if (segment.value > 0) {
        const pos = textPosition(segment);
        return (
          <SvgText
            key={segment.label}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dy=".3em"
            fontSize="6"
            fill="#FFF"
          >
            {`${segment.label}\n${segment.value}`}
          </SvgText>
        );
      }
      return null;
    })}
  </Svg>
</View>

            <Text style={styles.totalText}>Total Students: {totalStudents}</Text>
          </View>
        );
      case 'teacher':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Class Teacher Details</Text>
            <View style={styles.card}>
              <Text style={styles.cardText}>Email: {dummyData.teacher.email}</Text>
              <Text style={styles.cardText}>Phone: {dummyData.teacher.phone}</Text>
            </View>
          </View>
        );
      case 'health':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Health Overview</Text>
            <View style={styles.row}>
              <TouchableOpacity
                style={styles.healthCard}
                onPress={() => showModal('Critical Health Conditions', dummyData.healthConditions)}
              >
                <Text style={styles.healthNumber}>{dummyData.healthConditions.length}</Text>
                <Text style={styles.healthLabel}>Critical Health</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.healthCard}
                onPress={() => showModal('Disabilities', dummyData.disabilities)}
              >
                <Text style={styles.healthNumber}>{dummyData.disabilities.length}</Text>
                <Text style={styles.healthLabel}>Disabilities</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      case 'performance':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Class Performance Summary</Text>
            <View style={styles.card}>
              <Text style={styles.cardText}>Average Performance: {dummyData.averagePerformance}%</Text>
              <Text style={styles.cardText}>Attendance Rate: {dummyData.attendanceRate}%</Text>
            </View>
          </View>
        );
      case 'students':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Student List</Text>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>Index</Text>
              <Text style={[styles.tableCell, styles.nameCell]}>Name & ID</Text>
              <Text style={styles.tableCell}>Age</Text>
              <Text style={styles.tableCell}>Gender</Text>
            </View>
            {dummyData.students.map((student, index) => renderStudentItem({ item: student, index }))}
          </View>
        );
      default:
        return null;
    }
  };

  const data = [
    { type: 'heading', id: 'heading' },
    { type: 'gender', id: 'gender' },
    { type: 'teacher', id: 'teacher' },
    { type: 'health', id: 'health' },
    { type: 'performance', id: 'performance' },
    { type: 'students', id: 'students' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <FlatList
              data={modalData}
              renderItem={renderModalItem}
              keyExtractor={(item) => item.studentId}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  heading: {
    fontSize: FONT_SIZES.title,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    // marginBottom: SPACING.lg,
    letterSpacing: 1,
  },
  section: {
    marginBottom: SPACING.lg,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  pieContainer: {
    alignItems: 'left',
    justifyContent: 'center',
  },
  totalText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: SPACING.sm,
    position: 'absolute',
    bottom: 35,
    right:20,
  },
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  healthCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  healthNumber: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  healthLabel: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tableCell: {
    flex: 1,
    fontSize: FONT_SIZES.small,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  nameCell: {
    flex: 2,
    textAlign: 'left',
  },
  nameCell: {
  flex: 2,
  // Remove textAlign: 'left' if using the View approach
},

idText: {
  fontSize: FONT_SIZES.small - 1,
  color: COLORS.textSecondary,
},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: FONT_SIZES.large,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  modalItem: {
    marginBottom: SPACING.sm,
  },
  modalText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  closeText: {
    fontSize: FONT_SIZES.medium,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ClassInfo;