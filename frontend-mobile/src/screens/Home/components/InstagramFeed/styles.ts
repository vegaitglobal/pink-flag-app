import styled from '@emotion/native';
import { CustomText, PrimaryButton } from '@pf/components';
import { unit } from '@pf/utils';

const BOTTOM_SPACING = 72;

export const Container = styled.View`
  align-items: center;
  margin-bottom: ${unit(BOTTOM_SPACING)};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const Title = styled(CustomText)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.$9};
  margin-bottom: ${({ theme }) => theme.spacing.$4};
  line-height: ${({ theme }) => theme.lineHeight.$8};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  margin-top: ${({ theme }) => theme.spacing.$7};
`;
