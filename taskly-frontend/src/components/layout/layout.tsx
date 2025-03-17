import { Box } from '@mui/material';
import DrawerAppBar from './Appbar';
import { Outlet } from 'react-router';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <DrawerAppBar />
      <Box
        sx={{
          marginTop: '4rem',
          flexGrow: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
