import { ViewStyle, TextStyle } from 'react-native';
import { styles } from './styles';

export type CycleEventType = 'menstruation' | 'expectedMenstruationStart' | 'ovulation' | 'fertility';

export type CycleEvent = {
  date: Date;
  type: CycleEventType;
};

export type MarkerType = {
  customStyles: {
    container: ViewStyle;
    text: TextStyle;
  };
};

export const MarkerStyles = {
  ['MenstruationMarker']: {
    customStyles: {
      container: styles.menstruationMarker,
      text: styles.whiteTextMarker,
    },
  },
  ['FertilityMarker']: {
    customStyles: {
      container: styles.fertilityMarker,
      text: styles.whiteTextMarker,
    },
  },
  ['ExpectedMenstruationMarker']: {
    customStyles: {
      container: styles.expectedMenstruationMarker,
      text: styles.blackTextMarker,
    },
  },
  ['OvulationMarker']: {
    customStyles: {
      container: styles.ovulationMarker,
      text: styles.blackTextMarker,
    },
  },
  ['TodayMarker']: {
    customStyles: {
      container: styles.todayMarker,
    },
  },
};
