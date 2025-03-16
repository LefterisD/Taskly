import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../endpoints/Todo';

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
