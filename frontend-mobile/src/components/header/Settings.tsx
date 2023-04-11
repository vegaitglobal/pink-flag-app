import { useTheme } from '@emotion/react';
import { AppTheme } from '@pf/theme';
import React, { useState } from 'react';
import { Modal, StyleSheet, Switch, View, Pressable } from 'react-native';
import { ExitSvg } from '../../assets';
import { CustomText } from '../CustomText';
import { UiButton } from '../UiButton';

export interface SettingsProps {
  modalIsVisible: boolean;
  closeModal: () => void;
}

export const Settings: React.FC<SettingsProps> = ({ modalIsVisible, closeModal }: SettingsProps) => {
  const [notificationStatus, setNotificationStatus] = useState(false);
  const theme = useTheme();

  return (
    <Modal visible={modalIsVisible}>
      <View style={styles.settingsContainer}>
        <Pressable onPress={closeModal}>
          <View style={styles.exitIconContainer}>
            <ExitSvg></ExitSvg>
          </View>
        </Pressable>

        <View style={styles.titleContainer}>
          <CustomText style={styles.titleText}>Podešavanja</CustomText>
        </View>

        <View style={styles.settingsItemsContainer}>
          <View style={styles.settingsItemContainer}>
            <CustomText style={styles.settingsItemText}>Notifikacija za novi post?</CustomText>
            <Switch
              trackColor={{ false: theme.colors.description, true: theme.colors.success }}
              thumbColor={theme.colors.white}
              ios_backgroundColor={notificationStatus ? theme.colors.success : theme.colors.description}
              onValueChange={() => {
                setNotificationStatus(!notificationStatus);
              }}
              value={notificationStatus}
            />
          </View>
        </View>

        <View style={styles.actionContainer}>
          <UiButton content="Sačuvaj izmene" onPress={() => console.log('test')}></UiButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    flex: 1,
    padding: 20,
  },
  exitIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: AppTheme.fontSize.$8Number,
  },
  settingsItemsContainer: {
    flex: 6,
  },
  settingsItemContainer: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  settingsItemText: {
    fontSize: AppTheme.fontSize.$5Number,
    fontWeight: 'bold',
  },

  actionContainer: {
    flex: 3,
  },
});
