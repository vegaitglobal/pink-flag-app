import styled from '@emotion/native';
import { unit } from '@pf/utils';
import { CustomText } from '@pf/components';

const HEIGHT = 46;
const BORDER_COLOR = '#8E8E8E';
const BORDER_WIDTH = 1;
const TEXT_LEFT = 8;

export const Container = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: ${unit(HEIGHT)};
  border: ${unit(BORDER_WIDTH)} solid ${BORDER_COLOR};
  border-radius: ${({ theme }) => theme.borderRadius.$1};
`;

export const StyledCustomText = styled(CustomText)`
  margin-left: ${unit(TEXT_LEFT)};
  font-size: ${({ theme }) => theme.fontSize.$5};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$400};
`;
