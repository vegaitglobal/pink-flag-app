export type ValueOf<T> = T[keyof T];

export interface UserState {
  name?: string;
  birthday?: string;
  menstruationLength?: number;
  cycleLength?: number;
  menstruationStartDate?: string;
}
