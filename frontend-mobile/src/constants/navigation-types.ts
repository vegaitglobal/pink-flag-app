import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BlogRoutes, CalendarRoutes, DonationRoutes, HomeRoutes, BottomTabRoutes, RootRoutes } from './routes';

const { APP, CALENDAR_ONBOARDING, CALENDAR_SETTINGS, GENERAL_SETTINGS } = RootRoutes;
const { HOME_STACK, BLOG_STACK, CALENDAR_STACK, DONATION_STACK } = BottomTabRoutes;
const { HOME } = HomeRoutes;
const { BLOG, BLOG_DETAILS } = BlogRoutes;
const { CALENDAR } = CalendarRoutes;
const { DONATIONS } = DonationRoutes;

export type RootNavigatorParams = {
  [APP]: undefined;
  [CALENDAR_ONBOARDING]: undefined;
  [CALENDAR_SETTINGS]: undefined;
  [GENERAL_SETTINGS]: undefined;
};

export type BottomTabNavigatorParams = {
  [HOME_STACK]: undefined;
  [BLOG_STACK]: undefined;
  [CALENDAR_STACK]: undefined;
  [DONATION_STACK]: undefined;
};

export type HomeNavigatorParams = {
  [HOME]: undefined;
  [BLOG_DETAILS]: { id: number };
};

export type BlogNavigatorParams = {
  [BLOG]: undefined;
  [BLOG_DETAILS]: { id: number };
};

export type DonationNavigatorParams = {
  [DONATIONS]: undefined;
};

export type CalendarNavigatorParams = {
  [CALENDAR]: undefined;
};

export type CalendarNavigatorScreenProps<Screen extends keyof CalendarNavigatorParams> = NativeStackScreenProps<
  CalendarNavigatorParams & RootNavigatorParams,
  Screen
>;

export type RootNavigatorScreenProps<Screen extends keyof RootNavigatorParams> = NativeStackScreenProps<
  RootNavigatorParams,
  Screen
>;
