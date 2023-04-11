import React, { useEffect, useMemo } from 'react';
import { Footer, HomeCalendar, HomeNews, Intro } from '@pf/components';
import { ScrollView } from 'react-native-gesture-handler';
import { getStyles, StyledDonateBanner } from './styles';
import { useTheme } from '@emotion/react';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { IS_IOS } from '@pf/constants';
import { InstagramFeed } from './components';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const inlineStyles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    const handlePushNotificationsPermissions = async (): Promise<void> => {
      IS_IOS
        ? await messaging().requestPermission()
        : await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION);
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handlePushNotificationsPermissions();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={inlineStyles.scrollView}
      contentContainerStyle={inlineStyles.content}>
      <Intro />
      <HomeCalendar title="Moj Kalendar" subtitle="Započni praćenje svog menstrualnog ciklusa!" />
      <HomeNews />
      <StyledDonateBanner />
      <InstagramFeed />
      <Footer />
    </ScrollView>
  );
};
