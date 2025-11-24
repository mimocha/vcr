/**
 * ResultsPanel Component
 * Container for displaying results with animation
 */

import CVDisplay from "./CVDisplay";
import ZonesTable from "./ZonesTable";
import RacePerformanceChart from "./RacePerformanceChart";

export default function ResultsPanel({
  cvData,
  zones,
  unitSystem,
  cvMode,
  onCvModeChange,
  zoneSystem,
  onZoneSystemChange,
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
        zoneSystem={zoneSystem}
        onZoneSystemChange={onZoneSystemChange}
        cvData={cvData}
      />
      <CVDisplay cvData={cvData} unitSystem={unitSystem} cvMode={cvMode} onCvModeChange={onCvModeChange} />
      <RacePerformanceChart cvData={cvData} unitSystem={unitSystem} cvMode={cvMode} />
    </div>
  );
}
