import Grid from '@mui/material/Grid2';
import TodoInput, { Todo as TodoType } from '../components/TodoInput';
import Todo from '../components/Todo';
import { useState } from 'react';
import { Box, useTheme } from '@mui/material';

const Home = () => {
  const theme = useTheme();
  const todo: TodoType = {
    text: 'This is a todo fdsh js hjdfh ',
    date: new Date(),
    color: theme.customColors.indigo,
  };

  const [todos, setTodos] = useState<TodoType[]>([
    todo,
    { ...todo, color: theme.palette.primary.main },
    { ...todo, color: theme.customColors.jasmin },
    { ...todo, color: theme.customColors.violet },
  ]);

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
        {todos.length !== 0 &&
          todos.map((todo: TodoType) => {
            return (
              <Grid size={{ xs: 12, lg: 7 }} sx={{ width: '100%' }}>
                <Todo todo={todo} />
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
};

export default Home;
