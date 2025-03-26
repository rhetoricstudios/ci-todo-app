import { configureStore } from '@reduxjs/toolkit';
import { todoApi } from '../api/rtkTodoApi';
import {
  persistenceMiddleware,
  CACHE_KEY,
} from './middleware/persistenceMiddleware';
import operationQueueReducer from './OperationQueue';
import { loadData, removeData } from '../storage';

const createStore = async () => {
  console.log('Starting store creation...');

  try {
    // Try to load cached state
    console.log('Loading cached state...');
    const cachedStateString = await loadData(CACHE_KEY);
    const cachedState = cachedStateString
      ? JSON.parse(cachedStateString)
      : null;
    console.log('Cached state loaded:', cachedState ? 'found' : 'not found');
    console.log(cachedState);

    const store = configureStore({
      reducer: {
        [todoApi.reducerPath]: todoApi.reducer,
        queue: operationQueueReducer,
      },
      preloadedState: cachedState
        ? {
            [todoApi.reducerPath]: cachedState.todoApi,
            queue: cachedState.queue,
          }
        : undefined,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .prepend(persistenceMiddleware.middleware)
          .concat(todoApi.middleware),
    });

    console.log('Store created successfully');
    return store;
  } catch (error) {
    console.error('Error creating store:', error);
    throw error;
  }
};

let store: Awaited<ReturnType<typeof createStore>> | null = null;

export const initializeStore = async () => {
  try {
    console.log('Initializing store...');
    store = await createStore();
    console.log('Store initialized successfully');
    return store;
  } catch (error) {
    console.error('Store initialization failed:', error);
    throw error;
  }
};

export const getStore = () => {
  if (!store) {
    throw new Error('Store not initialized');
  }
  return store;
};

export type StoreType = Awaited<ReturnType<typeof createStore>>;
export type RootState = ReturnType<StoreType['getState']>;
export type AppDispatch = StoreType['dispatch'];

export default getStore;
