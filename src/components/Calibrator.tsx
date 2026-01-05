import { useState, useEffect } from 'react';
import { Mantra, ViewMode } from '../types';
import { mantras, categories } from '../data/mantras';
import { useCalibration } from '../hooks/useCalibration';
import {
  selectMantraByPattern,
  selectMantraByCategory,
} from '../utils/selector';
import { PatternView } from './PatternView';
import './Calibrator.css';

export const Calibrator = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('select');
  const [currentMantra, setCurrentMantra] = useState<Mantra | null>(null);
  const { pattern, recordMoment, startMoment } = useCalibration();
  const [currentTime, setCurrentTime] = useState(new Date());

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 格式化时间戳
  const formatTimestamp = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
  };

  // 处理类别选择
  const handleCategorySelect = (category: string) => {
    startMoment();
    const mantra = selectMantraByCategory(mantras, category);
    setCurrentMantra(mantra);
    setViewMode('display');
  };

  // 处理随机唤醒
  const handleRandomAwaken = () => {
    startMoment();
    const mantra = selectMantraByPattern(mantras);
    setCurrentMantra(mantra);
    setViewMode('display');
  };

  // 完成calibration
  const handleComplete = () => {
    if (currentMantra) {
      recordMoment(currentMantra);
    }
    setCurrentMantra(null);
    setViewMode('select');
  };

  // 返回选择
  const handleBack = () => {
    setCurrentMantra(null);
    setViewMode('select');
  };

  // 查看pattern
  const handleViewPattern = () => {
    setViewMode('pattern');
  };

  return (
    <div className="calibrator instrument-border">
      {/* Header */}
      <div className="calibrator-header">
        <div>
          <div className="calibrator-title no-select">
            Present Moment Calibrator
          </div>
          <div className="calibrator-subtitle no-select">当下刻度</div>
        </div>
        <div className="calibrator-stats">
          <span className="calibrator-stats-number">
            {pattern?.totalCalibrations || 0}
          </span>
          <div>CALIBRATIONS</div>
        </div>
      </div>

      {/* Body */}
      <div className="calibrator-body">
        {viewMode === 'select' && (
          <div className="select-view">
            {/* 类别选择 */}
            <div className="select-section">
              <div className="select-label">Select Category</div>
              <div className="select-options">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="select-option"
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 快捷操作 */}
            <div className="select-section">
              <div className="select-label">Quick Actions</div>
              <div className="select-options">
                <button
                  className="select-option primary"
                  onClick={handleRandomAwaken}
                >
                  随机唤醒
                </button>
              </div>
            </div>
          </div>
        )}

        {viewMode === 'display' && currentMantra && (
          <div className="display-view">
            <div className="display-category">{currentMantra.category}</div>
            <div className="display-content">{currentMantra.content}</div>
            <div className="display-actions">
              <button onClick={handleBack}>← Back</button>
              <button className="primary" onClick={handleComplete}>
                Complete
              </button>
            </div>
          </div>
        )}

        {viewMode === 'pattern' && pattern && (
          <PatternView pattern={pattern} />
        )}
      </div>

      {/* Footer */}
      <div className="calibrator-footer">
        <div className="calibrator-timestamp">
          {formatTimestamp(currentTime)}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {viewMode === 'select' && (
            <button className="secondary" onClick={handleViewPattern}>
              View Pattern
            </button>
          )}
          {viewMode === 'pattern' && (
            <button onClick={handleBack}>← Back</button>
          )}
        </div>
      </div>
    </div>
  );
};
