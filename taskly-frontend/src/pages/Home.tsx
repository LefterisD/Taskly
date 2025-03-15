import Grid from '@mui/material/Grid2';
import TodoInput, { Todo as TodoType } from '../components/TodoInput';
import Todo from '../components/Todo';
import { useState } from 'react';

const Home = () => {
  const todo: TodoType = {
    text: 'This is a todo fdsh js hjdfh ',
    date: new Date(),
    color: '#3381FF',
  };

  const [todos, setTodos] = useState<TodoType[]>([
    todo,
    { ...todo, color: '#8338EC' },
    { ...todo, color: '#FFBE0B' },
    { ...todo, color: '#FF006E' },
  ]);

  return (
    <Grid
      container
      spacing={1}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid size={{ xs: 12, sm: 8, md: 6 }} sx={{ mb: 4 }}>
        <TodoInput />
      </Grid>
      {todos.length !== 0 &&
        todos.map((todo: TodoType) => {
          return (
            <Grid size={{ xs: 12, sm: 8, md: 6 }}>
              <Todo todo={todo} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Home;
