import React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNetworkState } from 'expo-network';

import { useGetAllTodosQuery } from '../api/rtkTodoApi';
import { colors } from '../constants';
import { useFilterContext } from '../hooks/useFilterContext';
import { TodoItem } from './TodoItem';
import { Todo } from '../types';
import { useOfflineSync } from '../hooks/useOfflineSync';

export const TodoList: React.FC = () => {
  useOfflineSync();
  const { data: todos = [], isLoading, error, refetch } = useGetAllTodosQuery();
  const { isConnected } = useNetworkState();
  const { selectedFilter } = useFilterContext();

  if (isLoading || !todos || error)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {isLoading && (
          <ActivityIndicator color={colors.secondary} size={'large'} />
        )}
        {error && !todos && (
          <>
            <Text>Error! Could not retrieve todos.</Text>
            <Button onPress={refetch} title="Retry" />
          </>
        )}
      </View>
    );

  const renderItem = ({ item }: { item: Todo }) => {
    return <TodoItem item={item} />;
  };

  return (
    <FlatList
      data={todos?.filter((todo) => {
        if (selectedFilter === 'active') return !todo.completed;
        if (selectedFilter === 'completed') return todo.completed;
        return true; // 'all'
      })}
      renderItem={renderItem}
      keyExtractor={(item, index) => `todo-${item.id}-${index}`}
      style={styles.list}
      extraData={[todos, selectedFilter]}
      contentContainerStyle={styles.listContent}
      refreshing={isLoading}
      onRefresh={() => {
        if (isConnected) refetch();
      }}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
    padding: 16,
    flex: 1,
  },
  listContent: {
    gap: 8,
    paddingBottom: 20,
  },
  todoItem: {
    padding: 16,
    borderBottomWidth: 1,
  },
  todoTitle: {
    fontSize: 18,
  },
  todoStatus: {
    fontSize: 14,
  },
});
