import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const metricsApi = createApi({
  reducerPath: "metricsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    prepareHeaders: (headers) => {
      // We will handle the dynamic URL in the query itself or by using a custom baseQuery
      // But for simplicity with RTK Query and dynamic URLs, we can use the `url` argument in endpoints
      // or construct a dynamic baseQuery.
      // Here we'll use a dynamic baseQuery approach wrapper if needed, but actually
      // we can just pass the full URL to the query.
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMetrics: builder.query<any, { url: string; key: string }>({
      query: ({ url, key }) => {
        // Ensure URL doesn't end with slash
        const baseUrl = url.replace(/\/$/, "");
        return `${baseUrl}/api/admin/metrics?key=${key}`;
      },
    }),
  }),
});

export const { useGetMetricsQuery } = metricsApi;
