/**
 * PathRevealScreen.tsx -- Phase 3 (MIRROR): AI-generated path reveal.
 * Receives quiz answers, calls OpenAI, and displays the personalized
 * Beyond I Path with summary + 3 modality cards. Loading states cycle
 * through calming messages while the API resolves.
 */
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';
import { generatePath } from '../services/ai';
import { BeyondIPath, PathItem } from '../types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PathReveal'>;
  route: RouteProp<RootStackParamList, 'PathReveal'>;
};

const LOADING_MESSAGES = [
  'Reading your answers...',
  'Finding your path...',
  'Sitting with what you shared...',
  'Almost there...',
  'Taking a breath with you...',
];

const CATEGORY_COLORS: Record<string, string> = {
  Stillness:   '#7C6AF7',
  Movement:    '#06D6A0',
  Expression:  '#FFD166',
  Connection:  '#EF476F',
  Reflection:  '#118AB2',
};

function PathCard({ item, index }: { item: PathItem; index: number }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      delay: index * 200,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [fadeAnim, index]);

  const categoryColor = CATEGORY_COLORS[item.category] ?? '#7C6AF7';

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardName}>{item.name}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: categoryColor + '28' }]}>
          <Text style={[styles.categoryText, { color: categoryColor }]}>{item.category.toUpperCase()}</Text>
        </View>
      </View>
      <Text style={styles.cardWhy}>{item.why}</Text>
      <View style={styles.startRow}>
        <Text style={styles.startLabel}>Start here  </Text>
        <Text style={styles.startText}>{item.howToStart}</Text>
      </View>
    </Animated.View>
  );
}

export function PathRevealScreen({ navigation, route }: Props) {
  const go = useNavigateWithTransition(navigation);
  const { answers } = route.params;

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [beyondIPath, setBeyondIPath] = useState<BeyondIPath | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingStep(s => (s + 1) % LOADING_MESSAGES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    generatePath(answers)
      .then(result => {
        setBeyondIPath(result);
        setStatus('success');
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: Platform.OS !== 'web',
        }).start();
      })
      .catch(err => {
        setErrorMsg(err.message ?? 'Something went wrong.');
        setStatus('error');
      });
  }, []);

  if (status === 'loading') {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingMessage}>{LOADING_MESSAGES[loadingStep]}</Text>
        <Text style={styles.loadingDots}>· · ·</Text>
      </View>
    );
  }

  if (status === 'error') {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Something went quiet.</Text>
        <Text style={styles.errorSub}>{errorMsg}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => {
          setStatus('loading');
          setLoadingStep(0);
          generatePath(answers)
            .then(result => { setBeyondIPath(result); setStatus('success'); })
            .catch(err => { setErrorMsg(err.message); setStatus('error'); });
        }}>
          <Text style={styles.retryText}>Try again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View style={[styles.webCard, { opacity: fadeAnim }]}>
        <Text style={styles.eyebrow}>YOUR BEYOND I PATH</Text>
        <Text style={styles.summary}>{beyondIPath!.summary}</Text>

        <View style={styles.cards}>
          {beyondIPath!.path.map((item, i) => (
            <PathCard key={item.name} item={item} index={i} />
          ))}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => go('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.continueText}>Explore your path →</Text>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  content: {
    alignItems: Platform.OS === 'web' ? 'center' : 'stretch',
    paddingVertical: 60,
    paddingHorizontal: 24,
  },
  webCard: {
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 560 : undefined,
  },
  center: {
    flex: 1,
    backgroundColor: '#1A1A2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  loadingMessage: {
    fontFamily: 'Georgia',
    fontSize: 20,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginBottom: 16,
  },
  loadingDots: {
    fontSize: 24,
    color: '#7C6AF7',
    letterSpacing: 6,
  },
  errorText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  errorSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 32,
  },
  retryButton: {
    backgroundColor: '#7C6AF7',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  eyebrow: {
    fontSize: 11,
    color: '#7C6AF7',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 20,
  },
  summary: {
    fontFamily: 'Georgia',
    fontSize: 18,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 36,
  },
  cards: {
    gap: 16,
    marginBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  cardName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardWhy: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 22,
    marginBottom: 14,
  },
  startRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  startLabel: {
    fontSize: 13,
    color: '#7C6AF7',
    fontWeight: '700',
  },
  startText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 20,
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#7C6AF7',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
