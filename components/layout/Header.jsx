import { useState } from "react";
import Logo from "../ui/Logo";
import { FaUserAlt, FaShoppingBasket, FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "../ui/Search";
import OutsideClickHandler from "react-outside-click-handler";
import { MdClose } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setMenuModal] = useState(false);
  const router = useRouter();
  const cart = useSelector((state) => state.cart);
  return (
    <div
      className={`h-[6.5rem] z-50 relative w-full ${
        router.asPath === "/" ? "bg-transparent" : "bg-secondary !fixed"
      }`}
    >
      <div
        className="container mx-auto flex justify-between text-white 
            items-center h-full"
      >
        <div>
          <Logo />
        </div>
        <nav
          className={`sm:static absolute top-0 left-0
                sm:w-auto sm:h-auto w-full h-screen
                sm:text-white text-black
                sm:bg-transparent bg-white
                sm:flex hidden 
                ${isMenuModal === true && "!grid place-content-center"}`}
        >
          <ul className="flex gap-2 sm:flex-row flex-col items-center">
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/" && "text-primary"
              }`}
              onClick={() => setMenuModal(false)}
            >
              <Link href="/">Home</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/menu" && "text-primary"
              }`}
              onClick={() => setMenuModal(false)}
            >
              <Link href="/menu">Menu</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/about" && "text-primary"
              }`}
              onClick={() => setMenuModal(false)}
            >
              <Link href="/about">About</Link>
            </li>
            <li
              className={`px-[5px] py-[10px] uppercase hover:text-primary cursor-pointer ${
                router.asPath === "/reservation" && "text-primary"
              }`}
              onClick={() => setMenuModal(false)}
            >
              <Link href="/reservation">Book Table</Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-x-4 items-center">
          <Link href="/auth/login">
            <FaUserAlt
              className={`hover:text-primary transition-all cursor-pointer ${
                (router.asPath === "/auth/login" ||
                  router.asPath.includes("Profile") || router.asPath.includes("profile")) &&
                "text-primary"
              }`}
              size={18}
            />
          </Link>
          <Link href="/cart">
            <span className="relative">
              <FaShoppingBasket
                className={`hover:text-primary transition-all ${
                  router.asPath === "/cart" && "text-primary"
                }`}
                size={18}
              />
              <span
                className="h-4 w-4 text-sm font-bold text-black grid place-content-center rounded-full
                 bg-primary absolute !-top-2 -right-3 "
              >
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>
          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch className="hover:text-primary transition-all" size={18} />
          </button>
          {/* <a href="#" className="md:inline-block hidden sm ">
            <button className="btn-primary">Order Online</button>
          </a> */}
          <button
            className="sm:hidden inline-block"
            onClick={() => setMenuModal(true)}
          >
            <GiHamburgerMenu className="hover:text-primary transition-all" />
          </button>
          {isMenuModal && (
            <button
              className="absolute top-4 right-4 md:hidden visible "
              onClick={() => setMenuModal(false)}
            >
              <MdClose
                size={25}
                className=" hover:text-primary 
                                transition-all"
                color="black"
              />
            </button>
          )}
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};
export default Header;
