import { BottomTabRoutes } from '@pf/constants';

const { HOME_STACK, BLOG_STACK, CALENDAR_STACK, DONATION_STACK } = BottomTabRoutes;

const PathNames = {
  [HOME_STACK]: 'Početna',
  [BLOG_STACK]: 'Blog',
  [CALENDAR_STACK]: 'Moj Kalendar',
  [DONATION_STACK]: 'Doniraj',
};
export type PathName = keyof typeof PathNames;

export const getPathName = (path: PathName): string => {
  return PathNames[path];
};
