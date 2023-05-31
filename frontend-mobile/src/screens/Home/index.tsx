import React, { useEffect, useMemo } from 'react';
import { Footer, HomeCalendar, HomeNews, Intro } from '@pf/components';
import { ScrollView } from 'react-native-gesture-handler';
import { getStyles, StyledDonateBanner } from './styles';
import { useTheme } from '@emotion/react';
import { InstagramFeed } from './components';
import { useAppSelector, useUserDataAlignment } from '@pf/hooks';
import { selectUserCredentials } from '@pf/reducers/userReducer';

const checkOnce = (): boolean => true;

export const HomeScreen: React.FC = () => {
  const { id: userId, email } = useAppSelector(selectUserCredentials, checkOnce);
  const { syncWithRemoteUser } = useUserDataAlignment();
  const theme = useTheme();
  const inlineStyles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    syncWithRemoteUser(userId, email);
  }, [syncWithRemoteUser, email, userId]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={inlineStyles.scrollView}
      contentContainerStyle={inlineStyles.content}>
      <Intro />
      <HomeCalendar />
      <HomeNews />
      <StyledDonateBanner />
      <InstagramFeed />
      <Footer />
    </ScrollView>
  );
};
