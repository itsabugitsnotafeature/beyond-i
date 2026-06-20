/**
 * CircularProgress.tsx -- Arc-style step indicator for the onboarding quiz.
 * Fills clockwise from 0 to 100% as the user moves through questions.
 * Phase 2 will wire current/total to live quiz state via useQuiz.
 * Web falls back to a styled text badge since SVG native drivers differ.
 */
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

interface Props {
  current: number;
  total: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({ current, total, size = 72, strokeWidth = 4 }: Props) {
  if (Platform.OS === 'web') {
    const progress = Math.min(current / total, 1);
    return (
      <View style={[styles.wrapper, {
        width: size,
        height: size,
        borderRadius: size / 2,
        // @ts-ignore - conic-gradient is web-only CSS
        background: `conic-gradient(#7C6AF7 ${Math.round(progress * 100)}%, rgba(255,255,255,0.12) 0%)`,
        alignItems: 'center',
        justifyContent: 'center',
      }]}>
        <View style={{
          width: size - strokeWidth * 2 - 4,
          height: size - strokeWidth * 2 - 4,
          borderRadius: (size - strokeWidth * 2 - 4) / 2,
          backgroundColor: '#1A1A2E',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={styles.webText}>{current}/{total}</Text>
        </View>
      </View>
    );
  }

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(current / total, 1);
  const strokeDashoffset = circumference * (1 - progress);
  const center = size / 2;

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#7C6AF7"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation={-90}
          origin={`${center}, ${center}`}
        />
        <SvgText
          x={center}
          y={center + 5}
          textAnchor="middle"
          fill="rgba(255,255,255,0.85)"
          fontSize={13}
          fontWeight="600"
        >
          {current}/{total}
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  webBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: '#7C6AF7',
    backgroundColor: 'rgba(124,106,247,0.1)',
  },
  webText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
});
