import React, { useCallback, useRef, useState } from 'react';
import { ModalHeader as Header } from '@pf/components';
import { Container, StyledPagerView } from './styles';
import { LoginScreen, OnboardingScreen } from './screens';
import PagerView from 'react-native-pager-view';
import { AuthenticatedUser, RootNavigatorScreenProps, RootRoutes } from '@pf/constants';
import { useUserDataAlignment } from '@pf/hooks';
import { useNavigation } from '@react-navigation/native';

const INITIAL_SCREEN = 0;
const START_FROM_SECOND_SCREEN = 1;
const { CALENDAR_ONBOARDING } = RootRoutes;
type Props = RootNavigatorScreenProps<typeof CALENDAR_ONBOARDING>;

export const CalendarOnboardingScreen: React.FC<Props> = ({ route }) => {
  const { goBack } = useNavigation();
  const { skipFirstPage } = route.params || {};
  const { syncWithRemoteUser } = useUserDataAlignment();
  const pagerViewRef = useRef<PagerView>(null);
  const nextScreen = useRef(START_FROM_SECOND_SCREEN);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | undefined>(undefined);

  const scrollToNext = useCallback((): void => {
    pagerViewRef.current?.setPage(nextScreen.current);
    nextScreen.current += 1;
  }, []);

  const handleOnLogin = useCallback(
    async (authenticatedUser?: AuthenticatedUser) => {
      const { id, email, photo } = authenticatedUser || {};
      const isRegistered = await syncWithRemoteUser(id, email, photo);

      if (isRegistered) {
        goBack();
        return;
      }

      setAuthenticatedUser(authenticatedUser);
      scrollToNext();
    },
    [goBack, scrollToNext, syncWithRemoteUser],
  );

  return (
    <Container>
      <Header />
      <StyledPagerView
        scrollEnabled={false}
        ref={pagerViewRef}
        initialPage={skipFirstPage ? START_FROM_SECOND_SCREEN : INITIAL_SCREEN}>
        <LoginScreen onLogin={handleOnLogin} onAnonymousLogin={scrollToNext} />
        <OnboardingScreen authenticatedUser={authenticatedUser} />
      </StyledPagerView>
    </Container>
  );
};
