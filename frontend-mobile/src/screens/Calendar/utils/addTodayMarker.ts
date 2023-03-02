import { CalendarMarkerStyles, CalendarMarkerType } from '@pf/components';

const TodayMarker = CalendarMarkerStyles.TodayMarker;

export const addTodayMarker = (marker: CalendarMarkerType): CalendarMarkerType => {
  return {
    customStyles: {
      ...marker.customStyles,
      container: {
        ...marker.customStyles.container,
        ...TodayMarker.customStyles.container,
      },
    },
  };
};
