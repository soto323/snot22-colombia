import React, { useState } from 'react';
import { 
  SNOT_QUESTIONS, 
  DOMAINS, 
  getInterpretation 
} from './data/snotQuestions';
import { ScaleScore, DomainCategory } from './types';
import { Header } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { DoctorTableView } from './components/DoctorTableView';
import { ScoreResultModal } from './components/ScoreResultModal';
import { PrintReport } from './components/PrintReport';
import { 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw, 
  User,
  Info,
  ArrowDownCircle,
  Lock,
  BookOpen
} from 'lucide-react';

export default function App() {
  const [scores, setScores] = useState<Record<number, ScaleScore>>({});
  const [patientName, setPatientName] = useState<string>('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activeDomainFilter, setActiveDomainFilter] = useState<'all' | DomainCategory>('all');
  
  // Modals & Panels
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isPrintOpen, setIsPrintOpen] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Derived stats
  const answeredCount = Object.keys(scores).length;
  const totalQuestions = SNOT_QUESTIONS.length;
  const isComplete = answeredCount === totalQuestions;
  const remainingCount = totalQuestions - answeredCount;

  // Exact sum of answered scores
  const currentTotal = Object.values(scores).reduce<number>((sum, val) => sum + (val ?? 0), 0);
  const interpretation = getInterpretation(currentTotal);

  // Find list of unanswered question IDs
  const missingQuestionIds = SNOT_QUESTIONS
    .map(q => q.id)
    .filter(id => scores[id] === undefined);

  const firstMissingId = missingQuestionIds.length > 0 ? missingQuestionIds[0] : null;

  // Handle single question score select
  const handleSelectScore = (questionId: number, value: ScaleScore) => {
    setScores(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Reset all answers
  const handleReset = () => {
    setScores({});
    setShowConfirmReset(false);
  };

  // Scroll to first unanswered question
  const scrollToFirstMissing = () => {
    if (!firstMissingId) return;
    // If filter is active and hides that question, switch back to 'all'
    setActiveDomainFilter('all');
    setTimeout(() => {
      const el = document.getElementById(`question-item-${firstMissingId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  // Fill sample with realistic values (>40 score to immediately demonstrate user requirement)
  const handleFillSample = () => {
    const sampleScores: Record<number, ScaleScore> = {
      1: 4, // Necesidad de sonarse
      2: 2, // Estornudos
      3: 3, // Secreción nasal continua
      4: 2, // Tos
      5: 3, // Cae secreción por detrás
      6: 4, // Secreción espesa
      7: 3, // Oído tapado
      8: 1, // Mareos
      9: 2, // Dolor de oídos
      10: 4, // Presión en la cara
      11: 3, // Dificultad para dormir
      12: 3, // Se despierta noche
      13: 3, // Durmió mal
      14: 3, // Despertar cansado
      15: 3, // Fatiga
      16: 2, // Productividad
      17: 2, // Concentración
      18: 2, // Frustración
      19: 1, // Triste
      20: 0, // Avergonzado
      21: 4, // Obstrucción nasal
      22: 3  // Pérdida olfato y gusto
    }; // Total = 58 (Severo >40)
    
    setScores(sampleScores);
    if (!patientName) setPatientName('Paciente de Ejemplo');
  };

  // Filter questions for card view
  const filteredQuestions = activeDomainFilter === 'all'
    ? SNOT_QUESTIONS
    : SNOT_QUESTIONS.filter(q => q.domain === activeDomainFilter);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Top Application Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        onReset={() => {
          if (answeredCount > 0) {
            setShowConfirmReset(true);
          } else {
            handleReset();
          }
        }}
        onFillSample={handleFillSample}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-32">
        
        {/* Patient Name Bar */}
        <section className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 mb-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-100">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <label htmlFor="patient-name-field" className="block text-2xs font-bold uppercase tracking-wider text-slate-500">
                  Nombre del Paciente (Opcional):
                </label>
                <input
                  id="patient-name-field"
                  type="text"
                  placeholder="Ej: Juan Pérez / Consulta #12"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="text-sm font-semibold text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:border-teal-600 focus:outline-none w-full sm:w-72 py-0.5"
                />
              </div>
            </div>

            {/* Completion indicator */}
            <div className="flex items-center gap-2 self-start sm:self-center">
              {isComplete ? (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>22 de 22 Respondidas</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span>Faltan {remainingCount} preguntas por responder</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Notice: Requirement to answer all questions */}
        {!isComplete && (
          <div className="mb-6 p-3.5 sm:p-4 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-teal-700 shrink-0" />
              <span>
                Para obtener un diagnóstico médico confiable, <strong>es necesario responder todas las 22 preguntas</strong>.
              </span>
            </div>
            {firstMissingId && (
              <button
                type="button"
                onClick={scrollToFirstMissing}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline cursor-pointer shrink-0"
              >
                <ArrowDownCircle className="w-3.5 h-3.5" />
                Ir a pregunta #{firstMissingId} pendiente
              </button>
            )}
          </div>
        )}

        {/* VIEW 1: INTERACTIVE CARDS */}
        {viewMode === 'cards' ? (
          <div className="space-y-4">
            
            {/* Domain Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
                Filtrar:
              </span>
              <button
                type="button"
                onClick={() => setActiveDomainFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeDomainFilter === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                Todas (22)
              </button>
              {DOMAINS.map(domain => {
                const isActive = activeDomainFilter === domain.id;
                const answeredInDomain = domain.items.filter(id => scores[id] !== undefined).length;
                return (
                  <button
                    key={domain.id}
                    type="button"
                    onClick={() => setActiveDomainFilter(domain.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{domain.label}</span>
                    <span className={`text-2xs px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-teal-800 text-teal-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {answeredInDomain}/{domain.items.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* List of Questions */}
            <div className="space-y-3">
              {filteredQuestions.map((q) => (
                <div key={q.id} id={`question-item-${q.id}`}>
                  <QuestionCard
                    question={q}
                    currentValue={scores[q.id]}
                    onSelect={(val) => handleSelectScore(q.id, val)}
                  />
                </div>
              ))}
            </div>

          </div>
        ) : (
          /* VIEW 2: EXACT PHYSICAL DOCTOR TABLE */
          <DoctorTableView
            scores={scores}
            onSelect={handleSelectScore}
          />
        )}

        {/* Scientific Reference Footer */}
        <footer className="mt-10 pt-6 border-t border-slate-200">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex items-start gap-3 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">
              <p className="font-bold text-slate-800 mb-1">
                Referencia Científica y Validación
              </p>
              <p>
                Soto-Tirado S, Villatoro-Rodríguez SN, Salgado TM, Londoño-Martínez LP, Ariza de la Ossa BD, Bedoya-Gutiérrez JD. Cross-cultural validation of the SNOT-22 questionnaire in the Colombian population. <em>Braz J Otorhinolaryngol.</em> 2026 May-Jun;92(3):101801. doi:{' '}
                <a
                  href="https://doi.org/10.1016/j.bjorl.2026.101801"
                  target="_blank"
                  rel="noreferrer"
                  className="text-teal-700 hover:text-teal-900 underline font-medium"
                >
                  10.1016/j.bjorl.2026.101801
                </a>
                . Epub 2026 Mar 19. PMID: 41855679; PMCID: PMC13019075.
              </p>
            </div>
          </div>
        </footer>

      </main>

      {/* Floating Bottom Bar for Calculation & Action */}
      <aside aria-label="Cálculo final y diagnóstico" className="fixed bottom-0 inset-x-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          
          {/* Progress / Status Info */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-2xs font-semibold text-slate-500 uppercase tracking-wider">
                Progreso:
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl sm:text-2xl font-black ${isComplete ? 'text-teal-700' : 'text-slate-700'}`}>
                  {answeredCount}
                </span>
                <span className="text-xs text-slate-400 font-semibold">/ 22 respondidas</span>
              </div>
            </div>

            {!isComplete && (
              <div className="hidden sm:block border-l border-slate-200 pl-3">
                <span className="text-2xs text-amber-700 block font-bold">
                  Faltan {remainingCount} preguntas
                </span>
                {firstMissingId && (
                  <button
                    type="button"
                    onClick={scrollToFirstMissing}
                    className="text-2xs text-teal-700 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                  >
                    <span>Pregunta #{firstMissingId} pendiente</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Diagnosis Button - STRICTLY DISABLED UNTIL ALL 22 QUESTIONS ARE ANSWERED */}
          <div className="flex items-center gap-2">
            {!isComplete && (
              <button
                type="button"
                onClick={handleFillSample}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-teal-200 text-teal-800 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer"
                title="Llenar las 22 preguntas de prueba para ver el diagnóstico"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Llenar de prueba
              </button>
            )}

            <button
              type="button"
              disabled={!isComplete}
              onClick={() => {
                if (isComplete) {
                  setIsResultModalOpen(true);
                }
              }}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                isComplete
                  ? currentTotal > 40
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/30 cursor-pointer ring-2 ring-rose-500/30'
                    : 'bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/30 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              }`}
            >
              {isComplete ? (
                <>
                  <Calculator className="w-4 h-4" />
                  <span>Ver Diagnóstico y Recomendación</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Responde las 22 preguntas ({answeredCount}/22)</span>
                </>
              )}
            </button>
          </div>

        </div>
      </aside>

      {/* Confirmation Modal to Reset */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">¿Reiniciar cuestionario?</h3>
            <p className="text-xs text-slate-500">
              Se borrarán todas las respuestas ingresadas para comenzar una nueva evaluación desde cero.
            </p>
            <div className="flex gap-2 justify-center pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 cursor-pointer"
              >
                Sí, reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Score Result Modal */}
      <ScoreResultModal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        scores={scores}
        patientName={patientName}
        onOpenPrint={() => {
          setIsResultModalOpen(false);
          setIsPrintOpen(true);
        }}
        onReset={handleReset}
      />

      {/* 2. Printable Clinical Report (PDF) */}
      {isPrintOpen && (
        <PrintReport
          scores={scores}
          patientName={patientName}
          onClose={() => setIsPrintOpen(false)}
        />
      )}

    </div>
  );
}
