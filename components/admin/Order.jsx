import Title from "../ui/Title";

const Order = () => {
  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="md:min-h-[calc(100vh_-_433px)] overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700 min-w-[1000px] ">
            <tr>
              <th scope="col" className="py-3 px-6">
                Product
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
            <tr className=" bg-secondary border-gray-700 hover:bg-primary transition-all">
              <td
                className="py-4 px-6 font-medium whitespace-nowrap
                 hover:text-white gap-x-1 "
              >
                Pizza
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                <span>Onurcan</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                <span>10$</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                <span>Cash</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                <span>Preparing</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                <button className="btn-primary !bg-success">Next Stage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Order;
