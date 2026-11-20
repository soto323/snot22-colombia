import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Share2, 
  Printer, 
  X, 
  RotateCcw,
  Info,
  Check
} from 'lucide-react';
import { ScaleScore } from '../types';
import { calculateDomainSummaries, getInterpretation } from '../data/snotQuestions';

interface ScoreResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: Record<number, ScaleScore>;
  patientName: string;
  onOpenPrint: () => void;
  onReset: () => void;
}

export const ScoreResultModal: React.FC<ScoreResultModalProps> = ({
  isOpen,
  onClose,
  scores,
  patientName,
  onOpenPrint,
  onReset
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Exact sum of the 22 responses
  const totalScore = Object.values(scores).reduce<number>((sum, val) => sum + (val ?? 0), 0);
  const domainSummaries = calculateDomainSummaries(scores);
  const interpretation = getInterpretation(totalScore);

  const generateReportText = () => {
    const today = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    let text = `SÍNTOMAS ASOCIADOS A RINOSINUSITIS CRÓNICA SNOT-22\n`;
    text += `Test de resultado rinosinusual para evaluación clínica y seguimiento\n`;
    text += `Fecha: ${today}\n`;
    if (patientName.trim()) {
      text += `Paciente: ${patientName.trim()}\n`;
    }
    text += `Puntaje Total Obtenido: ${totalScore} / 110 puntos\n`;
    text += `Diagnóstico: ${interpretation.title}\n\n`;
    text += `Desglose por Áreas:\n`;
    domainSummaries.forEach(d => {
      text += `- ${d.title}: ${d.score}/${d.maxScore} pts (${d.percentage}%)\n`;
    });
    text += `\nRecomendación Clínica:\n`;
    text += interpretation.recommendation;
    return text;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateReportText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div>
            <span className="text-2xs font-bold uppercase tracking-wider text-teal-400">
              Evaluación Final
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Resultado Clínico SNOT-22
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Main Hero Score Gauge */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-200 text-center">
            
            {patientName.trim() && (
              <p className="text-xs font-semibold text-slate-500 mb-2">
                Paciente: <span className="text-slate-900 font-bold">{patientName.trim()}</span>
              </p>
            )}

            {/* Diagnostic Number */}
            <div className="my-2 flex items-baseline justify-center gap-2">
              <span className={`text-6xl sm:text-7xl font-black tracking-tight ${
                totalScore > 40 ? 'text-rose-600' : totalScore > 20 ? 'text-amber-600' : 'text-teal-700'
              }`}>
                {totalScore}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-400">/ 110 pts</span>
            </div>

            {/* Severity Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border mt-1 bg-white">
              <span className={`w-2.5 h-2.5 rounded-full ${
                totalScore > 40 ? 'bg-rose-500 animate-pulse' : totalScore > 20 ? 'bg-amber-500' : 'bg-teal-500'
              }`} />
              <span className="text-slate-800 font-bold">{interpretation.title}</span>
            </div>

            {/* Score Bar */}
            <div className="max-w-md mx-auto my-4">
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden p-0.5">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    totalScore > 40 ? 'bg-rose-500' : totalScore > 20 ? 'bg-amber-500' : 'bg-teal-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.round((totalScore / 110) * 100))}%` }}
                />
              </div>
              <div className="flex justify-between text-3xs font-semibold text-slate-400 mt-1">
                <span>0 Normal</span>
                <span>20 Leve</span>
                <span className="font-bold text-amber-600">40 Límite</span>
                <span className="font-bold text-rose-600">110 Severo</span>
              </div>
            </div>
          </div>

          {/* CRITICAL RECOMMENDATION BOX (Puntaje > 40) */}
          {totalScore > 40 ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-50 border-2 border-rose-400 text-rose-950 flex items-start gap-3.5 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-rose-900">
                  RECOMENDACIÓN: Consulta con el Médico Especialista
                </h4>
                <p className="text-xs sm:text-sm text-rose-800 mt-1 leading-relaxed">
                  El puntaje obtenido es de <strong>{totalScore} puntos (superior al límite de 40)</strong>. Esto indica una afectación rinosinusual severa. Se recomienda agendar una consulta médica presencial con un especialista (Otorrinolaringólogo) para una exploración física, endoscopía nasal y valoración de tratamiento específico.
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-950 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-teal-900">
                  {interpretation.title} (Puntaje ≤ 40)
                </h4>
                <p className="text-xs text-teal-800 mt-0.5 leading-relaxed">
                  {interpretation.recommendation}
                </p>
              </div>
            </div>
          )}

          {/* Domain Breakdown */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              Desglose de Síntomas por Áreas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {domainSummaries.map((domain) => (
                <div key={domain.category} className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <div className="flex justify-between items-center text-xs font-medium mb-1.5">
                    <span className="text-slate-800 font-bold">{domain.title}</span>
                    <span className="text-slate-500 font-bold">{domain.score} / {domain.maxScore} pts</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-2 rounded-full ${domain.color}`}
                      style={{ width: `${domain.percentage}%` }}
                    />
                  </div>
                  <span className="text-3xs text-slate-400 mt-1 block text-right font-medium">
                    {domain.percentage}% de afectación
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-100 p-4 sm:p-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
              {copied ? '¡Copiado al portapapeles!' : 'Copiar Resumen'}
            </button>
            <button
              type="button"
              onClick={onOpenPrint}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              Imprimir / Guardar PDF
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onReset();
              }}
              className="px-3 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Nueva evaluación
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
