import { z } from "zod";

export const NaverRequest = z.object({
  searchText: z.string(),
  startDate: z.string(),
  timeUnit: z.string(),
  device: z.string(),
  gender: z.string(),
});

export type NaverRequestType = z.infer<typeof NaverRequest>;

export interface NaverResponseData {
  period: string;
  ratio: string;
}
export interface NaverResponseResult {
  title: string;
  keywords: string[];
  data: NaverResponseData[];
}

export interface NaverResponse {
  startDate: string;
  endDate: string;
  timeUnit: string;
  results: NaverResponseResult[];
}
