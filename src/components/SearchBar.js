import React from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Text 
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../utils/constants';

const SearchBar = ({ 
  value, 
  onChangeText, 
  placeholder = "Search...", 
  onClear,
  style 
}) => {
  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          autoCapitalize="words"
          autoCorrect={false}
          returnKeyType="search"
        />
        {value.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton} 
            onPress={handleClear}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.clearText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    fontSize: FONT_SIZES.medium,
    marginRight: SPACING.sm,
    color: COLORS.textSecondary,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.medium,
    color: COLORS.textPrimary,
    paddingVertical: 0, // Remove default padding on Android
  },
  clearButton: {
    padding: SPACING.xs,
    marginLeft: SPACING.sm,
  },
  clearText: {
    fontSize: FONT_SIZES.medium,
    color: COLORS.textSecondary,
    fontWeight: 'bold',
  },
});

export default SearchBar;