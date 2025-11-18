import Logo from "@/components/Navbar/Logo";
import NavItem from "@/components/Navbar/NavItem";
import SearchBar from "@/components/Navbar/SearchBar";

const Navbar = () => {
  return (
    <nav className="relative flex gap-16 bg-transparent mr-[3.25rem] ml-[2.6875rem] w-auto h-40">
      <Logo />
      <ul className="relative flex gap-[3.75rem] p-0 w-full">
        <NavItem to="portfolio" label="Portfolios" />
        <NavItem to="markets" label="Markets" />
      </ul>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
