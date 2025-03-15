import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    customColors: {
      green: string;
      blue: string;
      jasmin: string;
      indigo: string;
      orange: string;
      rose: string;
      violet: string;
      navigation: string;
      grey: string;
      lightBlue: string;
    };
    padding: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
  }

  interface ThemeOptions {
    customColors: {
      green: string;
      blue: string;
      jasmin: string;
      indigo: string;
      orange: string;
      rose: string;
      violet: string;
      navigation: string;
      grey: string;
      lightBlue: string;
    };
    padding: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
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
    green: '#7ADC2C',
    blue: '#99DDFF',
    jasmin: '#FFE799',
    indigo: '#9999FF',
    orange: '#E2FFE0',
    rose: '#FF006E',
    violet: '#8338EC',
    navigation: '#F8FBFC',
    grey: '#FAFEFF',
    lightBlue: '#32D2F1',
  },
  padding: {
    xs: '.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '5rem',
  },
});

export default theme;
