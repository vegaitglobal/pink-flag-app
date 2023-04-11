import styled from '@emotion/native';
import { unit } from '@pf/utils';
import { CustomText } from '@pf/components';

const HEIGHT = 46;
const BORDER_COLOR = '#8E8E8E';
const BORDER_WIDTH = 1;
const TEXT_LEFT = 8;

export const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${unit(HEIGHT)};
  border: ${unit(BORDER_WIDTH)} solid ${BORDER_COLOR};
  border-radius: ${({ theme }) => theme.borderRadius.$1};
`;

export const StyledCustomText = styled(CustomText)`
  margin-left: ${unit(TEXT_LEFT)};
  font-size: ${({ theme }) => theme.fontSize.$5};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
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
  opacity: 0.4;
  border-radius: 7px;
  background-color: black;
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
