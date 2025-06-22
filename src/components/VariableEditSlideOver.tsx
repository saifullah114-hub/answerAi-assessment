import { useRef, useState } from "react";
import type { Variable } from "../types";
import { Search, ChevronUp, ChevronDown, X, Info } from 'lucide-react';
import VariableTag from "./VariableTag";

const VariableEditSlideOver: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    variables: Variable[];
    onVariableToggle: (id: string) => void;
    selectedVariable: Variable | null;
    onVariableSelect: (variable: Variable | null) => void;
}> = ({
    isOpen,
    onClose,
    variables,
    onVariableToggle,
    selectedVariable,
    onVariableSelect
}) => {
        const [searchTerm, setSearchTerm] = useState('');
        const [expandedSections, setExpandedSections] = useState({
            primary: true,
            secondary: true
        });

        const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

        const handleHoverStart = (variable: Variable) => {
            console.log(variable)
            hoverTimer.current = setTimeout(() => {
                onVariableSelect(variable);
            }, 1500);
        };

        const handleHoverEnd = () => {
            if (hoverTimer.current) {
                clearTimeout(hoverTimer.current);
                hoverTimer.current = null;
            }
            onVariableSelect(null);
        };

        const filteredVariables = variables.filter(v =>
            v.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const groupedVariables = filteredVariables.reduce((acc, variable) => {
            if (!acc[variable.category]) {
                acc[variable.category] = [];
            }
            acc[variable.category].push(variable);
            return acc;
        }, {} as Record<string, Variable[]>);

        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex !mt-[0px]">
                <div className="flex-1 bg-black/50 transition-opacity duration-1000 ease-in-out" onClick={onClose} />
                <div
                    className={`w-96 bg-[#0E0D0D] border-l border-gray-700 h-full overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >          <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-white">Edit Variables</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                        </div>

                        <div className="flex gap-2 mb-6">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search variables..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-lime-500"
                                />
                            </div>
                            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                                Autofill
                            </button>
                            <button className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-lg transition-colors">
                                Rerun
                            </button>
                        </div>

                        <div className="space-y-6">
                            {Object.entries(groupedVariables).map(([category, vars]) => (
                                <div key={category} className="space-y-3">
                                    <h3 className="text-gray-300 font-medium">{category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {vars.map((variable) => (
                                            <VariableTag
                                                key={variable.id}
                                                variable={variable}
                                                onToggle={() => onVariableToggle(variable.id)}
                                                onHoverIntent={() => handleHoverStart(variable)}
                                                onHoverLeave={handleHoverEnd}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {selectedVariable?.description && (
                            <div className="mt-6 w-full bg-[#222324] rounded-lg border border-[#525252] p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <h4 className="text-lime-400 font-medium">{selectedVariable.name}</h4>
                                    <Info className="w-4 h-4 text-gray-400" />
                                </div>
                                <p className="text-gray-300 text-sm">{selectedVariable.description}</p>
                            </div>
                        )}



                        <div className="mt-8 space-y-4">
                            <div className="border border-gray-700 rounded-lg">
                                <button
                                    onClick={() => setExpandedSections(prev => ({ ...prev, primary: !prev.primary }))}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800 transition-colors"
                                >
                                    <span className="text-lime-400 font-medium">Primary Variables</span>
                                    {expandedSections.primary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                {expandedSections.primary && (
                                    <div className="px-4 pb-4">
                                        <div className="text-gray-300 text-sm">Configure primary analysis variables</div>
                                    </div>
                                )}
                            </div>

                            <div className="border border-gray-700 rounded-lg">
                                <button
                                    onClick={() => setExpandedSections(prev => ({ ...prev, secondary: !prev.secondary }))}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800 transition-colors"
                                >
                                    <span className="text-lime-400 font-medium">Secondary Variables</span>
                                    {expandedSections.secondary ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </button>
                                {expandedSections.secondary && (
                                    <div className="px-4 pb-4">
                                        <div className="text-gray-300 text-sm">Configure secondary analysis variables</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


export default VariableEditSlideOver;