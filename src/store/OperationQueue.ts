import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types';

export type QueuedOperation = {
  id: string;
  type: 'ADD' | 'UPDATE' | 'DELETE';
  data: Partial<Todo>;
  timestamp: number;
};

type QueueState = {
  operations: QueuedOperation[];
};

const initialState: QueueState = {
  operations: [],
};

export const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    addToQueue: (state, action: PayloadAction<QueuedOperation>) => {
      console.log('Adding to queue: ' + action.payload.type);
      state.operations.push(action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<string>) => {
      state.operations = state.operations.filter(
        (op) => op.id !== action.payload
      );
    },
    clearQueue: (state) => {
      state.operations = [];
    },
  },
});

export const { addToQueue, removeFromQueue, clearQueue } = queueSlice.actions;
export default queueSlice.reducer;
