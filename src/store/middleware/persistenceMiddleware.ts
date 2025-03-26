import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { todoApi } from '../../api/rtkTodoApi';
import { saveData, loadData } from '../../storage';
import { RootState } from '../';

export const CACHE_KEY = 'rtk-cache';

export const persistenceMiddleware = createListenerMiddleware();

persistenceMiddleware.startListening({
  matcher: isAnyOf(
    todoApi.endpoints.getAllTodos.matchFulfilled,
    todoApi.endpoints.addTodo.matchFulfilled,
    todoApi.endpoints.toggleTodo.matchFulfilled,
    todoApi.endpoints.updateTodo.matchFulfilled,
    todoApi.endpoints.deleteTodo.matchFulfilled
  ),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    await saveData(CACHE_KEY, JSON.stringify(state));
  },
});

// Function to initialize cache from storage
export const initializeCache = async () => {
  const cache = await loadData(CACHE_KEY);
  return cache;
};
