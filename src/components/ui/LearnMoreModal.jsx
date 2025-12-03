/**
 * LearnMoreModal Component
 * Modal with tabs for simplified educational content about CV, zones, and predictions
 * Links to authoritative sources for readers who want more detail
 */

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../contexts/ThemeContext";

const TABS = {
  ZONES: "zones",
  CV: "cv",
  PREDICTIONS: "predictions",
};

// External resource links
const RESOURCES = {
  criticalSpeed:
    "https://runningwritings.com/2024/01/critical-speed-guide-for-runners.html",
  frontRunnerSports:
    "https://frontrunnersports.com.au/runningsquads/pacezonecalculator/",
};

export default function LearnMoreModal({
  isOpen,
  onClose,
  defaultTab = TABS.ZONES,
  // Props for dynamic content
  cvMode,
  d_prime,
  d_prime_estimated,
}) {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Update active tab when defaultTab changes (when opening modal from different buttons)
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop with blur effect */}
      <div
        className="fixed inset-0 z-40 backdrop-blur-md bg-black/80 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`
            relative w-full max-w-lg max-h-[85vh] pointer-events-auto
            rounded-2xl backdrop-blur-xl border transition-all
            ${
              isDark
                ? "bg-white/[0.08] border-white/[0.2] shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]"
                : "bg-white/[0.85] border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.25)]"
            }
          `}
          style={{
            backdropFilter: isDark
              ? "blur(16px) saturate(180%)"
              : "blur(16px) saturate(70%)",
            WebkitBackdropFilter: isDark
              ? "blur(16px) saturate(180%)"
              : "blur(16px) saturate(70%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with close button */}
          <div
            className={`
              flex items-center justify-between px-4 pt-4 pb-2 border-b
              ${isDark ? "border-white/10" : "border-gray-200"}
            `}
          >
            <h2
              className={`text-2xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Learn More
            </h2>
            <button
              onClick={onClose}
              className={`
                rounded-full p-2 transition-colors
                ${
                  isDark
                    ? "hover:bg-white/10 text-gray-300 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }
              `}
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Tab Navigation */}
          <div
            className={`
              flex gap-2 px-6 pt-4 border-b
              ${isDark ? "border-white/10" : "border-gray-200"}
            `}
          >
            <TabButton
              active={activeTab === TABS.ZONES}
              onClick={() => setActiveTab(TABS.ZONES)}
              isDark={isDark}
            >
              Training Zones
            </TabButton>
            <TabButton
              active={activeTab === TABS.CV}
              onClick={() => setActiveTab(TABS.CV)}
              isDark={isDark}
            >
              Critical Velocity
            </TabButton>
            {d_prime && (
              <TabButton
                active={activeTab === TABS.PREDICTIONS}
                onClick={() => setActiveTab(TABS.PREDICTIONS)}
                isDark={isDark}
              >
                Race Predictions
              </TabButton>
            )}
          </div>

          {/* Content Area (Scrollable) */}
          <div className="overflow-y-auto px-6 py-6 max-h-[55vh]">
            {activeTab === TABS.ZONES && (
              <ZonesContent isDark={isDark} cvMode={cvMode} />
            )}
            {activeTab === TABS.CV && <CVContent isDark={isDark} />}
            {activeTab === TABS.PREDICTIONS && d_prime && (
              <PredictionsContent
                isDark={isDark}
                d_prime={d_prime}
                d_prime_estimated={d_prime_estimated}
              />
            )}
          </div>

          {/* Footer with Dismiss button */}
          <div
            className={`
              p-6 border-t
              ${isDark ? "border-white/10" : "border-gray-200"}
            `}
          >
            <button
              onClick={onClose}
              className={`
                w-full py-3 px-6 rounded-full font-medium transition-all
                ${
                  isDark
                    ? "bg-blue-800/90 text-white hover:bg-blue-500/70 focus:ring-blue-800 active:brightness-110 border border-white/30 shadow-[0_12px_35px_rgba(0,0,0,0.45)]"
                    : "bg-blue-700/90 text-white hover:bg-blue-700/100 focus:ring-blue-700 active:brightness-110 border border-white/60 shadow-[0_12px_30px_rgba(84,63,196,0.35)]"
                }
              `}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

