import Image from "next/image";
import Title from "../../components/ui/Title";
import { useState } from "react";
import { addProduct } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = ({ food }) => {
  const [prices, setPrices] = useState(food.prices);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(food?.extraOptions);
  const [extras, setExtras] = useState([]);

  const cart = useSelector((state) => state.cart);
  const findCart = cart.products.find((item) => item._id === food._id)

  const dispatch = useDispatch();
  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleChange = (e, item) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(item.price);
      setExtras([...extras, item]);
    } else {
      changePrice(-item.price);
      setExtras(extras.filter((extra) => extra.id !== item.id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...food, extras, price, quantity: 1 }))
    toast.success("Product Added To Cart");
  };

  return (
    
    <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap ">
      <div className="relative md:flex-1 md:w-[80%] md:h-[80%] w-44 h-44 mx-auto">
        <Image
          src={food?.image}
          alt=""
          fill
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
      <div className="md:flex-1 md:text-start text-center mx-auto">
        <Title addClass="text-6xl">{food.title}</Title>
        <span className="text-primary text-2xl font-bold  underline-offset-1 my-4 inline-block">
          ${price}
        </span>
        {(food.category === "burger" || food.category === "pizza") && (
          <h1 className="text-2xl font-bold">Ingredients:</h1>
        )}
        <h1 className="md:text-xl text-sm my-4 md:pr-24">{food?.desc}</h1>
        <div>
          {food.category === "pizza" && (
            <>
              <h4 className="text-xl font-bold">Choose the size</h4>
              <div className="flex items-center gap-x-20  md:justify-start justify-center">
                <div
                  className="relative w-8 h-8 cursor-pointer"
                  onClick={() => handleSize(0)}
                >
                  <Image
                    src="/images/size.png"
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                    // className="active:border-2 border-primary rounded-full "
                  />
                  <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium bg-red">
                    Small
                  </span>
                </div>
                <div
                  className="relative w-12 h-12 cursor-pointer"
                  onClick={() => handleSize(1)}
                >
                  <Image
                    src="/images/size.png"
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                  <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                    Medium
                  </span>
                </div>
                <div
                  className="relative w-16 h-16 cursor-pointer "
                  onClick={() => handleSize(2)}
                >
                  <Image
                    src="/images/size.png"
                    alt=""
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                  <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                    Large
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex gap-x-4 my-6 md:justify-start justify-center">
          {extraItems.map((item) => (
            <label key={item._id} className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                onChange={(e) => handleChange(e, item)}
              />
              <span className="text-sm font-semibold">{item.text}</span>
            </label>
          ))}
        </div>
        <button
          className="btn-primary"
          onClick={handleClick}
          disabled={findCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );

  return {
    props: {
      food: res.data ? res.data : null,
    },
  };
};


export default Index;
