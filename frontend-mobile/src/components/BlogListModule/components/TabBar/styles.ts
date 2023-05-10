import styled from '@emotion/native';
import { unit } from '@pf/utils';

const HEIGHT = 29;

export const Container = styled.View`
  flex-direction: row;
  height: ${unit(HEIGHT)};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;
