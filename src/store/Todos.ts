import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types';

export type TodosState = { todos: Todo[] };
const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Number(Math.random() * 10000), // Generate a random ID
        todo: action.payload,
        completed: false,
        userId: 1, // Assuming a default userId for simplicity
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: number; newTitle: string }>
    ) => {
      const { id, newTitle } = action.payload;

      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.todo = newTitle;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, editTodo, toggleTodo, removeTodo } =
  todosSlice.actions;
