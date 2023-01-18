import { PrimaryButton, WithSafeView } from '@pf/components';
import { EMPTY_STRING } from '@pf/constants';
import { useAppDispatch, useAppSelector } from '@pf/hooks';
import { setCalendarNotificationState } from '@pf/reducers/settingsReducer';
import { selectUser, updateUser } from '@pf/reducers/userReducer';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Subtitle } from '../../styles';
import { BirthdayInput } from '../BirthdayInput';
import { CycleInput } from '../CycleInput';
import { DeactivationModal } from '../DeactivationModal';
import { GoogleAccountButton } from '../GoogleAccountButton';
import { MenstruationInput } from '../MenstruationInput';
import { NameInput } from '../NameInput';
import { NotificationInput } from '../NotificationInput';
import { Container, LinkButton, LinkText, LargeSpacing, MediumSpacing, SmallSpacing } from './styles';
import { useChangeHandlers } from './useChangeHandlers';

const HIT_SLOP = { top: 10, left: 10, right: 10, bottom: 10 };

export const Content: React.FC = WithSafeView(() => {
  const { goBack } = useNavigation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [isDeactivationModalVisible, setIsDeactivationModalVisible] = useState(false);
  const toggleDeactivationModal = useCallback(() => setIsDeactivationModalVisible(prevState => !prevState), []);
  const {
    changes,
    notificationsState,
    handleNameChange,
    handleBirthdayChange,
    handleCycleLengthChange,
    handleMenstruationLengthChange,
    handleOnNotificationsChange,
  } = useChangeHandlers();

  const handleOnSave = useCallback(() => {
    dispatch(updateUser(changes));

    if (notificationsState.current !== undefined) {
      dispatch(setCalendarNotificationState(notificationsState.current));
    }

    goBack();
  }, [changes, dispatch, goBack, notificationsState]);

  return (
    <Container>
      <GoogleAccountButton />
      <Subtitle content="Kako se zoveš?" />
      <NameInput initialValue={user.name} onChange={handleNameChange} />
      <SmallSpacing />
      <BirthdayInput value={user.birthday} onChange={handleBirthdayChange} />
      <MediumSpacing />
      <MenstruationInput
        value={`${user.menstruationLength || EMPTY_STRING}`}
        onChange={handleMenstruationLengthChange}
      />
      <MediumSpacing />
      <CycleInput value={`${user.cycleLength || EMPTY_STRING}`} onChange={handleCycleLengthChange} />
      <MediumSpacing />
      <NotificationInput onChange={handleOnNotificationsChange} />
      <LargeSpacing />
      <PrimaryButton content="Sačuvaj izmene" onPress={handleOnSave} />
      <LinkButton hitSlop={HIT_SLOP} onPress={toggleDeactivationModal}>
        <LinkText content="Deaktiviraj kalendar" />
      </LinkButton>
      <DeactivationModal isVisible={isDeactivationModalVisible} hide={toggleDeactivationModal} closeModal={goBack} />
    </Container>
  );
});
