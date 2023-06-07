import { NoConnectionSvg } from '@pf/assets';
import { CustomText } from '@pf/components';
import { HEIGHT } from '@pf/constants';
import { unit } from '@pf/utils';
import styled from '@emotion/native';
import Animated from 'react-native-reanimated';

const TOP_SPACING = HEIGHT * 0.2;
const TITLE_BOTTOM = 16;

export const Container = styled.View`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-color: transparent;
`;

export const Content = styled(Animated.View)`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  align-self: center;
  align-items: center;
  padding-top: ${unit(TOP_SPACING)};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledNoConnectionSvg = styled(NoConnectionSvg)`
  margin-bottom: ${({ theme }) => theme.spacing.$7};
`;

export const Title = styled(CustomText)`
  margin-bottom: ${unit(TITLE_BOTTOM)};
  font-size: ${({ theme }) => theme.fontSize.$7};
  font-weight: ${({ theme }) => theme.fontWeight.$600};
`;

export const Description = styled(CustomText)`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.$6};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;
