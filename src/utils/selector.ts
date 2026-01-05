import { Mantra } from '../types';
import { getPatternData } from './storage';

/**
 * 根据使用pattern智能选择mantra
 * 使用频率越低的内容，被选中概率越高（避免always看到相同内容）
 */
export const selectMantraByPattern = (mantras: Mantra[]): Mantra => {
  const pattern = getPatternData();

  if (pattern.totalCalibrations === 0) {
    // 如果没有历史记录，随机选择
    return mantras[Math.floor(Math.random() * mantras.length)];
  }

  // 计算每个mantra的"新鲜度"分数（使用次数越少，分数越高）
  const maxFreq = Math.max(...Object.values(pattern.mantraFrequency), 1);
  const scores = mantras.map(mantra => {
    const freq = pattern.mantraFrequency[mantra.id] || 0;
    // 反向权重：使用越少，权重越高
    return maxFreq - freq + 1;
  });

  // 加权随机选择
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  let random = Math.random() * totalScore;

  for (let i = 0; i < mantras.length; i++) {
    random -= scores[i];
    if (random <= 0) {
      return mantras[i];
    }
  }

  return mantras[mantras.length - 1];
};

/**
 * 从特定类别中选择mantra
 */
export const selectMantraByCategory = (
  mantras: Mantra[],
  category: string
): Mantra => {
  const filtered = mantras.filter(m => m.category === category);
  return selectMantraByPattern(filtered);
};

/**
 * 获取最需要的类别（使用频率最低的）
 */
export const getMostNeededCategory = (categories: string[]): string => {
  const pattern = getPatternData();

  if (pattern.totalCalibrations === 0) {
    return categories[Math.floor(Math.random() * categories.length)];
  }

  // 找到使用频率最低的类别
  let minCategory = categories[0];
  let minFreq = pattern.categoryFrequency[minCategory] || 0;

  for (const category of categories) {
    const freq = pattern.categoryFrequency[category] || 0;
    if (freq < minFreq) {
      minFreq = freq;
      minCategory = category;
    }
  }

  return minCategory;
};
