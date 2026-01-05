export interface Mantra {
  id: string;
  category: string;
  content: string;
  tags: string[];
}

export interface CalibrationMoment {
  timestamp: number;
  mantraId: string;
  category: string;
  duration?: number; // 停留时间（秒）
}

export interface PatternData {
  categoryFrequency: Record<string, number>;
  mantraFrequency: Record<string, number>;
  hourlyPattern: number[]; // 24小时使用pattern
  totalCalibrations: number;
}

export type ViewMode = 'select' | 'display' | 'pattern';
