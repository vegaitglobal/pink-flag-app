export const RootRoutes = {
  APP: 'app',
  GENERAL_SETTINGS: 'general_settings',
  CALENDAR_SETTINGS: 'calendar_settings',
  CALENDAR_ONBOARDING: 'calendar_onboarding',
} as const;

export const BottomTabRoutes = {
  HOME_STACK: 'home_stack',
  BLOG_STACK: 'blog_stack',
  CALENDAR_STACK: 'calendar_stack',
  DONATION_STACK: 'donation_stack',
} as const;

export const HomeRoutes = {
  HOME: 'home',
} as const;

export const BlogRoutes = {
  BLOG: 'blog',
  BLOG_DETAILS: 'blog_details',
} as const;

export const CalendarRoutes = {
  CALENDAR: 'calendar',
} as const;

export const DonationRoutes = {
  DONATIONS: 'donations',
} as const;
