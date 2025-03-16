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
import { useState } from 'react';
import { motion } from 'framer-motion';
import dayjs, { Dayjs } from 'dayjs';
import { useSnackbar } from '../context/SnackbarContext';

export type Todo = {
  text: string;
  color: string;
  date: Date | null;
};

function TodoInput() {
  const theme = useTheme();
  const { createSnackbar } = useSnackbar();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [todo, setTodo] = useState<Todo>({
    text: '',
    color: '',
    date: new Date(),
  });

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
      date: value ? value.toDate() : null,
    }));
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo((prevState: Todo) => ({
      ...prevState,
      text: event.target.value,
    }));
  };

  const handleSaveTodo = () => {
    console.log(todo);
    createSnackbar('Todo created!', 'success', 3000);
  };

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
          value={todo.text}
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
              value={todo.date ? dayjs(todo.date) : null}
              onChange={handleDateChange}
            />
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}

export default TodoInput;
