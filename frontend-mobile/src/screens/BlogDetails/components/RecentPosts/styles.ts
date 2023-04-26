import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { unit } from '@pf/utils';

const BOTTOM = 36;

export const Container = styled.View`
  margin-bottom: ${unit(BOTTOM)};
`;

export const Title = styled(CustomText)`
  font-size: ${({ theme }) => theme.fontSize.$5};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.$1};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const Loader = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.$5};
`;
