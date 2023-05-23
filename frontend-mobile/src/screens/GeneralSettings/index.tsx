import React, { useCallback, useRef, useState } from 'react';
import { ModalHeader as Header } from '@pf/components';
import { Container, Content, StyledPrimaryButton, Title } from './styles';
import { NotificationInput } from './components';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '@pf/hooks';
import { selectAreBlogNotificationsEnabled, setBlogNotificationState } from '@pf/reducers/settingsReducer';
import messaging from '@react-native-firebase/messaging';
import { POSTS_TOPIC } from '@pf/constants';

const unsubscribeFromBlogTopic = async (): Promise<void> => {
  await messaging().unsubscribeFromTopic(POSTS_TOPIC);
};

const subscribeToBlogTopic = async (): Promise<void> => {
  await messaging().subscribeToTopic(POSTS_TOPIC);
};
export const GeneralSettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [switchState, setSwitchState] = useState<boolean | undefined>(undefined);
  const areBlogNotificationEnabled = useAppSelector(selectAreBlogNotificationsEnabled);

  const handleOnChange = useCallback((newValue: boolean) => {
    setSwitchState(newValue);
  }, []);

  const handleOnSave = useCallback(() => {
    if (switchState !== undefined) {
      dispatch(setBlogNotificationState(switchState));
      if (switchState) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        subscribeToBlogTopic();
        navigation.goBack();
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      unsubscribeFromBlogTopic();
    }
    navigation.goBack();
  }, [dispatch, navigation, switchState]);

  const isButtonDisabled = switchState === undefined || switchState === areBlogNotificationEnabled;

  return (
    <Container>
      <Header />
      <Title content="Podešavanja" />
      <Content>
        <NotificationInput onChange={handleOnChange} />
        <StyledPrimaryButton disabled={isButtonDisabled} content="Sačuvaj izmene" onPress={handleOnSave} />
      </Content>
    </Container>
  );
};
