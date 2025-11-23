import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Card from "./components/ui/Card";
import TestSelector from "./components/calculator/TestSelector";
import TestInput from "./components/calculator/TestInput";
import CalculateButton from "./components/calculator/CalculateButton";
import ResultsPanel from "./components/results/ResultsPanel";
import { useTheme } from "./contexts/ThemeContext";

import {
  calculateCV30min,
  calculateCVCooper,
  calculateCV2Point,
} from "./utils/calculations/cvCalculators";
import { calculateTrainingZones } from "./utils/calculations/zoneCalculators";
import {
  milesToMeters,
  metersToMiles,
} from "./utils/calculations/paceConversions";
import {
  validateDistance,
  validate2PointTest,
  checkRealisticPace,
} from "./utils/validators";

import { DEFAULT_TEST_TYPE, TEST_TYPES } from "./constants/testTypes";
import { UNIT_SYSTEMS } from "./constants/zoneDefinitions";

function App() {
  const { backgroundGradient, isDark } = useTheme();

  // State management
  const [testType, setTestType] = useState(DEFAULT_TEST_TYPE);
  const [unitSystem, setUnitSystem] = useState(UNIT_SYSTEMS.METRIC);
  const [inputValues, setInputValues] = useState({});
  const [errors, setErrors] = useState({});
  const [cvData, setCvData] = useState(null);
  const [zones, setZones] = useState(null);

  // Reset inputs when test type changes
  useEffect(() => {
    setInputValues({});
    setErrors({});
    setCvData(null);
    setZones(null);
  }, [testType]);

  // Handle input changes
  const handleInputChange = (inputId, value) => {
    setInputValues((prev) => ({
      ...prev,
      [inputId]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[inputId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[inputId];
        return newErrors;
      });
    }
  };

  // Convert input values to meters if using imperial
  const getDistanceInMeters = (value) => {
    if (!value || value === "") return null;
    const numValue = Number(value);
    if (isNaN(numValue)) return null;
    return unitSystem === UNIT_SYSTEMS.IMPERIAL
      ? milesToMeters(numValue)
      : numValue;
  };

  // Validate and calculate
  const handleCalculate = () => {
    const newErrors = {};

    try {
      if (testType === TEST_TYPES.THIRTY_MIN) {
        // Validate 30min test
        const distanceMeters = getDistanceInMeters(inputValues.distance);
        const validation = validateDistance(distanceMeters, {
          min: 1000,
          max: 12000,
        });

        if (!validation.valid) {
          newErrors.distance = validation.error;
          setErrors(newErrors);
          return;
        }

        // Check realistic pace
        const realisticCheck = checkRealisticPace(distanceMeters, 1800);
        if (!realisticCheck.realistic) {
          if (
            !confirm(
              `${realisticCheck.warning}\n\nDo you want to continue with this value?`
            )
          ) {
            return;
          }
        }

        // Calculate CV
        const cv = calculateCV30min(distanceMeters);
        setCvData(cv);

        // Calculate zones
        const trainingZones = calculateTrainingZones(cv.velocity_ms);
        setZones(trainingZones);

        // Scroll to results
        setTimeout(() => {
          document.getElementById("results")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else if (testType === TEST_TYPES.COOPER) {
        // Validate Cooper test
        const distanceMeters = getDistanceInMeters(inputValues.distance);
        const validation = validateDistance(distanceMeters, {
          min: 500,
          max: 5000,
        });

        if (!validation.valid) {
          newErrors.distance = validation.error;
          setErrors(newErrors);
          return;
        }

        // Check realistic pace
        const realisticCheck = checkRealisticPace(distanceMeters, 720);
        if (!realisticCheck.realistic) {
          if (
            !confirm(
              `${realisticCheck.warning}\n\nDo you want to continue with this value?`
            )
          ) {
            return;
          }
        }

        // Calculate CV
        const cv = calculateCVCooper(distanceMeters);
        setCvData(cv);

        // Calculate zones
        const trainingZones = calculateTrainingZones(cv.velocity_ms);
        setZones(trainingZones);

        // Scroll to results
        setTimeout(() => {
          document.getElementById("results")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else if (testType === TEST_TYPES.TWO_POINT) {
        // Validate 2-point test
        const distance1Meters = getDistanceInMeters(inputValues.distance1);
        const time1 = Number(inputValues.time1);
        const distance2Meters = getDistanceInMeters(inputValues.distance2);
        const time2 = Number(inputValues.time2);

        const validation = validate2PointTest(
          distance1Meters,
          time1,
          distance2Meters,
          time2
        );

        if (!validation.valid) {
          setErrors(validation.errors);
          return;
        }

        // Calculate CV
        const cv = calculateCV2Point(
          distance1Meters,
          time1,
          distance2Meters,
          time2
        );
        setCvData(cv);

        // Calculate zones
        const trainingZones = calculateTrainingZones(cv.velocity_ms);
        setZones(trainingZones);

        // Scroll to results
        setTimeout(() => {
          document.getElementById("results")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    } catch (error) {
      alert(`Calculation error: ${error.message}`);
    }
  };

  // Check if form is complete
  const isFormComplete = () => {
    if (testType === TEST_TYPES.THIRTY_MIN || testType === TEST_TYPES.COOPER) {
      return inputValues.distance && inputValues.distance !== "";
    } else if (testType === TEST_TYPES.TWO_POINT) {
      return (
        inputValues.distance1 &&
        inputValues.time1 &&
        inputValues.distance2 &&
        inputValues.time2 &&
        inputValues.distance1 !== "" &&
        inputValues.time1 !== "" &&
        inputValues.distance2 !== "" &&
        inputValues.time2 !== ""
      );
    }
    return false;
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 transition-colors ${backgroundGradient} relative overflow-hidden`}
    >
      {/* Running track SVG background */}
      <svg
        className="fixed transition-colors duration-500"
        style={{
          width: "275vw",
          height: "275vh",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) rotate(19deg)",
          opacity: 0.12,
          pointerEvents: "none",
        }}
        viewBox="0 0 41500 50000"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fill={isDark ? "#ffffff" : "#000000"}
          fillRule="nonzero"
          d="M6102.36 27261.08l0 -15278.8c0,-6574.85 6111.86,-11953.71 13582.68,-11953.71 7470.82,0 13582.68,5378.86 13582.68,11953.71l0 15278.8 0 11078.12 0 846.94c0,207.15 -357.88,207.15 -357.88,0l0 -689.46 -799.46 0 0 689.46c0,207.15 -357.88,207.15 -357.88,0l0 -689.46 -799.45 0 0 689.46c0,207.15 -357.88,207.15 -357.88,0l0 -689.46 -799.46 0 0 689.46c0,207.15 -357.88,207.15 -357.88,0l0 -689.46 -799.45 0 0 689.46c0,207.15 -357.88,207.15 -357.88,0l0 -689.46 -799.46 0 0 689.46c0,207.15 -357.88,207.15 -357.88,0l0 -689.46 -799.45 0 0 689.46c0,207.15 -357.88,207.15 -357.88,0l0 -846.94 0 -488c-1881.03,870.27 -4018.56,1363.6 -6280.78,1363.6 -7470.82,0 -13582.68,-5378.86 -13582.68,-11953.71zm1134.95 3920.72l854.61 0c-537.12,-1219.56 -832.22,-2543.09 -832.22,-3924.42l0 -15069.06 -799.46 0 0 15072.76c0,1373.97 274.43,2694.24 777.07,3920.72zm999.61 314.96l-864.74 0c1984.37,4433.04 6868.17,7403.07 12312.85,7403.07 2269.12,0 4409.56,-509.82 6280.78,-1405.71l0 -811.51c-1845.72,958.77 -3993.61,1509.94 -6280.78,1509.94 -5001.59,0 -9506.98,-2666.74 -11448.12,-6695.8zm-99.47 -1162.42l839.57 0c-363.2,-970.74 -560,-2006.43 -560,-3080.66l0 -15065.37 -799.45 0 0 15069.06c0,1068.82 182.06,2102.01 519.87,3076.96zm964.08 314.96l-848.97 0c1655.36,4289.04 6258.49,7228.3 11432.48,7228.3 2296.35,0 4448.21,-572.3 6280.78,-1562.68l0 -839.31c-1797.52,1069.07 -3960.1,1694.72 -6280.78,1694.72 -4732.47,0 -8960.66,-2632.75 -10583.51,-6521.02zm-26.48 -1162.41l825.02 0c-212.43,-715.36 -325.7,-1465.04 -325.7,-2236.9l0 -15061.67 -799.46 0 0 15065.37c0,768.18 104.09,1515.99 300.14,2233.2zm925.68 314.96l-833.07 0c1302.98,4137.85 5616.09,7053.51 10517.39,7053.51 2333.39,0 4501.8,-653.56 6280.78,-1762.84l0 -882.24c-1728.01,1211.64 -3912.62,1937.81 -6280.78,1937.81 -4460.69,0 -8403.01,-2605.71 -9684.31,-6346.24zm60.28 -1162.42l811.8 0c-92.69,-452.49 -141.11,-918.07 -141.11,-1393.14l0 -15057.98 -799.45 0 0 15061.67c0,472.77 44.14,936.9 128.76,1389.44zm884.1 314.96l-818.25 0c919.65,3975.86 4931.45,6878.74 9558.18,6878.74 2386.91,0 4580.78,-764.96 6280.78,-2030.07l0 -954.61c-1619.17,1406.28 -3839.87,2277.41 -6280.78,2277.41 -4186.7,0 -7831.43,-2589.09 -8739.94,-6171.46zm166.94 -1162.41l802.05 0c-16.52,-181.3 -25.06,-364.5 -25.06,-549.38l0 -140.59 0 -14913.69 -799.46 0 0 15057.98c0,183.45 7.68,365.4 22.46,545.69zm839.04 314.96l-805.76 0c494.43,3797.65 4187.28,6703.96 8539.72,6703.96 2390.59,0 4652.63,-877.48 6280.78,-2413.97l0 -1101.9c-1469.85,1757.42 -3790.37,2808.6 -6280.78,2808.6 -3912.2,0 -7241.8,-2588.93 -7733.96,-5996.68zm295.84 -1162.42l799.45 0 0 -14756.2 -799.45 0 0 14756.2zm799.6 314.96l-799.48 0c10.46,3593.32 3354.77,6529.18 7437.99,6529.18 2556.56,0 4916.29,-1162.57 6280.78,-3050.62l0 -1611.04c-918.31,2348.72 -3443.52,3954.39 -6280.78,3954.39 -3642.59,0 -6625.78,-2616.4 -6638.52,-5821.91zm-6585.5 -15386.13l799.48 0c69.37,-5969.57 5639.81,-10822.56 12424.53,-10822.56 2648.22,0 5109.66,738.98 7131.57,1993.96l480.81 -565c-2156.23,-1344.25 -4784.33,-2136.23 -7612.38,-2136.23 -7225.38,0 -13156.87,5172.38 -13224.01,11529.83zm1157.37 0l799.48 0c71.56,-5407.81 5120.67,-9800.32 11267.16,-9800.32 2829.99,0 5424.79,930.5 7409.22,2460.83l535.04 -524.99c-2126.59,-1643.48 -4909.23,-2643.11 -7944.26,-2643.11 -6587.17,0 -11997.29,4711.89 -12066.65,10507.59zm1157.36 0l799.56 0c73.74,-4846.08 4601.41,-8778.09 10109.72,-8778.09 2932.02,0 5693.24,1121.84 7616.35,3061.81l618.69 -448.11c-169.94,-172.22 -346.7,-339.13 -529.9,-500.35 -1977.54,-1740.37 -4705.04,-2820.61 -7705.14,-2820.61 -5948.93,0 -10837.73,4251.42 -10909.28,9485.36zm1157.5 0l799.67 0c75.93,-4284.39 4081.87,-7755.85 8952.11,-7755.85 3078.74,0 5919.85,1399.87 7562.15,3674.09l681.55 -369.97c-1787.75,-2482.07 -4885.93,-4011.39 -8243.7,-4011.39 -5310.8,0 -9678.04,3790.9 -9751.78,8463.13zm1157.61 0l799.67 0c78.05,-3722.65 3562.38,-6733.62 7794.5,-6733.62 3142.25,0 5971.82,1677.25 7187.05,4210.15l739.97 -269.12c-1338.24,-2795.46 -4460.08,-4648.31 -7927.02,-4648.31 -4672.72,0 -8518.26,3330.37 -8594.18,7440.89zm1157.61 0l799.67 0c80.1,-3160.84 3042.95,-5711.39 6636.9,-5711.39 3088.74,0 5781.27,1900.51 6470.9,4539.29l781.55 -151.38c-768.79,-2960.39 -3788.31,-5095.18 -7252.44,-5095.18 -4034.59,0 -7358.55,2869.89 -7436.57,6418.66zm15337.19 -9208.94l-480.54 564.67c3099.07,2041.72 4964.69,5223.42 5004.44,8644.28l799.48 0c-38.48,-3643.66 -2023.51,-7033.26 -5323.38,-9208.94zm308.13 1554.71l-535.07 525.03c96.43,79.12 191.26,159.73 284.48,241.77 2013.16,1771.72 3273.51,4206.06 3308.99,6887.43l799.48 0c-34.89,-2915.62 -1435.39,-5670.68 -3857.89,-7654.23zm255.62 1730.13l-618.33 447.85c1387.63,1502.37 2232.19,3406.93 2263.67,5476.24l799.57 0c-30.6,-2238.65 -943.4,-4299.35 -2444.91,-5924.09zm-35.26 1740.38l-681.7 370.05c744.09,1126.7 1180.15,2428.25 1204.69,3813.67l799.67 0c-24,-1520.61 -503.29,-2948.96 -1322.67,-4183.72zm-370.57 1682.97l-740.34 269.26c300.31,716.27 460.29,1467.75 476.3,2231.49l799.67 0c-16.2,-876.98 -204.31,-1718.88 -535.63,-2500.75zm-734.87 1485.95l-782 151.47c55.46,281.55 87.79,569.86 95.23,863.33l799.66 0c-7.59,-345.28 -46.05,-684.22 -112.89,-1014.8zm5901.13 1329.76l-799.46 0 0 560.04 799.46 0 0 -560.04zm-1157.34 0l-799.45 0 0 560.04 799.45 0 0 -560.04zm-1157.33 0l-799.46 0 0 560.04 799.46 0 0 -560.04zm-1157.34 0l-799.45 0 0 560.04 799.45 0 0 -560.04zm-1157.33 0l-799.46 0 0 560.04 799.46 0 0 -560.04zm-1157.34 0l-799.45 0 0 560.04 799.45 0 0 -560.04zm5786.68 875l-799.46 0 0 14194.06 0 3979.01c516.96,-1241.84 799.46,-2580.96 799.46,-3975.31l0 -14197.76zm-1157.34 0l-799.45 0 0 14190.37 0 3794.76c516.11,-1178.84 799.45,-2457.24 799.45,-3791.07l0 -14194.06zm-1157.33 0l-799.46 0 0 14186.67 0 3601.42c515.17,-1112.52 799.46,-2327.32 799.46,-3597.72l0 -14190.37zm-1157.34 0l-799.45 0 0 14182.98 0 3397.04c514.01,-1042.19 799.45,-2189.85 799.45,-3393.34l0 -14186.67zm-1157.33 0l-799.46 0 0 14179.28 0 3179.94c512.71,-967.1 799.46,-2043.65 799.46,-3176.24l0 -14182.98zm-1157.34 0l-799.45 0 0 14175.58 0 2946.68c510.94,-886.03 799.45,-1886.3 799.45,-2942.98l0 -14179.28zm5786.68 25118.4l0 -8198.14c-193.63,724.55 -462.72,1424.22 -799.46,2092.2l0 6105.94 799.46 0zm-1157.34 0l0 -5450.68c-241.06,408.98 -508.21,804.35 -799.45,1184.37l0 4266.31 799.45 0zm-1157.33 0l0 -3821.38c-251.49,298.14 -518.33,585.74 -799.46,861.85l0 2959.53 799.46 0zm-1157.34 0l0 -2621.27c-256.12,233.02 -522.9,456.95 -799.45,671.12l0 1950.15 799.45 0zm-1157.33 0l0 -1682.42c-258.74,186.96 -525.41,365.72 -799.46,535.8l0 1146.62 799.46 0zm-1157.34 0l0 -931.89c-260.44,151.02 -527.07,294.39 -799.45,429.72l0 502.17 799.45 0zm357.88 -7072.66l0 1282.47c296.67,-347.07 564.24,-714.36 799.46,-1098.99l0 -1844.76c-194.53,584.28 -464.37,1140.95 -799.46,1661.28zm0 1791.04l0 1053.74c282.85,-254.82 549.81,-523.36 799.46,-804.3l0 -1228.57c-241.64,342.4 -508.93,669.48 -799.46,979.13zm0 1497.23l0 950.08c277.42,-207.52 544.19,-425.9 799.46,-654.38l0 -1044.75c-251.73,261.47 -518.66,511.61 -799.46,749.05zm0 1359.2l0 890.54c274.66,-177.43 541.35,-363.92 799.46,-558.99l0 -952.27c-256.27,216.66 -523.02,423.78 -799.46,620.72zm-357.88 1113.86l0 -868.16c-258.91,171.22 -525.59,333.77 -799.45,487.19l0 826.81c272.77,-140.41 539.41,-289.15 799.45,-445.83zm0 -1265.38l0 -917.69c-256.47,199.1 -523.24,388.13 -799.45,566.42l0 860.14c274.47,-160.22 541.17,-330.03 799.45,-508.87zm0 -1343.05l0 -1000.45c-96.93,92.79 -196.06,183.78 -297.31,272.89 -162.01,142.58 -329.57,280.27 -502.14,413.02l0 912.28c277.24,-188.11 544.04,-387.62 799.45,-597.75zm0 -1476.19l0 -1166.98c-241.93,317.11 -509.28,618.11 -799.45,900.64l0 1003.94c84.43,-69.28 167.49,-139.82 249.11,-211.65 191.51,-168.54 375.13,-344.02 550.35,-525.94zm0 -1760.72l0 -1731.75c-194.9,543.61 -465,1058.56 -799.45,1535.26l0 1208.79c296.3,-317.09 563.91,-655.6 799.45,-1012.3zm1515.22 346.21l0 1352.06c296.98,-374.73 564.49,-768.73 799.45,-1179.36l0 -1951.37c-194.23,622.33 -463.85,1217.92 -799.45,1778.67zm0 1885.87l0 1101.57c283.07,-276.03 550,-565.1 799.45,-866.02l0 -1287.44c-241.42,365.93 -508.65,717.2 -799.45,1051.88zm0 1563.69l0 986.83c277.67,-225.54 544.44,-461.4 799.45,-706.8l0 -1087.35c-251.65,280.43 -518.51,549.87 -799.45,807.31zm1157.33 -3202.44l0 1418.3c297.27,-400.59 564.7,-819.7 799.46,-1254.83l0 -2052.12c-194,658.09 -463.43,1290.17 -799.46,1888.65zm0 1976.3l0 1147.46c283.26,-295.8 550.18,-604.08 799.46,-923.74l0 -1343.71c-241.22,388.03 -508.41,761.97 -799.46,1119.99zm1157.34 -1742.18l0 1481.86c297.48,-424.89 564.88,-867.62 799.45,-1325.88l0 -2148.72c-193.8,692.04 -463.07,1358.66 -799.45,1992.74zm-17548.79 -19848.03l0 15234.44c0,3039.82 2826.71,5527.53 6280.78,5527.53 3454.07,0 6280.78,-2487.7 6280.78,-5527.53l0 -15208.06c0,-3055.37 -2801.46,-5553.91 -6280.78,-5553.91 -3454.07,0 -6280.78,2487.7 -6280.78,5527.52z"
        />
      </svg>

      <div className="max-w-4xl mx-auto relative z-10">
        <Header unitSystem={unitSystem} onUnitSystemChange={setUnitSystem} />

        <div className="space-y-6">
          <Card title="Your Running Results">
            <div className="space-y-6">
              <TestSelector value={testType} onChange={setTestType} />

              <TestInput
                testType={testType}
                values={inputValues}
                onChange={handleInputChange}
                errors={errors}
                unitSystem={unitSystem}
                onSubmit={handleCalculate}
              />

              <CalculateButton
                onClick={handleCalculate}
                disabled={!isFormComplete()}
              />
            </div>
          </Card>

          {cvData && zones && (
            <ResultsPanel
              cvData={cvData}
              zones={zones}
              unitSystem={unitSystem}
            />
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default App;
