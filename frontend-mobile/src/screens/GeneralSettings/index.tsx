import React, { useCallback, useRef } from 'react';
import { ModalHeader as Header } from '@pf/components';
import { Container, Content, StyledPrimaryButton, Title } from './styles';
import { NotificationInput } from './components';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@pf/hooks';
import { setBlogNotificationState } from '@pf/reducers/settingsReducer';

export const GeneralSettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const switchState = useRef<boolean | undefined>(undefined);

  const handleOnChange = useCallback((newValue: boolean) => {
    switchState.current = newValue;
  }, []);

  const handleOnSave = useCallback(() => {
    if (switchState.current !== undefined) {
      dispatch(setBlogNotificationState(switchState.current));
    }
    navigation.goBack();
  }, [dispatch, navigation]);

  return (
    <Container>
      <Header />
      <Title content="Podešavanja" />
      <Content>
        <NotificationInput onChange={handleOnChange} />
        <StyledPrimaryButton content="Sačuvaj izmene" onPress={handleOnSave} />
      </Content>
    </Container>
  );
};
