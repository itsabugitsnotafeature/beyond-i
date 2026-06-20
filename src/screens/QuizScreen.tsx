/**
 * QuizScreen.tsx -- Phase 2 (ROOTS): The onboarding quiz.
 * Presents 7 thoughtful questions one at a time. Answers are collected by
 * useQuiz and passed to OpenAI in Phase 3 to generate a personalized path.
 */
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';
import { useQuiz } from '../hooks/useQuiz';
import { CircularProgress } from '../components/CircularProgress';
import { QuizOption } from '../components/QuizOption';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Quiz'>;
};

export function QuizScreen({ navigation }: Props) {
  const go = useNavigateWithTransition(navigation);
  const { currentQuestion, currentIndex, currentAnswer, total, isComplete, selectAnswer, goNext, goBack } = useQuiz();

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const animateTransition = (callback: () => void) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(callback, 150);
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    if (isComplete || currentIndex === total - 1) {
      go('PathReveal');
      return;
    }
    animateTransition(goNext);
  };

  const handleBack = () => {
    if (currentIndex === 0) return;
    animateTransition(goBack);
  };

  const isLast = currentIndex === total - 1;
  const canProceed = !!currentAnswer;

  return (
    <View style={styles.container}>
      <View style={styles.webCard}>
      {/* Header */}
      <View style={styles.header}>
        {currentIndex > 0 ? (
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backPlaceholder} />
        )}
        <CircularProgress current={currentIndex + 1} total={total} size={56} strokeWidth={3} />
        <View style={styles.backPlaceholder} />
      </View>

      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.stepLabel}>Question {currentIndex + 1} of {total}</Text>
          <Text style={styles.question}>{currentQuestion.question}</Text>

          {/* Options */}
          <View style={styles.options}>
            {currentQuestion.options.map(option => (
              <QuizOption
                key={option.id}
                text={option.text}
                selected={currentAnswer?.optionId === option.id}
                onPress={() => selectAnswer(option.id, option.text)}
              />
            ))}
          </View>
        </Animated.View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !canProceed && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!canProceed}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {isLast ? 'See my path →' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    justifyContent: Platform.OS === 'web' ? 'center' : 'flex-start',
  },
  webCard: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 560 : undefined,
    alignSelf: Platform.OS === 'web' ? 'center' : 'stretch',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
  },
  backButton: {
    width: 80,
  },
  backText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 15,
  },
  backPlaceholder: {
    width: 80,
  },
  body: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  stepLabel: {
    fontSize: 11,
    color: '#7C6AF7',
    letterSpacing: 2,
    marginBottom: 16,
    textAlign: 'center',
  },
  question: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 36,
  },
  options: {
    width: '100%',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 48,
    paddingTop: 12,
  },
  nextButton: {
    backgroundColor: '#7C6AF7',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: 'rgba(124,106,247,0.3)',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
