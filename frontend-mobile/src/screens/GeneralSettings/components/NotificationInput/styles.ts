import { CustomText } from '@pf/components';
import styled from '@emotion/native';
import { unit } from '@pf/utils';

const PADDING = 10;
const RIGHT_SPACING = 10;
const BORDER_RADIUS = 30;

export const Container = styled.Pressable`
  flex-direction: row;
  padding: ${unit(PADDING)};
`;

export const Title = styled(CustomText)`
  margin-right: ${unit(RIGHT_SPACING)};
  font-size: ${({ theme }) => theme.fontSize.$5};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const InDevelopment = styled.View`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  justify-content: center;
`;

export const Overlay = styled.View`
  flex: 1;
  opacity: 0.3;
  background-color: black;
  border-radius: ${unit(BORDER_RADIUS)};
`;

export const TextContainer = styled.View`
  opacity: 0.7;
  position: absolute;
  align-self: center;
  border-radius: 20px;
  padding-vertical: 5px;
  background-color: black;
  padding-horizontal: 10px;
`;

export const DevelopmentText = styled(CustomText)`
  letter-spacing: 5px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;
