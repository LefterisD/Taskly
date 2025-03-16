import { useQuery } from '@tanstack/react-query';
import { getStats, getTodos } from '../endpoints/Todo';

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useGetTodosStats = () => {
  return useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
