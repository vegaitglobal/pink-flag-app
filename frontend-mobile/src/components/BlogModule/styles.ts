import styled from '@emotion/native';
import { HEIGHT, IS_IOS } from '@pf/constants';
import { unit } from '@pf/utils';
import { StyleSheet } from 'react-native';
import { CustomText } from '../CustomText';

const DATE_BOTTOM = 12;
const IMAGE_HEIGHT = HEIGHT * 0.23;
const CONTENT_SPACING = 16;

export const Container = styled.TouchableOpacity`
  margin-bottom: ${({ theme }) => theme.spacing.$7};
  margin-horizontal: ${({ theme }) => theme.spacing.$1};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
`;

export const Content = styled.View`
  margin-top: ${unit(CONTENT_SPACING)};
  margin-horizontal: ${unit(CONTENT_SPACING)};
  margin-bottom: ${({ theme }) => theme.spacing.$2};
`;

export const Title = styled(CustomText)`
  font-size: ${({ theme }) => theme.fontSize.$6};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const DateText = styled(CustomText)`
  margin-bottom: ${unit(DATE_BOTTOM)};
  font-size: ${({ theme }) => theme.fontSize.$2};
  color: ${({ theme }) => theme.colors.description};
  line-height: ${({ theme }) => theme.lineHeight.$2};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const Image = styled.Image`
  height: ${unit(IMAGE_HEIGHT)};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
  background-color: ${({ theme }) => theme.colors.image};
`;

export const styles = StyleSheet.create({
  shadow: IS_IOS
    ? {
        backgroundColor: 'white',
        shadowRadius: 4,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
      }
    : {
        backgroundColor: 'white',
        elevation: 6,
      },
});
