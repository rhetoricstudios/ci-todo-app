import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'expo-checkbox';
import {
  useToggleTodoMutation,
  useDeleteTodoMutation,
} from '../api/rtkTodoApi';
import { Button } from './Button';
import { colors } from '../constants';
import { Todo } from '../types';

interface TodoProps {
  item: Todo;
}

export const TodoItem: React.FC<TodoProps> = ({ item: todo }) => {
  const { navigate } = useNavigation();
  const [isChecked, setIsChecked] = useState(todo.completed);

  const [toggleTodo] = useToggleTodoMutation();
  const [deleteTodo, { isLoading: deletIsLoading, error: deleteError }] =
    useDeleteTodoMutation();

  const handleCheckboxChange = (newValue: boolean) => {
    setIsChecked(newValue);
    toggleTodo({ id: todo.id, newValue: newValue });
  };

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: colors.background, borderColor: colors.border },
      ]}
      onPress={() => navigate('EditTodo', { todo: todo })}
    >
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        hitSlop={8}
        onValueChange={handleCheckboxChange}
        color={isChecked ? colors.primary : undefined}
      />
      <View style={{ flex: 1 }}>
        <Text style={[styles.label, { color: colors.text }]}>{todo?.todo}</Text>
      </View>
      <Button
        iconName={'trash-bin-outline'}
        onPress={async () => {
          await deleteTodo(todo);
          if (deleteError) console.log(deleteError);
        }}
        loading={deletIsLoading}
        style={{ backgroundColor: colors.secondary }}
        textStyle={{ color: colors.textLight }}
      />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    padding: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
  checkbox: {
    minHeight: 44,
    minWidth: 44,
  },
  input: {
    height: 44,
    borderRadius: 4,
    borderWidth: 1,
    width: '100%',
    padding: 4,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    margin: 8,
  },
});
