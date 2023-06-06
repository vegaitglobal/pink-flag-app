import { StyleProps, withTiming } from 'react-native-reanimated';

const Y_OFFSET = 61;
const ANIMATION_DURATION = 400;

export const SlideInEntering = () => {
  'worklet';
  const animations: StyleProps = {
    originY: withTiming(Y_OFFSET, { duration: ANIMATION_DURATION }),
  };
  const initialValues = {
    originY: 0,
  };

  return {
    initialValues,
    animations,
  };
};

export const SlideInExiting = () => {
  'worklet';
  const animations: StyleProps = {
    originY: withTiming(0, { duration: ANIMATION_DURATION }),
  };
  const initialValues = {
    originY: Y_OFFSET,
  };

  return {
    initialValues,
    animations,
  };
};
