import { useState, createContext, useContext, ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';

type SnackbarType = 'success' | 'error' | 'info' | 'warning';

interface SnackbarContextType {
  createSnackbar: (
    message: string,
    type?: SnackbarType,
    duration?: number
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: SnackbarType;
    open: boolean;
    duration: number;
  }>({
    message: '',
    type: 'info',
    open: false,
    duration: 3000,
  });

  const createSnackbar = (
    message: string,
    type: SnackbarType = 'info',
    duration: number = 3000
  ) => {
    setSnackbar({ message, type, open: true, duration });
  };

  const handleClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ createSnackbar }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.type}
          onClose={handleClose}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
