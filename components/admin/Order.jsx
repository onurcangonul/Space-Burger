import axios from "axios";
import Title from "../ui/Title";
import { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const status = ["Preparing","On the way","Delivered"]
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  const handleStatus = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        {
          status: currentStatus + 1,
        }
      );
      setOrders([res.data, ... orders.filter((order)=> order._id !== id)])
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="md:min-h-[calc(100vh_-_433px)] overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700 min-w-[1000px] ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Product ID
              </th>
              <th scope="col" className="py-3 px-6">
                Customer
              </th>
              <th scope="col" className="py-3 px-6">
                Total
              </th>
              <th scope="col" className="py-3 px-6">
                Payment
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 && orders
              .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((order) => (
              <tr
                key={order._id}
                className=" bg-secondary border-gray-700 hover:bg-primary transition-all"
              >
                <td
                  className="py-4 px-6 font-medium whitespace-nowrap
                 hover:text-white gap-x-1 "
                >
                  Pizza
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>{order?.customer}</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>${order?.total}</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>{order?.method === 0 ? "Cash" : "Card"}</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>{status[order?.status]}</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <button
                    className="btn-primary !bg-success"
                      onClick={() => handleStatus(order?._id)}
                      disabled={order?.status > 1}
                  >
                    Next Stage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Order;
