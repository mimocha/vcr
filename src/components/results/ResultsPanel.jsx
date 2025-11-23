/**
 * ResultsPanel Component
 * Container for displaying results with animation
 */

import CVDisplay from "./CVDisplay";
import ZonesTable from "./ZonesTable";
import RacePerformanceChart from "./RacePerformanceChart";

export default function ResultsPanel({ cvData, zones, unitSystem }) {
  if (!cvData || !zones) {
    return null;
  }

  return (
    <div id="results" className="space-y-6 animate-fade-in">
      <ZonesTable zones={zones} unitSystem={unitSystem} />
      <CVDisplay cvData={cvData} unitSystem={unitSystem} />
      <RacePerformanceChart cvData={cvData} unitSystem={unitSystem} />
    </div>
  );
}
