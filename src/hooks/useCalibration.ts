import { useState, useEffect, useCallback } from 'react';
import { Mantra, CalibrationMoment, PatternData } from '../types';
import {
  saveCalibrationMoment,
  getCalibrationMoments,
  getPatternData
} from '../utils/storage';

export const useCalibration = () => {
  const [moments, setMoments] = useState<CalibrationMoment[]>([]);
  const [pattern, setPattern] = useState<PatternData | null>(null);
  const [currentMomentStart, setCurrentMomentStart] = useState<number | null>(null);

  useEffect(() => {
    setMoments(getCalibrationMoments());
    setPattern(getPatternData());
  }, []);

  const startMoment = useCallback(() => {
    setCurrentMomentStart(Date.now());
  }, []);

  const recordMoment = useCallback((mantra: Mantra) => {
    const moment: CalibrationMoment = {
      timestamp: currentMomentStart || Date.now(),
      mantraId: mantra.id,
      category: mantra.category,
      duration: currentMomentStart
        ? Math.floor((Date.now() - currentMomentStart) / 1000)
        : undefined,
    };

    saveCalibrationMoment(moment);
    setMoments(getCalibrationMoments());
    setPattern(getPatternData());
    setCurrentMomentStart(null);
  }, [currentMomentStart]);

  return {
    moments,
    pattern,
    recordMoment,
    startMoment,
  };
};
