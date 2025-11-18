type WeightSummaryProps = {
  totalWeight: number;
};

const WeightSummary = ({ totalWeight }: WeightSummaryProps) => {
  const isValid = totalWeight === 100;

  return (
    <div className="flex flex-col justify-end items-end bg-white/5 p-4 border border-white/10 rounded-lg">
      <div className={`text-lg font-semibold ${isValid ? "text-green-400" : "text-red-400"}`}>
        현재 비중 합계: {totalWeight}%
      </div>
      {!isValid && (
        <div className="mt-1 font-medium text-red-400 text-sm">
          비중의 합이 100%가 되어야 합니다.
        </div>
      )}
    </div>
  );
};

export default WeightSummary;
