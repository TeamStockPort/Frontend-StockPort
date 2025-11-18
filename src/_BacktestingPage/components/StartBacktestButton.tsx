import { Button } from "@/components/ui/button";

type StartBacktestButtonProps = {
  handleSubmit: () => void;
  disabled: boolean;
};

const StartBacktestButton = ({ handleSubmit, disabled }: StartBacktestButtonProps) => {
  return (
    <div className="flex justify-center items-center mb-6">
      <Button
        onClick={handleSubmit}
        disabled={disabled}
        size="lg"
        className={`px-8 py-6 rounded-xl text-base font-semibold transition-all duration-200 ${
          disabled
            ? "bg-white/10 border-white/20 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 text-white shadow-lg hover:shadow-xl"
        }`}
      >
        백테스트 시작
      </Button>
    </div>
  );
};

export default StartBacktestButton;
