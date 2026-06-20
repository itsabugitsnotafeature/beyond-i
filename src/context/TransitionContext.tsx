/**
 * TransitionContext.tsx -- Global controller for the between-screen healing message overlay.
 * Wrap the app in TransitionProvider and call triggerTransition(onNavigate) from
 * any screen to show a typed calming message before the next screen appears.
 * Also used as the universal async loading pattern throughout the app.
 */
import React, { createContext, useContext, useRef, useState, useCallback } from 'react';
import { Animated, Platform } from 'react-native';
import { getRandomHealingMessage } from '../data/healingMessages';

type TransitionContextValue = {
  triggerTransition: (onNavigate: () => void) => void;
  dismissOverlay: () => void;
  opacity: Animated.Value;
  currentMessage: string | null;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const isAnimating = useRef(false);

  const dismissOverlay = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => {
      setCurrentMessage(null);
    });
  }, [opacity]);

  const triggerTransition = useCallback((onNavigate: () => void) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setCurrentMessage(getRandomHealingMessage());

    Animated.timing(opacity, {
      toValue: 1,
      duration: 800,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => {
      onNavigate();
      isAnimating.current = false; // release lock so next screen can trigger a transition
      setTimeout(dismissOverlay, 4600);
    });
  }, [opacity, dismissOverlay]);

  return (
    <TransitionContext.Provider value={{ triggerTransition, dismissOverlay, opacity, currentMessage }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error('useTransition must be used within TransitionProvider');
  return ctx;
}
