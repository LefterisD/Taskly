import { Box } from '@mui/material';
import TodoInput from '../components/TodoInput';

const Home = () => {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <TodoInput />
    </Box>
  );
};

export default Home;