// Tab Button Component
function TabButton({ active, onClick, isDark, children }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 font-medium text-sm transition-all rounded-t-lg
        ${
          active
            ? isDark
              ? "text-white border-b-2 border-blue-400"
              : "text-gray-900 border-b-2 border-blue-600"
            : isDark
            ? "text-gray-400 hover:text-gray-200 hover:bg-white/5"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }
      `}
    >
      {children}
    </button>
  );
}

// External Link Component
function ExternalLink({ href, isDark, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-1 font-medium underline underline-offset-2 transition-colors
        ${
          isDark
            ? "text-blue-300 hover:text-blue-200"
            : "text-blue-600 hover:text-blue-500"
        }
      `}
    >
      {children}
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    </a>
  );
}

// Training Zones Tab Content - Simplified
function ZonesContent({ isDark, cvMode }) {
  return (
    <div className="space-y-5">
      <div
        className={`text-sm ${
          isDark ? "text-gray-300" : "text-gray-700"
        } space-y-3`}
      >
        <p>
          <strong className={isDark ? "text-white" : "text-gray-900"}>
            Training zones
          </strong>{" "}
          help you run at the right intensity for each workout. Different paces
          train different energy systems in your body.
        </p>
      </div>

      {/* Simple Zone Overview */}
      <div className="space-y-2">
        <ZoneCard
          isDark={isDark}
          zone="Zone 1 - Easy"
          color="blue"
          description="Conversational pace. Most of your weekly mileage."
        />
        <ZoneCard
          isDark={isDark}
          zone="Zone 2 - Steady"
          color="green"
          description="Comfortable but purposeful. Good for longer aerobic runs."
        />
        <ZoneCard
          isDark={isDark}
          zone="Zone 3 - Tempo"
          color="yellow"
          description="Comfortably hard. Sustainable for 40-60 minutes."
        />
        <ZoneCard
          isDark={isDark}
          zone="Zone 4 - Threshold"
          color="orange"
          description="Hard effort. Race pace for 10K distance."
        />
        <ZoneCard
          isDark={isDark}
          zone="Zone 5 - VO₂ Max"
          color="red"
          description="Very hard. Short intervals only (3-5 minutes)."
        />
      </div>

      {/* Current Setting */}
      <div
        className={`
          p-4 rounded-xl backdrop-blur-sm border
          ${
            isDark
              ? "bg-blue-500/10 border-blue-400/30"
              : "bg-blue-50/80 border-blue-200"
          }
        `}
      >
        <p className={`text-sm ${isDark ? "text-blue-100" : "text-blue-900"}`}>
          <strong>Your setting:</strong>{" "}
          {cvMode === "raw" ? "Unadjusted" : "Adjusted"} CV
          {" — "}
          {cvMode === "raw"
            ? "zones based on your actual race performance."
            : "zones are slightly more conservative for sustainable training."}
        </p>
      </div>

      {/* Learn More Link */}
      <div className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        <p>
          Want to learn more about training zone methodology?{" "}
          <ExternalLink href={RESOURCES.frontRunnerSports} isDark={isDark}>
            Front Runner Sports
          </ExternalLink>
        </p>
      </div>
    </div>
  );
}

