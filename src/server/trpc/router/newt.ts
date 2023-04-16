import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const newtRouter = router({
  test: publicProcedure.query(({}) => {
    return "test";
  }),
});
