import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Todo } from '../types';
import { getNetworkStateAsync } from 'expo-network';
import { addToQueue } from '../store/OperationQueue';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com/',
  }),
  tagTypes: ['Todo'],
  endpoints: (build) => ({
    getAllTodos: build.query<Todo[], void>({
      query: () => 'todos/',
      keepUnusedDataFor: Infinity,
      transformResponse: (response: { todos: Todo[] }) => {
        return response.todos;
      },
      providesTags: ['Todo'],
    }),
    getTodoById: build.query<Todo, number>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'GET',
      }),
    }),
    addTodo: build.mutation<Todo, string>({
      query: (todo) => ({
        url: 'todos/add',
        method: 'POST',
        body: {
          todo: todo,
          completed: false,
          userId: '1',
        },
      }),
      async onQueryStarted(todo, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const optimisticTodo = {
          todo: todo,
          userId: 1,
          completed: false,
          id: Math.floor(Math.random() * 10000),
        };
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getAllTodos', undefined, (draft) => {
            draft.splice(2, 0, optimisticTodo);
          })
        );

        const patchResultId = dispatch(
          todoApi.util.updateQueryData(
            'getTodoById',
            optimisticTodo.id,
            (draft) => {
              Object.assign(draft, optimisticTodo);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          const networkState = await getNetworkStateAsync();
          if (networkState.isConnected)
            // If the mutation fails online, undo the optimistic update
            patchResult.undo();
          else {
            const timestampString = new Date().getTime();
            dispatch(
              addToQueue({
                id: `ADD_TODO_${optimisticTodo.id}_${timestampString}`,
                data: optimisticTodo,
                type: 'ADD',
                timestamp: timestampString,
              })
            );
          }
        }
      },
    }),
    toggleTodo: build.mutation<Todo, { id: number; newValue: boolean }>({
      query: ({ id, newValue }) => ({
        url: `todos/${id}`,
        method: 'PATCH',
        body: { completed: newValue },
      }),
    }),
    updateTodo: build.mutation<Todo, Todo>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'PUT',
        body: todo, // Send the whole todo object as the body
      }),
      async onQueryStarted(todo, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResultAll = dispatch(
          todoApi.util.updateQueryData('getAllTodos', undefined, (draft) => {
            const index = draft.findIndex((t) => t.id === todo.id);
            if (index !== -1) {
              draft[index] = todo;
            }
          })
        );
        const patchResultId = dispatch(
          todoApi.util.updateQueryData('getTodoById', todo.id, (draft) => {
            Object.assign(draft, todo);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          const networkState = await getNetworkStateAsync();
          if (networkState.isConnected) {
            // If the mutation fails while online, undo the optimistic update
            patchResultAll.undo();
            patchResultId.undo();
          } else {
            const timestampString = new Date().getTime();
            dispatch(
              addToQueue({
                id: `UPDATE_TODO_${todo.id}_${timestampString}`,
                data: todo,
                type: 'UPDATE',
                timestamp: timestampString,
              })
            );
          }
        }
      },
    }),
    deleteTodo: build.mutation<void, Todo>({
      query: (todo) => ({
        url: `todos/${todo.id}`,
        method: 'DELETE',
        todo,
      }),
      async onQueryStarted(todo, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todoApi.util.updateQueryData('getAllTodos', undefined, (draft) => {
            const index = draft.findIndex((t) => t.id === todo.id);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          const networkState = await getNetworkStateAsync();
          if (networkState.isConnected) {
            // If the mutation fails while online, undo the optimistic update
            // patchResult.undo();
          } else {
            const timestampString = new Date().getTime();
            dispatch(
              addToQueue({
                id: `DELETE_TODO_${todo.id}_${timestampString}`,
                data: todo,
                type: 'DELETE',
                timestamp: timestampString,
              })
            );
          }
        }
      },
    }),
  }),
});

export const {
  useGetAllTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
} = todoApi;
