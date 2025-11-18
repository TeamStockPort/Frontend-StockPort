import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <>
      <CardHeader className="pt-10">
        <CardTitle className="font-semibold text-xl">자산 설정</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
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
        <div className="flex justify-center items-center mt-6">
          <Button
            onClick={handleAddAsset}
            variant="outline"
            className="bg-white/10 hover:opacity-60 px-6 py-2 border-white/20 rounded-xl text-white cursor-pointer"
          >
            + 추가
          </Button>
        </div>
        <div className="mt-6">
          <WeightSummary totalWeight={totalWeight}></WeightSummary>
        </div>
      </CardContent>
    </>
  );
};

export default AssetAllocation;
