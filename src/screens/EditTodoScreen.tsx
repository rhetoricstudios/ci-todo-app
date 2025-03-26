import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUpdateTodoMutation } from '../api/rtkTodoApi';
import { Button } from '../components/Button';
import { colors } from '../constants/colors';
import { Todo } from '../types';

export const EditTodoScreen: React.FC = () => {
  const navigate = useNavigation();
  const { params } = useRoute();
  const [editTodo] = useUpdateTodoMutation();

  const { todo } = params as { todo: Todo };
  const [text, setText] = useState(todo.todo);

  const goBack = () => navigate.canGoBack() && navigate.goBack();

  const handleSave = () => {
    editTodo({ ...todo, todo: text });
    goBack();
  };

  return (
    <View style={styles.centeredView}>
      <View style={[styles.modalView, { backgroundColor: colors.background }]}>
        <Text style={styles.modalText}>Edit Todo</Text>
        <TextInput
          style={[styles.input, { borderColor: colors.border }]}
          value={text}
          onChangeText={setText}
        />

        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            style={{ backgroundColor: colors.secondary }}
            onPress={goBack}
          />
          <Button title="Save" onPress={handleSave} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    gap: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
  },
  modalText: {
    textAlign: 'center',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
