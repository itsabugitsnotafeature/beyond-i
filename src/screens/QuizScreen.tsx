/**
 * QuizScreen.tsx -- Phase 2 (ROOTS): The onboarding quiz.
 * Presents 7 thoughtful questions one screen at a time to understand the user's
 * belief system, emotional state, and preferences. Answers are passed to the
 * AI path generation step on completion.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';
import { CircularProgress } from '../components/CircularProgress';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Quiz'>;
};

export function QuizScreen({ navigation }: Props) {
  const go = useNavigateWithTransition(navigation);

  return (
    <View style={styles.container}>
      {/* Phase 2 will replace current/total with live state from useQuiz */}
      <CircularProgress current={1} total={7} size={80} />
      <Text style={styles.label}>PHASE 2 — ROOTS</Text>
      <Text style={styles.title}>Quiz</Text>
      <Text style={styles.subtitle}>The onboarding quiz will live here.</Text>
      <TouchableOpacity style={styles.button} onPress={() => go('PathReveal')}>
        <Text style={styles.buttonText}>Continue →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  label: {
    fontSize: 11,
    color: '#7C6AF7',
    letterSpacing: 2,
    marginTop: 24,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 60,
  },
  button: {
    backgroundColor: '#7C6AF7',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
