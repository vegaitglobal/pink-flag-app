import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { unit } from '@pf/utils';

const OPACITY = '0.2';
const OVERLAY_COLOR = '#000000';
const TEXT_BOTTOM = 30;

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${OPACITY};
  background-color: ${OVERLAY_COLOR};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
`;

export const Content = styled.View`
  top: 30%;
  left: 10%;
  right: 10%;
  position: absolute;
  align-items: center;
  padding-vertical: ${({ theme }) => theme.spacing.$5};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
  padding-horizontal: ${({ theme }) => theme.spacing.$2};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled(CustomText)`
  margin-bottom: ${unit(TEXT_BOTTOM)};
  font-size: ${({ theme }) => theme.fontSize.$7};
  line-height: ${({ theme }) => theme.lineHeight.$6};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;
