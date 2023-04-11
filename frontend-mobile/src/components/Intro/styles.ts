import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { HEIGHT } from '@pf/constants';
import { unit } from '@pf/utils';

const IMAGE_HEIGHT = HEIGHT * 0.25;

export const Container = styled.ImageBackground``;

export const Content = styled.View`
  padding-top: ${({ theme }) => theme.spacing.$7};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const ImageContainer = styled.View`
  height: ${unit(IMAGE_HEIGHT)};
  margin-bottom: ${({ theme }) => theme.spacing.$1};
`;

export const AboutUsImage = styled.Image`
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
