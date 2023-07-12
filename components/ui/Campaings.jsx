import Image from "next/image"
import Title from "./Title"
import {FaShoppingBasket} from "react-icons/fa"


const CampaingsItem = () => {
    return (
        <div className="bg-secondary flex-1 rounded-md py-5 px-[15px] flex items-center gap-x-4">
            <div className="relative md:w-44 md:h-44 w-36 h-36 after: contents-['']
             border-[5px] border-primary rounded-full overflow-hidden"  >
                <Image src="/images/burger-1.webp"
                    alt="pizza"
                    fill
                    className="hover:scale-105 transition-all"
                />
            </div>
            <div className="text-white">
                <Title addClass="text-2xl">Tasty Thursday</Title>
                <div className="font-dancing my-1">
                    <span className="text-[40px]">20% </span>
                    <span className="text-sm">Off</span>
                </div>
                <button className="btn-primary flex items-center gap-x-2">Order Now<FaShoppingBasket size={20}/> </button>
            </div>

        </div>

    )
}

const Campaings = () => {
    return (
        <div className="flex justify-between container mx-auto md:py-20 py-0  gap-6 flex-wrap md:-mt-[100px] mt-[20px]"
        >
            <CampaingsItem />
            <CampaingsItem />
        </div>
    )
}
export default Campaings