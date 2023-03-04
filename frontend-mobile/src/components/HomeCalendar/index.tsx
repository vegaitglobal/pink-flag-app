/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useTheme } from '@emotion/react';
import { BottomTabNavigatorParams, BottomTabRoutes } from '@pf/constants';
import { AppTheme } from '@pf/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { StyledText } from '../CustomText/styles';
import { UiButton } from '../UiButton';

const { CALENDAR_STACK } = BottomTabRoutes;

interface Props {
  title: string;
  subtitle: string;
}

export const HomeCalendar: React.FC<Props> = ({ title, subtitle }) => {
  const theme = useTheme();
  const { navigate } = useNavigation<StackNavigationProp<BottomTabNavigatorParams>>();

  const navigateToCalendar = useCallback(() => {
    navigate(CALENDAR_STACK);
  }, [navigate]);

  return (
    <ImageBackground
      style={{
        marginTop: theme.spacing.$7Number,
        marginHorizontal: theme.spacing.$1Number,
        padding: theme.spacing.$1Number,
      }}
      imageStyle={{ borderRadius: theme.borderRadius.$2Number }}
      source={require('../../assets/images/home-calendar.png')}>
      <StyledText style={styles.baseText}>{title}</StyledText>
      <StyledText style={styles.innerText}>{subtitle}</StyledText>
      <UiButton content="Otvori kalendar" onPress={navigateToCalendar} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  baseText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 12,
    fontWeight: '700',
  },
  innerText: {
    width: '60%',
    color: 'white',
    lineHeight: 22,
    marginBottom: 24,
    fontSize: AppTheme.fontSize.$5Number,
  },
});
