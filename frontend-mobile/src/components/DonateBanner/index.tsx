import { useTheme } from '@emotion/react';
import { BottomTabNavigatorParams } from '@pf/constants';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { CustomText } from '../CustomText';
import { UiButton } from '../UiButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useGetDonationsModuleQuery } from '@pf/services';
import { DonationsModuleModel } from '@pf/models';
import { ActivityIndicatorContainer } from '@pf/components';

export const DonateBanner: React.FC<Props> = () => {
  const { data, isLoading, error } = useGetDonationsModuleQuery<DonationsModuleModel>();
  const theme = useTheme();
  const { navigate } = useNavigation<StackNavigationProp<BottomTabNavigatorParams>>();

  const styles = useMemo(() => {
    return StyleSheet.create({
      baseText: {
        fontWeight: 'bold',
        fontSize: theme.fontSize.$9Number,
        color: 'white',
        marginBottom: 10,
      },
      innerText: {
        color: 'white',
        marginBottom: 30,
        marginRight: 103,
        lineHeight: 22,
      },
    });
  }, [theme]);

  return isLoading ? (
    <ActivityIndicatorContainer />
  ) : data ? (
    <ImageBackground
      style={{
        margin: theme.spacing.$1Number,
        padding: theme.spacing.$1Number,
      }}
      imageStyle={{ borderRadius: theme.borderRadius.$2Number }}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      source={require('../../assets/images/donation.png')}>
      {data.title && data.title.length > 0 && <CustomText style={styles.baseText}>{data.title}</CustomText>}
      {data.description && data.description.length > 0 && (
        <CustomText style={styles.innerText}>{data.description}</CustomText>
      )}
      <View style={{ marginRight: 242 }}>
        <UiButton
          title={data.button_text}
          backgroundColor="white"
          fontWeight="400"
          fontSize={theme.fontSize.$3Number}
          color="black"
          onPress={() => navigate('donation')}
        />
      </View>
    </ImageBackground>
  ) : null;
};