// Critical Velocity Tab Content - Simplified
function CVContent({ isDark }) {
  return (
    <div className="space-y-5">
      <div
        className={`text-sm ${
          isDark ? "text-gray-300" : "text-gray-700"
        } space-y-3`}
      >
        <p>
          <strong className={isDark ? "text-white" : "text-gray-900"}>
            Critical Velocity (CV)
          </strong>{" "}
          is the fastest pace you can sustain for an extended period without
          "blowing up." Think of it as your speed ceiling for aerobic running.
        </p>
        <p>
          For most runners, CV falls between 5K and 10K race pace. It's the
          foundation for calculating your personalized training zones.
        </p>
      </div>

      {/* Key Concept */}
      <div
        className={`
          p-4 rounded-xl backdrop-blur-sm border
          ${
            isDark
              ? "bg-blue-500/10 border-blue-400/30"
              : "bg-blue-50/80 border-blue-200"
          }
        `}
      >
        <p className={`text-sm ${isDark ? "text-blue-100" : "text-blue-900"}`}>
          <strong>The simple idea:</strong> Run faster than CV, and you'll
          eventually have to stop. Run slower than CV, and you can keep going
          for a long time.
        </p>
      </div>

      {/* D' Explanation */}
      <div>
        <h4
          className={`text-base font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          What's D' (D-Prime)?
        </h4>
        <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-700"}`}>
          D' is your "reserve tank" for running above CV. It's a limited
          resource—when you run faster than CV, you drain it. When it's empty,
          you have to slow down. Runners with a bigger D' can sustain faster
          paces for short races.
        </p>
      </div>

      {/* Training Tip */}
      <div
        className={`
          p-4 rounded-xl backdrop-blur-sm border
          ${
            isDark
              ? "bg-green-500/10 border-green-400/30"
              : "bg-green-50/80 border-green-200"
          }
        `}
      >
        <h4
          className={`text-sm font-semibold mb-1 ${
            isDark ? "text-green-200" : "text-green-800"
          }`}
        >
          💡 Training tip
        </h4>
        <p
          className={`text-sm ${isDark ? "text-green-100" : "text-green-900"}`}
        >
          Don't train exactly at CV. Train slightly below it (tempo runs) or
          slightly above it (intervals) for best results.
        </p>
      </div>

      {/* Learn More Link */}
      <div
        className={`
          p-4 rounded-xl backdrop-blur-sm border
          ${
            isDark
              ? "bg-indigo-500/10 border-indigo-400/30"
              : "bg-indigo-50/80 border-indigo-200"
          }
        `}
      >
        <h4
          className={`text-sm font-semibold mb-2 ${
            isDark ? "text-indigo-200" : "text-indigo-800"
          }`}
        >
          Want the full science?
        </h4>
        <p
          className={`text-sm ${
            isDark ? "text-indigo-100" : "text-indigo-900"
          }`}
        >
          John Davis wrote an excellent deep-dive on Critical Velocity for
          runners:
        </p>
        <p className="mt-2">
          <ExternalLink href={RESOURCES.criticalSpeed} isDark={isDark}>
            The science of critical speed training
          </ExternalLink>
        </p>
      </div>
    </div>
  );
}

