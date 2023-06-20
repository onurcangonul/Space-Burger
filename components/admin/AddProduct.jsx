import { useState,useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState("");
  const [imgSrc, setImageSrc] = useState("");
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("pizza")
  const [prices, setPrices] = useState([]);
  const [extra, setExtra] = useState("")
  const [extraOptions, setExtraOptions] = useState([])
  
  const [categories,setCategories] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res.data)
      } catch (err) {
      }
    }
    getProducts()
},[])
  const handleExtra = (e) => {
    if (extra) {
      if (extra.text && extra.price) {
        setExtraOptions((prev) => [...prev, extra]);
    }
  }
}

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

 const changePrice = (e, index) => {
   const currentPrices = prices;
   currentPrices[index] = e.target.value;
   setPrices(currentPrices);
 };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "space-burger");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dqwsirkvy/image/upload",
        data
      );
      const { url } = uploadRes.data
      const newProduct = {
        image: url,
        title,
        desc,
        category: category.toLowerCase(),
        prices,
        extraOptions,
      }
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      newProduct
    );

      if (res.status === 201) {
        setIsProductModal(false)
        toast.success("Product created successfully")
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      className="fixed w-screen h-screen z-50 top-0 left-0
     after:content-[''] after:w-screen after:h-screen
      after:bg-white after:absolute after:top-0 after:left-0
      after:opacity-60
       grid place-content-center"
    >
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center ">
          <div
            className="relative z-50 md:w-[600px] w-[370px] bg-white 
                  border-2 p-10 rounded-3xl "
          >
            <Title addClass="text-[40px] text-center">Add a New Product</Title>
            <div className="flex flex-col text-sm mt-6">
              <label className="cursor-pointer flex gap-2 items-center">
                <input
                  type="file"
                  onChange={(e) => handleOnChange(e)}
                  className="hidden"
                />
                <button className="btn-primary !bg-success pointer-events-none ">
                  Choose Image
                </button>
                {imgSrc && <img src={imgSrc} alt="" className="w-12 h-auto " />}
              </label>
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-1"> Title</span>
              <input
                type="text"
                className="border-2 p-1 text-sm px-2 outline-none"
                placeholder="Write a Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-1"> Description</span>
              <textarea
                className="border-2 p-1 text-sm px-2 outline-none"
                placeholder="Write a Description"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-1"> Select Category</span>
              <select
                className="border-2 p-1 text-sm px-2 outline-none"
                placeholder="Write a Description"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      value={category.title.toLowerCase()}
                      key={category._id}
                    >
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Prices</span>
              {category === "pizza" ? (
                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="small"
                    onChange={(e) => changePrice(e, 0)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="medium"
                    onChange={(e) => changePrice(e, 1)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="large"
                    onChange={(e) => changePrice(e, 2)}
                  />
                </div>
              ) : (
                <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                    placeholder="Price"
                    onChange={(e) => changePrice(e, 0)}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Extra</span>
              <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                <input
                  type="text"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="Item"
                  name="text"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="price"
                  name="price"
                  onChange={(e) =>
                    setExtra({ ...extra, [e.target.name]: e.target.value })
                  }
                />
                <button className="btn-primary" onClick={handleExtra}>
                  Add
                </button>
              </div>
              <div className="mt-2 flex gap-2 ">
                {extraOptions.map((item, index) => (
                  <span
                    key={index}
                    className="inline-block border
                   border-orange-400 p-2 rounded-full text-xs cursor-pointer"
                    onClick={() => {
                      setExtraOptions(
                        extraOptions.filter((_, i) => i !== index)
                      );
                    }}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="btn-primary !bg-success"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsProductModal(false)}
            >
              <MdClose
                size={25}
                className=" hover:text-primary 
                                transition-all"
              />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};
export default AddProduct;
