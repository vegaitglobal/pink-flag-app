import { ArrowBackSvg, LogoSvg, SettingsSvg } from '@pf/assets';
import { HomeRoutes, RootRoutes } from '@pf/constants';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { CloseButton } from '../ModalHeader/styles';
import { Container, OptionsButton, PressableLogo, Row, SafeArea, styles } from './styles';

interface OwnProps {
  isSettingsVisible?: boolean;
  onSettingsPress?: () => void;
}

type Props = NativeStackHeaderProps & OwnProps;
const HIT_SLOP = { top: 10, left: 10, right: 10, bottom: 10 };
const { GENERAL_SETTINGS } = RootRoutes;
const { HOME } = HomeRoutes;

export const NavHeader: React.FC<Props> = ({
  onSettingsPress,
  isSettingsVisible = true,
  back,
  navigation: { navigate, goBack },
}) => {
  const handleOnSettingsPress = useCallback(() => {
    if (onSettingsPress) {
      onSettingsPress();
      return;
    }

    navigate(GENERAL_SETTINGS);
  }, [navigate, onSettingsPress]);

  const handleOnLogoPress = useCallback(() => {
    navigate(HOME);
  }, [navigate]);

  return (
    <SafeArea>
      <Container style={styles.shadow}>
        <Row>
          {back && (
            <CloseButton hitSlop={HIT_SLOP} onPress={goBack}>
              <ArrowBackSvg />
            </CloseButton>
          )}
          <PressableLogo hitSlop={HIT_SLOP} onPress={handleOnLogoPress}>
            <LogoSvg />
          </PressableLogo>
          {isSettingsVisible && (
            <OptionsButton hitSlop={HIT_SLOP} onPress={handleOnSettingsPress}>
              <SettingsSvg />
            </OptionsButton>
          )}
        </Row>
      </Container>
    </SafeArea>
  );
};
