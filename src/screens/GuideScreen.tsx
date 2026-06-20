import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function GuideScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>PHASE 5 — GUIDE</Text>
      <Text style={styles.title}>The Inner Guide</Text>
      <Text style={styles.subtitle}>
        AI chat companion will live here.
      </Text>
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
  },
});
