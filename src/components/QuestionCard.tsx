import React from 'react';
import { SnotQuestion, ScaleScore } from '../types';
import { SCALE_OPTIONS } from '../data/snotQuestions';
import { Check } from 'lucide-react';

interface QuestionCardProps {
  question: SnotQuestion;
  currentValue: ScaleScore | undefined;
  onSelect: (value: ScaleScore) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentValue,
  onSelect
}) => {
  const isAnswered = currentValue !== undefined;

  return (
    <div 
      className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 bg-white ${
        isAnswered 
          ? 'border-slate-300 shadow-2xs' 
          : 'border-slate-200/90 hover:border-teal-300 shadow-2xs'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <span 
            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold shrink-0 transition-colors ${
              isAnswered
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {question.id}
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug">
              {question.text}
            </h3>
            {question.hint && (
              <p className="text-xs text-slate-500 mt-0.5">
                {question.hint}
              </p>
            )}
          </div>
        </div>

        {/* Domain tag */}
        <span className="shrink-0 text-2xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 hidden xs:inline-block">
          {question.domainLabel}
        </span>
      </div>

      {/* 0 - 5 Scale Buttons */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-6 gap-2 mt-4">
        {SCALE_OPTIONS.map((option) => {
          const isSelected = currentValue === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              className={`group relative flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected
                  ? 'border-teal-600 bg-teal-50/70 ring-2 ring-teal-600/30 shadow-xs'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/80 hover:border-slate-300'
              }`}
            >
              {/* Selected check badge */}
              {isSelected && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-teal-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
              )}

              {/* Number circle */}
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold mb-1.5 transition-transform group-hover:scale-105 ${
                  isSelected 
                    ? 'bg-teal-600 text-white shadow-2xs' 
                    : 'bg-white text-slate-700 border border-slate-200'
                }`}
              >
                {option.value}
              </div>

              {/* Scale Label */}
              <span className={`text-2xs leading-tight font-medium ${
                isSelected ? 'text-teal-900 font-bold' : 'text-slate-600'
              }`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
