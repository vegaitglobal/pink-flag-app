import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { WIDTH } from '@pf/constants';
import { unit } from '@pf/utils';

export const Container = styled.View`
  width: ${unit(WIDTH)};
  padding-top: ${({ theme }) => theme.spacing.$2};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const Text = styled(CustomText)`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSize.$4};
  padding-top: ${({ theme }) => theme.spacing.$2};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;
