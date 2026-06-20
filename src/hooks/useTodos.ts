/**
 * useTodos.ts -- Boilerplate hook retained as a structural reference.
 *
 * TODO: This file demonstrates the custom hook pattern used throughout Beyond I.
 * It will be replaced or joined by domain-specific hooks as each phase is built:
 *   - useQuiz: manages quiz state, current question index, and collected answers
 *   - usePath: fetches and stores the AI-generated Beyond I Path
 *   - useGuide: manages the Inner Guide conversation history and streaming state
 */
import { useState } from 'react';
import { Todo } from '../types';

const INITIAL_TODOS: Todo[] = [
  { id: '1', text: 'Apples', completed: false },
  { id: '2', text: 'Bananas', completed: false },
  { id: '3', text: 'Milk', completed: true },
  { id: '4', text: 'Avocados', completed: false },
  { id: '5', text: 'Coffee', completed: false },
];

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(INITIAL_TODOS);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), text: trimmed, completed: false },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const editTodo = (id: string, newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed) return;
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, text: trimmed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return { todos, addTodo, toggleTodo, editTodo, deleteTodo };
}
