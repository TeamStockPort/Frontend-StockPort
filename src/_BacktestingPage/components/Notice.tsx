import { notices } from "@/_BacktestingPage/datas/notice";

const Notice = () => {
  return (
    <div className="flex flex-col border-white border-b">
      <div className="font-lalezar text-3xl">Notice</div>
      <ul className="flex flex-col gap-2.5 mb-5 list-decimal list-inside">
        {notices.map((notice, idx) => (
          <li key={idx}>{notice}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notice;
