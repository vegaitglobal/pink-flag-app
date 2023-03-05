import styled from '@emotion/native';
import { WIDTH } from '@pf/constants';
import { unit } from '@pf/utils';

const PADDING = 40;
const SPACING = 10;
const FALLBACK_COLOR = '#c8c8c8';
const IMAGE_SIZE = (WIDTH - PADDING - 2 * SPACING) / 3;

export const Container = styled.View`
  width: 100%;
  flex-wrap: wrap;
  flex-direction: row;
`;

export const Image = styled.Image<{ hasSpacing?: boolean }>`
  width: ${unit(IMAGE_SIZE)};
  height: ${unit(IMAGE_SIZE)};
  margin-bottom: ${unit(SPACING)};
  background-color: ${FALLBACK_COLOR};
  ${({ hasSpacing }) => hasSpacing && `margin-right: ${unit(SPACING)}`};
`;
