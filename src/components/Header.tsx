import React from 'react';
import { 
  RotateCcw, 
  Sparkles, 
  LayoutList, 
  Table2, 
  Stethoscope 
} from 'lucide-react';

interface HeaderProps {
  viewMode: 'cards' | 'table';
  setViewMode: (mode: 'cards' | 'table') => void;
  answeredCount: number;
  totalQuestions: number;
  onReset: () => void;
  onFillSample: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  answeredCount,
  totalQuestions,
  onReset,
  onFillSample
}) => {
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);
  const isComplete = answeredCount === totalQuestions;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Clinical Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-sm shadow-teal-500/20 shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight">
                  Síntomas Asociados a Rinosinusitis Crónica <span className="text-teal-700">SNOT-22</span>
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200 shrink-0">
                  Uso Médico
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Test de resultado rinosinusual para evaluación clínica y seguimiento
              </p>
            </div>
          </div>

          {/* Controls & Mode Selection */}
          <div className="flex items-center flex-wrap gap-2 justify-between md:justify-end">
            
            {/* View Mode Toggle */}
            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista interactiva tipo tarjetas"
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Tarjetas</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Vista rápida idéntica a la hoja médica impresa"
              >
                <Table2 className="w-3.5 h-3.5" />
                <span>Hoja Médica</span>
              </button>
            </div>

          </div>

        </div>

        {/* Global completion progress indicator */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Progreso obligatorio:</span>
            <span className={`font-bold ${isComplete ? 'text-teal-700' : 'text-slate-800'}`}>
              {answeredCount} de {totalQuestions} respondidas
            </span>
            {isComplete ? (
              <span className="text-2xs font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                ¡Listo para diagnóstico!
              </span>
            ) : (
              <span className="text-2xs text-amber-600 font-semibold">
                (Faltan {totalQuestions - answeredCount})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onFillSample}
              className="text-2xs text-teal-700 hover:text-teal-900 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              title="Llenar las 22 preguntas de prueba para ver el cálculo y la alerta médica"
            >
              <Sparkles className="w-3 h-3" />
              Llenar de prueba
            </button>
            <span className="text-slate-300">|</span>
            <button
              type="button"
              onClick={onReset}
              className="text-2xs text-slate-500 hover:text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Limpiar
            </button>
          </div>
        </div>

        {/* Visual Progress Line */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full transition-all duration-300 ${isComplete ? 'bg-teal-600' : 'bg-amber-500'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
