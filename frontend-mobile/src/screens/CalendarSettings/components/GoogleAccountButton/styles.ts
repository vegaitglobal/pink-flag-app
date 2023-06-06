import styled from '@emotion/native';
import { CustomText, GoogleLoginButton } from '@pf/components';
import { unit } from '@pf/utils';

const HEIGHT = 43;
const PADDING = 8;
const BORDER_WIDTH = 1;
const BORDER_COLOR = '#DADCE0';
const BORDER_RADIUS = 4;
const AVATAR_SIZE = 20;
const AVATAR_LEFT = 2;
const AVATAR_RIGHT = 8;
const TITLE_HEIGHT = 14;
const SUBTITLE_RIGHT = 5;
const SUBTITLE_HEIGHT = 11.5;
const MASK_HEIGHT = 25;

export const Container = styled.Pressable`
  z-index: 2;
  overflow: hidden;
  flex-direction: row;
  height: ${unit(HEIGHT)};
  padding: ${unit(PADDING)};
  border-radius: ${unit(BORDER_RADIUS)};
  margin-bottom: ${({ theme }) => theme.spacing.$1};
  border: ${unit(BORDER_WIDTH)} solid ${BORDER_COLOR};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const TopMask = styled.View`
  left: 0;
  right: 0;
  z-index: 2;
  position: absolute;
  height: ${unit(MASK_HEIGHT)};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledGoogleLoginButton = styled(GoogleLoginButton)`
  margin-bottom: ${({ theme }) => theme.spacing.$1};
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
  border-radius: ${unit(AVATAR_SIZE / 2)};
  background-color: ${({ theme }) => theme.colors.image};
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
  margin-right: ${unit(SUBTITLE_RIGHT)};
  font-size: ${({ theme }) => theme.fontSize.$1};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const RightArea = styled.View``;

export const Row = styled.View`
  align-items: center;
  flex-direction: row;
`;
