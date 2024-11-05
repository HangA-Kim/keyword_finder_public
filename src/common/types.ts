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

interface KeywordData {
  period: string;
  ratio: number;
}

export interface KeywordAverage {
  rank: string;
  google_keyword: string;
  naver_keyword: string;
}

export interface TrendsDatas {
  keyword: string;
  google_data: KeywordData[];
  naver_data: KeywordData[];
}

export interface APIAnalysisDatas {
  trendsData: TrendsDatas[];
  averageData: KeywordAverage[];
}

export interface ShoppingDatas{
  group: string;
  data: KeywordData[];
}

export interface Shopping {
  keyword: string;
  shoppingDatas: ShoppingDatas[]
}

interface ShoppingAverage{
  keyword: string;
  "10": number,
  "20": number,
  "30": number,
  "40": number,
  "50": number,
  "60": number,
}
export interface APIShoppingDatas{
  shopping: Shopping[],
  average: ShoppingAverage[]
}
