/**
 * ResultsPanel Component
 * Container for displaying results with animation
 */

import CVDisplay from "./CVDisplay";
import PowerDurationChart from "./PowerDurationChart";
import RacePerformanceChart from "./RacePerformanceChart";
import ZonesTable from "./ZonesTable";

export default function ResultsPanel({
  cvData,
  zones,
  unitSystem,
  cvMode,
  zoneSystem,
}) {
  if (!cvData || !zones) {
    return null;
  }

  return (
    <div id="results" className="space-y-6 animate-fade-in">
      <ZonesTable
        zones={zones}
        unitSystem={unitSystem}
        cvMode={cvMode}
        cvData={cvData}
      />
      <CVDisplay cvData={cvData} unitSystem={unitSystem} cvMode={cvMode} />
      <PowerDurationChart
        cvData={cvData}
        unitSystem={unitSystem}
        cvMode={cvMode}
      />
      <RacePerformanceChart
        cvData={cvData}
        unitSystem={unitSystem}
        cvMode={cvMode}
      />
    </div>
  );
}
