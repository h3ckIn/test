
import React from 'react';

interface ControlPanelProps {
  currentLevel: number;
  totalLevels: number;
  levelName: string;
  onPrevLevel: () => void;
  onNextLevel: () => void;
  onReset: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentLevel,
  totalLevels,
  levelName,
  onPrevLevel,
  onNextLevel,
  onReset,
}) => {
  return (
    <div className="flex flex-col gap-3 items-center p-3 bg-gray-800 rounded-lg w-full">
      <div className="text-white text-base font-semibold text-center">
        关卡 {currentLevel}/{totalLevels}: {levelName}
      </div>
      
      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={onPrevLevel}
          disabled={currentLevel <= 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm"
        >
          上一关
        </button>
        
        <button
          onClick={onReset}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
        >
          重置
        </button>
        
        <button
          onClick={onNextLevel}
          disabled={currentLevel >= totalLevels}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors text-sm"
        >
          下一关
        </button>
      </div>
      
      <div className="text-gray-400 text-xs text-center">
        💡 点击镜面选中，拖放移动，使用下方按钮旋转
      </div>
    </div>
  );
};

export default ControlPanel;

