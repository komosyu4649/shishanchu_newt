import {
  httpBatchLink,
  httpLink,
  loggerLink,
  createTRPCClient,
} from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import {
  AnyRouter,
  type inferRouterInputs,
  type inferRouterOutputs,
} from "@trpc/server";
import superjson from "superjson";

import { type AppRouter } from "../server/trpc/router/_app";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export const trpc = createTRPCNext<AppRouter>({
  // newtから複数のAPIを呼び出してひとつにまとめる
  // https://trpc.io/docs/ssg#-servertrpcnextts

  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        // httpLink({
        //   url: `https://seeshanchu.api.newt.so/v1`,
        //   headers: {
        //     Authorization: `Bearer cppO2mmGSgVdWu0FUvyPY3mr7KGY4-i0MwYVDbLw2Gs`,
        //   },
        // }),
        // httpBatchLink({
        //   url: "https://shishanchu.cdn.newt.so/v1",
        // }),
        // newt(ヘッドレスCMS)のAPIデータを取得する
        // 取得にはuidとtokenが必要
        // httpLink({
        //   url: "https://shishanchu.cdn.newt.so/v1",
        //   headers: {
        //     "X-Api-Key": "uid",
        //     "X-Api-Secret": "token",
        //   },
        // })
      ],
    };
  },
  ssr: false,
});

// export const newtAPI = createTRPCClient({
//   links: [
//     httpLink({
//       url: "https://seeshanchu.api.newt.so/v1/contents-248035/post",
//     }),
//   ],
// });
// export const newtAPI = createTRPCClient({
//   links: [
//     httpBatchLink({
//       links: [
//         httpLink({
//           url: `https://seeshanchu.api.newt.so/v1`,
//           headers: {
//             Authorization: `Bearer cppO2mmGSgVdWu0FUvyPY3mr7KGY4-i0MwYVDbLw2Gs`,
//           },
//         }),
//       ],
//     }),
//   ],
// });

/**
 * Inference helper for inputs
 * @example type HelloInput = RouterInputs['example']['hello']
 **/
export type RouterInputs = inferRouterInputs<AppRouter>;
/**
 * Inference helper for outputs
 * @example type HelloOutput = RouterOutputs['example']['hello']
 **/
export type RouterOutputs = inferRouterOutputs<AppRouter>;
