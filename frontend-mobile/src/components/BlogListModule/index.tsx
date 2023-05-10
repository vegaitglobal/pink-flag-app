import React, { useCallback, useRef, useState } from 'react';
import { Blogs, TabBar, News } from './components';
import { Container, Indicator, IndicatorContainer } from './styles';
import { IS_IOS, WIDTH } from '@pf/constants';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const TAB_DELAY = 400;
const RIGHT_SPACING = 20;
const DECELERATION_RATE = IS_IOS ? 0 : 'normal';

export const BlogListModule: React.FC = () => {
  const listRef = useRef<Animated.ScrollView>(null);
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useSharedValue(0);
  const isTabPressed = useRef(false);

  const scrollHandler = useAnimatedScrollHandler(event => {
    const x = event.contentOffset.x;
    translateX.value = x;
    if (activeTab !== 2 && !isTabPressed.current) {
      runOnJS(setActiveTab)(2);
    }
  });

  const handleOnScrollEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (isTabPressed.current) {
        return;
      }

      const x = event.nativeEvent.contentOffset.x;
      const indexOfNextSlide = Math.floor(x / WIDTH);
      const isDifferentSlide = indexOfNextSlide !== activeTab;
      const isValidSlide = indexOfNextSlide >= 0;
      if (isDifferentSlide && isValidSlide) {
        runOnJS(setActiveTab)(indexOfNextSlide);
      }
    },
    [activeTab],
  );

  const onTabPress = useCallback((index: number) => {
    isTabPressed.current = true;
    listRef.current?.scrollTo({ x: index * WIDTH, animated: true });
    setActiveTab(index);
    setTimeout(() => (isTabPressed.current = false), TAB_DELAY);
  }, []);

  const indicatorStyle = useAnimatedStyle(() => {
    const translateXValue = interpolate(translateX.value, [-WIDTH, 0, WIDTH], [-WIDTH, 0, WIDTH / 2 - RIGHT_SPACING]);
    return {
      transform: [{ translateX: translateXValue }],
    };
  });

  return (
    <Container>
      <TabBar activeIndex={activeTab} onPress={onTabPress} />
      <IndicatorContainer>
        <Indicator style={indicatorStyle} />
      </IndicatorContainer>
      <Animated.ScrollView
        horizontal
        ref={listRef}
        pagingEnabled
        snapToInterval={WIDTH}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        decelerationRate={DECELERATION_RATE}
        onMomentumScrollEnd={handleOnScrollEnd}
        showsHorizontalScrollIndicator={false}>
        <Blogs />
        <News />
      </Animated.ScrollView>
    </Container>
  );
};
