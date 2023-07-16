import Title from "../ui/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
useSession;
const Reservation = () => {
  const [orders, setOrders] = useState([]);
  const [curretUsers, setCurretUsers] = useState([]);
  const status = ["Preparing", "On the way", "Delivered"];
  const { data: session } = useSession();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/reservation`);
        setCurretUsers(
          res.data.filter((user) => user.email === session.user.email)[0]
        );
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  console.log(orders);
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5 ">
      <Title addClass="text-[40px] lg:text-left text-center">Rezervation</Title>
      <div className="md:min-h-[calc(100vh_-_433px)] overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500  xl:min-w-[1000px] min-w-100% ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                Full Name
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Have Many Person
              </th>
              <th scope="col" className="py-3 px-6">
                Day-Time
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order?._id}
                className=" bg-secondary border-gray-700 hover:bg-primary transition-all"
              >
                <td
                  className="py-4 px-6 font-medium whitespace-nowrap
                 hover:text-white flex items-center gap-x-1 justify-center"
                >
                  <span>{order.customer}</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>İstanbul</span>
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {order.address}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {order.createdAt}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  <span>{status[order?.status]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </form>
  );
};
export default Reservation;
