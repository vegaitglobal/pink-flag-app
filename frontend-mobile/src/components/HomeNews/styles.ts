import styled from '@emotion/native';
import { unit } from '@pf/utils';
import { CustomText } from '../CustomText';

const TEXT_SIZE = 14;
const LINE_HEIGHT = 19;
const TEXT_HORIZONTAL = 36;
const TEXT_BOTTOM = 11;
export const HIT_SLOP = { left: 10, right: 10, top: 10, bottom: 5 };

export const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.$6};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${unit(TEXT_BOTTOM)};
  margin-horizontal: ${unit(TEXT_HORIZONTAL)};
`;

export const NewsText = styled(CustomText)`
  font-size: ${unit(TEXT_SIZE)};
  line-height: ${unit(LINE_HEIGHT)};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const ViewAllText = styled(CustomText)`
  font-size: ${({ theme }) => theme.fontSize.$2};
  color: ${({ theme }) => theme.colors.description};
  line-height: ${({ theme }) => theme.lineHeight.$2};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const PostsContainer = styled.View`
  margin-horizontal: ${({ theme }) => theme.spacing.$1};
`;
