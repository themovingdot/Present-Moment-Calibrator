import { useState } from 'react';
import { PatternData } from '../types';
import { getCategoryColor } from '../utils/colors';

interface PatternViewProps {
  pattern: PatternData;
}

type ViewType = 'overview' | 'timeline' | 'heatmap' | 'insights';

export const PatternView = ({ pattern }: PatternViewProps) => {
  const [activeView, setActiveView] = useState<ViewType>('overview');

  // 计算最大值用于归一化
  const maxCategoryFreq = Math.max(
    ...Object.values(pattern.categoryFrequency),
    1
  );
  const maxHourlyValue = Math.max(...pattern.hourlyPattern, 1);

  // 计算统计数据
  const avgCalibrationPerDay =
    pattern.totalCalibrations > 0
      ? (
          pattern.totalCalibrations /
          Math.max(
            Math.ceil(
              (Date.now() - getFirstCalibrationTime()) / (1000 * 60 * 60 * 24)
            ),
            1
          )
        ).toFixed(1)
      : '0';

  const mostActiveCategory = Object.entries(pattern.categoryFrequency).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0] || 'N/A';

  const leastActiveCategory = Object.entries(pattern.categoryFrequency).sort(
    ([, a], [, b]) => a - b
  )[0]?.[0] || 'N/A';

  const mostActiveHour = pattern.hourlyPattern.indexOf(maxHourlyValue);

  // 计算最活跃的时间段
  const getTimeOfDay = (hour: number) => {
    if (hour >= 5 && hour < 12) return '早晨';
    if (hour >= 12 && hour < 17) return '下午';
    if (hour >= 17 && hour < 22) return '傍晚';
    return '深夜';
  };

  const timeOfDayPattern: Record<string, number> = {
    '早晨': 0,
    '下午': 0,
    '傍晚': 0,
    '深夜': 0,
  };

  pattern.hourlyPattern.forEach((count, hour) => {
    const period = getTimeOfDay(hour);
    timeOfDayPattern[period] += count;
  });

  const mostActiveTimeOfDay = Object.entries(timeOfDayPattern).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0] || 'N/A';

  // 渲染不同的视图
  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return renderOverview();
      case 'timeline':
        return renderTimeline();
      case 'heatmap':
        return renderHeatmap();
      case 'insights':
        return renderInsights();
      default:
        return renderOverview();
    }
  };

  const renderOverview = () => (
    <>
      {/* 总览卡片 */}
      <div className="pattern-summary">
        <div className="pattern-summary-item glow-effect">
          <div className="pattern-summary-value pulse">
            {pattern.totalCalibrations}
          </div>
          <div className="pattern-summary-label">Total Calibrations</div>
        </div>
        <div className="pattern-summary-item glow-effect">
          <div className="pattern-summary-value">{avgCalibrationPerDay}</div>
          <div className="pattern-summary-label">Per Day Average</div>
        </div>
        <div className="pattern-summary-item glow-effect">
          <div className="pattern-summary-value">{mostActiveHour}:00</div>
          <div className="pattern-summary-label">Peak Hour</div>
        </div>
      </div>

      {/* 类别频率 - 带颜色 */}
      <div className="pattern-section">
        <div className="pattern-title">
          <span className="title-icon">■</span> Category Frequency
        </div>
        <div className="pattern-bars">
          {Object.entries(pattern.categoryFrequency)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => {
              const colors = getCategoryColor(category);
              const percentage = (count / maxCategoryFreq) * 100;
              return (
                <div key={category} className="pattern-bar">
                  <div className="pattern-bar-label">{category}</div>
                  <div className="pattern-bar-container">
                    <div
                      className="pattern-bar-fill animated-bar"
                      style={{
                        width: `${percentage}%`,
                        background: colors.gradient,
                        boxShadow: `0 0 10px ${colors.glow}`,
                      }}
                    />
                  </div>
                  <div className="pattern-bar-value">{count}</div>
                </div>
              );
            })}
          {Object.keys(pattern.categoryFrequency).length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">○</div>
              <div>No data yet. Start calibrating to see patterns.</div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const renderTimeline = () => (
    <div className="pattern-section">
      <div className="pattern-title">
        <span className="title-icon">▶</span> Time of Day Pattern
      </div>
      <div className="time-periods">
        {Object.entries(timeOfDayPattern).map(([period, count]) => {
          const percentage = maxCategoryFreq > 0 ? (count / (maxCategoryFreq * 2)) * 100 : 0;
          const colors = {
            '早晨': getCategoryColor('觉察'),
            '下午': getCategoryColor('行动'),
            '傍晚': getCategoryColor('休息'),
            '深夜': getCategoryColor('视角'),
          }[period] || getCategoryColor('觉察');

          return (
            <div key={period} className="time-period-card">
              <div className="time-period-header">
                <span className="time-period-name">{period}</span>
                <span className="time-period-count">{count}</span>
              </div>
              <div className="time-period-bar-container">
                <div
                  className="time-period-bar"
                  style={{
                    width: `${percentage}%`,
                    background: colors.gradient,
                    boxShadow: `0 0 15px ${colors.glow}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderHeatmap = () => (
    <div className="pattern-section">
      <div className="pattern-title">
        <span className="title-icon">◆</span> 24-Hour Heatmap
      </div>
      <div className="pattern-grid-enhanced">
        {pattern.hourlyPattern.map((count, hour) => {
          const intensity = count > 0 ? 0.2 + (count / maxHourlyValue) * 0.8 : 0.1;
          const colors = getCategoryColor('觉察'); // Default color
          return (
            <div
              key={hour}
              className="pattern-hour-enhanced"
              style={{
                background: count > 0 ? colors.gradient : 'var(--bg-tertiary)',
                opacity: intensity,
                boxShadow: count > 0 ? `0 0 10px ${colors.glow}` : 'none',
              }}
              title={`${hour}:00 - ${count} calibrations`}
            >
              <span className="hour-label">{hour}</span>
              {count > 0 && <span className="hour-count">{count}</span>}
            </div>
          );
        })}
      </div>
      <div className="pattern-hour-label">
        Peak activity: <span style={{ color: 'var(--accent-green)' }}>{mostActiveHour}:00</span> ({maxHourlyValue} times)
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="pattern-section">
      <div className="pattern-title">
        <span className="title-icon">◈</span> Pattern Insights
      </div>
      <div className="insights-grid">
        {pattern.totalCalibrations > 0 && (
          <>
            <div className="insight-card" style={{ borderLeft: `3px solid ${getCategoryColor(mostActiveCategory).primary}` }}>
              <div className="insight-icon">↑</div>
              <div className="insight-content">
                <div className="insight-label">Most Sought</div>
                <div className="insight-value" style={{ color: getCategoryColor(mostActiveCategory).primary }}>
                  {mostActiveCategory}
                </div>
                <div className="insight-description">
                  You gravitate towards {mostActiveCategory.toLowerCase()} calibrations
                </div>
              </div>
            </div>

            <div className="insight-card" style={{ borderLeft: `3px solid ${getCategoryColor(leastActiveCategory).primary}` }}>
              <div className="insight-icon">↓</div>
              <div className="insight-content">
                <div className="insight-label">Least Explored</div>
                <div className="insight-value" style={{ color: getCategoryColor(leastActiveCategory).primary }}>
                  {leastActiveCategory}
                </div>
                <div className="insight-description">
                  Consider exploring {leastActiveCategory.toLowerCase()} more
                </div>
              </div>
            </div>

            <div className="insight-card" style={{ borderLeft: '3px solid var(--accent-amber)' }}>
              <div className="insight-icon">◷</div>
              <div className="insight-content">
                <div className="insight-label">Your Rhythm</div>
                <div className="insight-value" style={{ color: 'var(--accent-amber)' }}>
                  {mostActiveTimeOfDay}
                </div>
                <div className="insight-description">
                  Your awareness peaks in the {mostActiveTimeOfDay.toLowerCase()}
                </div>
              </div>
            </div>

            <div className="insight-card" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
              <div className="insight-icon">⟳</div>
              <div className="insight-content">
                <div className="insight-label">Consistency</div>
                <div className="insight-value" style={{ color: 'var(--accent-cyan)' }}>
                  {avgCalibrationPerDay}/day
                </div>
                <div className="insight-description">
                  Your daily calibration rhythm
                </div>
              </div>
            </div>
          </>
        )}
        {pattern.totalCalibrations === 0 && (
          <div className="empty-state">
            <div className="empty-icon">◯</div>
            <div>Start your calibration journey to unlock insights</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="pattern-view">
      {/* 视图切换器 */}
      <div className="view-switcher">
        {(['overview', 'timeline', 'heatmap', 'insights'] as ViewType[]).map((view) => {
          const labels = {
            overview: 'Overview',
            timeline: 'Timeline',
            heatmap: 'Heatmap',
            insights: 'Insights',
          };
          return (
            <button
              key={view}
              className={`view-tab ${activeView === view ? 'active' : ''}`}
              onClick={() => setActiveView(view)}
            >
              {labels[view]}
            </button>
          );
        })}
      </div>

      {/* 渲染当前视图 */}
      {renderView()}
    </div>
  );
};

// Helper function
function getFirstCalibrationTime(): number {
  const moments = localStorage.getItem('calibration_moments');
  if (!moments) return Date.now();
  const parsed = JSON.parse(moments);
  return parsed[0]?.timestamp || Date.now();
}
