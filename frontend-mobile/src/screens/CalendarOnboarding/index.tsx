import React, { useCallback, useRef } from 'react';
import { ModalHeader as Header } from '@pf/components';
import { Container, StyledPagerView } from './styles';
import { LoginScreen, OnboardingScreen } from './screens';
import PagerView from 'react-native-pager-view';

const START_FROM_SECOND_SCREEN = 1;

export const CalendarOnboardingScreen: React.FC = () => {
  const pagerViewRef = useRef<PagerView>(null);
  const nextScreen = useRef(START_FROM_SECOND_SCREEN);

  const scrollToNext = useCallback((): void => {
    pagerViewRef.current?.setPage(nextScreen.current);
    nextScreen.current += 1;
  }, []);

  return (
    <Container>
      <Header />
      <StyledPagerView scrollEnabled={false} ref={pagerViewRef}>
        <LoginScreen onLogin={scrollToNext} />
        <OnboardingScreen />
      </StyledPagerView>
    </Container>
  );
};
