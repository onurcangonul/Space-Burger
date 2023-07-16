import Image from "next/image";
import { useState,useEffect } from "react";
import Account from "@/components/profile/Account";
import Password from "@/components/profile/Password";
import Order from "@/components/profile/Order";
import Reservation from "@/components/profile/Reservation";
import { signOut, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";
const Profile = ({ user }) => {
  const {data: session} = useSession()
  const [tabs, setTabs] = useState(0);
  const { push } = useRouter();
  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out ?")) {
      signOut({ redirect: false });
      push("/auth/login"); //66
    }
  };
  useEffect(() => {
    if (!session) {
      push("/auth/login")
    }
  },[session,push])
  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)]  lg:flex-row flex-col  mt-4">
      <div className="lg:w-80 w-100 flex-shrink-0">
        <div className="relative flex flex-col items-center px-10 py-5 border border-b-0">
          <Image
            src={user.image ? user.image : "/images/admin.png"}
            alt="profile-photo"
            width={100}
            height={100}
            className="rounded-full"
          />
          <strong className="text-2xl mt-1">{user.fullName}</strong>
        </div>
        <ul className="font-semibold">
          <li
            className={`border border-t-0 w-full p-2 cursor-pointer hover:bg-primary
           hover:text-white transition-all ${
             tabs === 0 && "bg-primary text-white"
           }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-home"></i>
            <button className="ml-2">Account</button>
          </li>
          <li
            className={`border border-t-0 w-full p-2 cursor-pointer hover:bg-primary
           hover:text-white transition-all ${
             tabs === 1 && "bg-primary text-white"
           }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-key"></i>
            <button className="ml-2">Password</button>
          </li>
          <li
            className={`border border-t-0 w-full p-2 cursor-pointer hover:bg-primary
           hover:text-white transition-all ${
             tabs === 2 && "bg-primary text-white"
           }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">Orders</button>
          </li>
          {/* <li
            className={`border border-t-0 w-full p-2 cursor-pointer hover:bg-primary
           hover:text-white transition-all ${
             tabs === 2 && "bg-primary text-white"
           }`}
            onClick={() => setTabs(3)}
          >
            <i className="fa fa-calendar"></i>
            <button className="ml-1">Reservation</button>
          </li> */}
          <li
            className={`border border-t-0 w-full p-2 cur`}
            onClick={handleSignOut}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-2">Exit</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Account user={user} />}
      {tabs === 1 && <Password user={user} />}
      {tabs === 2 && <Order />}
      {tabs === 3 && <Reservation user={user} />}
    </div>
  );
};

export async function getServerSideProps({ req, params }) {


  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
  );

  return {
    props: {
      user:user ? user.data : null
    },
  };
}

export default Profile;
