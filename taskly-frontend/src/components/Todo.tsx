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
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import AnimateX from './animations/AnimateX';

interface TodoProps {
  todo: TodoType;
}

function Todo(props: TodoProps) {
  const { todo } = props;
  const theme = useTheme();
  const [edit, setEdit] = useState<boolean>(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: '700px' }}
    >
      <Card
        sx={{
          display: 'flex',
          maxWidth: '700px',
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
                    value={todo.text}
                    variant="standard"
                    placeholder="Add a new todo"
                  />
                  <input type="color" value={todo.color} />
                  <DatePicker value={todo.date ? dayjs(todo.date) : null} />
                </Box>
              </motion.div>
            ) : (
              <Typography
                variant="subtitle1"
                sx={{ flexGrow: 1, color: theme.palette.secondary.main }}
              >
                {todo.text}
              </Typography>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!edit && (
              <AnimateX key="view-mode">
                <Box sx={{ margin: '0 auto' }}>
                  <IconButton aria-label="edit" onClick={handleEdit}>
                    <EditRoundedIcon
                      sx={{ color: lighten(theme.palette.secondary.main, 0.7) }}
                    />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <DeleteRoundedIcon
                      sx={{ color: lighten(theme.palette.secondary.main, 0.7) }}
                    />
                  </IconButton>
                </Box>
              </AnimateX>
            )}

            {edit && (
              <AnimateX key="edit-mode">
                <Box sx={{ margin: '0 auto' }}>
                  <IconButton aria-label="discard" onClick={handleEdit}>
                    <CloseRoundedIcon
                      sx={{ color: lighten(theme.palette.secondary.main, 0.7) }}
                    />
                  </IconButton>
                  <IconButton aria-label="save">
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
