import React, { useCallback, useEffect, useState } from 'react';
import { Container, Content, Description, StyledNoConnectionSvg, Title } from './styles';
import { FadeIn, FadeOut, runOnJS } from 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';

const INITIALIZATION_DELAY = 1500;

export const NoConnectionOverlay: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoved, setIsRemoved] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsInitialized(true), INITIALIZATION_DELAY);
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    const unsubscribe = NetInfo.addEventListener(netInfo => {
      if (netInfo.isInternetReachable === null) {
        return;
      }

      if (!netInfo.isInternetReachable) {
        setIsRemoved(false);
      }

      setIsVisible(!netInfo.isInternetReachable);
    });

    return () => {
      unsubscribe();
    };
  }, [isInitialized]);

  const onExiting = useCallback((isFinished: boolean) => {
    'worklet';
    if (!isFinished) {
      return;
    }

    runOnJS(setIsRemoved)(true);
  }, []);

  if (isRemoved) {
    return null;
  }

  return (
    <Container>
      {isVisible && (
        <Content entering={FadeIn} exiting={FadeOut.withCallback(onExiting)}>
          <StyledNoConnectionSvg />
          <Title content={'Proveri internet konekciju'} />
          <Description content={'Stranica koju bi otvorila zahteva internet konekciju.'} />
        </Content>
      )}
    </Container>
  );
};
