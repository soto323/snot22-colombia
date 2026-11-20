import { SnotQuestion, ScaleScore, DomainCategory, DomainSummary } from '../types';

export const SCALE_OPTIONS: { value: ScaleScore; label: string; shortLabel: string; description: string; color: string }[] = [
  {
    value: 0,
    label: 'Sin problema',
    shortLabel: '0 - Ninguno',
    description: 'No presenta esta molestia en absoluto.',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:border-emerald-800'
  },
  {
    value: 1,
    label: 'Problema muy leve',
    shortLabel: '1 - Muy leve',
    description: 'Molestia mínima o imperceptible en la rutina.',
    color: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100 dark:border-teal-800'
  },
  {
    value: 2,
    label: 'Problema leve',
    shortLabel: '2 - Leve',
    description: 'Presente ocasionalmente pero fácil de tolerar.',
    color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 dark:border-blue-800'
  },
  {
    value: 3,
    label: 'Problema moderado',
    shortLabel: '3 - Moderado',
    description: 'Interfiere de forma notable en sus actividades diarias.',
    color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:border-amber-800'
  },
  {
    value: 4,
    label: 'Problema severo',
    shortLabel: '4 - Severo',
    description: 'Afecta drásticamente su calidad de vida y descanso.',
    color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 dark:border-orange-800'
  },
  {
    value: 5,
    label: 'Problema tan mal como puede ser',
    shortLabel: '5 - Máximo',
    description: 'Incapacitante o sumamente molesto y continuo.',
    color: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:border-rose-800'
  }
];

export const SNOT_QUESTIONS: SnotQuestion[] = [
  {
    id: 1,
    text: 'Necesidad de sonarse la nariz',
    domain: 'nasal',
    domainLabel: 'Síntomas Nasales',
    hint: 'Frecuencia o urgencia por sonarse a lo largo del día'
  },
  {
    id: 2,
    text: 'Estornudos',
    domain: 'nasal',
    domainLabel: 'Síntomas Nasales',
    hint: 'Episodios repetitivos o ráfagas de estornudos'
  },
  {
    id: 3,
    text: 'Secreción nasal continua',
    domain: 'nasal',
    domainLabel: 'Síntomas Nasales',
    hint: 'Goteo nasal anterior frecuente o constante (rinorrea acuosa)'
  },
  {
    id: 4,
    text: 'Tos',
    domain: 'psychological',
    domainLabel: 'Impacto General',
    hint: 'Tos seca o irritativa causada por la afección respiratoria'
  },
  {
    id: 5,
    text: 'Cae secreción por atrás hacia la garganta',
    domain: 'nasal',
    domainLabel: 'Síntomas Nasales',
    hint: 'Sensación de moco o flema que desciende por la faringe (goteo retronasal)'
  },
  {
    id: 6,
    text: 'Secreción nasal espesa',
    domain: 'nasal',
    domainLabel: 'Síntomas Nasales',
    hint: 'Moco espeso, amarillento, verdoso o difícil de expulsar'
  },
  {
    id: 7,
    text: 'Sensación de oído tapado',
    domain: 'ear_facial',
    domainLabel: 'Síntomas Óticos y Faciales',
    hint: 'Presión ótica o sensación de taponamiento en uno o ambos oídos'
  },
  {
    id: 8,
    text: 'Mareos',
    domain: 'ear_facial',
    domainLabel: 'Síntomas Óticos y Faciales',
    hint: 'Sensación de inestabilidad, pesadez cefálica o vértigo leve'
  },
  {
    id: 9,
    text: 'Dolor de oídos',
    domain: 'ear_facial',
    domainLabel: 'Síntomas Óticos y Faciales',
    hint: 'Molestia o punzadas en el conducto auditivo'
  },
  {
    id: 10,
    text: 'Presión o dolor en la cara',
    domain: 'ear_facial',
    domainLabel: 'Síntomas Óticos y Faciales',
    hint: 'Tensión o dolor alrededor de pómulos, frente, entrecejo o detrás de los ojos'
  },
  {
    id: 11,
    text: 'Dificultad para quedarse dormido (a)',
    domain: 'sleep',
    domainLabel: 'Calidad del Sueño',
    hint: 'Insomnio inicial atribuible a congestión o malestar'
  },
  {
    id: 12,
    text: 'Se despierta durante la noche',
    domain: 'sleep',
    domainLabel: 'Calidad del Sueño',
    hint: 'Despertares nocturnos por boca seca, ahogo o nariz tapada'
  },
  {
    id: 13,
    text: 'Sensación de que durmió mal',
    domain: 'sleep',
    domainLabel: 'Calidad del Sueño',
    hint: 'Sueño no reparador o fragmentado'
  },
  {
    id: 14,
    text: 'Despertar cansado (a)',
    domain: 'sleep',
    domainLabel: 'Calidad del Sueño',
    hint: 'Falta de energía inmediata al levantarse por la mañana'
  },
  {
    id: 15,
    text: 'Fatiga o cansancio',
    domain: 'psychological',
    domainLabel: 'Impacto Psicológico y General',
    hint: 'Agotamiento físico general durante las horas del día'
  },
  {
    id: 16,
    text: 'Productividad o rendimiento disminuido',
    domain: 'psychological',
    domainLabel: 'Impacto Psicológico y General',
    hint: 'Dificultad para cumplir con tareas laborales, escolares o domésticas'
  },
  {
    id: 17,
    text: 'Menor o poca concentración',
    domain: 'psychological',
    domainLabel: 'Impacto Psicológico y General',
    hint: 'Dificultad para enfocar la mente en lecturas, trabajo o conversaciones'
  },
  {
    id: 18,
    text: 'Frustración, cansancio, irritabilidad',
    domain: 'psychological',
    domainLabel: 'Impacto Psicológico y General',
    hint: 'Sensación de estrés, agobio o molestia por los síntomas persistentes'
  },
  {
    id: 19,
    text: 'Triste',
    domain: 'psychological',
    domainLabel: 'Impacto Psicológico y General',
    hint: 'Desánimo o bajón del estado de ánimo debido al malestar crónico'
  },
  {
    id: 20,
    text: 'Sentirse avergonzado (a)',
    domain: 'psychological',
    domainLabel: 'Impacto Psicológico y General',
    hint: 'Incomodidad social por sonarse en público, hablar nasal o estornudar'
  },
  {
    id: 21,
    text: 'Obstrucción nasal',
    domain: 'nasal',
    domainLabel: 'Síntomas Nasales',
    hint: 'Nariz tapada o dificultad para respirar por una o ambas fosas'
  },
  {
    id: 22,
    text: 'Pérdida del sentido del olfato y gusto',
    domain: 'nasal',
    domainLabel: 'Síntomas Nasales',
    hint: 'Incapacidad parcial o total para percibir olores y sabores'
  }
];

