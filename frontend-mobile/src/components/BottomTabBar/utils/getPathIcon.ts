import {
  HomeSvg,
  HomeFilledSvg,
  BlogSvg,
  BlogFilledSvg,
  CalendarSvg,
  CalendarFilledSvg,
  DonateSvg,
  DonateFilledSvg,
} from '@pf/assets';
import { BottomTabRoutes } from '@pf/constants';
import { SvgProps } from 'react-native-svg';

const { HOME_STACK, BLOG_STACK, CALENDAR_STACK, DONATION_STACK } = BottomTabRoutes;

const ICONS = {
  [HOME_STACK]: HomeSvg,
  [HOME_STACK + '_active']: HomeFilledSvg,
  [BLOG_STACK]: BlogSvg,
  [BLOG_STACK + '_active']: BlogFilledSvg,
  [CALENDAR_STACK]: CalendarSvg,
  [CALENDAR_STACK + '_active']: CalendarFilledSvg,
  [DONATION_STACK]: DonateSvg,
  [DONATION_STACK + '_active']: DonateFilledSvg,
};

export const getPathIcon = (path: string, isFocused: boolean): React.FC<SvgProps> => {
  const key = path + (isFocused ? `_active` : '');

  return ICONS[key];
};
