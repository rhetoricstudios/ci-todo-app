export type Todo = {
  id: number; // Unique identifier for the todo item
  todo: string; // The text value of the todo item
  completed: boolean; // Indicates whether the todo item is completed or not
  userId: number; // The ID of the user who created the todo item
};
