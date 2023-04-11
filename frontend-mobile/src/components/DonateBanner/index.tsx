/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useCallback } from 'react';
import { Container, Description, Title } from './styles';
import { UiButton } from '@pf/components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigatorParams, BottomTabRoutes } from '@pf/constants';

const { DONATION_STACK } = BottomTabRoutes;

export const DonateBanner: React.FC = ({ ...props }) => {
  // const {} = useGetDonationsModuleQuery<DonationsModuleModel>();
  const { navigate } = useNavigation<StackNavigationProp<BottomTabNavigatorParams>>();
  const handleOnPress = useCallback(() => navigate(DONATION_STACK), [navigate]);

  return (
    <Container source={require('../../assets/images/donation.png')} resizeMode="stretch" {...props}>
      <Title content="Podrži akciju i doniraj za uloške" />
      <Description content="Razvoj i unapređenje Ženske inicijative zavisi od podrške svih vas. Ukoliko želiš da budeš deo promene klikni na DONIRAJ" />
      <UiButton content="Doniraj" onPress={handleOnPress} />
    </Container>
  );
};

// export const DonateBanner: React.FC<Props> = () => {
//   const { data, isLoading, error } = useGetDonationsModuleQuery<DonationsModuleModel>();

//   return isLoading ? (
//     <ActivityIndicatorContainer />
//   ) : data ? (
//     <ImageBackground
//       style={{
//         margin: theme.spacing.$1Number,
//         padding: theme.spacing.$1Number,
//       }}
//       imageStyle={{ borderRadius: theme.borderRadius.$2Number }}
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//       source={require('../../assets/images/donation.png')}>
//       {data.title && data.title.length > 0 && <CustomText style={styles.baseText}>{data.title}</CustomText>}
//       {data.description && data.description.length > 0 && (
//         <CustomText style={styles.innerText}>{data.description}</CustomText>
//       )}
//       <View style={{ marginRight: 242 }}>
//         <UiButton
//           title={data.button_text}
//           onPress={() => navigate('donation')}
//         />
//       </View>
//     </ImageBackground>
//   ) : null;
// };
