import { createAction } from '@reduxjs/toolkit';
import { Dimensions, Platform } from 'react-native';

export const IS_IOS = Platform.OS === 'ios';

const { height, width } = Dimensions.get('window');
export const WIDTH = width;
export const HEIGHT = height;

export const CALENDAR_SETUP_KEY = 'CALENDAR_SETUP';
export const EMPTY_STRING = '';

export const resetAction = createAction('reset');
