import styled from '@emotion/native';
import { unit } from '@pf/utils';
import { CustomText } from '../CustomText';

const BORDER_RADIUS = 12;
const SPACING_VERTICAL = 10;
const SPACING_HORIZONTAL = 16;

export const Container = styled.TouchableOpacity`
  align-self: flex-start;
  border-radius: ${unit(BORDER_RADIUS)};
  padding-vertical: ${unit(SPACING_VERTICAL)};
  padding-horizontal: ${unit(SPACING_HORIZONTAL)};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ButtonText = styled(CustomText)`
  font-size: ${({ theme }) => theme.fontSize.$5};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;
