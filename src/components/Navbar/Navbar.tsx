import Logo from "@/components/Navbar/Logo";
import NavItem from "@/components/Navbar/NavItem";
import SearchBar from "@/components/Navbar/SearchBar";
import SideBarButton from "@/components/Navbar/SideBarButton";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { signOut } from "@/lib/apis/auth";
import { toast } from "sonner";

const Navbar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch {
      toast.error("로그아웃에 실패했습니다.");
    }
  };

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        modalRef.current &&
        !modalRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsSideBarOpen(false);
      }
    };

    if (isSideBarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSideBarOpen]);

  return (
    <>
      <nav className="z-50 relative flex justify-between items-center gap-16 bg-transparent mx-[2rem] sm:mx-[3rem] w-auto md:h-40">
        <Logo />
        <div className="relative" ref={buttonRef}>
          <SideBarButton isOpen={isSideBarOpen} onClick={() => setIsSideBarOpen(!isSideBarOpen)} />

          {/* 드롭다운 - 사이드바 버튼 아래에 표시 */}
          {isSideBarOpen && (
            <div
              ref={modalRef}
              className="md:hidden top-full right-0 z-50 absolute bg-[#0A194E] slide-in-from-top-2 shadow-lg mt-2 border border-gray-700 rounded-lg min-w-[150px] animate-in duration-200 fade-in"
            >
              <div className="p-4">
                <p className="opacity-45 mb-2 text-white text-sm">Menu</p>
                <div className="flex flex-col gap-">
                  <Link
                    to="/portfolio"
                    className="hover:opacity-100 py-1 font-bold text-white text-base transition-opacity"
                    onClick={() => setIsSideBarOpen(false)}
                  >
                    Portfolio
                  </Link>
                  <Link
                    to="/markets"
                    className="hover:opacity-100 py-1 font-bold text-white text-base transition-opacity"
                    onClick={() => setIsSideBarOpen(false)}
                  >
                    Markets
                  </Link>
                  {!isLoading &&
                    (user ? (
                      <button
                        onClick={() => {
                          setIsSideBarOpen(false);
                          handleSignOut();
                        }}
                        className="hover:opacity-100 py-1 font-bold text-white text-base text-left cursor-pointer transition-opacity"
                      >
                        로그아웃
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="hover:opacity-100 py-1 font-bold text-white text-base transition-opacity"
                        onClick={() => setIsSideBarOpen(false)}
                      >
                        로그인
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="hidden md:flex md:flex-row md:justify-between md:items-center md:gap-16 md:w-full">
          <ul className="relative flex gap-[3.75rem] p-0 w-full">
            <NavItem to="portfolio" label="Portfolios" />
            <NavItem to="markets" label="Markets" />
          </ul>
          <SearchBar />
          {!isLoading &&
            (user ? (
              <button
                onClick={handleSignOut}
                className="hover:opacity-80 font-bold text-white text-base whitespace-nowrap cursor-pointer transition-opacity"
              >
                로그아웃
              </button>
            ) : (
              <Link
                to="/login"
                className="hover:opacity-80 font-bold text-white text-base whitespace-nowrap transition-opacity"
              >
                로그인
              </Link>
            ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
