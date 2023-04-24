import styled from '@emotion/native';
import { CustomText } from '../CustomText';
import { unit } from '@pf/utils';

const TITLE_BOTTOM = 12;

export const Container = styled.ImageBackground`
  min-height: 10%;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.$6};
  padding-vertical: ${({ theme }) => theme.spacing.$5};
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
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.$5};
  margin-bottom: ${({ theme }) => theme.spacing.$2};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const Loader = styled.View`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
`;
