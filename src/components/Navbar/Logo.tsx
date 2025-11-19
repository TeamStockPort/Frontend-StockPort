import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex justify-center items-center bg-transparent pt-2 font-lalezar text-[4rem] md:text-[6.25rem]">
      <Link to="/" className="pt-2">
        STPT
      </Link>
    </div>
  );
};

export default Logo;
