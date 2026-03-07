import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Navbar/Logo";
import { __DEV__ } from "@/utils/instance";
import { useSignUp } from "@/lib/hooks/useSignUp";
import { signInWithGitHub } from "@/lib/apis/auth";
import { generateErrorMessage } from "@/lib/error";
import { toast } from "sonner";
import { Github } from "lucide-react";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { mutate: signUp, isPending: isSignUpPending } = useSignUp({
    onError: (error) => {
      const message = generateErrorMessage(error);

      toast.error(message);
    },
  });

  const handleClickSignUpWithPassword = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;
    if (confirmPassword.trim() === "") return;

    if (password !== confirmPassword) {
      toast.error("비밀번호가 일치하지 않습니다.", { position: "top-center" });
      return;
    }

    if (password.length < 6) {
      toast.error("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    if (__DEV__) {
      console.log("Email signup:", { email, password });
    }

    signUp(
      { email, password },
      {
        onSuccess: () => {
          toast.success("회원가입이 완료되었습니다. 로그인해주세요.");
          navigate("/login");
        },
      }
    );
  };

  return (
    // 1. 전체 페이지 컨테이너
    <div className="flex justify-center items-center mx-auto px-6 py-12 w-full max-w-xl md:max-w-2xl min-h-screen">
      {/* 2. 회원가입 카드 컨테이너 */}
      <div className="space-y-10 bg-brand-container shadow-lg p-8 rounded-xl w-full max-w-md">
        {/* 3. 로고 및 헤더 */}
        <div className="text-center">
          <Logo />
          <p className="font-pretendard text-1xl text-gray-300">
            회원가입 후, 투자 전략을 직접 검증해볼 수 있어요.
          </p>
        </div>

        {/* 4. 이메일/비밀번호 입력 영역 */}
        <div className="flex flex-col gap-2">
          <Input
            disabled={isSignUpPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 py-6 border-white/20 text-white placeholder:text-gray-500"
            type="email"
            placeholder="example@email.com"
          />
          <Input
            disabled={isSignUpPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 py-6 border-white/20 text-white placeholder:text-gray-500"
            type="password"
            placeholder="password"
          />
          <Input
            disabled={isSignUpPending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white/10 py-6 border-white/20 text-white placeholder:text-gray-500"
            type="password"
            placeholder="confirm password"
          />
        </div>

        {/* 5. 회원가입 버튼 영역 */}
        <div className="flex flex-col gap-2 -mt-4">
          <Button
            disabled={isSignUpPending}
            onClick={handleClickSignUpWithPassword}
            className="bg-white hover:brightness-85 py-4 w-full text-navy cursor-pointer"
          >
            회원가입
          </Button>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 border-t border-white/20" />
            <span className="text-gray-500 text-sm">또는</span>
            <div className="flex-1 border-t border-white/20" />
          </div>

          <Button
            onClick={signInWithGitHub}
            className="flex items-center justify-center gap-2 bg-white hover:brightness-85 py-4 w-full text-black cursor-pointer"
          >
            <Github className="w-5 h-5" />
            GitHub로 회원가입
          </Button>
        </div>

        {/* 6. 로그인 유도 문구 */}
        <div className="text-gray-400 text-sm text-center">
          <p>
            이미 계정이 있으신가요?{" "}
            <Link
              to="/login"
              className="focus:outline-none font-semibold text-white hover:underline focus:underline"
            >
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
