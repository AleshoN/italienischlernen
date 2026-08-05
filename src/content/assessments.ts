import { exercises } from './exercises'
import { moduleSpecs } from './a0/curriculum'
import type { Exercise } from '../types/exercises'

export type Assessment = {
  id: string
  moduleId: string | null
  title: string
  description: string
  exerciseIds: string[]
  kind: 'module' | 'final'
}

const moduleExercises = (module: number) =>
  exercises.filter((exercise) =>
    exercise.lessonId.startsWith(
      `lesson.it.a0.${String(module).padStart(2, '0')}.`,
    ),
  )

export const moduleAssessments: Assessment[] = moduleSpecs.map((module) => {
  const available = moduleExercises(module.number)
  const varied = module.lessons
    .map((item, index) =>
      available.find((exercise) =>
        exercise.id.endsWith(
          `.${String(item.lesson).padStart(2, '0')}.${index % 2 === 0 ? '001' : '002'}`,
        ),
      ),
    )
    .filter((exercise): exercise is Exercise => Boolean(exercise))
  const selected = varied.length >= 4 ? varied : available
  return {
    id: `assessment.it.a0.${String(module.number).padStart(2, '0')}`,
    moduleId: `module.it.a0.${String(module.number).padStart(2, '0')}`,
    title: `Modultest: ${module.title}`,
    description: `Prüfe die Kerninhalte aus ${module.lessons.length} Lerneinheiten. Nach jeder Antwort erhältst du eine Erklärung.`,
    exerciseIds: selected.slice(0, 10).map((exercise) => exercise.id),
    kind: 'module',
  }
})

export const finalAssessment: Assessment = {
  id: 'assessment.it.a0.final',
  moduleId: null,
  title: 'A0-Abschlussprüfung',
  description:
    'Zwölf Aufgaben verbinden Aussprache, Wortschatz, Grammatik, Dialogverständnis, Lesen und gelenkte Sprachproduktion aus dem gesamten Kurs.',
  exerciseIds: moduleSpecs
    .filter((module) => module.number > 0)
    .map(
      (module, index) =>
        moduleExercises(module.number).find((exercise) =>
          exercise.id.endsWith(index % 2 === 0 ? '.001' : '.002'),
        )!.id,
    ),
  kind: 'final',
}

export const assessments: Assessment[] = [...moduleAssessments, finalAssessment]
export const assessmentById = (id?: string) =>
  assessments.find((assessment) => assessment.id === id) ??
  (id?.startsWith('module.it.a0.')
    ? assessments.find(
        (assessment) => assessment.id === id.replace('module.', 'assessment.'),
      )
    : undefined)

export const exercisesForAssessment = (assessment: Assessment) =>
  assessment.exerciseIds
    .map((id) => exercises.find((exercise) => exercise.id === id)!)
    .filter(Boolean)
