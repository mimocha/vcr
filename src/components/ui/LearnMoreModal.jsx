/**
 * LearnMoreModal Component
 * Modal with tabs for educational content about CV, zones, and predictions
 */

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ZONE_SYSTEMS } from "../../constants/zoneDefinitions";

const TABS = {
  ZONES: "zones",
  CV: "cv",
  PREDICTIONS: "predictions",
};

export default function LearnMoreModal({
  isOpen,
  onClose,
  defaultTab = TABS.ZONES,
  // Props for dynamic content
  zoneSystem,
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

  // Get current zone system for dynamic content
  const currentSystem = Object.values(ZONE_SYSTEMS).find(
    (sys) => sys.id === zoneSystem
  );

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
            relative w-full max-w-2xl max-h-[85vh] pointer-events-auto
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
              <ZonesContent
                isDark={isDark}
                currentSystem={currentSystem}
                cvMode={cvMode}
              />
            )}
            {activeTab === TABS.CV && <CVContent isDark={isDark} />}
            {activeTab === TABS.PREDICTIONS && d_prime && (
              <PredictionsContent
                isDark={isDark}
                cvMode={cvMode}
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
                    ? "bg-gradient-to-r from-cyan-600/80 via-blue-500/80 to-indigo-600/80 hover:from-cyan-500/90 hover:via-blue-400/90 hover:to-indigo-500/90 text-white"
                    : "bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white"
                }
              `}
            >
              Dismiss
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

// Training Zones Tab Content
function ZonesContent({ isDark, currentSystem, cvMode }) {
  return (
    <div className="space-y-4">
      <h3
        className={`text-xl font-semibold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        What are Training Zones?
      </h3>

      {/* 1.1 Training Zones Overview (NEW) */}
      <div
        className={`text-sm ${
          isDark ? "text-gray-300" : "text-gray-700"
        } space-y-3`}
      >
        <p>
          Training zones are specific intensity ranges that target different
          physiological adaptations in your body. By training at the right
          intensity for each workout, you can systematically improve different
          aspects of your running performance—from building your aerobic base to
          pushing your lactate threshold to maximizing your oxygen uptake
          capacity.
        </p>
        <p>
          Runners use zones to structure their training because different
          intensities stress different energy systems and trigger different
          adaptations. Easy runs build mitochondrial density and capillary
          networks. Tempo runs improve lactate clearance. High-intensity
          intervals boost VO₂ max and running economy. Training across all zones
          creates well-rounded fitness.
        </p>
        <p>
          The zones you see here are calculated from your Critical Velocity (CV)
          test results. CV represents the boundary between sustainable and
          unsustainable paces—making it an ideal anchor point for personalizing
          your training intensities. Each zone is calibrated to your individual
          fitness level, ensuring your training targets the right physiological
          systems at the right intensity.
        </p>
      </div>

      {/* 1.2 Zone Guidelines (MOVED) */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Zone Guidelines
        </h4>
        <div className="space-y-3">
          <ZoneCard
            isDark={isDark}
            zone="Zone 1 - Recovery / Easy"
            color="blue"
            description="Long runs and recovery. Should feel comfortable and conversational."
          />
          <ZoneCard
            isDark={isDark}
            zone="Zone 2 - Steady State"
            color="green"
            description="Aerobic development. Comfortably hard but sustainable for extended periods."
          />
          <ZoneCard
            isDark={isDark}
            zone="Zone 3 - Tempo"
            color="yellow"
            description="Lactate threshold training. Challenging but controlled effort."
          />
          <ZoneCard
            isDark={isDark}
            zone="Zone 4 - Threshold"
            color="orange"
            description="Competition-specific endurance. Near-maximal sustainable pace."
          />
          <ZoneCard
            isDark={isDark}
            zone="Zone 5 - VO₂ Max"
            color="red"
            description="Maximum oxygen uptake training. Very high intensity intervals."
          />
        </div>
      </div>

      {/* 1.3 CV Adjustment Explanation (NEW) */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          CV Adjustment
        </h4>
        <div
          className={`text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          } space-y-3`}
        >
          <p>
            Critical Velocity can be calculated in two ways:{" "}
            <strong>Unadjusted</strong> (raw) or <strong>Adjusted</strong>. The
            difference lies in how anaerobic capacity (D') is handled.
          </p>
          <p>
            <strong>Unadjusted CV</strong> reflects your actual race
            performance—it includes the contribution of your anaerobic capacity.{" "}
            <strong>Adjusted CV</strong> compensates for the curve-fitting
            mathematics and separates out anaerobic capacity, providing a more
            conservative estimate of your true sustainable pace. Adjusted CV is
            often better for calculating training zones that can be maintained
            without depleting your anaerobic reserves.
          </p>

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
            <p
              className={`text-sm font-semibold ${
                isDark ? "text-blue-200" : "text-blue-800"
              }`}
            >
              You are currently using:{" "}
              <strong>{cvMode === "raw" ? "Unadjusted" : "Adjusted"}</strong> CV
            </p>
            <p
              className={`text-xs mt-2 ${
                isDark ? "text-blue-100" : "text-blue-900"
              }`}
            >
              {cvMode === "raw"
                ? "Your zones reflect actual race performance, including anaerobic contribution."
                : "Your zones are based on a conservative sustainable pace estimate, with D' accounted for separately."}
            </p>
          </div>
        </div>
      </div>

      {/* 1.4 Zone System Comparison (NEW) */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Zone System Comparison
        </h4>
        <div
          className={`text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          } space-y-3`}
        >
          <p>
            This calculator offers two zone calculation methodologies, both
            based on the framework developed by Lange & Pöhlitz:
          </p>

          <div className="space-y-3">
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
              <h5
                className={`text-sm font-semibold mb-2 ${
                  isDark ? "text-purple-200" : "text-purple-800"
                }`}
              >
                Offset-Based (Default)
              </h5>
              <p
                className={`text-sm ${
                  isDark ? "text-purple-100" : "text-purple-900"
                }`}
              >
                Uses percentage-based calculations for Z1-Z4 and simple time
                offsets (CV pace - 10s, CV pace - 20s) for high-intensity zones.
                More convenient and intuitive for most runners. Both
                low-intensity and high-intensity zones are easy to remember and
                apply.
              </p>
            </div>

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
              <h5
                className={`text-sm font-semibold mb-2 ${
                  isDark ? "text-green-200" : "text-green-800"
                }`}
              >
                Race Prediction-Based
              </h5>
              <p
                className={`text-sm ${
                  isDark ? "text-green-100" : "text-green-900"
                }`}
              >
                Uses percentage-based calculations for Z1-Z3 and race
                predictions (via Riegel Power Law) for Z4-Z5. More accurate for
                advanced runners because it accounts for non-linear performance
                scaling at high intensities. Z4 anchors to 10K/5K pace, Z5
                anchors to 3K/1500m pace.
              </p>
            </div>
          </div>

          <p>
            Both systems use the same percentage-based approach for recovery,
            steady, and tempo zones (Z1-Z3). The key difference is in Z4 and Z5:
            Offset-Based prioritizes convenience with fixed time offsets, while
            Race Prediction-Based prioritizes accuracy by using predicted race
            paces.
          </p>
        </div>
      </div>

      {/* 1.5 How Zones are Calculated - Dynamic (MODIFIED) */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          How {currentSystem?.name} Calculates Zones
        </h4>
        <ul
          className={`space-y-2 text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {currentSystem?.notes.map((note, index) => (
            <li key={index} className="flex gap-2">
              <span className="flex-shrink-0">•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Critical Velocity Tab Content
function CVContent({ isDark }) {
  return (
    <div className="space-y-4">
      <h3
        className={`text-xl font-semibold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        What is Critical Velocity?
      </h3>

      {/* 2.1 Rewritten CV Overview */}
      <div
        className={`text-sm ${
          isDark ? "text-gray-300" : "text-gray-700"
        } space-y-3`}
      >
        <p>
          <strong>Critical Velocity (CV)</strong>, also known as Critical Speed
          (CS), is the physiological boundary that separates running speeds that
          can be sustained at a metabolic steady-state from speeds that cannot.
          It represents a fundamental threshold in exercise physiology.
        </p>
        <p>
          Below your critical velocity, your body maintains stable oxygen
          consumption and blood lactate levels—you're in a sustainable state.
          Above critical velocity, there's an inexorable rise in metabolic
          byproducts that leads to exhaustion, no matter how fit you are. This
          makes CV a crucial marker for understanding your physiological limits.
        </p>
        <p>
          For most runners, CV falls somewhere between 5K and 10K race pace.
          It's notably faster than your lactate threshold (the pace where
          lactate starts accumulating)—making it a key intensity for structuring
          high-end training. These CV values are derived directly from your race
          results entered into this calculator.
        </p>
      </div>

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
          className={`text-base font-semibold mb-2 ${
            isDark ? "text-blue-200" : "text-blue-800"
          }`}
        >
          Key Concept
        </h4>
        <p className={`text-sm ${isDark ? "text-blue-100" : "text-blue-900"}`}>
          Efforts <strong>above CV</strong> deplete your anaerobic capacity
          (D'), while efforts <strong>below CV</strong> can theoretically be
          sustained indefinitely (within practical limits).
        </p>
      </div>

      {/* 2.2 New Calculation Methodology Section */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          How CV is Calculated
        </h4>
        <div
          className={`text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          } space-y-3`}
        >
          <p>
            The calculator uses a hyperbolic relationship between race duration
            and performance pace to determine your CV and D'. Here's how it
            works with your race data:
          </p>
          <ol className="space-y-2 ml-4 list-decimal">
            <li>
              <strong>Plots your races:</strong> Each race you enter is plotted
              as distance vs. time.
            </li>
            <li>
              <strong>Fits a linear trendline:</strong> The calculator performs
              a linear regression to find the best-fit line through your race
              data points, extracting the slope (m) and intercept (b).
            </li>
            <li>
              <strong>Calculates Critical Speed:</strong> CS = 1/m (the inverse
              of the slope). This is your CV value—the theoretical maximum
              sustainable pace.
            </li>
            <li>
              <strong>Determines D':</strong> The y-intercept (b) represents
              your D' value in meters.
            </li>
          </ol>
          <p
            className={`text-xs italic ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <strong>Note:</strong> You need at least 2-3 recent races lasting
            between 2-20 minutes for accurate results. More data points improve
            accuracy.
          </p>
        </div>
      </div>

      {/* Two Types of CV - Keep existing section */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Two Types of CV
        </h4>

        <div className="space-y-3">
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
            <h5
              className={`text-sm font-semibold mb-1 ${
                isDark ? "text-purple-200" : "text-purple-800"
              }`}
            >
              Unadjusted (Raw) CV
            </h5>
            <p
              className={`text-sm ${
                isDark ? "text-purple-100" : "text-purple-900"
              }`}
            >
              Calculated directly from your time trials. Includes the
              contribution of anaerobic capacity (D'). More optimistic and
              reflects actual race performance better.
            </p>
          </div>

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
            <h5
              className={`text-sm font-semibold mb-1 ${
                isDark ? "text-blue-200" : "text-blue-800"
              }`}
            >
              Adjusted CV (with D')
            </h5>
            <p
              className={`text-sm ${
                isDark ? "text-blue-100" : "text-blue-900"
              }`}
            >
              Accounts for anaerobic capacity separately. Provides a more
              conservative base velocity that can theoretically be sustained
              without depleting D'. Better for calculating training zones.
            </p>
          </div>
        </div>
      </div>

      {/* 2.3 Rewritten D-Prime Explanation */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Understanding D' (D-Prime)
        </h4>
        <div
          className={`text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          } space-y-3`}
        >
          <p>
            <strong>D'</strong> (pronounced "dee prime") represents a finite
            energy reserve available above your critical speed. Think of it as
            your body's energy bank account for high-intensity running: when you
            run faster than your CV, you're making withdrawals from this
            account. When the account goes bankrupt, you have to stop or slow
            down dramatically.
          </p>
          <p>
            D' is measured in meters (typically 150-400m for trained runners),
            though it represents energy capacity rather than distance. In
            practical terms, D' is your <strong>anaerobic work capacity</strong>
            or speed-endurance reserve—the finite amount of work you can perform
            above CV before exhaustion.
          </p>
          <p>
            <strong>Important caveat:</strong> While often called "anaerobic
            capacity," research shows D' isn't purely anaerobic. It represents
            multiple physiological systems working above the sustainable
            threshold, not just oxygen-independent energy pathways.
          </p>
          <p>
            D' explains why two runners with identical 5K PRs might have very
            different mile times. A runner with a higher D' can sustain faster
            paces for shorter durations, even if their critical velocity is the
            same. This makes D' crucial for understanding performance across
            different race distances.
          </p>
        </div>
      </div>

      {/* 2.4 New Training Guidance Section */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Training with Critical Velocity
        </h4>
        <div
          className={`text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          } space-y-3`}
        >
          <p>
            <strong>Important principle:</strong> Don't train AT your critical
            speed. Instead, train 3-4% below it (CS-) or above it (CS+) to
            maximize adaptations while avoiding the "dead zone" of CV itself.
          </p>

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
            <h5
              className={`text-sm font-semibold mb-1 ${
                isDark ? "text-green-200" : "text-green-800"
              }`}
            >
              CS- Workouts (3-4% below CV)
            </h5>
            <p
              className={`text-sm ${
                isDark ? "text-green-100" : "text-green-900"
              }`}
            >
              Build aerobic capacity sustainably. These efforts improve your
              ability to maintain pace just below threshold, developing the
              physiological systems that support your CV without excessive
              fatigue.
            </p>
          </div>

          <div
            className={`
              p-4 rounded-xl backdrop-blur-sm border
              ${
                isDark
                  ? "bg-red-500/10 border-red-400/30"
                  : "bg-red-50/80 border-red-200"
              }
            `}
          >
            <h5
              className={`text-sm font-semibold mb-1 ${
                isDark ? "text-red-200" : "text-red-800"
              }`}
            >
              CS+ Workouts (3-4% above CV)
            </h5>
            <p
              className={`text-sm ${isDark ? "text-red-100" : "text-red-900"}`}
            >
              Push VO₂max and power output. These high-intensity intervals tax
              your system maximally, driving adaptations in oxygen uptake,
              lactate buffering, and neuromuscular power.
            </p>
          </div>

          <p>
            Training around CV (rather than at it) drives beneficial
            adaptations: improved mitochondrial density, enhanced capillary
            networks, and optimized muscle fiber composition. Combined with
            high-volume easy running, CS-/CS+ training creates a powerful
            stimulus for endurance development.
          </p>
        </div>
      </div>

      {/* 2.5 External Resource Link */}
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
          Learn More
        </h4>
        <p
          className={`text-sm mb-2 ${
            isDark ? "text-indigo-100" : "text-indigo-900"
          }`}
        >
          For a comprehensive deep-dive into critical speed science, training
          applications, and research background, see this authoritative guide by
          John Davis (over 11,000 words!):
        </p>
        <a
          href="https://runningwritings.com/2024/01/critical-speed-guide-for-runners.html"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            text-sm font-medium underline transition-colors
            ${
              isDark
                ? "text-indigo-300 hover:text-indigo-200"
                : "text-indigo-700 hover:text-indigo-600"
            }
          `}
        >
          The science of critical speed, critical velocity (CV), and critical
          power training for runners
        </a>
      </div>
    </div>
  );
}

// Race Predictions Tab Content
function PredictionsContent({ isDark, cvMode, d_prime, d_prime_estimated }) {
  return (
    <div className="space-y-4">
      <h3
        className={`text-xl font-semibold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        About Race Predictions
      </h3>

      {/* 3.1 CV-Based Prediction Model Overview (NEW) */}
      <div
        className={`text-sm ${
          isDark ? "text-gray-300" : "text-gray-700"
        } space-y-3`}
      >
        <p>
          Race predictions in this calculator are based on the{" "}
          <strong>Critical Velocity (CV) model</strong>, which uses a
          mathematical relationship between your sustainable pace and anaerobic
          capacity to estimate race performance across different distances.
        </p>
        <p>
          The fundamental equation is:{" "}
          <strong className={isDark ? "text-blue-300" : "text-blue-700"}>
            V<sub>race</sub> = CV + D'/Time
          </strong>
        </p>
        <ul className="space-y-2 ml-4">
          <li className="flex gap-2">
            <span className="flex-shrink-0">•</span>
            <span>
              <strong>CV</strong> is your sustainable aerobic pace (the
              baseline)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0">•</span>
            <span>
              <strong>D'</strong> (D-prime) is your finite anaerobic energy
              reserve (measured in meters)
            </span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0">•</span>
            <span>
              <strong>Time</strong> is the duration of the race
            </span>
          </li>
        </ul>
        <p>
          The key insight:{" "}
          <strong>
            D' becomes less significant as race duration increases
          </strong>
          . For short races (1500m), D' is huge—it's what lets you sprint above
          your sustainable pace. For long races (marathon), D' divided by a
          massive time value approaches zero, so your pace approaches your pure
          CV. This mathematical relationship is why prediction accuracy varies
          by distance.
        </p>
      </div>

      {/* 3.2 D-Prime Adjustment Explanation (REWRITTEN) */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          D' Adjustment Mode
        </h4>
        <div
          className={`text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          } space-y-3`}
        >
          <p>
            Your D' value can be used in two ways for predictions, and your
            choice affects how race paces are calculated:
          </p>

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
            <p
              className={`text-sm font-semibold mb-2 ${
                isDark ? "text-blue-200" : "text-blue-800"
              }`}
            >
              You are currently using:{" "}
              <strong>
                {cvMode === "raw" ? "Unadjusted D'" : "Adjusted D'"}
              </strong>
            </p>
            <p
              className={`text-sm ${
                isDark ? "text-blue-100" : "text-blue-900"
              }`}
            >
              {cvMode === "raw"
                ? "Uses D' directly from your race data. This includes all anaerobic contributions and typically yields more optimistic predictions."
                : "Applies an adjustment factor to D' for improved accuracy. This accounts for the curve-fitting mathematics and provides more conservative predictions."}
            </p>
          </div>

          {d_prime && d_prime_estimated && (
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
                Note: D' is Estimated
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-amber-100" : "text-amber-900"
                }`}
              >
                Your D' value ({d_prime.toFixed(0)}m) is estimated with a ±100m
                confidence interval. For more accurate predictions, especially
                at shorter distances where D' matters most, use the 2-Point Test
                to measure D' directly.
              </p>
            </div>
          )}

          {d_prime && !d_prime_estimated && (
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
                D' Measured from 2-Point Test
              </p>
              <p
                className={`text-sm ${
                  isDark ? "text-green-100" : "text-green-900"
                }`}
              >
                Your D' value ({d_prime.toFixed(0)}m) was measured directly,
                providing higher confidence in predictions across all distances.
              </p>
            </div>
          )}

          <p>
            <strong>Why this matters:</strong> D' adjustment has the biggest
            impact on shorter distance predictions (1500m-5K) where the D'/Time
            term is large. For longer distances (Half Marathon+), the adjustment
            makes minimal difference because D'/Time approaches zero regardless.
          </p>
        </div>
      </div>

      {/* 3.4 How Predictions Are Calculated (NEW) */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          How Predictions Are Calculated
        </h4>
        <div
          className={`text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          } space-y-3`}
        >
          <p>The calculator follows this process for each race distance:</p>
          <ol className="space-y-2 ml-4 list-decimal">
            <li>
              <strong>Uses your CV</strong> from your race test results as the
              baseline sustainable pace
            </li>
            <li>
              <strong>Uses your D'</strong> (raw or adjusted based on mode) as
              your anaerobic capacity
            </li>
            <li>
              <strong>Applies the formula:</strong> V<sub>race</sub> = CV +
              D'/Time
            </li>
            <li>
              <strong>Solves iteratively:</strong> Time is calculated by
              dividing race distance by predicted velocity, which itself depends
              on Time (solved through iteration)
            </li>
            <li>
              <strong>Converts to race time and pace:</strong> Final output
              shows both finish time and per-km/per-mile pace
            </li>
          </ol>

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
            <p
              className={`text-sm ${
                isDark ? "text-purple-100" : "text-purple-900"
              }`}
            >
              <strong>Connection to Training Zones:</strong> If you're using the
              Race Prediction-Based zone system, these same predictions anchor
              your Z4 and Z5 training paces. Z4 uses 5K/10K predictions, while
              Z5 uses 3K/1500m predictions.
            </p>
          </div>
        </div>
      </div>

      {/* 3.3 Rewritten Accuracy Explanation */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Prediction Accuracy by Distance
        </h4>
        <div
          className={`text-sm ${
            isDark ? "text-gray-300" : "text-gray-700"
          } space-y-3`}
        >
          <p>
            The CV model's accuracy varies by race distance due to both
            mathematical and physiological factors:
          </p>

          {/* Shorter Distances */}
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
            <div className="flex items-center justify-between mb-2">
              <h5
                className={`text-sm font-semibold ${
                  isDark ? "text-amber-200" : "text-amber-800"
                }`}
              >
                5K and Shorter: D' is Primary Error Driver
              </h5>
              <span
                className={`text-xs font-medium text-center px-2 py-0.5 rounded-full ${
                  isDark
                    ? "bg-amber-400/20 text-amber-200"
                    : "bg-amber-200 text-amber-800"
                }`}
              >
                Medium Accuracy
              </span>
            </div>
            <p
              className={`text-sm ${
                isDark ? "text-amber-100" : "text-amber-900"
              }`}
            >
              At shorter distances, your anaerobic capacity dominates the
              prediction. Small errors in D' measurement (±20m) can swing
              predicted pace by 5-8 seconds per kilometer. Two runners with
              identical CV can have vastly different 1500m times if one has
              superior anaerobic capacity.
            </p>
          </div>

          {/* Sweet Spot: 10K-15K */}
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
            <div className="flex items-center justify-between mb-2">
              <h5
                className={`text-sm font-semibold ${
                  isDark ? "text-green-200" : "text-green-800"
                }`}
              >
                10K - 15K: Most Accurate
              </h5>
              <span
                className={`text-xs font-medium text-center px-2 py-0.5 rounded-full ${
                  isDark
                    ? "bg-green-400/20 text-green-200"
                    : "bg-green-200 text-green-800"
                }`}
              >
                High Accuracy
              </span>
            </div>
            <p
              className={`text-sm ${
                isDark ? "text-green-100" : "text-green-900"
              }`}
            >
              This is the <strong>sweet spot</strong> for CV-based predictions.
              The model balances both aerobic (CV) and anaerobic (D') components
              accurately. Race of this distance align well with the
              physiological assumptions of the CV model.
            </p>
          </div>

          {/* Longer Distances */}
          <div
            className={`
              p-4 rounded-xl backdrop-blur-sm border
              ${
                isDark
                  ? "bg-red-500/10 border-red-400/30"
                  : "bg-red-50/80 border-red-200"
              }
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <h5
                className={`text-sm font-semibold ${
                  isDark ? "text-red-200" : "text-red-800"
                }`}
              >
                Half Marathons and Longer: Model Breakdown
              </h5>
              <span
                className={`text-xs font-medium text-center px-2 py-0.5 rounded-full ${
                  isDark
                    ? "bg-red-400/20 text-red-200"
                    : "bg-red-200 text-red-800"
                }`}
              >
                Use with Caution
              </span>
            </div>
            <p
              className={`text-sm ${isDark ? "text-red-100" : "text-red-900"}`}
            >
              At very long distances, the CV model assumes you can sustain your
              critical velocity for the entire race duration.{" "}
              <strong>This is physiologically impossible. </strong>
              The CV is roughly your "1-hour max pace" (10K-15K). Trying to run
              a marathon at this pace will lead to bonking. The model lacks
              variables for durability, glycogen depletion, and fatigue
              resistance. Traditional pace calculators that use percentage-based
              adjustments may be more reliable for marathon distance.
            </p>
          </div>
        </div>
      </div>

      {/* 3.5 Expanded Practical Guidance Section */}
      <div>
        <h4
          className={`text-lg font-semibold mb-2 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Practical Guidance
        </h4>

        {/* Best Use Cases */}
        <div
          className={`
            p-4 rounded-xl backdrop-blur-sm border mb-3
            ${
              isDark
                ? "bg-blue-500/10 border-blue-400/30"
                : "bg-blue-50/80 border-blue-200"
            }
          `}
        >
          <h5
            className={`text-sm font-semibold mb-2 ${
              isDark ? "text-blue-200" : "text-blue-800"
            }`}
          >
            Best Use Cases
          </h5>
          <ul
            className={`space-y-1 text-sm ${
              isDark ? "text-blue-100" : "text-blue-900"
            }`}
          >
            <li>
              • <strong>10K-15K race planning:</strong> Use these predictions
              with high confidence
            </li>
            <li>
              • <strong>Validation workouts:</strong> Test predicted paces in
              race simulation efforts
            </li>
            <li>
              • <strong>Course adjustments:</strong> Account for hills (reduce
              pace ~5-10%), wind, and weather
            </li>
            <li>
              • <strong>Training zones:</strong> Race predictions anchor Z4/Z5
              in Race Prediction-Based system
            </li>
          </ul>
        </div>

        {/* Caution Areas */}
        <div
          className={`
            p-4 rounded-xl backdrop-blur-sm border mb-3
            ${
              isDark
                ? "bg-amber-500/10 border-amber-400/30"
                : "bg-amber-50/80 border-amber-200"
            }
          `}
        >
          <h5
            className={`text-sm font-semibold mb-2 ${
              isDark ? "text-amber-200" : "text-amber-800"
            }`}
          >
            Caution Areas
          </h5>
          <ul
            className={`space-y-1 text-sm ${
              isDark ? "text-amber-100" : "text-amber-900"
            }`}
          >
            <li>
              • <strong>Shorter races:</strong> Use as rough guide. Expect
              significant variation based on your anaerobic capacity
            </li>
            <li>
              • <strong>Marathons:</strong> Supplement with traditional
              calculators and assess your durability/fatigue resistance
              separately
            </li>
          </ul>
        </div>

        {/* Race-Day Factors */}
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
          <h5
            className={`text-sm font-semibold mb-2 ${
              isDark ? "text-purple-200" : "text-purple-800"
            }`}
          >
            Race-Day Factors Not in Model
          </h5>
          <p
            className={`text-sm mb-2 ${
              isDark ? "text-purple-100" : "text-purple-900"
            }`}
          >
            The CV model provides physiological predictions but doesn't account
            for:
          </p>
          <ul
            className={`space-y-1 text-sm ${
              isDark ? "text-purple-100" : "text-purple-900"
            }`}
          >
            <li>• Heat, humidity, altitude, and weather conditions</li>
            <li>• Pacing strategy and race-day execution</li>
            <li>• Fueling and hydration status</li>
            <li>• Current fitness vs. test date freshness</li>
            <li>• Running economy improvements from training</li>
            <li>• Taper effects and race-day adrenaline</li>
          </ul>
          <p
            className={`text-sm mt-2 italic ${
              isDark ? "text-purple-200" : "text-purple-800"
            }`}
          >
            Always start conservatively and adjust based on how you feel during
            the race. These predictions are guides, not absolute targets.
          </p>
        </div>
      </div>
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
