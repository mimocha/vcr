import { useState, useEffect } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Card from "./components/ui/Card";
import TestSelector from "./components/calculator/TestSelector";
import TestInput from "./components/calculator/TestInput";
import CalculateButton from "./components/calculator/CalculateButton";
import ResultsPanel from "./components/results/ResultsPanel";

import {
  calculateCV30min,
  calculateCVCooper,
  calculateCV2Point,
} from "./utils/calculations/cvCalculators";
import { calculateTrainingZones } from "./utils/calculations/zoneCalculators";
import { milesToMeters, metersToMiles } from "./utils/calculations/paceConversions";
import { validateDistance, validate2PointTest, checkRealisticPace } from "./utils/validators";

import { DEFAULT_TEST_TYPE, TEST_TYPES } from "./constants/testTypes";
import { UNIT_SYSTEMS } from "./constants/zoneDefinitions";

function App() {
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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header
          unitSystem={unitSystem}
          onUnitSystemChange={setUnitSystem}
        />

        <div className="space-y-6">
          <Card title="Test Configuration">
            <div className="space-y-6">
              <TestSelector value={testType} onChange={setTestType} />

              <TestInput
                testType={testType}
                values={inputValues}
                onChange={handleInputChange}
                errors={errors}
                unitSystem={unitSystem}
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
