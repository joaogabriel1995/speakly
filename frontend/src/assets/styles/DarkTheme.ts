import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        containedPrimary: {
          backgroundColor: '#1565C0', // Deep Blue (JStack primary)
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#0D47A1', // Darker Blue for hover
          },
        },
        containedError: {
          backgroundColor: '#E57373', // Keeping error color consistent
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#D32F2F',
          },
        },
        sizeSmall: {
          padding: '6px 16px',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '11px 24px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 16px',
        },
        textSizeLarge: {
          padding: '12px 16px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '32px 24px',
          '&:last-child': {
            paddingBottom: '32px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        html: {
          position: 'relative',
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
        },
        'html, body, #__next, #root': {
          minHeight: '100%',
          width: '100%',
          backgroundColor: '#121212', // Dark background from JStack
        },
        a: {
          textDecoration: 'none',
        },
        '*.permission-disabled': {
          pointerEvents: 'none',
          opacity: 0.5,
          cursor: 'not-allowed',
        },
        hr: {
          margin: '30px 0 10px',
          opacity: 0.2,
        },
        '.MuiCheckbox-indeterminate': {
          color: '#aaa !important',
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: '#444',
            },
          },
        },
        '.MuiDialog-container .MuiFormControl-root': {
          display: 'flex',
        },
        '.css-1ugrzdr-MuiContainer-root': {
          paddingLeft: '1px',
        },
        '.timepicker-input': {
          width: '90px',
          fontSize: '15px',
        },
        MuiTableHead: {
          styleOverrides: {
            root: {
              backgroundColor: '#1F2937',
              '.MuiTableCell-root': {
                color: '#BDBDBD',
              },
              borderBottom: 'none',
              '& .MuiTableCell-root': {
                borderBottom: 'none',
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              },
              '& .MuiTableCell-paddingCheckbox': {
                paddingTop: 4,
                paddingBottom: 4,
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#2C3E50',
                borderColor: '#2C3E50',
                minWidth: '1000px !important',
                maxWidth: '1000px !important',
                width: '1000px',
              },
            },
          },
        },

      },
    },
  },
  palette: {
    mode: 'dark',
    grey: {
      100: '#BDBDBD',
      200: '#9E9E9E',
      300: '#757575',
      400: '#616161',
      500: '#424242',
      600: '#303030',
      700: '#212121',
      800: '#121212',
      900: '#0A0A0A',
    },
    action: {
      active: '#FFFFFF',
      focus: 'rgba(255, 255, 255, 0.12)',
      hover: 'rgba(255, 255, 255, 0.04)',
      selected: 'rgba(255, 255, 255, 0.08)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabled: 'rgba(255, 255, 255, 0.26)',
    },
    background: {
      default: '#121212', // Dark background from JStack
      paper: '#2C2C2C', // Light Gray for cards/surfaces (JStack-inspired)
    },
    divider: '#444',
    primary: {
      main: '#1565C0', // Deep Blue (JStack primary)
      light: '#4FC3F7', // Lighter shade for contrast
      dark: '#0D47A1', // Darker shade for hover states
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FF5722', // Bright Orange (JStack accent)
      light: '#FF8A65', // Lighter shade for contrast
      dark: '#E64A19', // Darker shade for hover states
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#66BB6A',
      light: '#A5D6A7',
      dark: '#388E3C',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#29B6F6',
      light: '#81D4FA',
      dark: '#0288D1',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFA726',
      light: '#FFCC80',
      dark: '#F57C00',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#EF5350',
      light: '#FFCDD2',
      dark: '#D32F2F',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#E0E0E0', // Light text for readability on dark background
      secondary: '#BDBDBD', // Secondary text
      disabled: 'rgba(255, 255, 255, 0.48)',
    },
  },
  shape: {
    borderRadius: 4,
  },
  shadows: [
    'none',
    `0px 1px 1px rgba(0, 0, 0, 0.2),
    0px 1px 2px rgba(0, 0, 0, 0.24)`,
    '0px 1px 2px rgba(0, 0, 0, 0.28)',
    '0px 1px 4px rgba(0, 0, 0, 0.28)',
    '0px 1px 5px rgba(0, 0, 0, 0.28)',
    '0px 1px 6px rgba(0, 0, 0, 0.28)',
    '0px 2px 6px rgba(0, 0, 0, 0.28)',
    '0px 3px 6px rgba(0, 0, 0, 0.28)',
    '0px 2px 4px rgba(0, 0, 0, 0.28), 0px 4px 6px rgba(0, 0, 0, 0.28)',
    '0px 5px 12px rgba(0, 0, 0, 0.28)',
    '0px 5px 14px rgba(0, 0, 0, 0.28)',
    '0px 5px 15px rgba(0, 0, 0, 0.28)',
    '0px 6px 15px rgba(0, 0, 0, 0.28)',
    '0px 7px 15px rgba(0, 0, 0, 0.28)',
    '0px 8px 15px rgba(0, 0, 0, 0.28)',
    '0px 9px 15px rgba(0, 0, 0, 0.28)',
    '0px 10px 15px rgba(0, 0, 0, 0.28)',
    '0px 12px 22px -8px rgba(0, 0, 0, 0.45)',
    '0px 13px 22px -8px rgba(0, 0, 0, 0.45)',
    '0px 14px 24px -8px rgba(0, 0, 0, 0.45)',
    '0px 10px 10px rgba(0, 0, 0, 0.24), 0px 20px 25px rgba(0, 0, 0, 0.28)',
    '0px 25px 50px rgba(0, 0, 0, 0.45)',
    '0px 25px 50px rgba(0, 0, 0, 0.45)',
    '0px 25px 50px rgba(0, 0, 0, 0.45)',
    '0px 25px 50px rgba(0, 0, 0, 0.45)',
  ],
  typography: {
    button: {
      fontWeight: 600,
    },
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      color: '#E0E0E0',
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
      color: '#E0E0E0',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.75,
      color: '#E0E0E0',
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      color: '#E0E0E0',
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
      color: '#BDBDBD',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.66,
      color: '#BDBDBD',
    },
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.375,
      color: '#FFFFFF',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.375,
      color: '#FFFFFF',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.375,
      color: '#FFFFFF',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.375,
      color: '#FFFFFF',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.375,
      color: '#FFFFFF',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.000rem',
      lineHeight: 1,
      opacity: 0.7,
      color: '#FFFFFF',
    },
  },
});
