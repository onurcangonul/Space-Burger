import Image from "next/image";
import Title from "../../components/ui/Title";
import { useState } from "react";
import { addProduct } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const optionalItems = [
  {
    id: 1,
    name: "Extra 1",
    price: 1,
  },
  {
    id: 2,
    name: "Extra 2",
    price: 2,
  },
  {
    id: 3,
    name: "Extra 2",
    price: 3,
  },
];

const foodItems = [
  {
    id: 1,
    name: "Chicken",
    price: 10,
    desc: "loremmmmmmmmmmmmmmmmmmmm",
    extraOptions: [
      {
        id: 1,
        name: "Extra 1",
        price: 1,
      },
    ],
  },
];
const Index = () => {
  const [prices, setPrices] = useState([10, 20, 30]);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const [extraItems, setExtraItems] = useState(optionalItems);
  const [extras, setExtras] = useState([]);
  const cart = useSelector((state) => state.cart);
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
    dispatch(addProduct({...foodItems[0], extras,price,quantity:1}))
  };

  console.log(cart);
  return (
    <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap ">
      <div className="relative md:flex-1 md:w-[80%] md:h-[80%] w-44 h-44 mx-auto">
        <Image
          src="/images/f1.png"
          alt=""
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className="md:flex-1 md:text-start text-center">
        <Title addClass="text-6xl">Good Pizza</Title>
        <span className="text-primary text-2xl font-bold  underline-offset-1 my-4 inline-block">
          ${price}
        </span>
        <p className="text-sm my-4 md:pr-24">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          fugit corporis ex laboriosam tenetur at ad aspernatur eius numquam
          molestiae.
        </p>
        <div>
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
              />
              <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
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
              />
              <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                Large
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 my-6 md:justify-start justify-center">
          {extraItems.map((item) => (
            <label key={item.id} className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary"
                onChange={(e) => handleChange(e, item)}
              />
              <span className="text-sm font-semibold">{item.name}</span>
            </label>
          ))}
        </div>
        <button className="btn-primary" onClick={handleClick}>Add To Card</button>
      </div>
    </div>
  );
};

export default Index;
