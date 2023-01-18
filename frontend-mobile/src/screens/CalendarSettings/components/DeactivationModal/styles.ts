import { unit } from '@pf/utils';
import styled from '@emotion/native';
import { CustomText, TransparentButton } from '@pf/components';

const OVERLAY_OPACITY = '0.6';
const CONTENT_TOP = 20;

export const Overlay = styled.Pressable`
  flex: 1;
  background-color: black;
  opacity: ${OVERLAY_OPACITY};
`;

export const Content = styled.View<{ top: number }>`
  position: absolute;
  align-items: center;
  left: ${({ theme }) => theme.spacing.$1};
  right: ${({ theme }) => theme.spacing.$1};
  top: ${({ top }) => unit(top + CONTENT_TOP)};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
  padding-horizontal: ${({ theme }) => theme.spacing.$2};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled(CustomText)`
  margin-top: ${({ theme }) => theme.spacing.$5};
  font-size: ${({ theme }) => theme.fontSize.$7};
  line-height: ${({ theme }) => theme.lineHeight.$6};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const Description = styled(CustomText)`
  margin-top: ${({ theme }) => theme.spacing.$4};
  font-size: ${({ theme }) => theme.fontSize.$5};
  margin-bottom: ${({ theme }) => theme.spacing.$5};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const StyledTransparentButton = styled(TransparentButton)`
  margin-top: ${({ theme }) => theme.spacing.$1};
  margin-bottom: ${({ theme }) => theme.spacing.$6};
`;
