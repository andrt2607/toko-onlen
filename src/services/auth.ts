//membuat API slice

import BaseResponse from "@/types/response";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

interface AuthResponse extends BaseResponse {
  data: UserSignUpForm;
}

//ini harusnya menyesuaikan payload yg ada di API, karena akan di pass ke sana
type UserSignUpForm = {
  name: string;
  email: string;
  password: string;
};

//disini pembuatan API slice nya
//reducer => unique key yang akan tersimpan di store redux
//endpoint - 1. mutation[untuk menghandle post, put dan delete] 2. query [untuk menghandle mengambil data]
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, UserSignUpForm>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
    }),
    // search: builder.mutation<any, any>({
    //     query: (body) => ({
    //         url: '/auth/sign-up',
    //         method: 'POST',
    //         body,
    //     })
    // })
  }),
});

export const { useRegisterMutation } = authApi;
