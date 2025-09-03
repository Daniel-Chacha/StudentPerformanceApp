import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Svg, { Circle, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';

const StudentResults = ({ route }) => {
  const params = route?.params || {};
  const subjectName = params.subjectName || 'Unknown Subject';
  const students = params.students || [];
  
  // State for search, filter, and sort
  const [searchQuery, setSearchQuery] = useState('');
  const [competenceFilter, setCompetenceFilter] = useState('All');
  const [sortOption, setSortOption] = useState('name-asc');
  const [showControls, setShowControls] = useState(false);

  // Competence level colors and styling
  const getCompetenceStyle = (competence) => {
    const competenceMap = {
      'EE': { color: '#2196F3', label: 'Exceeding', bgColor: '#E3F2FD' },
      'ME': { color: '#4CAF50', label: 'Meeting', bgColor: '#E8F5E8' },
      'AE': { color: '#FFB347', label: 'Approaching', bgColor: '#FFF3E0' },
      'BE': { color: '#FF4444', label: 'Below', bgColor: '#FFEBEE' },
    };
    return competenceMap[competence] || { color: '#9E9E9E', label: 'N/A', bgColor: '#F5F5F5' };
  };

  const getInitialsBgColor = (name) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD'];
    const charCode = name?.charCodeAt(0) || 0;
    return colors[charCode % colors.length];
  };

  // Get unique competence levels for filter
  const competenceLevels = useMemo(() => {
    const unique = [...new Set(students.map(student => student.competence).filter(Boolean))];
    return ['All', ...unique.sort()];
  }, [students]);

  // Sort options
  const sortOptions = [
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'id-asc', label: 'Student ID (Low-High)' },
    { value: 'id-desc', label: 'Student ID (High-Low)' },
    { value: 'competence', label: 'Competence Level' }
  ];

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(student => 
        student.name?.toLowerCase().includes(query) ||
        (student.id || student.studentId)?.toString().includes(query)
      );
    }

    // Filter by competence
    if (competenceFilter !== 'All') {
      result = result.filter(student => student.competence === competenceFilter);
    }

    // Sort students
    result.sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return (a.name || '').localeCompare(b.name || '');
        case 'name-desc':
          return (b.name || '').localeCompare(a.name || '');
        case 'id-asc':
          return (a.id || a.studentId || 0) - (b.id || b.studentId || 0);
        case 'id-desc':
          return (b.id || b.studentId || 0) - (a.id || a.studentId || 0);
        case 'competence':
          const order = { 'EE': 4, 'ME': 3, 'AE': 2, 'BE': 1 };
          return (order[b.competence] || 0) - (order[a.competence] || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [students, searchQuery, competenceFilter, sortOption]);

  // Custom Select Component
  const CustomSelect = ({ value, options, onValueChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value) || options.find(opt => opt === value);
    const displayValue = selectedOption?.label || selectedOption || placeholder;

    return (
      <View style={styles.selectContainer}>
        <TouchableOpacity 
          style={styles.selectButton}
          onPress={() => setIsOpen(!isOpen)}
        >
          <Text style={styles.selectButtonText}>{displayValue}</Text>
          <Text style={styles.selectArrow}>{isOpen ? '▲' : '▼'}</Text>
        </TouchableOpacity>
        
        {isOpen && (
          <View style={styles.selectDropdown}>
            {options.map((option, index) => {
              const optionValue = option.value || option;
              const optionLabel = option.label || option;
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.selectOption}
                  onPress={() => {
                    onValueChange(optionValue);
                    setIsOpen(false);
                  }}
                >
                  <Text style={[
                    styles.selectOptionText,
                    value === optionValue && styles.selectedOptionText
                  ]}>
                    {optionLabel}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  };

  const renderStudentItem = ({ item, index }) => {
    const initial = item.name?.charAt(0).toUpperCase() || "?";
    const competenceStyle = getCompetenceStyle(item.competence);
    const initialsBgColor = getInitialsBgColor(item.name);
    const isEven = index % 2 === 0;

    return (
      <TouchableOpacity 
        style={[styles.row, isEven ? styles.evenRow : styles.oddRow]}
        activeOpacity={0.7}
      >
        <View style={styles.initialsContainer}>
          <Svg height="50" width="50" viewBox="0 0 100 100">
            <Defs>
              <LinearGradient id={`grad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor={initialsBgColor} />
                <Stop offset="100%" stopColor={initialsBgColor + 'CC'} />
              </LinearGradient>
            </Defs>
            <Circle
              cx="50"
              cy="50"
              r="45"
              fill={`url(#grad${index})`}
              stroke="#FFFFFF"
              strokeWidth="3"
            />
            <SvgText
              x="50"
              y="50"
              textAnchor="middle"
              dy=".3em"
              fontSize="32"
              fontWeight="bold"
              fill="#FFFFFF"
            >
              {initial}
            </SvgText>
          </Svg>
        </View>
        
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.studentId}>ID: {item.id || item.studentId || 'N/A'}</Text>
        </View>
        
        <View style={styles.competenceContainer}>
          <View style={[styles.competenceBadge, { backgroundColor: competenceStyle.bgColor }]}>
            <View style={[styles.competenceDot, { backgroundColor: competenceStyle.color }]} />
            <Text style={[styles.competenceText, { color: competenceStyle.color }]}>
              {competenceStyle.label}
            </Text>
          </View>
          <Text style={styles.competenceCode}>{item.competence || 'N/A'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.subjectTitle}>{subjectName}</Text>
          {/* <View style={styles.statsContainer}>
            <Text style={styles.statNumber}>{filteredAndSortedStudents.length}</Text>
            <Text style={styles.statLabel}>
              {filteredAndSortedStudents.length === 1 ? 'Student' : 'Students'}
              {searchQuery || competenceFilter !== 'All' ? ' (Filtered)' : ''}
            </Text>
          </View> */}
        </View>
      </View>

      {/* Toggle Controls Button */}
        <View style={styles.toggleContainer}>
        <TouchableOpacity 
            style={styles.toggleButton}
            onPress={() => setShowControls(!showControls)}
        >
            <Text style={styles.toggleButtonText}>
            {showControls ? 'Hide' : 'Show'} Search & Filters
            </Text>
            <Text style={[styles.toggleArrow, showControls && styles.toggleArrowOpen]}>
            ▼
            </Text>
        </TouchableOpacity>
        </View>

      {/* Search and Filter Controls */}
      
      {showControls && (
        <View style={styles.controlsContainer}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or student ID..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.searchIcon}>🔍</Text>
        </View>

        {/* Filter and Sort Controls */}
        <View style={styles.filterSortContainer}>
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Filter:</Text>
            <CustomSelect
              value={competenceFilter}
              options={competenceLevels}
              onValueChange={setCompetenceFilter}
              placeholder="All Competences"
            />
          </View>

          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Sort:</Text>
            <CustomSelect
              value={sortOption}
              options={sortOptions}
              onValueChange={setSortOption}
              placeholder="Sort by..."
            />
          </View>
        </View>
        </View>
        )}


      {/* Modern Table Header */}
      <View style={styles.tableHeaderContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, styles.initialsHeaderCell]}>Profile</Text>
          <Text style={[styles.headerCell, styles.nameHeaderCell]}>Student Details</Text>
          <Text style={[styles.headerCell, styles.competenceHeaderCell]}>Competence</Text>
        </View>
      </View>

      {/* Enhanced Students List */}
      <FlatList
        data={filteredAndSortedStudents}
        renderItem={renderStudentItem}
        keyExtractor={(item, index) =>
          item.id?.toString() || item.studentId?.toString() || index.toString()
        }
        style={styles.table}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>
              {searchQuery || competenceFilter !== 'All' ? '🔍' : '📚'}
            </Text>
            <Text style={styles.emptyTitle}>
              {searchQuery || competenceFilter !== 'All' ? 'No Results Found' : 'No Students Found'}
            </Text>
            <Text style={styles.emptyText}>
              {searchQuery || competenceFilter !== 'All' 
                ? 'Try adjusting your search or filter criteria.'
                : 'There are no students enrolled in this subject yet.'
              }
            </Text>
            {(searchQuery || competenceFilter !== 'All') && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setSearchQuery('');
                  setCompetenceFilter('All');
                }}
              >
                <Text style={styles.clearButtonText}>Clear Filters</Text>
              </TouchableOpacity>
            )}
          </View>
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Summary Footer */}
      {students.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Showing {filteredAndSortedStudents.length} of {students.length} student{students.length !== 1 ? 's' : ''} for {subjectName}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  
  // Enhanced Header Styles
  header: {
    backgroundColor: '#1A2B43',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    padding: 5,
  },
  subjectTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsContainer: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800',
  },
  statLabel: {
    color: '#B8C5D1',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
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
  padding: 12,
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
  fontSize: 12,
  color: '#6B7280',
  transform: [{ rotate: '0deg' }],
},
toggleArrowOpen: {
  transform: [{ rotate: '180deg' }],
},

  // Controls Container
  controlsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex:10,
  },

  // Search Styles
  searchContainer: {
    position: 'relative',
    marginBottom: 5,
  },
  searchInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    paddingRight: 40,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    position: 'absolute',
    right: 12,
    top: 12,
    fontSize: 16,
  },

  // Filter and Sort Controls
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  controlGroup: {
    flex: 1,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 5,
  },

  // Custom Select Styles
  selectContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  selectButton: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectButtonText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  selectArrow: {
    fontSize: 12,
    color: '#6B7280',
  },
  selectDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 1000,
    maxHeight: 200,
  },
  selectOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedOptionText: {
    color: '#2563EB',
    fontWeight: '600',
  },

  // Modern Table Header
  tableHeaderContainer: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerCell: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  initialsHeaderCell: {
    flex: 1,
  },
  nameHeaderCell: {
    flex: 2.5,
    textAlign: 'left',
    paddingLeft: 8,
  },
  competenceHeaderCell: {
    flex: 1.8,
  },

  // Enhanced Table Styles
  table: {
    flex: 1,
    marginHorizontal: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  evenRow: {
    backgroundColor: '#FFFFFF',
  },
  oddRow: {
    backgroundColor: '#F9FAFB',
  },
  separator: {
    height: 4,
  },

  // Profile/Initials Styles
  initialsContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 8,
  },

  // Name Container Styles
  nameContainer: {
    flex: 2.5,
    paddingLeft: 8,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  // Enhanced Competence Styles
  competenceContainer: {
    flex: 1.8,
    alignItems: 'center',
  },
  competenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 4,
    minWidth: 100,
    justifyContent: 'center',
  },
  competenceDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  competenceText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  competenceCode: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },

  // Enhanced Empty State
  emptyContainer: {
    paddingVertical: 60,
    paddingHorizontal: 32,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  clearButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Footer
  footer: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default StudentResults;