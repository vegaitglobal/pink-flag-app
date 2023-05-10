import styled from '@emotion/native';
import { PaginationArrowSvg } from '@pf/assets';
import { unit } from '@pf/utils';

const SIZE = 30;
const SPACING = 7;
export const ACTIVE_COLOR = '#EC67B1';
export const DISABLED_COLOR = '#FAD7EB';

export const Container = styled.TouchableOpacity`
  align-items: center;
  width: ${unit(SIZE)};
  height: ${unit(SIZE)};
  justify-content: center;
  margin-horizontal: ${unit(SPACING)};
`;

export const StyledArrow = styled(PaginationArrowSvg)<{ isRight?: boolean }>`
  ${({ isRight }) => isRight && 'transform: rotate(180deg)'};
`;
