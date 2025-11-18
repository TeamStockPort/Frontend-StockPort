import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <>
      <CardHeader>
        <CardTitle className="font-semibold text-xl">백테스트 설정</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-32 font-medium text-gray-300 text-sm">시작일</div>
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
            <div className="flex items-center gap-4">
              <div className="w-32 font-medium text-gray-300 text-sm">종료일</div>
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
            <div className="flex items-center gap-4">
              <div className="w-32 font-medium text-gray-300 text-sm">시작금</div>
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
                          className="bg-white/10 focus:bg-white/15 pr-16 border-white/20 w-50 h-10 text-white"
                        />
                        <div className="right-3 absolute inset-y-0 flex items-center font-medium text-gray-300">
                          만원
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 font-medium text-gray-300 text-sm">리밸런싱 주기</div>
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
                        <FormItem className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="매월"
                            id="monthly"
                            className="data-[state=checked]:bg-white border-white/30 cursor-pointer"
                          />
                          <FormLabel htmlFor="monthly" className="text-white cursor-pointer">
                            매월
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="분기별"
                            id="quarterly"
                            className="data-[state=checked]:bg-white border-white/30 cursor-pointer"
                          />
                          <FormLabel htmlFor="quarterly" className="text-white cursor-pointer">
                            분기별
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="매년"
                            id="yearly"
                            className="data-[state=checked]:bg-white border-white/30 cursor-pointer"
                          />
                          <FormLabel htmlFor="yearly" className="text-white cursor-pointer">
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
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default BacktestForm;
