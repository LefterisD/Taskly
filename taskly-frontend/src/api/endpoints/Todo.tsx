import { AxiosResponse } from 'axios';
import { instance } from '..';
import { QueryKey } from '@tanstack/react-query';

export type DeletePayload = {
  id: number;
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
