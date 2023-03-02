import styled from '@emotion/native';
import { unit } from '@pf/utils';
import { CustomText } from '../CustomText';
import { ReminderType } from './types';

const TEXT_VERTICAL = 18;

export const Container = styled.ImageBackground`
  overflow: hidden;
  justify-content: center;
  padding-vertical: ${unit(TEXT_VERTICAL)};
  border-radius: ${({ theme }) => theme.borderRadius.$2};
  padding-horizontal: ${({ theme }) => theme.spacing.$2};
`;

export const StyledCustomText = styled(CustomText)<{ type: ReminderType }>`
  font-size: ${({ theme }) => theme.fontSize.$6};
  line-height: ${({ theme }) => theme.lineHeight.$5};
  font-weight: ${({ theme }) => theme.fontWeight.$700};
  ${({ theme, type }) => type === 'period' && `color: ${theme.colors.white};`};
`;
