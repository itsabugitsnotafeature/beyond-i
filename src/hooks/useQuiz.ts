/**
 * useQuiz.ts -- State management for the onboarding quiz.
 * Tracks current question index, collected answers, and completion state.
 * Phase 3 reads the answers array to build the OpenAI prompt.
 */
import { useState, useCallback } from 'react';
import { QuizAnswer } from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  const total = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const currentAnswer = answers.find(a => a.questionId === currentQuestion.id) ?? null;
  const isComplete = answers.length === total;

  const selectAnswer = useCallback((optionId: string, optionText: string) => {
    setAnswers(prev => {
      const without = prev.filter(a => a.questionId !== currentQuestion.id);
      return [...without, { questionId: currentQuestion.id, optionId, optionText }];
    });
  }, [currentQuestion.id]);

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) setCurrentIndex(i => i + 1);
  }, [currentIndex, total]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  }, [currentIndex]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
  }, []);

  return {
    currentQuestion,
    currentIndex,
    currentAnswer,
    total,
    answers,
    isComplete,
    selectAnswer,
    goNext,
    goBack,
    reset,
  };
}
