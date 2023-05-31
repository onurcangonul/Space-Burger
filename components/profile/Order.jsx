import Title from '../ui/Title';

 const Order = () => {
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5 ">
      <Title addClass="text-[40px] lg:text-left text-center">Password</Title>
      <div className="md:min-h-[calc(100vh_-_433px)] overflow-x-auto w-full mt-5">
        <table className="w-full text-sm text-center text-gray-500 ">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700 min-w-[1000px] ">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                Address
              </th>
              <th scope="col" className="py-3 px-6">
                Date
              </th>
              <th scope="col" className="py-3 px-6">
                Total
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className=" bg-secondary border-gray-700 hover:bg-primary transition-all">
              <td
                className="py-4 px-6 font-medium whitespace-nowrap
                 hover:text-white flex items-center gap-x-1 justify-center"
              >
                <span>23428..</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                <span>İstanbul</span>
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                27.05.2023
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                1
              </td>
              <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                Preparing
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
}
export default Order