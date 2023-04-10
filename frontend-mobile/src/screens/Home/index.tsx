import React, { useEffect, useMemo } from 'react';
import { DonateBanner, Footer, HomeCalendar, HomeNews, Intro } from '@pf/components';
import { ScrollView } from 'react-native-gesture-handler';
import { getStyles } from './styles';
import { useTheme } from '@emotion/react';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { IS_IOS } from '@pf/constants';

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
      <Intro
        heading="Pink Flag"
        subheading="Dobrodošli na PINK FLAG aplikaciju Ženske inicijative koja radi na otklanjanju menstrualnog siromaštva i informisanju zajednice o potrebi besplatnih menstrualnih uložaka u svim obrazovnim ustanovama širom Republike Srbije."
        buttonData={{ link: '/', title: 'Saznaj vise o nama' }}
      />
      <HomeCalendar
        title="Moj Kalendar"
        subtitle="Lorem ipsum dolor sit amet consectetur adipiscing, elit lacus pellentesque penatibus "
      />
      <HomeNews />
      <DonateBanner />
      <Footer />
    </ScrollView>
  );
};
