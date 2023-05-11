import { NavigatorScreenParams } from '@react-navigation/native';
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
  [HOME_STACK]: NavigatorScreenParams<HomeNavigatorParams> | undefined;
  [HOME_STACK]: NavigatorScreenParams<HomeNavigatorParams> | undefined;
  [BLOG_STACK]: NavigatorScreenParams<BlogNavigatorParams> | undefined;
  [CALENDAR_STACK]: NavigatorScreenParams<CalendarNavigatorParams> | undefined;
  [DONATION_STACK]: NavigatorScreenParams<DonationNavigatorParams> | undefined;
};

export type HomeNavigatorParams = {
  [HOME]: undefined;
  [BLOG_DETAILS]: { id: number };
};

export type BlogNavigatorParams = {
  [BLOG]: undefined;
  [BLOG_DETAILS]: { id: number } | undefined;
};

export type DonationNavigatorParams = {
  [DONATIONS]: undefined;
};

export type CalendarNavigatorParams = {
  [CALENDAR]: { isOpenedFromNotification?: boolean } | undefined;
};

export type CalendarNavigatorScreenProps<Screen extends keyof CalendarNavigatorParams> = NativeStackScreenProps<
  CalendarNavigatorParams & RootNavigatorParams,
  Screen
>;

export type RootNavigatorScreenProps<Screen extends keyof RootNavigatorParams> = NativeStackScreenProps<
  RootNavigatorParams,
  Screen
>;

export type BlogNavigatorScreenProps<Screen extends keyof BlogNavigatorParams> = NativeStackScreenProps<
  BlogNavigatorParams,
  Screen
>;
