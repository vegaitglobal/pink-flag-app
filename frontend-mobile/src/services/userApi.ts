import { UserApiParams, UserBodyParams, UserResponse } from '@pf/constants';
import { rootApi } from './rootApi';

export const usersApi = rootApi.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query<UserResponse, UserApiParams>({
      query: ({ userId, email }) => `core/consumer/${email}/${userId}`,
    }),

    createUser: builder.mutation<UserResponse, UserApiParams & UserBodyParams>({
      query: ({
        name,
        email,
        cycle_length,
        date_of_birth,
        google_id,
        menstruation_length,
        menstruation_start_date,
      }) => {
        return {
          url: `core/consumer`,
          method: 'POST',
          body: {
            name,
            email,
            cycle_length,
            date_of_birth,
            google_id,
            menstruation_length,
            menstruation_start_date,
          },
        };
      },
    }),

    updateUser: builder.mutation<unknown, UserApiParams & UserBodyParams>({
      query: ({
        userId,
        email,
        name,
        cycle_length,
        date_of_birth,
        google_id,
        menstruation_length,
        menstruation_start_date,
      }) => {
        return {
          url: `core/consumer/${email}/${userId}`,
          method: 'PUT',
          body: {
            name,
            email,
            cycle_length,
            date_of_birth,
            google_id,
            menstruation_length,
            menstruation_start_date,
          },
        };
      },
    }),

    deleteUser: builder.mutation<unknown, UserApiParams>({
      query: ({ userId, email }) => {
        return {
          url: `core/consumer/${email}/${userId}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const { useLazyGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApi;
