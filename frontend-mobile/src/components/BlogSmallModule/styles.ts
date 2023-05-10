import styled from '@emotion/native';
import { IS_IOS } from '@pf/constants';
import { unit } from '@pf/utils';
import { StyleSheet } from 'react-native';
import { CustomText } from '../CustomText';

const PADDING = 16;
const HEIGHT = 118;
const CONTENT_LEFT = 16;
const BOTTOM_SPACING = 12;

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  height: ${unit(HEIGHT)};
  padding: ${unit(PADDING)};
  margin-bottom: ${unit(BOTTOM_SPACING)};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
  margin-left: ${unit(CONTENT_LEFT)};
`;

export const Title = styled(CustomText)`
  font-size: ${({ theme }) => theme.fontSize.$4};
  color: ${({ theme }) => theme.colors.secondary};
  line-height: ${({ theme }) => theme.lineHeight.$3};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const DateText = styled(CustomText)`
  font-size: ${({ theme }) => theme.fontSize.$2};
  color: ${({ theme }) => theme.colors.description};
  line-height: ${({ theme }) => theme.lineHeight.$2};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const Image = styled.Image`
  width: 28%;
  background-color: ${({ theme }) => theme.colors.image};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
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
