import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import Image from "next/image";
import { MdClose } from "react-icons/md";

const AddProduct = ({ setIsProductModal }) => {
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
              <span className="font-semibold mb-1"> Choose an image</span>
              <input type="file" />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-1"> Title</span>
              <input
                type="text"
                className="border-2 p-1 text-sm px-2 outline-none"
                placeholder="Write a Title"
              />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-1"> Description</span>
              <textarea
                className="border-2 p-1 text-sm px-2 outline-none"
                placeholder="Write a Description"
              />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-1"> Select Category</span>
              <select
                className="border-2 p-1 text-sm px-2 outline-none"
                placeholder="Write a Description"
              >
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
                <option value="4">Category 4</option>
                <option value="5">Category 5</option>
              </select>
            </div>
            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Prices</span>
              <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="small"
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="medium"
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="large"
                />
              </div>
            </div>
            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Extra</span>
              <div className="flex justify-between gap-6 w-full md:flex-nowrap flex-wrap">
                <input
                  type="text"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="Item"
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-36"
                  placeholder="price"
                />
                <button className="btn-primary">Add</button>
              </div>
              <div className="mt-2">
                <span className="inline-block border border-orange-400 p-2 rounded-full text-xs">
                  Ketçap
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="btn-primary !bg-success">Create</button>
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
