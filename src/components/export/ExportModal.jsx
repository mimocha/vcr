/**
 * ExportModal Component
 * Modal for selecting what data to include in the export
 */

import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Modal from "../ui/Modal";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function ExportModal({
  isOpen,
  onClose,
  onExport,
  isExporting = false,
}) {
  const { isDark } = useTheme();

  const [options, setOptions] = useState({
    includeDate: true,
    includeZones: true,
    includePredictions: false,
    includeNotes: false,
  });

  const [notes, setNotes] = useState("");

  const handleOptionChange = (option) => {
    setOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleExport = () => {
    onExport({
      ...options,
      notes: options.includeNotes ? notes : "",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Card title="Export Results">
        <div className="space-y-6">
          {/* Options */}
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={options.includeDate}
                onChange={() => handleOptionChange("includeDate")}
                className={`
                  w-5 h-5 rounded cursor-pointer
                  transition-all duration-200
                  ${
                    isDark
                      ? "accent-blue-500 bg-white/10 border-white/20"
                      : "accent-blue-600 bg-gray-100 border-gray-300"
                  }
                `}
              />
              <span
                className={`text-base ${
                  isDark
                    ? "text-gray-200 group-hover:text-white"
                    : "text-gray-700 group-hover:text-gray-900"
                } transition-colors`}
              >
                Current Date
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={options.includeZones}
                onChange={() => handleOptionChange("includeZones")}
                className={`
                  w-5 h-5 rounded cursor-pointer
                  transition-all duration-200
                  ${
                    isDark
                      ? "accent-blue-500 bg-white/10 border-white/20"
                      : "accent-blue-600 bg-gray-100 border-gray-300"
                  }
                `}
              />
              <span
                className={`text-base ${
                  isDark
                    ? "text-gray-200 group-hover:text-white"
                    : "text-gray-700 group-hover:text-gray-900"
                } transition-colors`}
              >
                Training Zones
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={options.includePredictions}
                onChange={() => handleOptionChange("includePredictions")}
                className={`
                  w-5 h-5 rounded cursor-pointer
                  transition-all duration-200
                  ${
                    isDark
                      ? "accent-blue-500 bg-white/10 border-white/20"
                      : "accent-blue-600 bg-gray-100 border-gray-300"
                  }
                `}
              />
              <span
                className={`text-base ${
                  isDark
                    ? "text-gray-200 group-hover:text-white"
                    : "text-gray-700 group-hover:text-gray-900"
                } transition-colors`}
              >
                Race Predictions
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={options.includeNotes}
                onChange={() => handleOptionChange("includeNotes")}
                className={`
                  w-5 h-5 rounded cursor-pointer
                  transition-all duration-200
                  ${
                    isDark
                      ? "accent-blue-500 bg-white/10 border-white/20"
                      : "accent-blue-600 bg-gray-100 border-gray-300"
                  }
                `}
              />
              <span
                className={`text-base ${
                  isDark
                    ? "text-gray-200 group-hover:text-white"
                    : "text-gray-700 group-hover:text-gray-900"
                } transition-colors`}
              >
                Additional Notes
              </span>
            </label>
          </div>

          {/* Notes textarea (only visible when includeNotes is checked) */}
          {options.includeNotes && (
            <div className="space-y-2 animate-fade-in">
              <label
                htmlFor="export-notes"
                className={`block text-sm font-medium ${
                  isDark ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Notes
              </label>
              <textarea
                id="export-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Add any notes you'd like to include..."
                className={`
                  w-full px-4 py-2 rounded-xl border transition-all
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-gray-400 focus:ring-blue-400 focus:border-blue-400"
                      : "bg-white/50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  }
                `}
              />
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={onClose}
              variant="secondary"
              fullWidth
              disabled={isExporting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleExport}
              variant="primary"
              fullWidth
              disabled={isExporting}
            >
              {isExporting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Exporting...
                </span>
              ) : (
                "Export PNG"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </Modal>
  );
}
