import type {
  Evaluation,
  Exercise,
  ExerciseResponse,
} from '../../types/exercises'

export const normalizeAnswer = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase('it')
    .replace(/[.!?]+$/g, '')
    .replace(/\s+/g, ' ')

export function evaluateExercise(
  exercise: Exercise,
  response: ExerciseResponse,
): Evaluation {
  if (exercise.type === 'multiple-choice')
    return {
      correct: response === exercise.answer,
      expected:
        exercise.options.find((option) => option.id === exercise.answer)
          ?.text ?? exercise.answer,
    }
  if (exercise.type === 'sentence-order') {
    const chosen = Array.isArray(response) ? response : []
    return {
      correct: chosen.join('|') === exercise.answer.join('|'),
      expected: exercise.answer
        .map((id) => exercise.tokens.find((token) => token.id === id)?.text)
        .join(' '),
    }
  }
  if (exercise.type === 'matching') {
    const chosen =
      typeof response === 'object' && !Array.isArray(response) ? response : {}
    return {
      correct: Object.entries(exercise.answer).every(
        ([left, right]) => chosen[left] === right,
      ),
      expected: exercise.pairs
        .map((pair) => `${pair.left} → ${pair.right}`)
        .join('; '),
    }
  }
  const value = typeof response === 'string' ? normalizeAnswer(response) : ''
  const accepted = exercise.acceptedAnswers.map(normalizeAnswer)
  return { correct: accepted.includes(value), expected: exercise.answer }
}

export function hasResponse(exercise: Exercise, response: ExerciseResponse) {
  if (exercise.type === 'sentence-order')
    return Array.isArray(response) && response.length === exercise.tokens.length
  if (exercise.type === 'matching')
    return (
      !Array.isArray(response) &&
      typeof response === 'object' &&
      Object.keys(response).length === exercise.pairs.length
    )
  return typeof response === 'string' && response.trim().length > 0
}
