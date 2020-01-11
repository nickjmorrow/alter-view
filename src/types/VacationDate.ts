import { HolidayDate } from 'types/HolidayDate';
import { SelectedDate } from 'types/SelectedDate';
import { ConnectedDate } from 'types/ConnectedDate';

export type VacationDate = HolidayDate | ConnectedDate | SelectedDate;
