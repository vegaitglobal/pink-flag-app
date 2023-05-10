import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { unit } from '@pf/utils';

const SIZE = 30;
const BORDER_RADIUS = 5;
const HORIZONTAL_SPACING = 2;

export const Container = styled.TouchableOpacity<{ isSelected?: boolean }>`
  align-items: center;
  width: ${unit(SIZE)};
  height: ${unit(SIZE)};
  justify-content: center;
  border-radius: ${unit(BORDER_RADIUS)};
  margin-horizontal: ${unit(HORIZONTAL_SPACING)};
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : theme.colors.white)};
`;

export const Number = styled(CustomText)<{ isSelected?: boolean }>`
  font-size: ${({ theme }) => theme.fontSize.$5};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.white : theme.colors.primary)};
  font-weight: ${({ isSelected, theme }) => (isSelected ? theme.fontWeight.$700 : theme.fontWeight.$400)};
`;
