import { Theme } from '@emotion/react';
import { unit } from '@pf/utils';
import { PRIMARY, SECONDARY, WHITE, NAV, DESCRIPTION, SUCCESS, WARNING, DANGER, LABEL, BLACK, BLUE } from './colors';

export const AppTheme: Theme = {
  spacing: {
    $1: unit(20),
    $1Number: 20,
    $2: unit(24),
    $2Number: 24,
    $4: unit(30),
    $4Number: 30,
    $5: unit(32),
    $5Number: 32,
    $6: unit(34),
    $6Number: 34,
    $7: unit(40),
    $7Number: 40,
    $8: unit(48),
    $8Number: 48,
  },
  fontSize: {
    $1: unit(10),
    $1Number: 10,
    $2: unit(12),
    $2Number: 12,
    $3: unit(13),
    $3Number: 13,
    $4: unit(15),
    $4Number: 15,
    $5: unit(16),
    $5Number: 16,
    $6: unit(18),
    $6Number: 18,
    $7: unit(20),
    $7Number: 20,
    $8: unit(22),
    $8Number: 22,
    $9: unit(24),
    $9Number: 24,
    $10: unit(32),
    $10Number: 32,
  },
  iconSize: {
    $1: unit(20),
    $1Number: 20,
    $2: unit(25),
    $2Number: 25,
  },
  lineHeight: {
    $1: unit(12),
    $2: unit(16),
    $3: unit(20),
    $4: unit(22),
    $5: unit(25),
    $6: unit(27),
    $7: unit(30),
    $8: unit(32),
  },
  borderRadius: {
    $1: unit(8),
    $1Number: 8,
    $2: unit(16),
    $2Number: 16,
    $3: unit(24),
    $3Number: 24,
  },
  colors: {
    primary: PRIMARY,
    secondary: SECONDARY,
    nav: NAV,
    description: DESCRIPTION,
    white: WHITE,
    success: SUCCESS,
    warning: WARNING,
    danger: DANGER,
    label: LABEL,
    black: BLACK,
    blue: BLUE,
  },
  fontWeight: {
    $100: '100',
    $200: '200',
    $300: '300',
    $400: '400',
    $500: '500',
    $600: '600',
    $700: '700',
    $800: '800',
    $900: '900',
  },
};
