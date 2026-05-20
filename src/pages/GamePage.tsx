
import React, { useState, useEffect, useCallback } from 'react';
import GameCanvas from '../components/GameCanvas';
import ControlPanel from '../components/ControlPanel';
import { levels } from '../levels';
import { OpticalElement } from '../types';
import { calculateLightPath } from '../utils';

const GamePage: React.FC = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [elements, setElements] = useState<OpticalElement[]>([]);
  const [showWinModal, setShowWinModal] = useState(false);
  const [hitTargets, setHitTargets] = useState<Set<string>>(new Set());
  const [selectedMirrorId, setSelectedMirrorId] = useState<string | null>(null);

  const initLevel = useCallback((index: number) => {
    setShowWinModal(false);
    setSelectedMirrorId(null);
    setHitTargets(new Set());
    setElements(JSON.parse(JSON.stringify(levels[index].elements)));
  }, []);

  useEffect(() => {
    initLevel(currentLevelIndex);
  }, [currentLevelIndex, initLevel]);

  useEffect(() => {
    if (elements.length === 0) return;

    const { hitTargets: newHitTargets } = calculateLightPath(
      elements,
      400,
      350
    );
    setHitTargets(newHitTargets);

    const allTargets = elements.filter(e => e.type === 'target');
    const allTargetsHit = allTargets.every(target => newHitTargets.has(target.id));
    
    if (allTargetsHit && allTargets.length > 0 && !showWinModal) {
      setShowWinModal(true);
    }
  }, [elements, showWinModal]);

  const handlePrevLevel = () => {
    if (currentLevelIndex > 0) {
      setCurrentLevelIndex(currentLevelIndex - 1);
    }
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex(currentLevelIndex + 1);
    }
  };

  const handleReset = () => {
    initLevel(currentLevelIndex);
  };

  const rotateMirror = (direction: 'left' | 'right') => {
    if (!selectedMirrorId) return;
    
    const newElements = elements.map(el => {
      if (el.id === selectedMirrorId) {
        const delta = direction === 'left' ? -15 : 15;
        return { ...el, angle: (el.angle + delta + 360) % 360 };
      }
      return el;
    });
    setElements(newElements);
  };

  const currentLevel = levels[currentLevelIndex];
  const selectedMirror = elements.find(el => el.id === selectedMirrorId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-3 px-2 flex flex-col items-center">
      <h1 className="text-xl md:text-2xl font-bold text-center text-white mb-2">
        🔆 光学解锁
      </h1>
      
      <div className="flex flex-col gap-2 items-center w-full max-w-md">
        <GameCanvas
          elements={elements}
          onElementsChange={setElements}
          hitTargets={hitTargets}
          selectedMirrorId={selectedMirrorId}
          onSelectMirror={setSelectedMirrorId}
        />
        
        {selectedMirror && (
          <div className="flex gap-4 items-center bg-gray-800 px-4 py-2 rounded-lg">
            <button
              onClick={() => rotateMirror('left')}
              className="w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
            >
              ↺
            </button>
            <span className="text-white text-sm">调整角度</span>
            <button
              onClick={() => rotateMirror('right')}
              className="w-12 h-12 bg-blue-600 text-white rounded-full text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg active:scale-95"
            >
              ↻
            </button>
          </div>
        )}
        
        <ControlPanel
          currentLevel={currentLevel.id}
          totalLevels={levels.length}
          levelName={currentLevel.name}
          onPrevLevel={handlePrevLevel}
          onNextLevel={handleNextLevel}
          onReset={handleReset}
        />
      </div>

      {showWinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-3">
          <div className="bg-gray-800 p-5 rounded-xl text-center max-w-sm w-full">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-lg font-bold text-white mb-2">
              恭喜过关！
            </h2>
            <p className="text-gray-300 mb-4 text-sm">
              你成功引导光线到达了目标！
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
              >
                再玩一次
              </button>
              {currentLevelIndex < levels.length - 1 && (
                <button
                  onClick={handleNextLevel}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  下一关
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
