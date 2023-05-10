import React, { useMemo } from 'react';
import { Footer, HomeCalendar, HomeNews, Intro } from '@pf/components';
import { ScrollView } from 'react-native-gesture-handler';
import { getStyles, StyledDonateBanner } from './styles';
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
      <HomeCalendar />
      <HomeNews />
      <StyledDonateBanner />
      <InstagramFeed />
      <Footer />
    </ScrollView>
  );
};
