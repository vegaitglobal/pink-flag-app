import React, { useMemo } from 'react';
import { DonateBanner, Footer, HomeCalendar, HomeNews, Intro } from '@pf/components';
import { ScrollView } from 'react-native-gesture-handler';
import { getStyles } from './styles';
import { useTheme } from '@emotion/react';
import { InstagramFeed } from './components';

export const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const inlineStyles = useMemo(() => getStyles(theme), [theme]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={inlineStyles.scrollView}
      contentContainerStyle={inlineStyles.content}>
      <Intro />
      <HomeCalendar title="Moj Kalendar" subtitle="Započni praćenje svog menstrualnog ciklusa!" />
      <HomeNews />
      <DonateBanner />
      <InstagramFeed />
      <Footer />
    </ScrollView>
  );
};
