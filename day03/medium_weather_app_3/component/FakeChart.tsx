import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, yAxisSides } from 'react-native-gifted-charts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 32; // 16px padding each side

// ─── Types ───────────────────────────────────────────────────────────────────
interface HourlyData {
  time: string; // e.g. "12am", "3am", "6am"
  temp: number; // celsius
}

interface WeatherLineChartProps {
  data: HourlyData[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Map a temperature value to a color on the yellow→orange scale */
function tempToColor(temp: number, min: number, max: number): string {
  const ratio = (temp - min) / (max - min); // 0 = cold, 1 = hot
  // cold = #E8C840 (yellow), hot = #E86420 (deep orange)
  const r = Math.round(232);
  const g = Math.round(200 - ratio * 132); // 200 → 68 (less green = more orange)
  const b = Math.round(64 - ratio * 64); // 64 → 0
  return `rgb(${r},${g},${b})`;
}

/** X-axis labels shown — only specific hours */
const X_AXIS_LABELS = ['12am', '6am', '12pm', '6pm'];

// ─── Component ───────────────────────────────────────────────────────────────
export default function WeatherLineChart({ data }: WeatherLineChartProps) {
  const temps = data.map((d) => d.temp);
  const minTemp = Math.min(...temps);
  const maxTemp = Math.max(...temps);

  // Index of high and low points
  const highIdx = temps.indexOf(maxTemp);
  const lowIdx = temps.indexOf(minTemp);

  // Build gifted-charts data points
  const chartData = useMemo(
    () =>
      data.map((d, i) => {
        const isHigh = i === highIdx;
        const isLow = i === lowIdx;

        return {
          value: d.temp,
          // Custom dot — white ring, transparent fill
          customDataPoint: () => (
            <View style={styles.dotOuter}>
              <View style={styles.dotInner} />
            </View>
          ),
          // Show dot only at High and Low + last point
          hideDataPoint: !isHigh && !isLow && i !== data.length - 1,
          // Label above the point
          dataPointLabelComponent:
            isHigh || isLow
              ? () => (
                  <View style={styles.labelContainer}>
                    <Text style={styles.labelText}>{isHigh ? 'H' : 'L'}</Text>
                  </View>
                )
              : undefined,
          dataPointLabelShiftY: isHigh ? -28 : -28,
          dataPointLabelShiftX: -6,
        };
      }),
    [data, highIdx, lowIdx]
  );

  // X axis label component — only show for specific hours
  const xAxisLabelTexts = data.map((d) =>
    X_AXIS_LABELS.includes(d.time) ? d.time : ''
  );

  // Gradient definition for the area below the line
  // gifted-charts accepts a linearGradient config
  const areaGradient = {
    startFillColor: 'rgba(232, 140, 32, 0.6)', // orange-ish top
    endFillColor: 'rgba(60, 120, 40, 0.15)', // dark green bottom
    startOpacity: 0.9,
    endOpacity: 0.1,
  };

  // Y axis labels — shown on the right, every 3 degrees
  const yAxisStep = 3;
  const yMin = Math.floor(minTemp / yAxisStep) * yAxisStep - yAxisStep;
  const yMax = Math.ceil(maxTemp / yAxisStep) * yAxisStep + yAxisStep;

  return (
    <View style={styles.container}>
      <LineChart
        // ── Data ──────────────────────────────────────────
        data={chartData}
        // ── Dimensions ────────────────────────────────────
        width={CHART_WIDTH} // leave room for right Y axis
        height={180}
        // ── Line style ────────────────────────────────────
        curved
        curvature={0.3}
        thickness={7}
        color="#E8A020" // base line color (orange-yellow)
        // ── Area fill ─────────────────────────────────────
        areaChart
        startFillColor={areaGradient.startFillColor}
        endFillColor={areaGradient.endFillColor}
        startOpacity={areaGradient.startOpacity}
        endOpacity={areaGradient.endOpacity}
        // ── Y axis ────────────────────────────────────────
        // yAxisSide={yAxisSides.RIGHT}
        yAxisColor="white"
        yAxisTextStyle={styles.yAxisText}
        yAxisLabelSuffix="°"
        stepValue={yAxisStep}
        maxValue={yMax}
        mostNegativeValue={yMin}
        noOfSections={Math.round((yMax - yMin) / yAxisStep)}
        // ── X axis ────────────────────────────────────────
        xAxisColor="rgba(255,255,255,0.15)"
        xAxisThickness={0.5}
        xAxisLabelTexts={xAxisLabelTexts}
        xAxisLabelTextStyle={styles.xAxisText}
        // ── Grid lines (vertical dashed) ──────────────────
        showVerticalLines
        verticalLinesColor="rgba(255,255,255,0.1)"
        verticalLinesThickness={0.5}
        verticalLinesStrokeDashArray={[4, 4]}
        // hide horizontal grid lines
        hideRules
        // ── Data points ───────────────────────────────────
        dataPointsColor="transparent"
        dataPointsRadius={5}
        // ── Background ────────────────────────────────────
        backgroundColor="transparent"
        // ── Spacing ───────────────────────────────────────
        // spacing={CHART_WIDTH / data.length - 4}
        initialSpacing={0}
        endSpacing={0}
        // ── Pointer (touch) ───────────────────────────────
        // pointerConfig={{
        //   pointerStripHeight: 140,
        //   pointerStripColor: 'rgba(255,255,255,0.2)',
        //   pointerStripWidth: 1,
        //   pointerColor: '#E8A020',
        //   radius: 5,
        //   pointerLabelWidth: 80,
        // pointerLabelHeight: 38,
        // activatePointersOnLongPress: false,
        // autoAdjustPointerLabelPosition: true,
        // pointerLabelComponent: (items: any[]) => (
        //   <View style={styles.tooltip}>
        //     <Text style={styles.tooltipTemp}>{items[0].value}°</Text>
        //   </View>
        // ),
        // }}
      />
    </View>
  );
}

// ─── Weekly variant (7-day bar + line) ───────────────────────────────────────
// Use the same component with 7 data points, one per day label

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A1F2E', // dark background matching design
    borderRadius: 16,
    paddingVertical: 12,
    paddingLeft: 8,
    overflow: 'hidden',
  },
  // Y axis
  yAxisText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontFamily: 'System',
  },
  // X axis
  xAxisText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    marginTop: 6,
  },
  // Data point dot — white ring
  dotOuter: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotInner: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  // H / L label above dot
  labelContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  labelText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    fontWeight: '600',
  },
  // Touch tooltip
  tooltip: {
    backgroundColor: 'rgba(30,35,50,0.9)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  tooltipTemp: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

// ─── Usage example ───────────────────────────────────────────────────────────
/*
const hourlyData = [
  { time: "12am", temp: 24 },
  { time: "1am",  temp: 23 },
  { time: "2am",  temp: 23 },
  { time: "3am",  temp: 22 },
  { time: "4am",  temp: 22 },
  { time: "5am",  temp: 23 },
  { time: "6am",  temp: 25 },
  { time: "7am",  temp: 27 },
  { time: "8am",  temp: 28 },
  { time: "9am",  temp: 29 },
  { time: "10am", temp: 30 },
  { time: "11am", temp: 31 },
  { time: "12pm", temp: 32 },
  { time: "1pm",  temp: 31 },
  { time: "2pm",  temp: 30 },
  { time: "3pm",  temp: 29 },
  { time: "4pm",  temp: 28 },
  { time: "5pm",  temp: 27 },
  { time: "6pm",  temp: 26 },
];

<WeatherLineChart data={hourlyData} />
*/
