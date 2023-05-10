import styled from '@emotion/native';
import { CustomImage } from '@pf/components';
import { HEIGHT } from '@pf/constants';
import { unit } from '@pf/utils';

const IMAGE_HEIGHT = HEIGHT * 0.26;

export const Container = styled(CustomImage)`
  height: ${unit(IMAGE_HEIGHT)};
  margin-bottom: ${({ theme }) => theme.spacing.$1};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
  background-color: ${({ theme }) => theme.colors.image};
`;
