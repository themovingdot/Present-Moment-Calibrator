import { CalibrationMoment, PatternData } from '../types';

const STORAGE_KEY = 'calibration_moments';
const PATTERN_KEY = 'pattern_data';

export const saveCalibrationMoment = (moment: CalibrationMoment): void => {
  const moments = getCalibrationMoments();
  moments.push(moment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(moments));
  updatePatternData(moment);
};

export const getCalibrationMoments = (): CalibrationMoment[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getPatternData = (): PatternData => {
  const data = localStorage.getItem(PATTERN_KEY);
  if (data) {
    return JSON.parse(data);
  }

  // 初始化空pattern
  return {
    categoryFrequency: {},
    mantraFrequency: {},
    hourlyPattern: new Array(24).fill(0),
    totalCalibrations: 0,
  };
};

const updatePatternData = (moment: CalibrationMoment): void => {
  const pattern = getPatternData();

  // 更新类别频率
  pattern.categoryFrequency[moment.category] =
    (pattern.categoryFrequency[moment.category] || 0) + 1;

  // 更新mantra频率
  pattern.mantraFrequency[moment.mantraId] =
    (pattern.mantraFrequency[moment.mantraId] || 0) + 1;

  // 更新小时pattern
  const hour = new Date(moment.timestamp).getHours();
  pattern.hourlyPattern[hour]++;

  // 更新总数
  pattern.totalCalibrations++;

  localStorage.setItem(PATTERN_KEY, JSON.stringify(pattern));
};

export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PATTERN_KEY);
};
