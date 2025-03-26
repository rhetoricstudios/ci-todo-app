import React from 'react';
import { View } from 'react-native';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { FilterProvider } from '../hooks/useFilterContext';
import { TodoList, FilterSelector, AddTodo } from '../components';

export const TodoListScreen: React.FC = () => {
  // useOfflineSync(); // Add this hook

  return (
    <View style={{ flex: 1 }}>
      <FilterProvider>
        <View style={{ flex: 16 }}>
          <FilterSelector />
          <TodoList />
        </View>
      </FilterProvider>
      <AddTodo />
    </View>
  );
};
