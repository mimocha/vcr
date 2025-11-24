/**
 * useExport Hook
 * Handles exporting results as PNG using html2canvas
 */

import { useState } from "react";
import html2canvas from "html2canvas";

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState(null);

  const exportToPng = async (options = {}) => {
    setIsExporting(true);
    setError(null);

    try {
      // Find the export view element
      const element = document.getElementById("export-view");
      if (!element) {
        throw new Error("Export view not found");
      }

      // Temporarily make the element visible for capture
      const originalLeft = element.style.left;
      element.style.left = "0";
      element.style.position = "fixed";
      element.style.zIndex = "9999";

      // Wait a bit for rendering to complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Capture the element as canvas
      const canvas = await html2canvas(element, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        allowTaint: true,
        imageTimeout: 0,
        windowWidth: 800,
        windowHeight: element.scrollHeight,
      });

      // Restore the element position
      element.style.left = originalLeft;
      element.style.position = "absolute";
      element.style.zIndex = "";

      // Convert canvas to blob
      const blob = await new Promise((resolve) => {
        canvas.toBlob(resolve, "image/png", 1.0);
      });

      if (!blob) {
        throw new Error("Failed to generate image");
      }

      // Generate filename with current date
      const date = new Date();
      const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD format
      const filename = `CV-Results-${dateStr}.png`;

      // Trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setIsExporting(false);
      return { success: true };
    } catch (err) {
      console.error("Export failed:", err);
      setError(err.message || "Failed to export image");
      setIsExporting(false);
      return { success: false, error: err.message };
    }
  };

  return {
    exportToPng,
    isExporting,
    error,
  };
}
