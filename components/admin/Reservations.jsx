import axios from "axios";
import Title from "../ui/Title";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reservation`
        );
        setReservations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReservations();
  }, []);
    console.log(reservations)
 const handleDelete = async (id) => {
   try {
     await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/reservation/${id}`);
     setReservations(reservations.filter((res) => res._id !== id));
     toast.success("Reservation Deleted")
   } catch (err) {
     console.log(err);
   }
 };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Reservations</Title>
      <div className="md:min-h-[calc(100vh_-_433px)] overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700 min-w-[1000px] ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Customer Email
              </th>
              <th scope="col" className="py-3 px-6">
                Customer Name
              </th>
              <th scope="col" className="py-3 px-6">
                Persons
              </th>
              <th scope="col" className="py-3 px-6">
                Phone Number
              </th>
              <th scope="col" className="py-3 px-6">
                Date & Time
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reservations.length > 0 &&
              reservations
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((reservation) => (
                  <tr
                    key={reservation._id}
                    className=" bg-secondary border-gray-700 hover:bg-primary transition-all"
                  >
                    <td
                      className="py-4 px-6 font-medium whitespace-nowrap
                 hover:text-white gap-x-1 "
                    >
                      {reservation?.email}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <span>{reservation?.fullName}</span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <span>{reservation?.persons}</span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <span>{reservation?.phoneNumber}</span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <span>{reservation?.date}</span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <button
                        className="btn-primary !bg-danger"
                        onClick={() => handleDelete(reservation._id)}
                      >
                        Delete
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
export default Reservations;
