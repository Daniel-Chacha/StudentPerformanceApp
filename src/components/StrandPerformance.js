import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';

const StrandPerformance = ({ data }) => {
  // Define the pie chart data with labels and colors
  const segments = [
    { key: 'BE', label: 'BE', value: data.BE || 0, color: 'red' },
    { key: 'AE', label: 'AE', value: data.AE || 0, color: 'orange' },
    { key: 'ME', label: 'ME', value: data.ME || 0, color: 'green' },
    { key: 'EE', label: 'EE', value: data.EE || 0, color: 'blue' },
  ];

  // Calculate total
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;

  // Calculate pie slice angles
  let startAngle = 0;
  const pieData = segments.map((segment) => {
    const percentage = (segment.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    const data = { ...segment, startAngle, endAngle, percentage };
    startAngle = endAngle;
    return data;
  });

  // Polar to Cartesian
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  // Arc path
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

  return (
    <View style={styles.container}>
      {/* Pie Chart */}
      <View style={styles.chartContainer}>
<Svg height="150" width="150" viewBox="0 0 100 100">
  {pieData.map((segment) => {
    if (segment.value <= 0) return null;

    const midAngle = (segment.startAngle + segment.endAngle) / 2;
    const labelPos = polarToCartesian(50, 50, 30, midAngle);

    return (
      <React.Fragment key={segment.key}>
        <Path
          d={describeArc(50, 50, 45, segment.startAngle, segment.endAngle)}
          fill={segment.color}
        />
        <SvgText
          x={labelPos.x}
          y={labelPos.y}
          fontSize="6"
          fill="white"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight="bold"
        >
          {segment.label}
        </SvgText>
      </React.Fragment>
    );
  })}

  {/* Donut hole */}
  <Circle cx="50" cy="50" r="20" fill="white" />
</Svg>

      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        {pieData.map((segment) => (
          <View key={segment.key} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: segment.color }]} />
            <Text style={styles.legendText}>
              {segment.label}: <Text style={{ fontWeight: 'bold' }}>{segment.percentage.toFixed(1)}%</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
    flexDirection: 'row',
  },
  chartContainer: {
    marginBottom: 10,
  },
  legendContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: 150,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#333',
  },
});

export default StrandPerformance;
