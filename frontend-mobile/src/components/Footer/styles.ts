import styled from '@emotion/native';
import { LocationSvg } from '@pf/assets';
import { unit } from '@pf/utils';
import { CustomText } from '../CustomText';
import { Line } from '../Line';
import { LinkButton } from '../LinkButton';

const HEIGHT = 350;
const TITLE_TOP = 54;
const DETAIL_LEFT = 8;
const DETAIL_BOTTOM = 12;
const LOCATION_SVG_RIGHT = 5;
const LINE_COLOR = '#F386C3';
const LINE_BOTTOM = 16;
const BOTTOM_SPACING = 70;

export const Container = styled.ImageBackground`
  height: ${unit(HEIGHT)};
  padding-horizontal: ${({ theme }) => theme.spacing.$1};
`;

export const Title = styled(CustomText)`
  margin-top: ${unit(TITLE_TOP)};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.lineHeight.$4};
  margin-bottom: ${({ theme }) => theme.spacing.$1};
  line-height: ${({ theme }) => theme.lineHeight.$7};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const Detail = styled(CustomText)`
  margin-left: ${unit(DETAIL_LEFT)};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.lineHeight.$2};
  line-height: ${({ theme }) => theme.lineHeight.$3};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const Copyright = styled(CustomText)`
  align-self: center;
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.lineHeight.$1};
  line-height: ${({ theme }) => theme.lineHeight.$2};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const DetailRow = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: ${unit(DETAIL_BOTTOM)};
`;

export const IconsArea = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.$1};
`;

export const StyledLocationSvg = styled(LocationSvg)`
  margin-right: ${unit(LOCATION_SVG_RIGHT)};
`;

export const StyledLink = styled(LinkButton)`
  margin-right: ${({ theme }) => theme.spacing.$1};
`;

export const StyledLine = styled(Line)`
  background-color: ${LINE_COLOR};
  margin-bottom: ${unit(LINE_BOTTOM)};
  margin-top: ${({ theme }) => theme.spacing.$1};
  margin-right: ${({ theme }) => theme.spacing.$1};
`;

export const Spacing = styled.View`
  height: ${unit(BOTTOM_SPACING)};
  background-color: ${({ theme }) => theme.colors.primary};
`;
