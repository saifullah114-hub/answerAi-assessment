import {ChevronDown } from 'lucide-react';
import type { Variable } from "../types";

const VariableTag: React.FC<{
  variable: Variable;
  onToggle: () => void;
  onHoverIntent?: () => void;
  onHoverLeave?: () => void;
  showControls?: boolean;
}> = ({
  variable,
  onToggle,
  onHoverIntent,
  onHoverLeave,
  showControls = true
}) => {
    const baseClasses = "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm border transition-all duration-200";
    const activeClasses = variable.active
      ? "bg-lime-500/20 border-lime-500/50 text-lime-400"
      : "bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500";

    return (
      <div
        className={`${baseClasses} ${activeClasses}`}
        onMouseEnter={onHoverIntent}
        onMouseLeave={onHoverLeave}
      >
        <span>{variable.name}</span>
        {showControls && (
          <>
            <button
              onClick={onToggle}
              className="text-xs hover:bg-white/10 rounded px-1"
            >
              {variable.active ? '×' : '+'}
            </button>
            <ChevronDown className="w-3 h-3" />
          </>
        )}
      </div>
    );
  };

export default VariableTag;