import styled from '@emotion/native';
import { unit } from '@pf/utils';

const CONTAINER_BOTTOM = 70;
const SEPARATOR_SIZE = 12;

export const Container = styled.View`
  margin-bottom: ${unit(CONTAINER_BOTTOM)};
`;

export const Separator = styled.View`
  height: ${unit(SEPARATOR_SIZE)};
`;