// Race Predictions Tab Content - Simplified
function PredictionsContent({ isDark, d_prime, d_prime_estimated }) {
  return (
    <div className="space-y-5">
      <div
        className={`text-sm ${
          isDark ? "text-gray-300" : "text-gray-700"
        } space-y-3`}
      >
        <p>
          <strong className={isDark ? "text-white" : "text-gray-900"}>
            Race predictions
          </strong>{" "}
          estimate your finish times for different distances based on your CV
          and D' values.
        </p>
      </div>

      {/* How It Works */}
      <div
        className={`
          p-4 rounded-xl backdrop-blur-sm border
          ${
            isDark
              ? "bg-blue-500/10 border-blue-400/30"
              : "bg-blue-50/80 border-blue-200"
          }
        `}
      >
        <h4
          className={`text-sm font-semibold mb-2 ${
            isDark ? "text-blue-200" : "text-blue-800"
          }`}
        >
          How it works
        </h4>
        <p className={`text-sm ${isDark ? "text-blue-100" : "text-blue-900"}`}>
          Shorter races use more of your D' (reserve tank), while longer races
          rely more on your CV (sustainable pace). The calculator balances both
          to predict your times.
        </p>
      </div>

      {/* D' Status */}
      {d_prime_estimated ? (
        <div
          className={`
            p-4 rounded-xl backdrop-blur-sm border
            ${
              isDark
                ? "bg-amber-500/10 border-amber-400/30"
                : "bg-amber-50/80 border-amber-200"
            }
          `}
        >
          <p
            className={`text-sm font-semibold mb-1 ${
              isDark ? "text-amber-200" : "text-amber-800"
            }`}
          >
            Your D' is estimated ({d_prime.toFixed(0)}m)
          </p>
          <p
            className={`text-sm ${
              isDark ? "text-amber-100" : "text-amber-900"
            }`}
          >
            For more accurate short-distance predictions, use the 2-Point Test
            to measure D' directly.
          </p>
        </div>
      ) : (
        <div
          className={`
            p-4 rounded-xl backdrop-blur-sm border
            ${
              isDark
                ? "bg-green-500/10 border-green-400/30"
                : "bg-green-50/80 border-green-200"
            }
          `}
        >
          <p
            className={`text-sm font-semibold mb-1 ${
              isDark ? "text-green-200" : "text-green-800"
            }`}
          >
            Your D' was measured ({d_prime.toFixed(0)}m)
          </p>
          <p
            className={`text-sm ${
              isDark ? "text-green-100" : "text-green-900"
            }`}
          >
            Using your 2-Point Test data for more accurate predictions.
          </p>
        </div>
      )}

      {/* Accuracy Guide */}
      <div>
        <h4
          className={`text-base font-semibold mb-3 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Prediction accuracy by distance
        </h4>
        <div className="space-y-2">
          <AccuracyCard
            isDark={isDark}
            distance="1500m - 3K"
            accuracy="Moderate (depends on D' accuracy)"
            color="yellow"
          />
          <AccuracyCard
            isDark={isDark}
            distance="5K - 15K"
            accuracy="Most accurate"
            color="green"
          />
          <AccuracyCard
            isDark={isDark}
            distance="Half Marathon+"
            accuracy="Low (use as rough guide only)"
            color="orange"
          />
        </div>
      </div>

      {/* Practical Tips */}
      <div
        className={`
          p-4 rounded-xl backdrop-blur-sm border
          ${
            isDark
              ? "bg-purple-500/10 border-purple-400/30"
              : "bg-purple-50/80 border-purple-200"
          }
        `}
      >
        <h4
          className={`text-sm font-semibold mb-2 ${
            isDark ? "text-purple-200" : "text-purple-800"
          }`}
        >
          Remember
        </h4>
        <ul
          className={`text-sm space-y-1 ${
            isDark ? "text-purple-100" : "text-purple-900"
          }`}
        >
          <li>• These are targets, not guarantees</li>
          <li>• Weather, terrain, and race-day conditions matter</li>
          <li>
            • Marathon predictions tend to be optimistic; start conservatively
          </li>
        </ul>
      </div>
    </div>
  );
}

// Helper component for accuracy cards
function AccuracyCard({ isDark, distance, accuracy, color }) {
  const colorClasses = {
    green: isDark
      ? "bg-green-500/10 border-green-400/30"
      : "bg-green-50 border-green-200",
    yellow: isDark
      ? "bg-yellow-500/10 border-yellow-400/30"
      : "bg-yellow-50 border-yellow-200",
    orange: isDark
      ? "bg-orange-500/10 border-orange-400/30"
      : "bg-orange-50 border-orange-200",
  };

  const textClasses = {
    green: isDark ? "text-green-200" : "text-green-800",
    yellow: isDark ? "text-yellow-200" : "text-yellow-800",
    orange: isDark ? "text-orange-200" : "text-orange-800",
  };

  return (
    <div
      className={`p-3 rounded-lg backdrop-blur-sm border flex justify-between items-center ${colorClasses[color]}`}
    >
      <span className={`text-sm font-medium ${textClasses[color]}`}>
        {distance}
      </span>
      <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {accuracy}
      </span>
    </div>
  );
}

// Helper component for zone cards
function ZoneCard({ isDark, zone, color, description }) {
  const colorClasses = {
    blue: isDark
      ? "bg-blue-500/10 border-blue-400/30"
      : "bg-blue-50 border-blue-200",
    green: isDark
      ? "bg-green-500/10 border-green-400/30"
      : "bg-green-50 border-green-200",
    yellow: isDark
      ? "bg-yellow-500/10 border-yellow-400/30"
      : "bg-yellow-50 border-yellow-200",
    orange: isDark
      ? "bg-orange-500/10 border-orange-400/30"
      : "bg-orange-50 border-orange-200",
    red: isDark
      ? "bg-red-500/10 border-red-400/30"
      : "bg-red-50 border-red-200",
  };

  const textClasses = {
    blue: isDark ? "text-blue-200" : "text-blue-800",
    green: isDark ? "text-green-200" : "text-green-800",
    yellow: isDark ? "text-yellow-200" : "text-yellow-800",
    orange: isDark ? "text-orange-200" : "text-orange-800",
    red: isDark ? "text-red-200" : "text-red-800",
  };

  return (
    <div
      className={`p-3 rounded-lg backdrop-blur-sm border ${colorClasses[color]}`}
    >
      <p className={`text-sm font-semibold mb-1 ${textClasses[color]}`}>
        {zone}
      </p>
      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {description}
      </p>
    </div>
  );
}
