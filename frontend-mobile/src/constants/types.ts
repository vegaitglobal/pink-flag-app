export type ValueOf<T> = T[keyof T];

export interface AuthenticatedUser {
  id?: string;
  name?: string;
  email?: string;
  photo?: string;
}

export interface UserState extends AuthenticatedUser {
  birthday?: string;
  menstruationLength?: number;
  cycleLength?: number;
  menstruationStartDate?: string;
}

export type UserApiParams = {
  userId: string;
  email: string;
};

export type UserBodyParams = {
  name: string;
  date_of_birth: string;
  menstruation_length: number;
  cycle_length: number;
  menstruation_start_date: string;
  email: string;
  google_id: string;
};

export type UserResponse = UserBodyParams;
