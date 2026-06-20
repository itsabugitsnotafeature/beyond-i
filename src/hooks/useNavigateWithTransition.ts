/**
 * useNavigateWithTransition.ts -- Drop-in replacement for navigation.navigate().
 * Shows the healing message overlay, then navigates once the fade-in completes.
 * Usage: const go = useNavigateWithTransition(navigation);
 *        go('Quiz');
 *        go('PathReveal', { answers });
 */
import { useCallback } from 'react';
import { useTransition } from '../context/TransitionContext';

export function useNavigateWithTransition(navigation: { navigate: (screen: string, params?: Record<string, unknown>) => void }) {
  const { triggerTransition } = useTransition();

  return useCallback(
    (screen: string, params?: Record<string, unknown>) => {
      triggerTransition(() => navigation.navigate(screen, params));
    },
    [navigation, triggerTransition]
  );
}
