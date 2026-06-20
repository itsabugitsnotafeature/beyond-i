/**
 * QuizOption.tsx -- Single selectable answer card in the onboarding quiz.
 * Selected state highlights in purple with a checkmark. Accessible tap target.
 */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

interface Props {
  text: string;
  selected: boolean;
  onPress: () => void;
}

export function QuizOption({ text, selected, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, selected && styles.cardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{text}</Text>
      {selected && <Text style={styles.check}>✓</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 12,
  },
  cardSelected: {
    backgroundColor: 'rgba(124,106,247,0.18)',
    borderColor: '#7C6AF7',
  },
  text: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.75)',
    flex: 1,
    lineHeight: 22,
  },
  textSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  check: {
    fontSize: 16,
    color: '#7C6AF7',
    marginLeft: 12,
    fontWeight: '700',
  },
});
