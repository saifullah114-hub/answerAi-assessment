import type { DataPoint } from "../types";
import { CircleQuestionMark } from 'lucide-react';

const DataPointDetail: React.FC<{
  point: DataPoint;
  position: { x: number; y: number };
  onClose: () => void;
}> = ({ point, position, onClose }) => {
  return (
    <div
      className="fixed z-50 bg-[#0E0D0D] border border-gray-600 rounded-lg p-4 shadow-xl animate-in fade-in duration-200"
      style={{
        left: position.x + 10,
        top: position.y - 100,
        maxWidth: '300px'
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-white font-medium text-base">${(point.value / 1000).toFixed(2)}k</h4>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <CircleQuestionMark className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <span className="text-lime-400">↑</span>
        <span>4.6% above target</span>
      </div>
    </div>
  );
};

export default DataPointDetail;
