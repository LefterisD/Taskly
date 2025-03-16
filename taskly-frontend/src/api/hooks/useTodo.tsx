import { useMutation, useQuery } from '@tanstack/react-query';
import {
  DeletePayload,
  deleteTodo,
  EditPayload,
  editTodo,
  getStats,
  getTodos,
} from '../endpoints/Todo';
import { useState } from 'react';

type DeleteResult = {
  status: string;
};

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

export const useDeleteTodo = () => {
  const [deleteResult, setDeleteResult] = useState<DeleteResult | null>(null);

  const mutation = useMutation({
    mutationFn: (payload: DeletePayload) => deleteTodo(payload),
    onSuccess: () => {
      setDeleteResult({ status: 'ok' });
    },
    onError: () => {
      setDeleteResult({ status: 'error' });
    },
  });

  return { ...mutation, deleteResult };
};

export const useEditTodo = () => {
  const [editResult, setEditResult] = useState<DeleteResult | null>(null);

  const mutation = useMutation({
    mutationFn: (payload: EditPayload) => editTodo(payload),
    onSuccess: () => {
      setEditResult({ status: 'ok' });
    },
    onError: () => {
      setEditResult({ status: 'error' });
    },
  });

  return { ...mutation, editResult };
};
