import { AxiosResponse } from 'axios';
import { instance } from '..';
import { QueryKey } from '@tanstack/react-query';

export const getTodos = async ({ queryKey }: { queryKey: QueryKey }) => {
  const [_key] = queryKey;

  const response: AxiosResponse = await instance.get(`api/todos`);

  return response.data;
};
