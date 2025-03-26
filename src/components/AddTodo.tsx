import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button } from './Button';
import { colors } from '../constants';
import { useAddTodoMutation } from '../api/rtkTodoApi';

export const AddTodo: React.FC = () => {
  const [addTodo, { isLoading, isSuccess, isError }] = useAddTodoMutation();
  const [inputValue, setInputValue] = useState('');

  const handleAddTodo = async () => {
    await addTodo(inputValue);
    setInputValue('');
  };

  return (
    <View style={[styles.container, { borderTopColor: colors.border }]}>
      <TextInput
        style={[styles.input, { borderColor: colors.border }]}
        placeholder="Enter todo"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button
        title="Add"
        onPress={handleAddTodo}
        loading={isLoading}
        style={styles.addButton}
        textStyle={{ color: colors.textLight }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    flex: 1,
    minHeight: 44,
    padding: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
  },
  input: {
    height: 44,
    borderRadius: 4,
    borderWidth: 1,
    flex: 3,
  },
});
