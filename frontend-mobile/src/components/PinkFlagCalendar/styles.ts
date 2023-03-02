import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

export const styles = StyleSheet.create({
  menstruationMarker: {
    backgroundColor: '#EC6767',
    borderRadius: 50,
    justifyContent: 'center',
  } as ViewStyle,
  fertilityMarker: {
    backgroundColor: '#F2D056',
    borderRadius: 50,
    justifyContent: 'center',
  } as ViewStyle,
  ovulationMarker: {
    backgroundColor: 'rgba(242, 208, 86, 0.1)',
    borderRadius: 50,
    borderColor: '#F2D056',
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
  } as ViewStyle,
  expectedMenstruationMarker: {
    backgroundColor: 'rgba(236, 103, 103, 0.2)',
    borderRadius: 50,
    borderColor: '#EC6767',
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
  } as ViewStyle,
  todayMarker: {
    borderWidth: 2,
    borderColor: '#EC67B1',
  } as ViewStyle,
  whiteTextMarker: {
    color: 'white',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  } as TextStyle,
  blackTextMarker: {
    color: 'black',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '700',
  } as TextStyle,
});
