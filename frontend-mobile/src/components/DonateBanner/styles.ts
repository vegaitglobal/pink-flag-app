import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { unit } from '@pf/utils';

const TITLE_BOTTOM = 12;

export const Container = styled.ImageBackground`
  overflow: hidden;
  padding-top: ${({ theme }) => theme.spacing.$5};
  margin-bottom: ${({ theme }) => theme.spacing.$8};
  padding-bottom: ${({ theme }) => theme.spacing.$5};
  margin-horizontal: ${({ theme }) => theme.spacing.$1};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
  padding-horizontal: ${({ theme }) => theme.spacing.$2};
`;

export const Title = styled(CustomText)`
  margin-bottom: ${unit(TITLE_BOTTOM)};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.$9};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const Description = styled(CustomText)`
  width: 70%;
  text-align: justify;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.$5};
  margin-bottom: ${({ theme }) => theme.spacing.$2};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;
