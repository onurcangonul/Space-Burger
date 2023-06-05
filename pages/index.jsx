import Header from "@/components/layout/Header"
import Head from "next/head"
import Home from "./home"
import axios from "axios"

export default function Index({categoryList}) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      </Head>
      <Home categoryList={categoryList} />
    </div>
  );
}

export const getServerSideProps = async () => {
const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  return {
    props: {
      categoryList : res.data ? res.data : []
    }
  }

}