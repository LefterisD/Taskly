import { AxiosResponse } from 'axios';
import { instance } from '..';
import { QueryKey } from '@tanstack/react-query';
import { Todo } from '../../components/TodoInput';

export type DeletePayload = {
  id: number;
};

export type EditPayload = {
  data: {
    todo: Todo;
  };
};

export const getTodos = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key] = queryKey;

  const response: AxiosResponse = await instance.get(`api/todos`);

  return response.data;
};

export const getStats = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key] = queryKey;

  const response: AxiosResponse = await instance.get(`api/todos/stats`);

  return response.data;
};

export const deleteTodo = async (payload: DeletePayload) => {
  const response: AxiosResponse = await instance.delete(
    `api/todos/${payload.id}`
  );

  return response.data;
};

export const editTodo = async (payload: EditPayload) => {
  const { id, ...todoWithoutId } = payload.data.todo;

  const response: AxiosResponse = await instance.put(
    `api/todos/${id}`,
    todoWithoutId
  );

  return response.data;
};
