import { z } from "zod";
import { differenceInMonths, differenceInYears } from "date-fns";

const TODAY = new Date();
const MIN_DATE = new Date("1990-01-01"); // 1990년 1월 1일
const MIN_MONTHS_DIFF = 3; // 최소 3개월
const MAX_YEARS_DIFF = 10; // 최대 10년

export const backtestFormSchema = z
  .object({
    startDate: z.date().refine((date) => date >= MIN_DATE, {
      message: "시작일은 1990년 1월 1일 이후여야 합니다.",
    }),
    endDate: z.date().refine((date) => date <= TODAY, {
      message: "종료일은 오늘 이전이어야 합니다.",
    }),
    initialAmount: z
      .number({ message: "숫자를 입력해주세요." })
      .min(1, { message: "1만원 이상 입력해주세요." })
      .max(100000000, { message: "최대 1조까지 가능합니다." }),
    rebalanceFrequency: z.enum(["매년", "분기별", "매월"]),
  })
  .refine((data) => data.startDate <= data.endDate, {
    message: "시작일은 종료일보다 이전이어야 합니다.",
    path: ["startDate"],
  })
  .refine(
    (data) => {
      const monthsDiff = differenceInMonths(data.endDate, data.startDate);
      return monthsDiff >= MIN_MONTHS_DIFF;
    },
    {
      message: `시작일은 종료일보다 최소 ${MIN_MONTHS_DIFF}개월 전이어야 합니다.`,
      path: ["startDate"],
    }
  )
  .refine(
    (data) => {
      const yearsDiff = differenceInYears(data.endDate, data.startDate);
      return yearsDiff <= MAX_YEARS_DIFF;
    },
    {
      message: `시작일은 종료일보다 최대 ${MAX_YEARS_DIFF}년 전까지 가능합니다.`,
      path: ["startDate"],
    }
  );
export type BacktestFormSchema = z.infer<typeof backtestFormSchema>;
