import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type TRtkError = FetchBaseQueryError & {
  data?: { error?: string };
};
