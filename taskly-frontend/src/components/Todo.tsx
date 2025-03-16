import { motion, AnimatePresence } from 'framer-motion';
import { Todo as TodoType } from './TodoInput';
import {
  Box,
  Card,
  IconButton,
  lighten,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import AnimateX from './animations/AnimateX';
import { useDeleteTodo, useEditTodo } from '../api/hooks/useTodo';
import { useSnackbar } from '../context/SnackbarContext';
import { queryClient } from '../api/QueryClient';

interface TodoProps {
  todo: TodoType;
}

function Todo(props: TodoProps) {
  const { todo: originalTodo } = props;
  const theme = useTheme();
  const [edit, setEdit] = useState<boolean>(false);
  const [todo, setTodo] = useState<TodoType>({
    id: 0,
    name: '',
    color: '#f5f5f5',
    created: new Date(),
    hours: 0,
    completed: false,
    completed_at: null,
  });

  const { createSnackbar } = useSnackbar();

  const {
    mutate: deleteTodo,
    isPending: isDeleting,
    deleteResult,
  } = useDeleteTodo();

  const { mutate: editTodo, isPending: isEditing, editResult } = useEditTodo();

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prevState: TodoType) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (value: Dayjs | null) => {
    setTodo((prevState: TodoType) => ({
      ...prevState,
      created: value ? value.toDate() : null,
    }));
  };

  const handleEdit = (todo: TodoType) => {
    setEdit(true);

    editTodo({ data: { todo: todo } });
  };

  const handleDelete = (id: number) => {
    deleteTodo({ id });
  };

  useEffect(() => {
    if (!editResult) return;

    const { status } = editResult;
    const message =
      status === 'ok' ? 'Todo updated successfully' : 'Could not update todo';
    const type = status === 'ok' ? 'success' : 'error';

    createSnackbar(message, type, 3000);

    if (status === 'ok') {
      setEdit(false);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  }, [editResult]);

  useEffect(() => {
    if (!deleteResult) return;

    const { status } = deleteResult;
    const message =
      status === 'ok' ? 'Todo deleted successfully' : 'Could not delete todo';
    const type = status === 'ok' ? 'success' : 'error';

    createSnackbar(message, type, 3000);

    if (status === 'ok') {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  }, [deleteResult]);

  useEffect(() => {
    if (originalTodo) setTodo({ ...originalTodo });
  }, [originalTodo]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ width: '100%', maxWidth: '1330px' }}
    >
      <Card
        sx={{
          display: 'flex',
          width: '100%',
          backgroundColor: lighten(lighten(todo.color, 0.9), 0.6),
          boxShadow: 3,
        }}
      >
        <Box sx={{ width: '.5rem', background: todo.color }}></Box>
        <Box
          sx={{
            padding: theme.padding.sm,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <AnimatePresence mode="wait">
            {edit ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                style={{ flexGrow: 1 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    gap: 1,
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    name="name"
                    value={todo.name}
                    variant="standard"
                    placeholder="Add a new todo"
                    onChange={handleInputChanges}
                  />
                  <input
                    type="color"
                    name="color"
                    value={todo.color}
                    onChange={handleInputChanges}
                  />
                  <DatePicker
                    value={todo.created ? dayjs(todo.created) : null}
                    name="created"
                    onChange={handleDateChange}
                  />
                </Box>
              </motion.div>
            ) : (
              <Typography
                variant="subtitle1"
                sx={{ flexGrow: 1, color: theme.palette.secondary.main }}
              >
                {todo.name}
              </Typography>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!edit && (
              <AnimateX key="view-mode">
                <Box sx={{ margin: '0 auto' }}>
                  <IconButton aria-label="edit" onClick={() => setEdit(true)}>
                    <EditRoundedIcon
                      sx={{ color: lighten(theme.palette.secondary.main, 0.7) }}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(todo.id)}
                    disabled={isDeleting}
                  >
                    <DeleteRoundedIcon
                      sx={{ color: lighten(theme.palette.secondary.main, 0.7) }}
                    />
                  </IconButton>
                  <IconButton aria-label="check">
                    <CheckRoundedIcon
                      sx={{ color: lighten(theme.palette.secondary.main, 0.7) }}
                    />
                  </IconButton>
                </Box>
              </AnimateX>
            )}

            {edit && (
              <AnimateX key="edit-mode">
                <Box sx={{ margin: '0 auto' }}>
                  <IconButton
                    aria-label="discard"
                    onClick={() => {
                      setEdit(false);
                      setTodo({ ...originalTodo });
                    }}
                  >
                    <CloseRoundedIcon
                      sx={{ color: lighten(theme.palette.secondary.main, 0.7) }}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="save"
                    onClick={() => handleEdit(todo)}
                    disabled={isEditing}
                  >
                    <DoneRoundedIcon
                      sx={{ color: lighten(theme.palette.secondary.main, 0.7) }}
                    />
                  </IconButton>
                </Box>
              </AnimateX>
            )}
          </AnimatePresence>
        </Box>
      </Card>
    </motion.div>
  );
}

export default Todo;