export const DOMAINS: { id: DomainCategory; label: string; icon: string; description: string; items: number[] }[] = [
  {
    id: 'nasal',
    label: 'Síntomas Nasales',
    icon: 'Activity',
    description: 'Congestión, estornudos, secreciones, olfato y obstrucción',
    items: [1, 2, 3, 5, 6, 21, 22] // 7 items = max 35
  },
  {
    id: 'ear_facial',
    label: 'Síntomas Óticos y Faciales',
    icon: 'Smile',
    description: 'Dolor facial, presión en senos paranasales y oídos tapados',
    items: [7, 8, 9, 10] // 4 items = max 20
  },
  {
    id: 'sleep',
    label: 'Calidad del Sueño',
    icon: 'Moon',
    description: 'Dificultad para conciliar el sueño y despertares nocturnos',
    items: [11, 12, 13, 14] // 4 items = max 20
  },
  {
    id: 'psychological',
    label: 'Impacto Psicológico y Funcional',
    icon: 'HeartPulse',
    description: 'Cansancio diurno, concentración, estado anímico y productividad',
    items: [4, 15, 16, 17, 18, 19, 20] // 7 items = max 35
  }
];

export function calculateDomainSummaries(scores: Record<number, ScaleScore>): DomainSummary[] {
  return DOMAINS.map(domain => {
    let score = 0;
    const maxScore = domain.items.length * 5;
    domain.items.forEach(itemId => {
      score += scores[itemId] ?? 0;
    });

    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

    let color = 'bg-teal-500';
    if (domain.id === 'ear_facial') color = 'bg-indigo-500';
    if (domain.id === 'sleep') color = 'bg-blue-500';
    if (domain.id === 'psychological') color = 'bg-purple-500';

    return {
      category: domain.id,
      title: domain.label,
      score,
      maxScore,
      percentage,
      color
    };
  });
}

export function getInterpretation(totalScore: number) {
  const needsDoctorVisit = totalScore > 40;

  if (totalScore <= 8) {
    return {
      level: 'normal' as const,
      title: 'Sin impacto significativo / Estado Normal',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'El puntaje se encuentra dentro del rango de normalidad sin impacto clínico considerable en la calidad de vida.',
      recommendation: 'Continúe con sus cuidados habituales e higiene nasal preventiva. Realice un nuevo test si nota algún cambio.',
      needsDoctorVisit: false
    };
  }

  if (totalScore <= 20) {
    return {
      level: 'mild' as const,
      title: 'Impacto Leve',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
      description: 'Presenta sintomatología leve que causa molestias ocasionales pero no compromete de manera grave sus actividades cotidianas.',
      recommendation: 'Mantenga una buena hidratación, lavados nasales con solución salina y observe si los síntomas aumentan tras cambios climáticos o alergias.',
      needsDoctorVisit: false
    };
  }

  if (totalScore <= 40) {
    return {
      level: 'moderate' as const,
      title: 'Impacto Moderado',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description: 'Los síntomas nasales o de fatiga están interfiriendo con su bienestar, sueño o actividades habituales de manera palpable.',
      recommendation: 'Se aconseja comentar estos resultados con su médico en su próxima cita de control o si los síntomas persisten por más de 10 a 14 días.',
      needsDoctorVisit: false
    };
  }

  // > 40: High Priority
  return {
    level: 'severe' as const,
    title: 'Impacto Severo (Puntaje mayor a 40)',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 ring-2 ring-rose-500/30',
    description: 'Su puntaje indica una alta afectación rinosinusual con impacto significativo en la respiración, descanso y bienestar diario.',
    recommendation: '⚠️ RECOMENDACIÓN PRIORITARIA: Es fundamental agendar una consulta médica con un especialista (Otorrinolaringólogo) o su médico de confianza para una evaluación completa, endoscopía o ajuste terapéutico.',
    needsDoctorVisit: true
  };
}
