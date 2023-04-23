import styled from '@emotion/native';
import { StyleSheet } from 'react-native';

const BACKGROUND = '#C4C4C4';

export const Container = styled.View`
  overflow: hidden;
  background-color: ${BACKGROUND};
`;

export const Loader = styled.View`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

export const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
