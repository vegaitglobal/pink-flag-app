import styled from '@emotion/native';
import { DonateBanner } from '@pf/components';

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Content = styled.View`
  padding-top: ${({ theme }) => theme.spacing.$1};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const StyledDonateBanner = styled(DonateBanner)`
  margin-horizontal: ${({ theme }) => theme.spacing.$1};
`;
