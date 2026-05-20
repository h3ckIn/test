import React from 'react';

interface GuideProps {
  onBack: () => void;
}

interface ElementInfo {
  name: string;
  icon: string;
  description: string;
  color: string;
}

const elements: ElementInfo[] = [
  {
    name: '光源',
    icon: '☼',
    description: '发出特定颜色的光线，是谜题的起点',
    color: '#ffdd44'
  },
  {
    name: '反光镜',
    icon: '▭',
    description: '反射光线，改变光的传播方向',
    color: '#c0c0c0'
  },
  {
    name: '双向镜',
    icon: '↔',
    description: '有50%概率反射或透射光线',
    color: '#8888ff'
  },
  {
    name: '分光器',
    icon: '◇',
    description: '将一束光分成两束，一束反射一束透射',
    color: '#aaaaff'
  },
  {
    name: '光束分离器',
    icon: '✕',
    description: '将光线均匀分离为透射和反射两束',
    color: '#44aaff'
  },
  {
    name: '颜色滤镜',
    icon: '▢',
    description: '只允许特定颜色的光线通过',
    color: '#ff4444'
  },
  {
    name: '透镜',
    icon: '◯',
    description: '聚焦或发散光线，改变光的路径',
    color: '#ffaa44'
  },
  {
    name: '棱镜',
    icon: '△',
    description: '折射光线，可用于分散白光',
    color: '#88ccff'
  },
  {
    name: '光探测器',
    icon: '●',
    description: '检测光线，被照射时变为绿色',
    color: '#00ff88'
  },
  {
    name: '目标',
    icon: '◆',
    description: '接收特定颜色光线后变亮',
    color: '#4488ff'
  },
  {
    name: '障碍物',
    icon: '▬',
    description: '阻挡光线，无法穿透',
    color: '#555566'
  }
];

const Guide: React.FC<GuideProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-6 px-4">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <span className="text-xl">←</span>
        <span>返回</span>
      </button>

      <h1 className="text-3xl font-bold text-white text-center mb-8">
        📖 光学元件图鉴
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {elements.map((element, index) => (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${element.color}20`, color: element.color }}
              >
                {element.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{element.name}</h3>
            </div>
            <p className="text-gray-400 text-sm">{element.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>共 {elements.length} 种光学元件</p>
      </div>
    </div>
  );
};

export default Guide;