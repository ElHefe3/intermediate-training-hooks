import { createTheme } from '@material-ui/core/styles';

import { colors } from './colors';

export const themeMui = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1320,
      xl: 1920,
    },
  },
  overrides: {
    MuiFormControlLabel: {
      label: {
        fontSize: '0.875rem',
      },
    },
    MuiButton: {
      iconSizeMedium: {
        '& > *:first-child': {
          fontSize: 25,
        },
      },
    },
  },
});
