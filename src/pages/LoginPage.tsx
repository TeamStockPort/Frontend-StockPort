import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/Navbar/Logo";
import { useSignIn } from "@/lib/hooks/useSignIn";
import { signInWithGitHub } from "@/lib/apis/auth";
import { generateErrorMessage } from "@/lib/error";
import { toast } from "sonner";
import { Github } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { mutate: signIn, isPending: isSignInPending } = useSignIn({
    onError: (error) => {
      const message = generateErrorMessage(error);
      toast.error(message);
    },
  });

  const handleClickSignIn = () => {
    if (email.trim() === "") return;
    if (password.trim() === "") return;

    signIn(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleClickSignIn();
    }
  };

  return (
    <div className="flex justify-center items-center mx-auto px-6 py-12 w-full max-w-xl md:max-w-2xl min-h-screen">
      <div className="space-y-10 bg-brand-container shadow-lg p-8 rounded-xl w-full max-w-md">
        <div className="text-center">
          <Logo />
          <p className="font-pretendard text-1xl text-gray-300">
            로그인하고 나만의 투자 전략을 검증해보세요.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Input
            disabled={isSignInPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-white/10 py-6 border-white/20 text-white placeholder:text-gray-500"
            type="email"
            placeholder="example@email.com"
          />
          <Input
            disabled={isSignInPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-white/10 py-6 border-white/20 text-white placeholder:text-gray-500"
            type="password"
            placeholder="password"
          />
        </div>

        <div className="flex flex-col gap-2 -mt-4">
          <Button
            disabled={isSignInPending}
            onClick={handleClickSignIn}
            className="bg-white hover:brightness-85 py-4 w-full text-navy cursor-pointer"
          >
            로그인
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
            GitHub로 로그인
          </Button>
        </div>

        <div className="text-gray-400 text-sm text-center">
          <p>
            계정이 없으신가요?{" "}
            <Link
              to="/signup"
              className="focus:outline-none font-semibold text-white hover:underline focus:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
