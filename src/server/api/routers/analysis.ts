import dayjs from "dayjs";
import { z } from "zod";
import { NaverRequest, NaverResponse } from "~/common/types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const analysisRouter = createTRPCRouter({
  reqNaver: publicProcedure
    .input(NaverRequest)
    .query(async ({ ctx, input }) => {
      console.log("reqNaver call", input);
      const { searchText, startDate, timeUnit, device, gender } = input;
      const endDate = dayjs().format("YYYY-MM-DD");
      const queryData = {
        startDate,
        endDate,
        timeUnit,
        keywordGroups: [
          {
            groupName: searchText,
            keywords: [searchText],
          },
        ],
        device,
        gender,
      };
      const res = await fetch("https://openapi.naver.com/v1/datalab/search", {
        method: "POST",
        headers: {
          "X-Naver-Client-Id": `${process.env.NAVER_ID}`,
          "X-Naver-Client-Secret": `${process.env.NAVER_SECRET}`,
        },
        body: JSON.stringify(queryData),
      });
      if (res.status != 200)
        return {
          result: `ERR ${res.status} : ${res.statusText}`,
        };
      const resData = (await res.json()) as NaverResponse;
      console.log(resData.results[0]?.data);
      if (resData.results[0]) {
        return {
          result: resData.results[0],
        };
      } else {
        return {
          result: `가져올 내용 없음`,
        };
      }
    }),
  saveKeyword: protectedProcedure
    .input(z.object({ keyword: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      console.log("saveKeyword call!!!!!!!!!!!!", input.keyword);
      // 중복된 keyword가 있는지 확인
      const existingKeyword = await ctx.db.keyword.findUnique({
        where: { word: input.keyword },
      });

      if (existingKeyword) {
        // 중복된 경우 처리 (예: 에러 던지기)
        // throw new Error("Keyword already exists");
        return null;
      }

      return ctx.db.keyword.create({
        data: {
          word: input.keyword,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getKeywordList: protectedProcedure.query(async ({ ctx }) => {
    const keywords = await ctx.db.keyword.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
      select: { word: true },
    });

    console.log("keywords:", keywords);

    return keywords ?? [];
  }),

  deleteKeyword: protectedProcedure
    .input(z.object({ keyword: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const keywords = await ctx.db.keyword.delete({
        where: { word: input.keyword },
      });
      console.log("deleteKeyword:", keywords);
      return keywords ?? [];
    }),
});
