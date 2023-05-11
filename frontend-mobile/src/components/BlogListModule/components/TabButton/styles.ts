import { CustomText } from '@pf/components';
import styled from '@emotion/native';
import { unit } from '@pf/utils';

const FONT_SIZE = 14;
const TEXT_INACTIVE = '#868686';

export const Container = styled.Pressable`
  flex: 1;
`;

export const Text = styled(CustomText)<{ isFocused?: boolean }>`
  text-align: center;
  font-size: ${unit(FONT_SIZE)};
  line-height: ${({ theme }) => theme.lineHeight.$3};
  color: ${({ isFocused, theme }) => (isFocused ? theme.colors.secondary : TEXT_INACTIVE)};
  font-weight: ${({ theme, isFocused }) => (isFocused ? theme.fontWeight.$700 : theme.fontWeight.$400)};
`;
