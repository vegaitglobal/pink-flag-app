import styled from '@emotion/native';
import { CustomText } from '@pf/components';
import { unit } from '@pf/utils';

const HEIGHT = 42;
const OVERLAY_COLOR = 'white';
const OVERLAY_OPACITY = '0.4';

export const Container = styled.TouchableOpacity<{ background?: string }>`
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  height: ${unit(HEIGHT)};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
  background-color: ${({ background, theme }) => background || theme.colors.primary};
`;

export const StyledCustomText = styled(CustomText)`
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSize.$5};
  line-height: ${({ theme }) => theme.lineHeight.$4};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
`;

export const DisabledOverlay = styled.View`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: ${OVERLAY_OPACITY};
  background-color: ${OVERLAY_COLOR};
`;
