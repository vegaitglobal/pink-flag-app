import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { unit } from '@pf/utils';

const HEIGHT = 43;
const PADDING = 8;
const BORDER_WIDTH = 1;
const BORDER_COLOR = '#DADCE0';
const BORDER_RADIUS = 4;
const IMAGE_BACKGROUND = '#D9D9D9';
const AVATAR_SIZE = 20;
const AVATAR_LEFT = 2;
const AVATAR_RIGHT = 8;
const TITLE_HEIGHT = 14;
const SUBTITLE_HEIGHT = 11.5;

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  height: ${unit(HEIGHT)};
  padding: ${unit(PADDING)};
  border-radius: ${unit(BORDER_RADIUS)};
  margin-bottom: ${({ theme }) => theme.spacing.$1};
  border: ${unit(BORDER_WIDTH)} solid ${BORDER_COLOR};
`;

export const LeftArea = styled.View`
  height: 100%;
  justify-content: center;
  margin-left: ${unit(AVATAR_LEFT)};
  margin-right: ${unit(AVATAR_RIGHT)};
`;

export const Avatar = styled.Image`
  width: ${unit(AVATAR_SIZE)};
  height: ${unit(AVATAR_SIZE)};
  background-color: ${IMAGE_BACKGROUND};
  border-radius: ${unit(AVATAR_SIZE / 2)};
`;

export const ContentArea = styled.View`
  flex: 1;
`;

export const Title = styled(CustomText)`
  line-height: ${unit(TITLE_HEIGHT)};
  font-size: ${({ theme }) => theme.fontSize.$2};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const Subtitle = styled(CustomText)`
  line-height: ${unit(SUBTITLE_HEIGHT)}
  font-size: ${({ theme }) => theme.fontSize.$1};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const RightArea = styled.View``;
