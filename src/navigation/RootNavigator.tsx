import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EditTodoScreen, TodoListScreen } from '../screens';
import { Todo } from '../types';

export type RootStackParamList = {
  TodoList: undefined;
  EditTodo: { todo: Todo };
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="TodoList">
      <Stack.Group
        screenOptions={{ headerShown: true, headerTitle: 'My Todos' }}
      >
        <Stack.Screen name="TodoList" component={TodoListScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}
      >
        <Stack.Screen
          name="EditTodo"
          component={EditTodoScreen}
          options={{
            presentation: 'transparentModal',
            cardOverlayEnabled: true,
            cardStyleInterpolator: () => ({
              cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
            }),
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
