/**
 * useNavigateWithTransition.ts -- Drop-in replacement for navigation.navigate().
 * Shows the soothing GIF overlay, then navigates once the fade-in completes.
 * Usage: const go = useNavigateWithTransition(navigation);
 *        go('Quiz');
 */
import { useCallback } from 'react';
import { useTransition } from '../context/TransitionContext';

export function useNavigateWithTransition(navigation: { navigate: (screen: string) => void }) {
  const { triggerTransition } = useTransition();

  return useCallback(
    (screen: string) => {
      triggerTransition(() => navigation.navigate(screen));
    },
    [navigation, triggerTransition]
  );
}
