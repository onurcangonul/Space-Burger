import OutsideClickHandler from "react-outside-click-handler";
import Title from "./Title";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../form/Input";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";
const Search = ({ setIsSearchModal }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/products`
        );
        setProducts(res.data);
        setFiltered(res.data.slice(0, 5));
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
        getProduct();
    }, 1000);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchFilter = products
      .filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      )
      .slice(0.5);
    setFiltered(searchFilter);
  };

  return (
    <div
      className="fixed w-screen h-screen z-50 top-0 left-0
     after:content-[''] after:w-screen after:h-screen
      after:bg-white after:absolute after:top-0 after:left-0
      after:opacity-60
       grid place-content-center"
    >
      <OutsideClickHandler onOutsideClick={() => setIsSearchModal(false)}>
        <div className="w-full h-full grid place-content-center ">
          <div
            className="relative z-50 md:w-[600px] w-[370px] bg-white 
                  border-2 p-10 rounded-3xl "
          >
            <Title addClass="text-[40px] text-center">Search</Title>
            <Input placeholder="Search" onChange={handleSearch} />
            <div>
              {products.length > 0 ? (
                <ul className="mt-4">
                  {filtered.length > 0 ? (
                    filtered.map((product) => (
                      <li
                        key={product._id}
                        className="flex items-center justify-between
                                p-1 hover:bg-primary transition-all px-2 cursor-pointer
                                "
                        onClick={() => {
                          router.push(`/product/${product?._id}`);
                          setIsSearchModal(false);
                        }}
                      >
                        <div className="relative flex">
                          <Image
                            src={product?.image}
                            alt={product?.title}
                            width={48}
                            height={48}
                          />
                        </div>
                        <span className="font-bold">{product?.title}</span>
                        <span className="font-bold">${product?.prices[0]}</span>
                      </li>
                    ))
                  ) : (
                    <p className="text-center font-semibold">
                      No results found
                    </p>
                  )}
                </ul>
              ) : (
                <div className="flex justify-center items-center mt-3">
                  <PacmanLoader color="#ffbe33" />
                </div>
              )}
              <button
                className="absolute top-4 right-4"
                onClick={() => setIsSearchModal(false)}
              >
                <MdClose
                  size={25}
                  className=" hover:text-primary 
                                transition-all"
                />
              </button>
            </div>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};
export default Search;
