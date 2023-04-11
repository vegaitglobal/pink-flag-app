import styled from '@emotion/native';
import { unit } from '@pf/utils';
import { StyleSheet } from 'react-native';

const HEIGHT = 72;
const RIGHT_SPACING = 32;

//! TODO: Check shadow.
export const SafeArea = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.white};
  // box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.16);
`;

export const Container = styled.View`
  height: ${unit(HEIGHT)};
  justify-content: center;
`;

export const Row = styled.View`
  justify-content: center;
`;

export const PressableLogo = styled.Pressable`
  position: absolute;
  align-self: center;
`;

export const OptionsButton = styled.TouchableOpacity`
  position: absolute;
  right: ${unit(RIGHT_SPACING)};
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: ${({ theme }) => theme.spacing.$1};
`;

export const styles = StyleSheet.create({
  shadow: {
    elevation: 1,
    shadowOpacity: 0,
    borderBottomWidth: 2,
    borderColor: `rgba(0, 0, 0, 0.16)`,
  },
});
