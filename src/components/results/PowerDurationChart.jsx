/**
 * PowerDurationChart Component
 * Visualizes the CV/D' hyperbolic power-duration curve
 * Shows maximum sustainable pace at various durations
 */

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import Card from "../ui/Card";
import { generateHyperbolicCurve } from "../../utils/calculations/racePerformanceCalculators";
import { UNIT_SYSTEMS } from "../../constants/zoneDefinitions";
import { useTheme } from "../../contexts/ThemeContext";

// Time annotations to display on the chart (in minutes)
const ANNOTATION_TIMES = [15, 30, 60];

// Chart time range (in seconds)
const MIN_TIME = 180; // 3 minutes
const MAX_TIME = 4200; // 70 minutes (to show beyond 60 min)
const CHART_POINTS = 80;

/**
 * Convert velocity (m/s) to pace (seconds per km or mile)
 */
function velocityToPace(velocityMs, unitSystem) {
  const paceSecPerKm = 1000 / velocityMs;
  return unitSystem === UNIT_SYSTEMS.METRIC
    ? paceSecPerKm
    : paceSecPerKm * 1.60934;
}

/**
 * Format pace for display (returns just the value without unit suffix)
 */
function formatPaceValue(paceSeconds) {
  const minutes = Math.floor(paceSeconds / 60);
  const seconds = Math.floor(paceSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

/**
 * Custom tooltip component for the chart
 */
function CustomTooltip({ active, payload, unitSystem, isDark }) {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  const paceUnit = unitSystem === UNIT_SYSTEMS.METRIC ? "/km" : "/mi";

  return (
    <div
      className={`
        px-3 py-2 rounded-lg border backdrop-blur-sm
        ${
          isDark
            ? "bg-gray-900/90 border-white/20 text-white"
            : "bg-white/90 border-gray-300 text-gray-900"
        }
      `}
    >
      <p className="text-sm font-semibold">
        {Math.floor(data.timeMinutes)} min
      </p>
      <p className={`text-sm ${isDark ? "text-cyan-300" : "text-cyan-700"}`}>
        Pace: {formatPaceValue(data.pace)}
        {paceUnit}
      </p>
    </div>
  );
}

export default function PowerDurationChart({
  cvData,
  unitSystem = UNIT_SYSTEMS.METRIC,
  cvMode = "raw",
}) {
  const { isDark } = useTheme();

  // Generate curve data
  const chartData = useMemo(() => {
    if (!cvData || !cvData.velocity_ms || !cvData.d_prime) {
      return null;
    }

    const { velocity_ms, velocity_ms_raw, d_prime } = cvData;
    const selectedVelocity = cvMode === "raw" ? velocity_ms_raw : velocity_ms;

    // Generate the hyperbolic curve
    const curveData = generateHyperbolicCurve(
      selectedVelocity,
      d_prime,
      MIN_TIME,
      MAX_TIME,
      CHART_POINTS
    );

    // Transform data for Recharts
    return curveData.map((point) => ({
      timeMinutes: point.timeSeconds / 60,
      timeSeconds: point.timeSeconds,
      velocityMs: point.velocityMs,
      pace: velocityToPace(point.velocityMs, unitSystem),
    }));
  }, [cvData, cvMode, unitSystem]);

  // Calculate CV asymptote pace
  const cvAsymptotePace = useMemo(() => {
    if (!cvData) return null;
    const { velocity_ms, velocity_ms_raw } = cvData;
    const selectedVelocity = cvMode === "raw" ? velocity_ms_raw : velocity_ms;
    return velocityToPace(selectedVelocity, unitSystem);
  }, [cvData, cvMode, unitSystem]);

  // Calculate annotation points
  const annotationPoints = useMemo(() => {
    if (!chartData) return [];

    return ANNOTATION_TIMES.map((timeMin) => {
      // Find closest data point to annotation time
      const targetTime = timeMin;
      const closest = chartData.reduce((prev, curr) =>
        Math.abs(curr.timeMinutes - targetTime) <
        Math.abs(prev.timeMinutes - targetTime)
          ? curr
          : prev
      );

      return {
        timeMinutes: timeMin,
        pace: closest.pace,
        label: `${timeMin}min`,
      };
    });
  }, [chartData]);

  // Calculate Y-axis domain (pace range)
  const yAxisDomain = useMemo(() => {
    if (!chartData) return [0, 600];

    const paces = chartData.map((d) => d.pace);
    const minPace = Math.min(...paces);
    const maxPace = Math.max(...paces);

    // Add some padding and round to nice values
    const padding = (maxPace - minPace) * 0.1;
    const domainMin = Math.floor((minPace - padding) / 30) * 30;
    const domainMax = Math.ceil((maxPace + padding) / 30) * 30;

    return [domainMin, domainMax];
  }, [chartData]);

  if (!chartData || !cvAsymptotePace) {
    return null;
  }

  const paceUnit = unitSystem === UNIT_SYSTEMS.METRIC ? "/km" : "/mi";
  const paceLabel = unitSystem === UNIT_SYSTEMS.METRIC ? "min/km" : "min/mi";

  // Theme-based colors
  const colors = {
    curve: isDark ? "#22d3ee" : "#0891b2", // cyan
    cvLine: isDark ? "#a855f7" : "#9333ea", // purple
    grid: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
    axis: isDark ? "#9ca3af" : "#6b7280",
    annotation: isDark ? "#fbbf24" : "#d97706", // amber
  };

  return (
    <Card title="Power-Duration Curve">
      {/* Explanatory note */}
      <p
        className={`text-xs mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}
      >
        Maximum sustainable pace at different durations based on your{" "}
        <strong>{cvMode === "raw" ? "unadjusted" : "adjusted"}</strong> CV and
        D&apos;
      </p>

      {/* Chart container */}
      <div className="w-full h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.grid}
              vertical={false}
            />

            {/* X-Axis: Time in minutes */}
            <XAxis
              dataKey="timeMinutes"
              type="number"
              domain={[0, 70]}
              tickFormatter={(value) => `${Math.floor(value)}`}
              tick={{ fill: colors.axis, fontSize: 12 }}
              axisLine={{ stroke: colors.axis }}
              tickLine={{ stroke: colors.axis }}
              label={{
                value: "Duration (min)",
                position: "bottom",
                offset: 0,
                fill: colors.axis,
                fontSize: 12,
              }}
            />

            {/* Y-Axis: Pace (inverted so faster is higher) */}
            <YAxis
              domain={yAxisDomain}
              reversed={true}
              tickFormatter={(value) => formatPaceValue(value)}
              tick={{ fill: colors.axis, fontSize: 12 }}
              axisLine={{ stroke: colors.axis }}
              tickLine={{ stroke: colors.axis }}
              label={{
                value: paceLabel,
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: colors.axis,
                fontSize: 12,
              }}
              width={50}
            />

            {/* Tooltip */}
            <Tooltip
              content={
                <CustomTooltip unitSystem={unitSystem} isDark={isDark} />
              }
            />

            {/* CV Asymptote Reference Line */}
            <ReferenceLine
              y={cvAsymptotePace}
              stroke={colors.cvLine}
              strokeDasharray="8 4"
              strokeWidth={2}
              label={{
                value: "CV",
                position: "right",
                fill: colors.cvLine,
                fontSize: 11,
                fontWeight: "bold",
              }}
            />

            {/* Main curve line */}
            <Line
              type="monotone"
              dataKey="pace"
              stroke={colors.curve}
              strokeWidth={3}
              dot={false}
              activeDot={{
                r: 6,
                fill: colors.curve,
                stroke: isDark ? "#fff" : "#000",
                strokeWidth: 2,
              }}
            />

            {/* Annotation points */}
            {annotationPoints.map((point) => (
              <ReferenceDot
                key={point.timeMinutes}
                x={point.timeMinutes}
                y={point.pace}
                r={6}
                fill={colors.annotation}
                stroke={isDark ? "#fff" : "#000"}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Annotation legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {annotationPoints.map((point) => (
          <div
            key={point.timeMinutes}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
              ${
                isDark
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  : "bg-amber-100 text-amber-800 border border-amber-300"
              }
            `}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.annotation }}
            />
            <span>
              {point.timeMinutes}min: {formatPaceValue(point.pace)}
              {paceUnit}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-0.5 rounded"
            style={{ backgroundColor: colors.curve }}
          />
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Power-Duration Curve
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-0.5 rounded"
            style={{
              backgroundColor: colors.cvLine,
              backgroundImage: `repeating-linear-gradient(90deg, ${colors.cvLine} 0, ${colors.cvLine} 4px, transparent 4px, transparent 8px)`,
            }}
          />
          <span className={isDark ? "text-gray-400" : "text-gray-600"}>
            Critical Velocity ({formatPaceValue(cvAsymptotePace)}
            {paceUnit})
          </span>
        </div>
      </div>
    </Card>
  );
}
