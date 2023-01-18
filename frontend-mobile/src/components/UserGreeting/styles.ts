import styled from '@emotion/native';
import { unit } from '@pf/utils';
import { CustomText } from '../CustomText';

const TOP_PADDING = 35;
const GREETING_BOTTOM = 13;
const DESCRIPTION_BOTTOM = 28;

export const Container = styled.ScrollView`
  padding-top: ${unit(TOP_PADDING)};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const Greeting = styled(CustomText)`
  margin-bottom: ${unit(GREETING_BOTTOM)};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.$7};
  line-height: ${({ theme }) => theme.lineHeight.$7};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const Description = styled(CustomText)`
  margin-bottom: ${unit(DESCRIPTION_BOTTOM)};
  font-size: ${({ theme }) => theme.fontSize.$5};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;
