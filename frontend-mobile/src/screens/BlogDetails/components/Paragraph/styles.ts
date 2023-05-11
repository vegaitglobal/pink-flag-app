import { Theme } from '@emotion/react';
import { MixedStyleDeclaration, RenderersProps } from 'react-native-render-html';

const LINE_HEIGHT = 24;

export const getParagraphStyle = (theme: Theme): MixedStyleDeclaration => ({
  textAlign: 'justify',
  color: theme.colors.secondary,
  fontSize: theme.fontSize.$5,
  lineHeight: LINE_HEIGHT,
});

export const getLinkStyle = (theme: Theme): string => `color:${theme.colors.primary};text-decoration:none;`;
export const tagStyles: Readonly<Record<string, MixedStyleDeclaration>> = {
  li: { marginBottom: 8 },
  p: { marginTop: 0 },
  ul: { marginTop: 0 },
};
export const BulletStyle: Partial<RenderersProps> = {
  ul: {
    markerTextStyle: { color: '#EC67B1', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },
    markerBoxStyle: {
      paddingRight: 10,
      marginTop: 1,
    },
  },
};
