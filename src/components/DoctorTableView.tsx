import React from 'react';
import { SNOT_QUESTIONS, SCALE_OPTIONS } from '../data/snotQuestions';
import { ScaleScore } from '../types';

interface DoctorTableViewProps {
  scores: Record<number, ScaleScore>;
  onSelect: (questionId: number, value: ScaleScore) => void;
}

export const DoctorTableView: React.FC<DoctorTableViewProps> = ({
  scores,
  onSelect
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Official Top Notice from paper sheet */}
      <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200">
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          <span className="font-bold text-slate-900">Instrucciones clínicas:</span> Considere cuán severas son sus molestias cuándo éstas están presentes y con cuánta frecuencia se presentan. Por favor, califique cada ítem a continuación en cuán &quot;malo&quot; o &quot;molesto&quot; es, haciendo clic en el número correspondiente a sus molestias usando la siguiente escala de 0 a 5.
        </p>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/90 text-slate-700 font-bold divide-x divide-slate-200">
              <th className="py-3 px-4 w-12 text-center text-slate-500">#</th>
              <th className="py-3 px-4 min-w-[240px] text-slate-900">Ítem / Síntoma</th>
              {SCALE_OPTIONS.map((opt) => (
                <th key={opt.value} className="py-3 px-2 text-center w-20 sm:w-24">
                  <div className="flex flex-col items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200/90 text-slate-800 text-xs font-black mb-1">
                      {opt.value}
                    </span>
                    <span className="text-2xs font-semibold leading-tight line-clamp-2">
                      {opt.label}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150">
            {SNOT_QUESTIONS.map((q) => {
              const currentValue = scores[q.id];
              const isAnswered = currentValue !== undefined;

              return (
                <tr 
                  key={q.id}
                  className={`hover:bg-slate-50/80 transition-colors divide-x divide-slate-200/80 ${
                    isAnswered ? 'bg-white' : 'bg-amber-50/10'
                  }`}
                >
                  {/* Number */}
                  <td className="py-2.5 px-3 text-center font-bold text-slate-400">
                    {q.id}.
                  </td>

                  {/* Question text */}
                  <td className="py-2.5 px-4 font-medium text-slate-800">
                    <div className="flex items-center justify-between gap-2">
                      <span>{q.text}</span>
                      <span className="text-3xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        {q.domainLabel}
                      </span>
                    </div>
                  </td>

                  {/* 0 to 5 Circle selectors */}
                  {SCALE_OPTIONS.map((opt) => {
                    const isSelected = currentValue === opt.value;
                    return (
                      <td 
                        key={opt.value}
                        onClick={() => onSelect(q.id, opt.value)}
                        className={`py-2 px-1 text-center cursor-pointer transition-all ${
                          isSelected ? 'bg-teal-50/80' : 'hover:bg-slate-100/60'
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelect(q.id, opt.value);
                            }}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-transform cursor-pointer ${
                              isSelected
                                ? 'bg-teal-600 text-white ring-3 ring-teal-500/40 shadow-xs scale-110'
                                : 'text-slate-600 hover:border hover:border-slate-300'
                            }`}
                          >
                            {opt.value}
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
