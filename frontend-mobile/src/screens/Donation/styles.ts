import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { HEIGHT } from '@pf/constants';
import { unit } from '@pf/utils';
import { StyleSheet } from 'react-native';

const TEXT_LEFT = 8;
const IMAGE_BOTTOM = 26;
const IMAGE_HEIGHT = HEIGHT * 0.3;
export const HIT_SLOP = { left: 10, right: 10, bottom: 10, top: 10 };

export const Container = styled.ScrollView`
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Content = styled.View<{ missingData?: boolean }>`
  padding-top: 5%;
  padding-bottom: 8%;
  ${({ missingData }) => !missingData && 'flex: 1'};
  background-color: ${({ theme }) => theme.colors.white};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const Title = styled(CustomText)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.$8};
  margin-bottom: ${({ theme }) => theme.spacing.$1};
  line-height: ${({ theme }) => theme.lineHeight.$7};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const ShareButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  align-self: flex-start;
  margin-top: ${({ theme }) => theme.spacing.$5};
`;

export const ShareText = styled(CustomText)`
  text-decoration: underline;
  margin-left: ${unit(TEXT_LEFT)};
  font-size: ${({ theme }) => theme.fontSize.$5};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: ${({ theme }) => theme.lineHeight.$5};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const Image = styled.Image`
  height: ${unit(IMAGE_HEIGHT)};
  margin-bottom: ${unit(IMAGE_BOTTOM)};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
  background-color: ${({ theme }) => theme.colors.image};
`;

export const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
