'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Breed, DetailsCardProps } from '../../types';

export const Api = createApi({
  reducerPath: 'Api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thecatapi.com/v1/breeds',
    prepareHeaders: (headers) => {
      headers.set(
        'x-api-key',
        'live_3CbgMb13ZFjtyL22iSqK3JakXhPppFZhgxM52h0cDrmKmGoOZ0s8HUbPRtyn3p6l'
      );
      return headers;
    },
  }),
  tagTypes: ['Breeds'],
  endpoints: (builder) => ({
    fetchAll: builder.query<Breed[], string>({
      query: () => '',
      providesTags: ['Breeds'],
    }),
    fetchSearch: builder.query<Breed[], string>({
      query: (searchTerm) => `search?q=${searchTerm}`,
      providesTags: ['Breeds'],
    }),
    fetchBreed: builder.query<DetailsCardProps, string>({
      query: (id) => `${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Breeds', id }],
    }),
  }),
});

export const { useFetchAllQuery, useFetchSearchQuery, useFetchBreedQuery } =
  Api;
