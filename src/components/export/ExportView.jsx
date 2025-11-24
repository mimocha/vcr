/**
 * ExportView Component
 * Simplified view optimized for image export with html2canvas
 * Hidden off-screen, uses solid backgrounds instead of glassmorphic effects
 */

import { predictAllRaces } from "../../utils/calculations/racePerformanceCalculators";
import {
  formatPaceRange,
  formatTimeWithHours,
  formatPacePerKm,
  formatPacePerMile,
} from "../../utils/formatters";
import { UNIT_SYSTEMS, ZONE_COLORS } from "../../constants/zoneDefinitions";

export default function ExportView({
  cvData,
  zones,
  unitSystem,
  cvMode,
  zoneSystem,
  options,
  isDark,
}) {
  if (!cvData || !zones) return null;

  const isMetric = unitSystem === UNIT_SYSTEMS.METRIC;
  const selectedVelocity =
    cvMode === "raw" ? cvData.velocity_ms_raw : cvData.velocity_ms;

  // Get race predictions
  const racePredictions = options.includePredictions
    ? predictAllRaces(
        selectedVelocity,
        cvData.d_prime,
        cvData.d_prime_estimated,
        true
      )
    : [];

  // Theme colors - solid backgrounds for reliable export
  const textColor = isDark ? "#ffffff" : "#1e293b";
  const secondaryTextColor = isDark ? "#cbd5e1" : "#475569";
  const borderColor = isDark ? "#334155" : "#e2e8f0";
  const cardBgColor = isDark ? "#1e293b" : "#ffffff";

  return (
    <div
      id="export-view"
      style={{
        position: "absolute",
        left: "-9999px",
        top: 0,
        width: "600px",
        background: isDark
          ? "linear-gradient(to bottom right, #0f172a, #1e3a5f, #0f172a)"
          : "linear-gradient(to bottom right, #e0f2fe, #dbeafe, #f0f9ff)",
        padding: "48px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: textColor,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "40px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "8px",
            color: textColor,
          }}
        >
          Critical Velocity Results
        </h1>
        {options.includeDate && (
          <p style={{ fontSize: "12px", color: secondaryTextColor }}>
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </div>

      {/* Training Zones */}
      {options.includeZones && (
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "16px",
              color: textColor,
            }}
          >
            Training Zones
          </h2>
          <div
            style={{
              background: cardBgColor,
              border: `2px solid ${borderColor}`,
              borderRadius: "16px",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {zones.map((zone, index) => {
                  const zoneColors = ZONE_COLORS[zone.number];
                  const pillBg = isDark
                    ? zoneColors.pillDark.replace("bg-", "")
                    : zoneColors.pillLight.replace("bg-", "");

                  // Convert Tailwind color classes to actual colors
                  const colorMap = {
                    "red-600": "#dc2626",
                    "red-500": "#ef4444",
                    "orange-600": "#ea580c",
                    "orange-500": "#f97316",
                    "amber-500": "#eab308",
                    "amber-700": "#ca8a04",
                    "yellow-600": "#ca8a04",
                    "yellow-500": "#eab308",
                    "green-600": "#16a34a",
                    "green-500": "#22c55e",
                    "emerald-800": "#065f46",
                    "blue-600": "#2563eb",
                    "blue-500": "#3b82f6",
                    "blue-800": "#1e40af",
                    "rose-800": "#9f1239",
                  };

                  const bgKey = pillBg.split("/")[0];
                  const pillColor = colorMap[bgKey] || "#3b82f6";

                  return (
                    <tr
                      key={zone.number}
                      style={{
                        borderBottom:
                          index < zones.length - 1
                            ? `1px solid ${borderColor}`
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "16px",
                          background: pillColor,
                          color: "white",
                          fontWeight: "600",
                          fontSize: "16px",
                          width: "120px",
                          verticalAlign: "middle",
                          textAlign: "center",
                        }}
                      >
                        Zone {zone.number}
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          fontWeight: "500",
                          color: textColor,
                          fontSize: "15px",
                          verticalAlign: "middle",
                          textAlign: "left",
                        }}
                      >
                        {zone.name}
                      </td>
                      <td
                        style={{
                          padding: "16px",
                          fontFamily: "monospace",
                          fontWeight: "500",
                          color: textColor,
                          fontSize: "15px",
                          verticalAlign: "middle",
                          textAlign: "right",
                        }}
                      >
                        {formatPaceRange(
                          isMetric
                            ? zone.paceMinSecPerKm
                            : zone.paceMinSecPerMile,
                          isMetric
                            ? zone.paceMaxSecPerKm
                            : zone.paceMaxSecPerMile,
                          isMetric ? "km" : "mi"
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Configuration Info */}
          <div
            style={{
              marginTop: "12px",
              fontSize: "12px",
              color: secondaryTextColor,
              lineHeight: "1.6",
            }}
          >
            <div>
              <strong>Critical Value:</strong>{" "}
              {cvMode === "raw" ? "Unadjusted" : "Adjusted"}
            </div>
            <div>
              <strong>Zone Calculation Method:</strong>{" "}
              {zoneSystem === "offset-based"
                ? "Offset-Based"
                : "Race Prediction-Based"}
            </div>
          </div>
        </div>
      )}

      {/* Race Predictions */}
      {options.includePredictions && racePredictions.length > 0 && (
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "20px",
              color: textColor,
            }}
          >
            Race Performance Predictions
          </h2>
          <div
            style={{
              background: cardBgColor,
              border: `2px solid ${borderColor}`,
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${borderColor}` }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: secondaryTextColor,
                      verticalAlign: "middle",
                    }}
                  >
                    Distance
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: secondaryTextColor,
                      verticalAlign: "middle",
                    }}
                  >
                    Predicted Time
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "12px 8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: secondaryTextColor,
                      verticalAlign: "middle",
                    }}
                  >
                    Pace
                  </th>
                </tr>
              </thead>
              <tbody>
                {racePredictions.map((race, index) => {
                  const prediction = race.prediction;
                  const timeDisplay = prediction
                    ? formatTimeWithHours(prediction.best.timeSeconds)
                    : "—";
                  const paceValue =
                    unitSystem === UNIT_SYSTEMS.METRIC
                      ? prediction?.best.paceSecPerKm
                      : prediction?.best.paceSecPerMile;
                  const formatFunc =
                    unitSystem === UNIT_SYSTEMS.METRIC
                      ? formatPacePerKm
                      : formatPacePerMile;
                  const paceDisplay = paceValue ? formatFunc(paceValue) : "—";

                  return (
                    <tr
                      key={race.id}
                      style={{
                        borderBottom:
                          index < racePredictions.length - 1
                            ? `1px solid ${borderColor}`
                            : "none",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 8px",
                          fontWeight: "500",
                          color: textColor,
                          verticalAlign: "middle",
                        }}
                      >
                        {race.name}
                      </td>
                      <td
                        style={{
                          padding: "12px 8px",
                          fontFamily: "monospace",
                          color: isDark ? "#60a5fa" : "#2563eb",
                          fontWeight: "500",
                          verticalAlign: "middle",
                        }}
                      >
                        {timeDisplay}
                      </td>
                      <td
                        style={{
                          padding: "12px 8px",
                          fontFamily: "monospace",
                          fontSize: "14px",
                          color: secondaryTextColor,
                          verticalAlign: "middle",
                        }}
                      >
                        {paceDisplay}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Additional Notes */}
      {options.includeNotes && options.notes && (
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "600",
              marginBottom: "20px",
              color: textColor,
            }}
          >
            Notes
          </h2>
          <div
            style={{
              background: cardBgColor,
              border: `2px solid ${borderColor}`,
              borderRadius: "16px",
              padding: "24px",
              fontSize: "16px",
              lineHeight: "1.6",
              color: textColor,
              whiteSpace: "pre-wrap",
            }}
          >
            {options.notes}
          </div>
        </div>
      )}

      {/* Footer with watermark */}
      <div
        style={{
          marginTop: "40px",
          paddingTop: "24px",
          borderTop: `2px solid ${borderColor}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: secondaryTextColor,
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: "600" }}>github.com/mimocha/vcr</div>
          <div style={{ fontSize: "11px" }}>Critical Velocity Calculator</div>
        </div>
      </div>
    </div>
  );
}
