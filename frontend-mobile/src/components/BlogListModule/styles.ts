import styled from '@emotion/native';
import { unit } from '@pf/utils';
import Animated from 'react-native-reanimated';

const INDICATOR_HEIGHT = 2;

export const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.$8};
`;

export const IndicatorContainer = styled.View`
  margin-horizontal: ${({ theme }) => theme.spacing.$1};
  overflow: hidden;
`;

export const Indicator = styled(Animated.View)`
  width: 50%;
  height: ${unit(INDICATOR_HEIGHT)};
  border-radius: ${INDICATOR_HEIGHT / 2};
  background-color: ${({ theme }) => theme.colors.primary};
`;
