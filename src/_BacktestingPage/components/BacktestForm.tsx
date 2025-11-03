import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/datepicker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { UseFormReturn } from "react-hook-form";
import type { BacktestFormSchema } from "@/_BacktestingPage/utils/backtestFormSchema";

type BacktestFormProps = {
  form: UseFormReturn<BacktestFormSchema>;
};

const BacktestForm = ({ form }: BacktestFormProps) => {
  return (
    <div className="flex flex-col py-10 border-white border-b">
      <Form {...form}>
        <form className="flex flex-col gap-13">
          <div className="flex mx-10">
            <div className="w-55 font-suit text-2xl">시작일</div>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex mx-10">
            <div className="w-55 font-suit text-2xl">종료일</div>
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex mx-10">
            <div className="w-55 font-suit text-2xl">시작금</div>
            <FormField
              control={form.control}
              name="initialAmount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        className="bg-white pr-16 border-0 w-50 h-9.5 text-navy"
                      />
                      <div className="right-3 absolute inset-y-0 flex items-center font-pretendard text-gray-900">
                        만원
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex mx-10">
            <div className="w-55 font-suit text-2xl">리밸런싱 주기</div>
            <FormField
              control={form.control}
              name="rebalanceFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex gap-4"
                    >
                      <FormItem className="flex items-center space-x-1">
                        <RadioGroupItem
                          value="매월"
                          id="monthly"
                          className="data-[state=checked]:bg-white cursor-pointer"
                        />
                        <FormLabel htmlFor="monthly" className="cursor-pointer">
                          매월
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1">
                        <RadioGroupItem
                          value="분기별"
                          id="quarterly"
                          className="data-[state=checked]:bg-white cursor-pointer"
                        />
                        <FormLabel htmlFor="quarterly" className="cursor-pointer">
                          분기별
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1">
                        <RadioGroupItem
                          value="매년"
                          id="yearly"
                          className="data-[state=checked]:bg-white cursor-pointer"
                        />
                        <FormLabel htmlFor="yearly" className="cursor-pointer">
                          매년
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <Button
            type="submit"
            className="bg-white w-40 h-12 font-suit text-navy text-xl"
          >
            제출
          </Button> */}
        </form>
      </Form>
    </div>
  );
};

export default BacktestForm;
