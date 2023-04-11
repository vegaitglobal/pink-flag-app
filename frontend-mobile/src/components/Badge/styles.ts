import styled from '@emotion/native';
import { unit } from '@pf/utils';
import { CustomText } from '../CustomText';

const BADGE_LETTER_SPACING = 2;
const BADGE_HORIZONTAL = 12;
const BADGE_VERTICAL = 3;
const BADGE_RADIUS = 4;
const BADGE_BOTTOM = 7;

export const Container = styled.View`
  align-self: flex-start;
  border-radius: ${unit(BADGE_RADIUS)};
  margin-bottom: ${unit(BADGE_BOTTOM)};
  padding-vertical: ${unit(BADGE_VERTICAL)};
  padding-horizontal: ${unit(BADGE_HORIZONTAL)};
  background-color: ${({ theme }) => theme.colors.label};
`;

export const BadgeText = styled(CustomText)`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: ${unit(BADGE_LETTER_SPACING)};
  font-size: ${({ theme }) => theme.fontSize.$1};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;
