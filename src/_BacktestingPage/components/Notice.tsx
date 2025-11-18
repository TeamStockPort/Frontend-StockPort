import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notices } from "@/_BacktestingPage/datas/notice";

const Notice = () => {
  return (
    <Card className="bg-transparent mb-6 border-white/10 text-white">
      <CardHeader>
        <CardTitle className="font-semibold text-xl">Notice</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2.5 text-gray-300 list-decimal list-inside">
          {notices.map((notice, idx) => (
            <li key={idx}>{notice}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Notice;
