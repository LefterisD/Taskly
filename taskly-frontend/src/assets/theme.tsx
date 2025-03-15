import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      amber: string;
      orange: string;
      rose: string;
      violet: string;
      navigation: string;
    };
  }

  interface ThemeOptions {
    customColors: {
      amber: string;
      orange: string;
      rose: string;
      violet: string;
      navigation: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#3381FF',
      light: '#ADCDFF',
    },
    secondary: {
      main: '#343a40',
    },
  },
  customColors: {
    amber: '#FFBE0B',
    orange: '#FB5607',
    rose: '#FF006E',
    violet: '#8338EC',
    navigation: '#F8FBFC',
  },
});

export default theme;
