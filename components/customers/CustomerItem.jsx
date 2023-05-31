import Image from "next/image";

const CustomerItem = ({ imgSrc }) => {
  return (
    <div className="mt-5 mx-4">
      <div className="p-6 bg-secondary text-white rounded-md">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio, amet?
          Esse fugiat totam repudiandae aliquid neque tenetur atque pariatur
          natus! Expedita earum atque eum vero ratione laborum autem,
          reprehenderit labore.
        </p>
        <div className="flex flex-col mt-2 gap-y-1">
          <span className="text-lg text-white font-semibold">
            Moana Michell
          </span>
          <span className="text-[16px]">Magna Aliqua</span>
        </div>
      </div>
          <div className="relative w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[''] before:absolute before:top-0 
      flex justify-center before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5 ">
        <Image
          className="rounded-full"
          src={imgSrc}
          alt="customers-images"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};
export default CustomerItem;
