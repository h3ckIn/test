import React from 'react';

interface HomeProps {
  onStartGame: () => void;
  onOpenGuide: () => void;
}

const Home: React.FC<HomeProps> = ({ onStartGame, onOpenGuide }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🔆 光学解锁
        </h1>
        <p className="text-gray-400 text-lg">
          引导光线，破解谜题
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={onStartGame}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-xl font-bold shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 active:scale-95"
        >
          🎮 开始游戏
        </button>

        <button
          onClick={onOpenGuide}
          className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl text-xl font-bold shadow-lg hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 active:scale-95"
        >
          📖 图鉴
        </button>
      </div>

      <div className="mt-12 text-gray-500 text-sm">
        <p>10个关卡 · 11种光学元件 · 无限可能</p>
      </div>
    </div>
  );
};

export default Home;