import {
  Box,
  Button,
  lighten,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from '../context/SnackbarContext';
import { useCreateTodo } from '../api/hooks/useTodo';
import { queryClient } from '../api/QueryClient';

export type Todo = {
  id: number;
  name: string;
  color: string;
  created: Date | null;
  hours: number;
  completed: boolean;
  completed_at: Date | null;
};

const todoTemplate: Todo = {
  id: 0,
  name: '',
  color: '',
  created: new Date(),
  hours: 0,
  completed: false,
  completed_at: null,
};

function TodoInput() {
  const theme = useTheme();
  const { createSnackbar } = useSnackbar();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo>({ ...todoTemplate });

  const {
    mutate: createTodo,
    isPending: isCreating,
    createResult,
  } = useCreateTodo();

  const handleExpandedClick = () => {
    setExpanded(!expanded);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prevState: Todo) => ({
      ...prevState,
      color: event.target.value,
    }));
  };

  const handleDateChange = (value: Dayjs | null) => {
    setTodo((prevState: Todo) => ({
      ...prevState,
      created: value ? value.toDate() : null,
    }));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prevState: Todo) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const handleSaveTodo = () => {
    console.log(todo);

    createTodo({ data: { todo: todo } });
  };

  useEffect(() => {
    if (!createResult) return;

    const { status } = createResult;
    const message =
      status === 'ok' ? 'Todo created successfully' : 'Could not create todo';
    const type = status === 'ok' ? 'success' : 'error';

    createSnackbar(message, type, 3000);

    if (status === 'ok') {
      setTodo({ ...todoTemplate });
      setExpanded(false);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    }
  }, [createResult]);

  return (
    <Box
      sx={{
        boxShadow: 3,
        width: '100%',
        maxWidth: '1330px',
        padding: theme.padding.sm,
        borderRadius: theme.padding.xs,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          id="outlined-basic"
          value={todo.name}
          onChange={handleTextChange}
          variant="standard"
          placeholder="Add a new todo"
          sx={{ flexGrow: '1' }}
        />
        <Button
          variant="contained"
          onClick={handleSaveTodo}
          sx={{
            color: '#fff',
            backgroundColor: lighten(theme.palette.primary.main, 0.2),
            textTransform: 'capitalize',
          }}
          disabled={isCreating}
        >
          Add
        </Button>
      </Box>
      <Button
        variant="text"
        endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        sx={{ padding: 0, textTransform: 'capitalize' }}
        onClick={handleExpandedClick}
      >
        Show more options
      </Button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={
          expanded
            ? { height: 'auto', opacity: 1, marginTop: '1rem' }
            : { height: 0, opacity: 0 }
        }
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        style={{ overflow: 'hidden' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Typography sx={{ minWidth: '9rem' }}>Select color:</Typography>
            <input
              type="color"
              value={todo.color}
              onChange={handleColorChange}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography sx={{ minWidth: '9rem' }}>
              Select starting from:
            </Typography>
            <DatePicker
              value={todo.created ? dayjs(todo.created) : null}
              onChange={handleDateChange}
            />
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

export default TodoInput;
