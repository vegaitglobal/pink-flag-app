import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { unit } from '@pf/utils';

const LINK_COLOR = '#E12424';
const MEDIUM_SPACING = 30;

export const Container = styled.Pressable`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.$1};
`;

export const LinkButton = styled.TouchableOpacity`
  align-self: center;
  margin-top: ${unit(MEDIUM_SPACING)};
`;

export const LinkText = styled(CustomText)`
  color: ${LINK_COLOR};
  text-decoration: underline ${LINK_COLOR};
  font-size: ${({ theme }) => theme.fontSize.$4};
  line-height: ${({ theme }) => theme.lineHeight.$3};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;

export const SmallSpacing = styled.View`
  height: ${({ theme }) => theme.spacing.$1};
`;

export const MediumSpacing = styled.View`
  height: ${unit(MEDIUM_SPACING)};
`;
