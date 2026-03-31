import type { CommonColors } from '@mui/material/styles';

import type { ThemeCssVariables } from './types';
import type { PaletteColorNoChannels } from './core/palette';

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<
    'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
    PaletteColorNoChannels
  > & {
    common: Pick<CommonColors, 'black' | 'white'>;
    grey: Record<
      '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
      string
    >;
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  classesPrefix: 'minimal',
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'DM Sans Variable',
    secondary: 'Barlow',
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    primary: {
      lighter: '#FDE8EB', // Very light tint for backgrounds/hover
      light: '#F6758A', // Lighter shade for secondary elements
      main: '#ED1A3D', // Official Singtel Red
      dark: '#C11232', // Darker red for hover states
      darker: '#8E0B23', // Deep red for contrast
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#E6E7E8',
      light: '#939598',
      main: '#333333', // Dark charcoal used in typography/icons
      dark: '#231F20', // Near-black for headers
      darker: '#000000', // Pure black (Singtel wordmark color)
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#D0ECFE',
      light: '#73BAFB',
      main: '#1877F2', // Standard digital blue for links/info
      dark: '#0C44AE',
      darker: '#042174',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#E8F5E9',
      light: '#81C784',
      main: '#4CAF50', // Green used for 'In Stock' or success alerts
      dark: '#388E3C',
      darker: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    warning: {
      lighter: '#FFF9E6',
      light: '#FFE082',
      main: '#FFB300', // Amber for promotional 'Hot' tags
      dark: '#FFA000',
      darker: '#FF6F00',
      contrastText: '#1C252E',
    },
    error: {
      lighter: '#FEEBEE',
      light: '#EF9A9A',
      main: '#D32F2F', // Functional error red
      dark: '#C62828',
      darker: '#B71C1C',
      contrastText: '#FFFFFF',
    },
    grey: {
      '50': '#F9FAFB',
      '100': '#F4F6F8',
      '200': '#DFE3E8',
      '300': '#C4CDD5',
      '400': '#919EAB',
      '500': '#637381',
      '600': '#454F5B',
      '700': '#212B36',
      '800': '#161C24',
      '900': '#000000',
    },
    common: { black: '#000000', white: '#FFFFFF' },
  },
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
};
