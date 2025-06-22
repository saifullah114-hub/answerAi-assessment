import type { KPIData } from "../types";
import { Info } from 'lucide-react';

const KPICard: React.FC<{ kpi: KPIData }> = ({ kpi }) => {
  return (
    <div className="bg-[#222324] rounded-lg p-4 space-y-2 xl:p-8 border border-[#525252]">
      <div className="flex items-center justify-between">
        <h4 className="text-white font-medium text-sm">{kpi.title}</h4>
        <Info className="w-4 h-4 text-gray-400" />
      </div>
      <p className="text-gray-400 text-xs">{kpi.description}</p>
      <div className="text-2xl font-bold text-white text-right	">{kpi.value}</div>
    </div>
  );
};

export default KPICard;