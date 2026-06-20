import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Todo } from '../types';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const commitEdit = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onToggle(todo.id)} style={styles.checkbox}>
        <Text style={[styles.checkMark, todo.completed && styles.checkMarkDone]}>
          {todo.completed ? '✓' : '○'}
        </Text>
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.editInput}
          value={editText}
          onChangeText={setEditText}
          onBlur={commitEdit}
          onSubmitEditing={commitEdit}
          autoFocus
          returnKeyType="done"
        />
      ) : (
        <TouchableOpacity style={styles.textWrapper} onPress={() => !todo.completed && setIsEditing(true)}>
          <Text style={[styles.text, todo.completed && styles.textDone]}>
            {todo.text}
          </Text>
          {!todo.completed && <Text style={styles.editHint}>tap to edit</Text>}
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => onDelete(todo.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  checkbox: {
    width: 32,
    alignItems: 'center',
  },
  checkMark: {
    fontSize: 18,
    color: '#CCCCCC',
  },
  checkMarkDone: {
    color: '#FF6B35',
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },
  text: {
    fontSize: 16,
    color: '#1A1A2E',
    fontWeight: '500',
  },
  textDone: {
    color: '#AAAAAA',
    textDecorationLine: 'line-through',
  },
  editHint: {
    fontSize: 10,
    color: '#CCCCCC',
    marginTop: 2,
  },
  editInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A2E',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B35',
  },
  deleteButton: {
    paddingHorizontal: 8,
  },
  deleteText: {
    fontSize: 14,
    color: '#DDDDDD',
    fontWeight: '600',
  },
});
