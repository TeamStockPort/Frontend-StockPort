import { Button } from "@/components/ui/button";

interface SideBarButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function SideBarButton({ isOpen, onClick }: SideBarButtonProps) {
  return (
    <Button
      variant="ghost"
      className="relative flex flex-col justify-center items-center gap-1.5 bg-transparent p-2 border border-white/20 rounded-xl w-12 h-12 transition-colors hover:transparent"
      onClick={onClick}
    >
      <span
        className={`bg-white rounded-full w-5 h-0.5 transition-all duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>

      <span
        className={`bg-white rounded-full w-5 h-0.5 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>

      <span
        className={`bg-white rounded-full w-5 h-0.5 transition-all duration-300 ease-in-out ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </Button>
  );
}
