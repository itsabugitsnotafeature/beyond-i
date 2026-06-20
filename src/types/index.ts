/**
 * types/index.ts -- Central TypeScript type definitions for Beyond I.
 *
 * TODO: As the app grows, this file will define all shared interfaces including:
 *   - QuizAnswer: structure for each of the 7 onboarding quiz responses
 *   - Recommendation: a single AI-generated path item (title, why, howToStart, link)
 *   - BeyondIPath: the full personalized path returned after quiz completion
 *   - Message: a single chat message in the Inner Guide conversation
 *   - UserProfile: user preferences and belief system derived from the quiz
 *
 * The Todo interface below is a placeholder from the boilerplate and will be
 * replaced by the above types as each phase is built out.
 */

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizAnswer {
  questionId: string;
  optionId: string;
  optionText: string;
}

export interface QuizState {
  currentIndex: number;
  answers: QuizAnswer[];
  isComplete: boolean;
}
