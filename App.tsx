import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useTodos } from './src/hooks/useTodos';
import { TodoItem } from './src/components/TodoItem';

const PLATFORM_LABEL: Record<string, string> = {
  ios: '🍎  iOS',
  android: '🤖  Android',
  web: '🌐  Web',
};

export default function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodos();
  const [inputText, setInputText] = useState('');

  const trimmedInput = inputText.trim();

  const handleAdd = () => {
    if (!trimmedInput) return;
    addTodo(trimmedInput);
    setInputText('');
  };

  const completed = todos.filter(t => t.completed).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Project Yatagarasu</Text>
              <Text style={styles.headerSubtitle}>One codebase. Three platforms.</Text>
            </View>
            <View style={styles.platformBadge}>
              <Text style={styles.platformText}>
                {PLATFORM_LABEL[Platform.OS] ?? Platform.OS}
              </Text>
            </View>
          </View>

          {/* App Title */}
          <View style={styles.titleBlock}>
            <Text style={styles.appTitle}>HelloFullStack</Text>
            <Text style={styles.appSubtitle}>
              {completed}/{todos.length} done
            </Text>
          </View>

          {/* Add Input */}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Add an item..."
              placeholderTextColor="#AAAAAA"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleAdd}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={[styles.addButton, !trimmedInput && styles.addButtonDisabled]}
              onPress={handleAdd}
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* List */}
          <FlatList
            data={todos}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={deleteTodo}
              />
            )}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>Nothing here. Add something above!</Text>
            }
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: {
    flex: 1,
    backgroundColor: '#FF6B35',
  },
  header: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  platformBadge: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  platformText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  titleBlock: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  appSubtitle: {
    fontSize: 13,
    color: '#999999',
    marginTop: 2,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#F8F9FA',
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A1A2E',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#DDDDDD',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 28,
  },
  list: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 40,
  },
  emptyText: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginTop: 60,
    fontSize: 15,
  },
});
