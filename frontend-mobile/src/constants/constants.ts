import { createAction } from '@reduxjs/toolkit';
import { Dimensions, Platform } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';

const { height, width } = Dimensions.get('window');
export const WIDTH = width;
export const HEIGHT = height;

export const CALENDAR_SETUP_KEY = 'CALENDAR_SETUP';
export const EMPTY_STRING = '';
export const EMPTY_ARRAY = [];

export const resetAction = createAction('reset');
export const TODAY = new Date();
export const ANDROID_CALENDAR_NOTIFICATION_CHANNEL = 'kalendar-notifikacije';
export const ANDROID_BLOG_NOTIFICATION_CHANNEL = 'blog-notifikacije';

export const POSTS_TOPIC = 'posts';
export const FCM_TOKEN = 'fcmToken';
