import styled from '@emotion/native';
import { CustomImage, CustomText, Line } from '@pf/components';
import { HEIGHT } from '@pf/constants';
import { unit } from '@pf/utils';
import { StyleSheet } from 'react-native';

const IMAGE_HEIGHT = HEIGHT * 0.26;

const DATE_SIZE = 14;
const DATE_BOTTOM = 12;
const LINE_COLOR = '#FBEEF3';
const LINE_WIDTH = 2;
const LINE_BOTTOM = 32;
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
  padding-top: ${({ theme }) => theme.spacing.$2};
  ${({ missingData }) => !missingData && 'flex: 1'};
  background-color: ${({ theme }) => theme.colors.white};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const Title = styled(CustomText)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.$8};
  margin-bottom: ${({ theme }) => theme.spacing.$2};
  line-height: ${({ theme }) => theme.lineHeight.$7};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const Image = styled(CustomImage)`
  height: ${unit(IMAGE_HEIGHT)};
  margin-bottom: ${({ theme }) => theme.spacing.$4};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
  background-color: ${({ theme }) => theme.colors.image};
`;

export const DateText = styled(CustomText)`
  font-size: ${unit(DATE_SIZE)};
  margin-bottom: ${unit(DATE_BOTTOM)};
  color: ${({ theme }) => theme.colors.description};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const StyledLine = styled(Line)`
  height: ${unit(LINE_WIDTH)};
  background-color: ${LINE_COLOR};
  margin-bottom: ${unit(LINE_BOTTOM)};
`;

export const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
