import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNetworkState } from 'expo-network';
import { RootState } from '../store';
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '../api/rtkTodoApi';
import { removeFromQueue } from '../store/OperationQueue';
import { Todo } from '../types';

export const useOfflineSync = () => {
  const dispatch = useDispatch();
  const { isConnected } = useNetworkState();
  const queuedOperations = useSelector(
    (state: RootState) => state.queue.operations
  );
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [addTodo] = useAddTodoMutation();

  useEffect(() => {
    if (isConnected && queuedOperations.length > 0) {
      // Process queued operations in order
      queuedOperations.forEach(async (operation) => {
        try {
          switch (operation.type) {
            case 'ADD':
              if (operation.data.todo) {
                await addTodo(operation.data.todo);
              }
              break;

            case 'UPDATE':
              if (operation.data.id) {
                await updateTodo(operation.data as Todo);
              }
              break;
            case 'DELETE':
              if (operation.data.id) {
                await deleteTodo(operation.data as Todo);
              }
              break;
          }
          // Remove from queue after successful processing
          dispatch(removeFromQueue(operation.id));
        } catch (error) {
          console.error('Failed to process queued operation:', error);
        }
      });
    }
  }, [isConnected, queuedOperations]);
};
