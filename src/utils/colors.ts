// 每个类别的颜色主题
export const categoryColors: Record<string, {
  primary: string;
  gradient: string;
  glow: string;
  bg: string;
}> = {
  '觉察': {
    primary: '#00ff41',    // Matrix green
    gradient: 'linear-gradient(135deg, #00ff41, #00d936)',
    glow: 'rgba(0, 255, 65, 0.3)',
    bg: 'rgba(0, 255, 65, 0.05)',
  },
  '放下': {
    primary: '#00d9ff',    // Cyan
    gradient: 'linear-gradient(135deg, #00d9ff, #0095ff)',
    glow: 'rgba(0, 217, 255, 0.3)',
    bg: 'rgba(0, 217, 255, 0.05)',
  },
  '接纳': {
    primary: '#ff6b9d',    // Pink
    gradient: 'linear-gradient(135deg, #ff6b9d, #c44569)',
    glow: 'rgba(255, 107, 157, 0.3)',
    bg: 'rgba(255, 107, 157, 0.05)',
  },
  '质疑': {
    primary: '#ffd700',    // Gold
    gradient: 'linear-gradient(135deg, #ffd700, #ffb000)',
    glow: 'rgba(255, 215, 0, 0.3)',
    bg: 'rgba(255, 215, 0, 0.05)',
  },
  '链接': {
    primary: '#a78bfa',    // Purple
    gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
    glow: 'rgba(167, 139, 250, 0.3)',
    bg: 'rgba(167, 139, 250, 0.05)',
  },
  '行动': {
    primary: '#ff5757',    // Red
    gradient: 'linear-gradient(135deg, #ff5757, #ff3838)',
    glow: 'rgba(255, 87, 87, 0.3)',
    bg: 'rgba(255, 87, 87, 0.05)',
  },
  '休息': {
    primary: '#5eead4',    // Teal
    gradient: 'linear-gradient(135deg, #5eead4, #14b8a6)',
    glow: 'rgba(94, 234, 212, 0.3)',
    bg: 'rgba(94, 234, 212, 0.05)',
  },
  '视角': {
    primary: '#fb923c',    // Orange
    gradient: 'linear-gradient(135deg, #fb923c, #f97316)',
    glow: 'rgba(251, 146, 60, 0.3)',
    bg: 'rgba(251, 146, 60, 0.05)',
  },
};

// 获取类别颜色
export const getCategoryColor = (category: string) => {
  return categoryColors[category] || categoryColors['觉察'];
};
