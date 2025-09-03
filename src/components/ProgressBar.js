import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../utils/constants';

const ProgressBar = ({ 
  progress = 0, 
  color = COLORS.primary, 
  height = 8, 
  backgroundColor = COLORS.border,
  borderRadius = 4,
  animated = true,
  style 
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: progress,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }, [progress, animated, animatedValue]);

  const progressWidth = animated 
    ? animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
      })
    : `${Math.max(0, Math.min(100, progress))}%`;

  return (
    <View style={[styles.container, { height, backgroundColor, borderRadius }, style]}>
      <Animated.View
        style={[
          styles.fill,
          {
            width: progressWidth,
            backgroundColor: color,
            borderRadius: borderRadius - 1,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    minWidth: 2,
  },
});

export default ProgressBar;