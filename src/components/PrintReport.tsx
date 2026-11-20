import React from 'react';
import { SNOT_QUESTIONS, SCALE_OPTIONS, getInterpretation, calculateDomainSummaries } from '../data/snotQuestions';
import { ScaleScore } from '../types';
import { Printer, ArrowLeft, Stethoscope, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PrintReportProps {
  scores: Record<number, ScaleScore>;
  patientName: string;
  patientNotes?: string;
  onClose: () => void;
  evaluationDate?: string;
}

export const PrintReport: React.FC<PrintReportProps> = ({
  scores,
  patientName,
  patientNotes,
  onClose,
  evaluationDate
}) => {
  const totalScore = Object.values(scores).reduce<number>((sum, val) => sum + (val ?? 0), 0);
  const domainSummaries = calculateDomainSummaries(scores);
  const interpretation = getInterpretation(totalScore);
  const dateFormatted = evaluationDate || new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs overflow-y-auto p-4 sm:p-6 flex flex-col items-center">
      {/* Top action bar (hidden during print) */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4 print:hidden">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold hover:bg-slate-100 flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la aplicación
        </button>
        <button
          type="button"
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Guardar como PDF
        </button>
      </div>

      {/* Printable Paper Document (A4/Letter styling) */}
      <div className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl p-8 sm:p-12 print:p-0 print:shadow-none print:rounded-none print:max-w-none">
        
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0 print:border print:border-black">
              <Stethoscope className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-950 uppercase">
                Síntomas Asociados a Rinosinusitis Crónica SNOT-22
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-teal-800">
                Test de resultado rinosinusual para evaluación clínica y seguimiento
              </p>
            </div>
          </div>
          <div className="text-right sm:border-l sm:border-slate-200 sm:pl-6 text-xs text-slate-600 shrink-0">
            <p className="font-bold text-slate-900">Fecha de Evaluación:</p>
            <p className="capitalize">{dateFormatted}</p>
          </div>
        </div>

        {/* Patient & Assessment Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs mb-6">
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider block text-3xs">Paciente</span>
            <span className="text-sm font-bold text-slate-900">{patientName || 'No especificado'}</span>
          </div>
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider block text-3xs">Puntaje Total</span>
            <span className={`text-base font-black ${totalScore > 40 ? 'text-rose-700' : 'text-teal-800'}`}>
              {totalScore} / 110 pts
            </span>
          </div>
          <div>
            <span className="font-bold text-slate-500 uppercase tracking-wider block text-3xs">Estratificación</span>
            <span className="font-bold text-slate-800">{interpretation.title}</span>
          </div>
          {patientNotes && (
            <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-500 uppercase tracking-wider block text-3xs">Notas Clínicas / Tratamiento</span>
              <span className="italic text-slate-700">{patientNotes}</span>
            </div>
          )}
        </div>

        {/* Clinical Recommendation Box */}
        <div className={`p-4 rounded-xl border mb-6 text-xs leading-relaxed ${
          totalScore > 40 
            ? 'bg-rose-50 border-rose-300 text-rose-950'
            : 'bg-teal-50 border-teal-200 text-teal-950'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm mb-1">
            {totalScore > 40 ? (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span className="text-rose-900">ALERTA MÉDICA: Puntaje superior a 40 puntos</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span className="text-teal-900">Interpretación Clínica</span>
              </>
            )}
          </div>
          <p>{interpretation.recommendation}</p>
        </div>

        {/* Domain Summaries */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1">
            Resumen por Dominios Clínicos
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {domainSummaries.map((domain) => (
              <div key={domain.category} className="p-2.5 rounded-lg border border-slate-200 bg-white">
                <span className="font-semibold text-slate-600 block text-2xs truncate">{domain.title}</span>
                <span className="text-sm font-bold text-slate-900">{domain.score} / {domain.maxScore} pts</span>
                <span className="text-3xs text-slate-400 block">({domain.percentage}% afección)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Full Itemized Table of the 22 Items */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 border-b border-slate-200 pb-1">
            Detalle Itemizado de Síntomas (1 a 22)
          </h3>
          <table className="w-full text-xs text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 font-bold border-b border-slate-200">
                <th className="py-2 px-2.5 w-10 text-center">#</th>
                <th className="py-2 px-3">Ítem / Molestia</th>
                <th className="py-2 px-3 w-28 text-center">Puntaje (0-5)</th>
                <th className="py-2 px-3">Severidad declarada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SNOT_QUESTIONS.map((q) => {
                const val = scores[q.id] ?? 0;
                const opt = SCALE_OPTIONS.find(o => o.value === val);
                return (
                  <tr key={q.id} className="hover:bg-slate-50">
                    <td className="py-1.5 px-2.5 text-center font-bold text-slate-400">{q.id}</td>
                    <td className="py-1.5 px-3 font-medium text-slate-900">{q.text}</td>
                    <td className="py-1.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded font-black text-xs ${
                        val >= 4 ? 'bg-rose-100 text-rose-800' : val >= 2 ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {val}
                      </span>
                    </td>
                    <td className="py-1.5 px-3 text-slate-600 font-medium">{opt?.label}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Doctor Signature / Clinical Observations Footer */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-300 mt-8">
          <div>
            <p className="text-2xs font-bold uppercase tracking-wider text-slate-400 mb-8">
              Observaciones del Médico Especialista:
            </p>
            <div className="border-b border-slate-300 h-6"></div>
            <div className="border-b border-slate-300 h-6"></div>
          </div>
          <div className="text-center flex flex-col justify-end items-center">
            <div className="w-56 border-t border-slate-800 pt-1">
              <p className="text-xs font-bold text-slate-900">Firma / Sello Médico</p>
              <p className="text-2xs text-slate-500">Otorrinolaringología / Medicina General</p>
            </div>
          </div>
        </div>

        {/* Bibliographic Reference */}
        <div className="mt-8 pt-4 border-t border-slate-200 text-3xs text-slate-500 leading-relaxed">
          <span className="font-bold text-slate-700">Estudio de referencia y validación: </span>
          Soto-Tirado S, Villatoro-Rodríguez SN, Salgado TM, Londoño-Martínez LP, Ariza de la Ossa BD, Bedoya-Gutiérrez JD. Cross-cultural validation of the SNOT-22 questionnaire in the Colombian population. Braz J Otorhinolaryngol. 2026 May-Jun;92(3):101801. doi: 10.1016/j.bjorl.2026.101801. Epub 2026 Mar 19. PMID: 41855679; PMCID: PMC13019075.
        </div>

      </div>
    </div>
  );
};
