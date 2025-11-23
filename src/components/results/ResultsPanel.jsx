/**
 * ResultsPanel Component
 * Container for displaying results with animation
 */

import CVDisplay from "./CVDisplay";
import ZonesTable from "./ZonesTable";

export default function ResultsPanel({ cvData, zones, unitSystem }) {
  if (!cvData || !zones) {
    return null;
  }

  return (
    <div
      id="results"
      className="space-y-6 animate-fade-in"
    >
      <CVDisplay cvData={cvData} unitSystem={unitSystem} />
      <ZonesTable zones={zones} unitSystem={unitSystem} />
    </div>
  );
}
