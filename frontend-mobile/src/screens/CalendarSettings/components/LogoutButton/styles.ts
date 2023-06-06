import styled from '@emotion/native';
import { unit } from '@pf/utils';
import Animated from 'react-native-reanimated';
import { DROPDOWN_HEIGHT } from './constants';

const TOP_SPACING = 60;
const DROPDOWN_PADDING = 4;
const DROPDOWN_BORDER_RADIUS = 18;

export const Container = styled(Animated.View)`
  z-index: 1;
  position: absolute;
  justify-content: center;
  margin-top: ${unit(TOP_SPACING)};
  height: ${unit(DROPDOWN_HEIGHT)};
  padding: ${unit(DROPDOWN_PADDING)};
  left: ${({ theme }) => theme.spacing.$1};
  right: ${({ theme }) => theme.spacing.$1};
  background-color: ${({ theme }) => theme.colors.image};
  border-bottom-left-radius: ${unit(DROPDOWN_BORDER_RADIUS)};
  border-bottom-right-radius: ${unit(DROPDOWN_BORDER_RADIUS)};
`;
