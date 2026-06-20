/**
 * HomeScreen.tsx -- Phase 4 (LIGHT): The user's personal Beyond I dashboard.
 * Displays the AI-generated path as a set of recommendation cards. Each card
 * shows what a modality is, why it fits this user, and how to get started.
 * This is the screen users return to as their anchor point in the app.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useNavigateWithTransition } from '../hooks/useNavigateWithTransition';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export function HomeScreen({ navigation }: Props) {
  const go = useNavigateWithTransition(navigation);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>PHASE 4 — LIGHT</Text>
      <Text style={styles.title}>Your Beyond I Path</Text>
      <Text style={styles.subtitle}>
        Recommendation cards will live here.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => go('Guide')}>
        <Text style={styles.buttonText}>Talk to your Guide →</Text>
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
