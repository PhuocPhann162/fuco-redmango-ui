// src/mocks/handlers.ts

import { http, HttpResponse, bypass } from "msw";

export const handlers = [
  http.get("https://localhost:7016/api/Coupon", async ({ request }) => {
    const originalResponse = await fetch(bypass(request));
    const originalJson = await originalResponse.json();

    return HttpResponse.json({
      ...originalJson,
      mocked: true,
    });
  }),
  http.get("https://localhost:7016/api/Coupon/:id", async ({ request }) => {
    const originalResponse = await fetch(bypass(request));
    const originalJson = await originalResponse.json();

    return HttpResponse.json({
      ...originalJson,
      mocked: true,
    });
  }),

  http.get(
    "https://localhost:7016/api/Coupon/getByCode/:code",
    async ({ request }) => {
      const originalResponse = await fetch(bypass(request));
      const originalJson = await originalResponse.json();

      return HttpResponse.json({
        ...originalJson,
        mocked: true,
      });
    }
  ),
];
