export type ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'sentence-order'
  | 'matching'
  | 'free-text'
  | 'conjugation'

type ExerciseBase = {
  id: string
  lessonId: string
  prompt: string
  explanation: string
  errorFeedback: string
  hints: string[]
  grammarIds: string[]
  vocabularyIds: string[]
  difficulty: 1 | 2 | 3
  contentVersion: string
}

export type Exercise = ExerciseBase &
  (
    | {
        type: 'multiple-choice'
        options: { id: string; text: string }[]
        answer: string
      }
    | {
        type: 'fill-blank'
        template: string
        answer: string
        acceptedAnswers: string[]
      }
    | {
        type: 'sentence-order'
        tokens: { id: string; text: string }[]
        answer: string[]
      }
    | {
        type: 'matching'
        pairs: { id: string; left: string; right: string }[]
        answer: Record<string, string>
      }
    | { type: 'free-text'; answer: string; acceptedAnswers: string[] }
    | {
        type: 'conjugation'
        infinitive: string
        subject: string
        template: string
        answer: string
        acceptedAnswers: string[]
      }
  )

export type ExerciseResponse = string | string[] | Record<string, string>

export type Evaluation = { correct: boolean; expected: string }

export type ExerciseAttempt = {
  id: string
  exerciseId: string
  lessonId: string
  exerciseType: ExerciseType
  correct: boolean
  response: ExerciseResponse
  occurredAt: string
}
