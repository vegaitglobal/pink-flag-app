import { useAppDispatch } from '@pf/hooks';
import { TODAY } from '../../../constants/constants';
import { useEffect } from 'react';
import {
  getDateWithOffset,
  getLastMenstruationStartDate,
  getPreviousMenstruationStartDate,
  getUpcomingMenstruationStartDate,
} from '../utils';
import { setMenstruationStartDate } from '@pf/reducers/userReducer';

export const useLastMenstruationDateUpdate = (savedMenstruationStartDate?: string, cycleLength?: number): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!savedMenstruationStartDate || !cycleLength) {
      return;
    }

    const actualStartDate = getDateWithOffset(savedMenstruationStartDate, cycleLength, TODAY);
    const previousStartDate = getPreviousMenstruationStartDate(actualStartDate, cycleLength);
    const upcomingStartDate = getUpcomingMenstruationStartDate(actualStartDate, cycleLength);
    const lastMenstruationStartDate = getLastMenstruationStartDate(
      previousStartDate,
      actualStartDate,
      upcomingStartDate,
    );

    if (savedMenstruationStartDate !== lastMenstruationStartDate) {
      dispatch(setMenstruationStartDate(lastMenstruationStartDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
