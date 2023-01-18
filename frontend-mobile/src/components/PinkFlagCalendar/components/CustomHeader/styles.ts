import styled from '@emotion/native';
import { unit } from '@pf/utils';
import { CustomText } from '../../../CustomText';

const HEIGHT = 33;
const ARROW_SPACING = 16;

export const Container = styled.View`
  height: ${unit(HEIGHT)};
  flex-direction: row;
`;

export const StyledCustomText = styled(CustomText)`
  font-size: ${({ theme }) => theme.fontSize.$9};
  line-height: ${({ theme }) => theme.lineHeight.$8};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const ArrowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Spacing = styled.View`
  width: ${unit(ARROW_SPACING)};
`;
