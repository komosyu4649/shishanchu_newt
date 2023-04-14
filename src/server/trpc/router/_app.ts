import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { newtRouter } from "./newt";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  newt: newtRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
