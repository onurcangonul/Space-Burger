import Title from "@/components/ui/Title";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "@/redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Card = ({ userList }) => {
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

   const createOrder = async () => {
     try {
       if (session) {
         if (confirm("Are you sure to order?")) {
           const res = await axios.post(
             `${process.env.NEXT_PUBLIC_API_URL}/orders`,
             newOrder
           );
           if (res.status === 201) {
             router.push(`/order/${res.data._id}`);
             dispatch(reset());
             toast.success("Order created successfully", {
               autoClose: 1000,
             });
           }
         }
       } else {
         toast.error("Please login first.", {
           autoClose: 1000,
         });
       }
     } catch (err) {
       console.log(err);
     }
   };
  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-center md:flex-row flex-col">
        <div
          className="md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10
        overflow-x-auto w-full"
        >
          <table className="w-full text-sm text-center text-gray-500 ">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700 min-w-[1000px] ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Product
                </th>
                <th scope="col" className="py-3 px-6">
                  Extras
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.products.map((product, index) => (
                <tr
                  key={index}
                  className=" bg-secondary border-gray-700 hover:bg-primary transition-all"
                >
                  <td
                    className="py-4 px-6 font-medium whitespace-nowrap
                 hover:text-white flex items-center gap-x-1 justify-center"
                  >
                    <Image
                      src={product.image}
                      alt="product-card-image"
                      width={50}
                      height={50}
                      style={{ objectFit: "contain" }}
                    />
                    <span>{product.name}</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.extras.map((item) => (
                      <span key={item.id}>{item.text},</span>
                    ))}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    ${product.price}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white min-h-[calc(100vh_-_433px)] flex flex-col justify-center text-secondary p-12 md:w-auto w-full">
          <Title addClass="text-[40px] md:text-start !text-center ">
            Card Total
          </Title>
          <div className="mt-6">
            <strong>Subtotal: </strong>${cart.total} <br />
            <strong className="inline-block my-1">Discount: </strong>$0.00
            <br />
            <strong>Total: </strong>${cart.total}
          </div>

          <div className="flex flex-col">
            <button
              className="btn-primary mt-4 md:w-auto w-52"
              onClick={createOrder}
            >
              Checkout Now
            </button>
            <button
              className="btn-primary !bg-danger mt-4 md:w-auto w-52"
              onClick={() => dispatch(reset())}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};
