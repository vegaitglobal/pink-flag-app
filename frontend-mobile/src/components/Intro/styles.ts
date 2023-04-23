import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { HEIGHT } from '@pf/constants';
import { unit } from '@pf/utils';
import { CustomImage } from '../CustomImage';
import { Theme } from '@emotion/react';

const SPACING = 10;
const IMAGE_HEIGHT = HEIGHT * 0.25;
const CONTAINER_MIN_HEIGHT = HEIGHT * 0.3;

export const Container = styled.ImageBackground`
  justify-content: center;
  min-height: ${unit(CONTAINER_MIN_HEIGHT)};
`;

export const Content = styled.View`
  padding-top: ${({ theme }) => theme.spacing.$7};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const ImageContainer = styled.View`
  height: ${unit(IMAGE_HEIGHT)};
  margin-bottom: ${({ theme }) => theme.spacing.$1};
`;

export const AboutUsImage = styled(CustomImage)`
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.$2};
`;

export const Title = styled(CustomText)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.$10};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const Description = styled(CustomText)`
  text-align: justify;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.$5};
  margin-bottom: ${({ theme }) => theme.spacing.$1};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const getHtmlStyle = (theme: Theme): string =>
  `
    text-align: justify;
    color: ${theme.colors.white};
    margin-bottom: ${unit(SPACING)};
    font-size: ${theme.fontSize.$5};
    line-height: ${theme.lineHeight.$4};
    font-weight: ${theme.fontWeight.$400};
  `;
