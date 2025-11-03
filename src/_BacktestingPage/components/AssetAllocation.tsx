import type { Asset } from "@/_BacktestingPage/types/backtestFormType";
import AssetItem from "@/_BacktestingPage/components/AssetItem";
import { v4 as uuidv4 } from "uuid";
import WeightSummary from "@/_BacktestingPage/components/WeightSummary";
type AssetAllocationProps = {
  assets: Asset[];
  setAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
  totalWeight: number;
};
const AssetAllocation = ({ assets, setAssets, totalWeight }: AssetAllocationProps) => {
  const handleAddAsset = () => {
    setAssets([...assets, { id: uuidv4(), name: "", ticker: "", weight: 0 }]);
  };
  const handleUpdateAsset = (updatedAsset: Asset) => {
    setAssets((prevAssets) =>
      prevAssets.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset))
    );
  };
  const handleDeleteAsset = (id: string) => {
    if (assets.length === 1) {
      alert("최소 1개의 자산은 유지해야 합니다.");
      return;
    }
    setAssets((prev) => prev.filter((asset) => asset.id !== id));
  };

  return (
    <div className="relative flex flex-col gap-10 py-8 border-white border-b">
      <div className="flex justify-start items-start font-lalezar text-white text-3xl">
        자산 설정
      </div>
      <div className="flex flex-col gap-13">
        {assets.map((asset, index) => (
          <AssetItem
            key={asset.id}
            asset={asset}
            onUpdate={handleUpdateAsset}
            AssetIndex={index}
            onDelete={() => handleDeleteAsset(asset.id)}
          />
        ))}
      </div>
      <button
        onClick={handleAddAsset}
        className="relative flex justify-center items-center bg-white mx-auto px-4 py-2 rounded-3xl w-20 font-suit text-navy"
      >
        + 추가
      </button>
      <WeightSummary totalWeight={totalWeight}></WeightSummary>
    </div>
  );
};

export default AssetAllocation;
