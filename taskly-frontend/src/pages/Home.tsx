import Grid from '@mui/material/Grid2';
import TodoInput, { Todo as TodoType } from '../components/TodoInput';
import Todo from '../components/Todo';
import { useEffect, useState } from 'react';
import { Box, lighten, Typography, useTheme } from '@mui/material';
import { useGetTodos } from '../api/hooks/useTodo';
import Spinner from '../components/Spinner';

const Home = () => {
  const theme = useTheme();
  const [todos, setTodos] = useState<TodoType[]>([]);

  const { data: userTodos, isLoading } = useGetTodos();

  useEffect(() => {
    if (userTodos) {
      setTodos(userTodos);
    }
  }, [userTodos]);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Grid
        container
        spacing={1}
        justifyContent="center"
        alignItems="center"
        direction="column"
        size={{ xs: 12, lg: 7 }}
        sx={{
          minHeight: '100%',
          padding: '1rem',
        }}
      >
        <Grid size={{ xs: 12, lg: 7 }} sx={{ mb: 4, width: '100%' }}>
          <TodoInput />
        </Grid>
        {isLoading && <Spinner />}
        {!isLoading &&
          todos.length !== 0 &&
          todos.map((todo: TodoType) => {
            return (
              <Grid size={{ xs: 12, lg: 7 }} sx={{ width: '100%' }}>
                <Todo todo={todo} />
              </Grid>
            );
          })}
        {!isLoading && todos.length === 0 && (
          <Typography
            variant="h4"
            sx={{ color: lighten(theme.palette.secondary.main, 0.8) }}
          >
            No todos yet, start planning.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
