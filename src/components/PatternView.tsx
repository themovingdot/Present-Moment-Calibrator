import { PatternData } from '../types';

interface PatternViewProps {
  pattern: PatternData;
}

export const PatternView = ({ pattern }: PatternViewProps) => {
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

  const mostActiveHour = pattern.hourlyPattern.indexOf(maxHourlyValue);

  return (
    <div className="pattern-view">
      {/* 总览 */}
      <div className="pattern-summary">
        <div className="pattern-summary-item">
          <div className="pattern-summary-value">
            {pattern.totalCalibrations}
          </div>
          <div className="pattern-summary-label">Total Calibrations</div>
        </div>
        <div className="pattern-summary-item">
          <div className="pattern-summary-value">{avgCalibrationPerDay}</div>
          <div className="pattern-summary-label">Per Day Average</div>
        </div>
        <div className="pattern-summary-item">
          <div className="pattern-summary-value">{mostActiveHour}:00</div>
          <div className="pattern-summary-label">Most Active Hour</div>
        </div>
      </div>

      {/* 类别频率 */}
      <div className="pattern-section">
        <div className="pattern-title">Category Frequency</div>
        <div className="pattern-bars">
          {Object.entries(pattern.categoryFrequency)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => (
              <div key={category} className="pattern-bar">
                <div className="pattern-bar-label">{category}</div>
                <div className="pattern-bar-container">
                  <div
                    className="pattern-bar-fill"
                    style={{
                      width: `${(count / maxCategoryFreq) * 100}%`,
                    }}
                  />
                </div>
                <div className="pattern-bar-value">{count}</div>
              </div>
            ))}
          {Object.keys(pattern.categoryFrequency).length === 0 && (
            <div style={{ color: 'var(--text-dim)', fontSize: '12px' }}>
              No data yet. Start calibrating to see patterns.
            </div>
          )}
        </div>
      </div>

      {/* 24小时热图 */}
      <div className="pattern-section">
        <div className="pattern-title">24-Hour Activity Pattern</div>
        <div className="pattern-grid">
          {pattern.hourlyPattern.map((count, hour) => (
            <div
              key={hour}
              className={`pattern-hour ${count > 0 ? 'active' : ''}`}
              style={{
                opacity: count > 0 ? 0.3 + (count / maxHourlyValue) * 0.7 : 0.3,
              }}
              title={`${hour}:00 - ${count} calibrations`}
            >
              {hour}
            </div>
          ))}
        </div>
        <div className="pattern-hour-label">
          Peak activity: {mostActiveHour}:00 ({maxHourlyValue} times)
        </div>
      </div>

      {/* 洞察 */}
      {pattern.totalCalibrations > 0 && (
        <div className="pattern-section">
          <div className="pattern-title">Insights</div>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            You gravitate towards <span style={{ color: 'var(--accent-cyan)' }}>{mostActiveCategory}</span> calibrations.
            <br />
            Your awareness peaks around <span style={{ color: 'var(--accent-green)' }}>{mostActiveHour}:00</span>.
            <br />
            This is your unique consciousness rhythm.
          </div>
        </div>
      )}
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
