import Title from "@/components/ui/Title";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";


const Carts = ({ userList }) => {
     const { data: session } = useSession();
     const cart = useSelector((state) => state.cart);
     const dispatch = useDispatch();
     const router = useRouter();
     const user = userList?.find((user) => user.email === session?.user?.email);
     const newOrder = {
       customer: user?.fullName,
       address: user?.address ? user?.address : "No Address",
       total: cart.total,
       method: 0,
    };
    console.log(cart)

     const createOrder = async () => {
       try {
         if (session) {
           if (confirm("Are you sure to order?")) {
             const res = await axios.post(
               `${process.env.NEXT_PUBLIC_API_URL}/orders`,
               newOrder
             );
             if (res.status === 201) {
               dispatch(reset());
               toast.success("Order created successfully");
               router.push(`/order/${res.data._id}`);
             }
           }
         } else {
           toast.error("Please login first.");
         }
       } catch (err) {
         console.log(err);
       }
     };
    return (
      <>
        {cart?.products?.length > 0 ? (
          <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
              <div className="rounded-lg md:w-2/3">
                {cart.products.map((product, index) => (
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <Image
                      src={product?.image}
                      alt=""
                      width={300}
                      height={300}
                      className="w-full rounded-lg sm:w-40"
                    />

                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-xl font-bold text-gray-900">
                          {product?.title}
                        </h2>
                        <h2 className="text-lg font-semibold mt-2">Extra</h2>
                        <p className=" text-xs text-gray-700">
                          {product?.desc}
                        </p>
                        <p className=" mt-4 text-xl font-bold">
                          Price: ${product?.price}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50">
                            {" "}
                            -{" "}
                          </span>
                          <input
                            className="h-8 w-8 border bg-white text-center text-xs outline-none"
                            type="number"
                            value={product?.quantity}
                            min="1"
                          />
                          <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50">
                            {" "}
                            +{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                <div className="mb-2 flex justify-between">
                  <p className="text-gray-700">Subtotal</p>
                  <p className="text-gray-700">$ {cart.total}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Shipping</p>
                  <p className="text-gray-700">FREE</p>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between">
                  <p className="text-lg font-bold">Total</p>
                  <div className="">
                    <p className="mb-1 text-lg font-bold">$ {cart.total} USD</p>
                  </div>
                </div>
                <button
                  onClick={createOrder}
                  className="mt-6 w-full rounded-md btn-primary py-1.5 font-medium text-blue-50 hover:bg-amber-600"
                >
                  Check out
                </button>
                <button
                  onClick={() => dispatch(reset())}
                  className="mt-6 w-full rounded-md btn-primary !bg-danger py-1.5 font-medium text-blue-50 hover:bg-amber-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-screen justify-center items-center">
            <h2 className="font-semibold">Your Cart Is Empty</h2>
          </div>
        )}
      </>
    );
};

export default Carts;

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};