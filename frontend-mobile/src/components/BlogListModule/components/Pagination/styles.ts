import styled from '@emotion/native';
import { unit } from '@pf/utils';

const HEIGHT = 30;

export const Container = styled.View`
  flex-direction: row;
  height: ${unit(HEIGHT)};
  margin-top: ${({ theme }) => theme.spacing.$1};
`;

export const NumbersContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;
