/**
 * TransitionOverlay.tsx -- Healing message overlay shown between screen transitions
 * and during async loading states. Types out a calming message character by character,
 * then fades out. Rendered at the root level in App.tsx above the navigation stack.
 */
import React, { useEffect, useState, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useTransition } from '../context/TransitionContext';

const TYPING_DURATION_MS = 2000;
const DOT_INTERVAL_MS = 300; // 2 extra dots × 300ms = 600ms (messages already end with a period)
const TOTAL_DOTS = 2;

export function TransitionOverlay() {
  const { opacity, currentMessage, dismissOverlay } = useTransition();
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!currentMessage) {
      setDisplayedText('');
      setShowCursor(true);
      indexRef.current = 0;
      return;
    }

    indexRef.current = 0;
    setDisplayedText('');
    setShowCursor(true);

    const charInterval = Math.max(20, Math.floor(TYPING_DURATION_MS / currentMessage.length));
    let dotInterval: ReturnType<typeof setInterval> | null = null;
    let dotCount = 0;

    const messageInterval = setInterval(() => {
      const next = indexRef.current + 1;
      setDisplayedText(currentMessage.slice(0, next));
      indexRef.current = next;

      if (next >= currentMessage.length) {
        clearInterval(messageInterval);

        // Type the 3 dots one by one
        dotInterval = setInterval(() => {
          dotCount++;
          setDisplayedText(currentMessage + '.'.repeat(dotCount));

          if (dotCount >= TOTAL_DOTS) {
            clearInterval(dotInterval!);
            // Hide cursor — user soaks it in until context dismisses
            setShowCursor(false);
          }
        }, DOT_INTERVAL_MS);
      }
    }, charInterval);

    return () => {
      clearInterval(messageInterval);
      if (dotInterval) clearInterval(dotInterval);
    };
  }, [currentMessage]);

  if (currentMessage === null) return null;

  return (
    <Animated.View style={[styles.overlay, { opacity, pointerEvents: 'none' }]}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{displayedText}</Text>
        {showCursor && <Text style={styles.cursor}>|</Text>}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    paddingHorizontal: 40,
  },
  messageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  message: {
    fontFamily: 'Georgia',
    fontSize: 22,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: 0.3,
  },
  cursor: {
    fontFamily: 'Georgia',
    fontSize: 22,
    color: '#7C6AF7',
    marginLeft: 1,
    lineHeight: 34,
  },
});
